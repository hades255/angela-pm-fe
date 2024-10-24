<?php


namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\App;
use React\Http\HttpServer;
use React\Socket\SocketServer;
use Psr\Http\Message\ServerRequestInterface;
use React\Http\Message\Response;

date_default_timezone_set('UTC');

require __DIR__ . '/vendor/autoload.php';
require 'HttpEndpoint.php';



class Chat implements MessageComponentInterface
{
    protected $clients;
    protected $rooms;
    protected $admins;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $this->admins = new \SplObjectStorage;
        $this->rooms = [];
    }

    public function onOpen(ConnectionInterface $conn)
    {
        // $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $_msg = json_decode($msg);
        $room = $_msg->room;
        $type = $_msg->type;
        $data = $_msg->data;

        if (!isset($this->rooms[$room])) {
            $this->rooms[$room] = new \SplObjectStorage;
        }

        $this->rooms[$room]->attach($from);

        if ($type === "login") {
            if ($room === "admin-room") $this->admins->attach($from);
            $this->clients->attach($from, $room);
        }

        if ($type === "message") {
            saveMessage($data);

            if ($room !== "admin-room") {
                foreach ($this->admins as $key => $admin) {
                    $admin->send($msg);
                }
            }

            sleep(1);
            if (count($this->rooms[$room]) == 1) {
                $newMessage = createMessage($room, "Hi, this is from admin", 1, $data->to);
                saveMessage($newMessage, false);
                $from->send(json_encode(['room' => $room, 'type' => 'message', 'data' => $newMessage]));
            }
        }

        if ($type === "reply") {
            saveMessage($data);

            foreach ($this->rooms[$room] as $client) {
                if ($from !== $client) {
                    $client->send(json_encode(['room' => $room, 'type' => 'message', 'data' => $data]));
                }
            }
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        if ($this->clients->contains($conn)) {
            updateUserStatus($this->clients[$conn], 2);
            $this->clients->detach($conn);
        }
        foreach ($this->rooms as $room => $clients) {
            if ($clients->contains($conn)) {
                $clients->detach($conn);
            }
        }
        if ($this->admins->contains($conn))
            $this->admins->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

$app = new App('localhost', 8080);

$app->route('/chat', new Chat, ['*']);

// HTTP server

$httpServer = new HttpServer(function (ServerRequestInterface $request) {
    $path = $request->getUri()->getPath();
    $method = $request->getMethod();

    $response = new Response();
    $response = $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if ($method === 'OPTIONS') {
        return $response->withStatus(200);
    }

    switch ($path) {
        case '/api':
            return $response->withBody((new HttpEndpoint())($request)->getBody());
        case '/api/login':
            if ($method === 'POST') {
                return $response->withBody(getUserOrCreate($request)->getBody());
            }
            return Response::json(["user" => "user"]);
        case '/chat':
            $html = file_get_contents("./index.html");
            return $response->html($html);
        default:
            return $response->withStatus(404);
    }
});



$socket = new SocketServer('0.0.0.0:8000');
$httpServer->listen($socket);

$app->run();
