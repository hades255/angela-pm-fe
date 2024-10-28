<?php

namespace MyApp;

use DateTime;
use mysqli;
use Psr\Http\Message\ServerRequestInterface;
use React\Http\Message\Response;
use stdClass;

date_default_timezone_set('UTC');

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
    $dbname = "chat-test";

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
        $status = $user["status"];
        if ($status == 0) {
            return Response::json(["error" => true, "user" => $user, "message" => "This user is online now. Please login with another user name or try it later."]);
        }
        // $stmt = $conn->prepare("UPDATE users SET status = 0, updated_at=? WHERE id = ?");
        // $stmt->bind_param("si", $current, $user_id);
        // $stmt->execute();
        updateUserStatus($room, 0);
    } else {
        $current = date('Y-m-d\TH:i:s.v\Z');
        $room = generateUniqueId("room");
        $avatar = "user" . rand(2, 7) . ".png";
        $stmt = $conn->prepare("INSERT INTO users (name, room, avatar, created_at, updated_at) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $room, $avatar, $current, $current);
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
            SELECT m.*, p.id, p.message_id
            FROM pinned p
            INNER JOIN messages m ON p.message_id = m.id
            ORDER BY p.created_at DESC
        ");
    } else {
        // $stmt = $conn->prepare("SELECT * FROM pinned WHERE room = ? ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT m.*, p.id, p.message_id
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
            SELECT p.*
            FROM attachments p
            INNER JOIN messages m ON p.message_id = m.id
            ORDER BY p.created_at DESC
        ");
    } else {
        // $stmt = $conn->prepare("SELECT * FROM attachments WHERE room = ? ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT p.*
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
        $current = date('Y-m-d\TH:i:s.v\Z');
        var_dump($current);
        $conn = connectToDatabase();
        $stmt = $conn->prepare("UPDATE users SET updated_at=?, status = ? WHERE room = ?");
        $stmt->bind_param("sis", $current, $status, $room);
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
        $current = date('Y-m-d\TH:i:s.v\Z');
        $stmt = $conn->prepare("UPDATE messages SET status = ?, updated_at=? WHERE id = ?");
        $stmt->bind_param("ssi", $status, $current, $id);
        $stmt->execute();
        return Response::json(["message" => "OK"]);
    } catch (\Throwable $th) {
        print_r($th);
        return Response::json(["error" => $th])->withStatus(400);
    }
}

function updateMessagePin($room, $id, $message_id)
{
    try {
        $conn = connectToDatabase();

        $stmt = $conn->prepare("SELECT * FROM pinned WHERE message_id = ? OR id = ?");
        $stmt->bind_param("ss", $message_id, $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $pinned = $result->fetch_assoc();
            $pinned_id = $pinned["id"];
            $stmt = $conn->prepare("DELETE FROM pinned WHERE id = ?");
            $stmt->bind_param("i", $pinned_id);
            $stmt->execute();
        } else {
            $current = date('Y-m-d\TH:i:s.v\Z');
            $stmt = $conn->prepare("INSERT INTO pinned (id, room, message_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $id, $room, $message_id, $current, $current);
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
    try {
        // var_dump($request);
        // var_dump($_FILES);
        $uploadedFiles = $request->getUploadedFiles();
        var_dump("File uploading...");

        $length = count($uploadedFiles);

        if ($length === 0) {
            return Response::plaintext("File not found on body!");
        }
        var_dump($length . ' files are uploaded!');

        for ($i = 0; $i < $length; $i++) {
            $file = $uploadedFiles['file_' . $i];
            $targetFile = "uploads/" . time() . "-" . $file->getClientFilename();
            if ($file->getError() === UPLOAD_ERR_OK) {
                var_dump("Start moving to target!");
                $contents = (string) $file->getStream();
                $fileSize = (string) $file->getSize();
                file_put_contents($targetFile, $contents);
                $paths[] = [
                    "path" => $targetFile,
                    "size" => $fileSize
                ];
            }
        }

        return Response::json(["path" => $paths]);
    } catch (\Throwable $e) {
        var_dump($e->getmessage());
        return Response::json("Error uploading file");
    }
}

function saveMessage($room, $message, $sent = true)
{
    $created_at = date('Y-m-d\TH:i:s.v\Z', strtotime($message->created_at));
    $updated_at = date('Y-m-d\TH:i:s.v\Z', strtotime($message->updated_at));

    $conn = connectToDatabase();

    $stmt = $conn->prepare("INSERT INTO messages (id, text, room, attachments, `from`, `to`, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $sttachments_str = json_encode($message->attachments);
    $stmt->bind_param(
        "sssssssss",
        $message->id,
        $message->text,
        $message->room,
        $sttachments_str,
        $message->from,
        $message->to,
        $message->created_at,
        $message->updated_at,
        $message->status,
    );
    $stmt->execute();

    if ($message->attachments && count($message->attachments)) {
        $mediaTypes = ['png', 'jpg', 'jpeg', 'webp'];
        foreach ($message->attachments as $key => $value) {
            try {
                $ext = strtolower(pathinfo($value->path, PATHINFO_EXTENSION));
                $type = in_array($ext, $mediaTypes) ? 'media' : 'file';
                $sql = "INSERT INTO attachments (room, message_id, `url`, `type`, size, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param(
                    "sssssss",
                    $room,
                    $message->id,
                    $value->path,
                    $type,
                    $value->size,
                    $created_at,
                    $updated_at,
                );
                if ($stmt === false) {
                    die('Prepare failed: ' . htmlspecialchars($conn->error));
                }
                $stmt->execute();
            } catch (\Throwable $e) {
                var_dump($e->getmessage());
                return Response::json("error");
            }
        }
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
