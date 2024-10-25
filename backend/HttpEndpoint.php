<?php

namespace MyApp;

use DateTime;
use mysqli;
use Psr\Http\Message\ServerRequestInterface;
use React\Http\Message\Response;
use stdClass;

class HttpEndpoint
{
    public function __invoke(ServerRequestInterface $request)
    {
        // Handle HTTP requests
        return Response::plaintext("Hello from HTTP endpoint!");
    }
}

function connectToDatabase()
{
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "chat-admin";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "DB connected";

    return $conn;
}

function getUserOrCreate(ServerRequestInterface $request)
{
    $rawBody = $request->getBody()->getContents();
    print($rawBody);
    $parsedBody = json_decode($rawBody, true);

    $name = $parsedBody['name'] ?? null;
    $conn = connectToDatabase();

    $stmt = $conn->prepare("SELECT * FROM users WHERE name = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $room = $user["room"];
        $user_id = $user["id"];
        $stmt = $conn->prepare("UPDATE users SET status = 0 WHERE id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
    } else {
        $room = generateUniqueId("room");
        $avatar = "user" . rand(2, 7) . ".png";
        $stmt = $conn->prepare("INSERT INTO users (name, room, avatar) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $room, $avatar);
        $stmt->execute();
        $user_id = $stmt->insert_id;
        $user = ["id" => $user_id, "name" => $name, "room" => $room, "avatar" => $avatar];
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE name = 'admin'");
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $admin = $result->fetch_assoc();
    }

    $messages = [];
    if ($user_id === 1) {
        $stmt = $conn->prepare("SELECT * FROM messages ORDER BY created_at ASC");
    } else {
        $stmt = $conn->prepare("SELECT * FROM messages WHERE room = ? ORDER BY created_at ASC");
        $stmt->bind_param("s", $room);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $messages[] = $row;
        }
    }

    $pinned = [];
    if ($user_id === 1) {
        // $stmt = $conn->prepare("SELECT * FROM pinned ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT m.*
            FROM pinned p
            INNER JOIN messages m ON p.message_id = m.id
            ORDER BY p.created_at DESC
        ");
    } else {
        // $stmt = $conn->prepare("SELECT * FROM pinned WHERE room = ? ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT m.*
            FROM pinned p
            INNER JOIN messages m ON p.message_id = m.id
            WHERE p.room = ?
            ORDER BY p.created_at DESC
        ");
        $stmt->bind_param("s", $room);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $pinned[] = $row;
        }
    }

    $attachments = [];
    if ($user_id === 1) {
        // $stmt = $conn->prepare("SELECT * FROM attachments ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT p.*, m.*
            FROM attachments p
            INNER JOIN messages m ON p.message_id = m.id
            ORDER BY p.created_at DESC
        ");
    } else {
        // $stmt = $conn->prepare("SELECT * FROM attachments WHERE room = ? ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT p.*, m.*
            FROM attachments p
            INNER JOIN messages m ON p.message_id = m.id
            WHERE p.room = ?
            ORDER BY p.created_at DESC
        ");
        $stmt->bind_param("s", $room);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $attachments[] = $row;
        }
    }

    $users = [];
    if ($user_id === 1) {
        $stmt = $conn->prepare("SELECT * FROM users WHERE id != 1 ORDER BY status ASC");
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
        }
    }

    $stmt->close();
    $conn->close();

    return Response::json(["user" => $user, "admin" => $admin, "messages" => $messages, "users" => $users, "pinned" => $pinned, "attachments" => $attachments]);
}

function updateUserStatus($room, $status = 0)
{
    if (empty($room))
        return;
    try {
        $conn = connectToDatabase();
        $stmt = $conn->prepare("UPDATE users SET status = ? WHERE room = ?");
        $stmt->bind_param("is", $status, $room);
        $stmt->execute();

        $stmt->close();
        $conn->close();
    } catch (\Throwable $th) {
        print_r($th);
    }
}

function updateMessageStatus(ServerRequestInterface $request)
{
    try {
        $rawBody = $request->getBody()->getContents();
        $parsedBody = json_decode($rawBody, true);

        $id = $parsedBody['id'] ?? null;
        $status = $parsedBody['status'] ?? null;
        $conn = connectToDatabase();

        $stmt = $conn->prepare("UPDATE messages SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        $stmt->execute();
        return Response::json(["message" => "OK"]);
    } catch (\Throwable $th) {
        print_r($th);
        return Response::json(["error" => $th])->withStatus(400);
    }
}

function updateMessagePin($room, $id)
{
    try {
        $conn = connectToDatabase();

        $stmt = $conn->prepare("SELECT * FROM pinned WHERE message_id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $pinned = $result->fetch_assoc();
            $pinned_id = $pinned["id"];
            $stmt = $conn->prepare("DELETE FROM pinned WHERE id = ?");
            $stmt->bind_param("i", $pinned_id);
            $stmt->execute();
        } else {
            $stmt = $conn->prepare("INSERT INTO pinned (room, message_id) VALUES (?, ?)");
            $stmt->bind_param("ss", $room, $id);
            $stmt->execute();
        }

        return Response::json(["message" => "OK"]);
    } catch (\Throwable $th) {
        print_r($th);
        return Response::json(["error" => $th])->withStatus(400);
    }
}

function uploadFile(ServerRequestInterface $request)
{
    echo "OK";
    $uploadedFiles = $request->getUploadedFiles();
    print_r($uploadedFiles);
    $file = $uploadedFiles['fileToUpload'];
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($file->getClientFilename());

    if ($file->getError() === UPLOAD_ERR_OK) {
        $file->moveTo($targetFile);
        return Response::plaintext("File has been uploaded.");
    } else {
        return Response::plaintext("Error uploading file.");
    }
}


function saveMessage($room, $message, $sent = true)
{
    $created_at = date('Y-m-d\TH:i:s.v\Z', strtotime($message->created_at));
    $updated_at = date('Y-m-d\TH:i:s.v\Z', strtotime($message->updated_at));

    $conn = connectToDatabase();

    $stmt = $conn->prepare("INSERT INTO messages (id, text, room, `from`, `to`, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'unread')");
    $stmt->bind_param(
        "sssssss",
        $message->id,
        $message->text,
        $message->room,
        $message->from,
        $message->to,
        $created_at,
        $updated_at
    );
    $stmt->execute();


    if ($message->attachments && count($message->attachments)) {
        $sql = "INSERT INTO 'attachments' ('room', 'message_id', 'url', 'type', 'created_at', 'updated_at') VALUES ";
        $values = [];
        $types = "";
        $params = [];
        foreach ($message->attachments as $key => $value) {
            $values[] = "('?', '?', '?', '?', '?', '?')";
            $types .= "ssssss";
            $params[] = $room;
            $params[] = $message->id;
            $params[] = $value;
            $params[] = "file";
            $params[] = $message->created_at;
            $params[] = $message->updated_at;
        }
        $sql .= implode(", ", $values);
        $stmt = $conn->prepare($sql);
        $stmt->bind_param($types, ...$params);
        $stmt->execute();
    }

    $stmt->close();
    $conn->close();
}

function generateUniqueId($data = "message")
{
    return uniqid($data . '-', true);
}

function createMessage($room, $message, $from, $to, $status = "unread")
{
    $date = new DateTime();
    $formattedDate = $date->format('Y-m-d\TH:i:s.v\Z');
    $msg = new stdClass();
    $msg->room = $room;
    $msg->id = generateUniqueId();
    $msg->text = $message;
    $msg->from = $from;
    $msg->to = $to;
    $msg->attachments = [];
    $msg->created_at = $formattedDate;
    $msg->updated_at = $formattedDate;
    $msg->status = $status;

    return $msg;
}
