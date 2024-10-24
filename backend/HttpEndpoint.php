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
    /**CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        room VARCHAR(255) NOT NULL,
        avatar VARCHAR(255)
        );
        INSERT INTO `users` (`id`, `name`, `room`, `avatar`) VALUES (1, 'admin', 'admin-room', 'user0.png')
     */
    /**CREATE TABLE attachments (
        id VARCHAR(50) PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        message_id VARCHAR(50) NOT NULL,
        url TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
     */
    /**CREATE TABLE messages (
        id VARCHAR(50) PRIMARY KEY,
        text TEXT NOT NULL,
        `from` VARCHAR(50) NOT NULL,
        `to` VARCHAR(50) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        status ENUM('read', 'unread') NOT NULL
        );
     */

    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "chat-admin";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

function getUserOrCreate(ServerRequestInterface $request)
{
    $rawBody = $request->getBody()->getContents();
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
    } else {
        $room = generateUniqueId("room");
        $avatar = "user" . rand(2, 7) . ".png";
        $stmt = $conn->prepare("INSERT INTO users (name, room, avatar) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $room, $avatar);
        $stmt->execute();
        $user_id = $stmt->insert_id;
        $user = ["id" => $user_id, "name" => $name, "room" => $room, "avatar" => $avatar];
    }
    print $room;

    $stmt = $conn->prepare("SELECT * FROM users WHERE name = 'admin'");
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $admin = $result->fetch_assoc();
    }

    $stmt = $conn->prepare("SELECT * FROM messages WHERE room = ? ORDER BY updated_at ASC");
    $stmt->bind_param("s", $room);
    $stmt->execute();
    $result = $stmt->get_result();
    $messages = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $messages[] = $row;
        }
    }

    $users = [];
    if ($user_id === 1) {
        $stmt = $conn->prepare("SELECT * FROM users WHERE id != 1");
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

    return Response::json(["user" => $user, "admin" => $admin, "messages" => $messages, "users" => $users]);
}

function saveMessage($message, $sent = true)
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
        $sql = "INSERT INTO 'attachments' ('user_id', 'message_id', 'url', 'type', 'created_at', 'updated_at') VALUES ";
        $values = [];
        $types = "";
        $params = [];
        foreach ($message->attachments as $key => $value) {
            $values[] = "('?', '?', '?', '?', '?', '?')";
            $types .= "ssssss";
            $params[] = $sent ? $message->id : $message->id;
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

function createMessage($room, $message, $from, $to)
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
    $msg->status = "unread";

    return $msg;
}
