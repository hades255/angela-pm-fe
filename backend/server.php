<?php
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\App;
use MyApp\HttpEndpoint;
use React\Http\HttpServer;
use React\Socket\SocketServer;
use Psr\Http\Message\ServerRequestInterface;
use React\Http\Message\Response;

require __DIR__ . '/vendor/autoload.php';
require 'HttpEndpoint.php';

class Chat implements MessageComponentInterface
{
    protected $clients;
    protected $rooms;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $this->rooms = [];
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $data = json_decode($msg);
        $room = $data->room;
        $message = $data->message;

        if (!isset($this->rooms[$room])) {
            $this->rooms[$room] = new \SplObjectStorage;
        }

        $this->rooms[$room]->attach($from);

        if (count($this->rooms[$room]) == 1) {
            $from->send(json_encode(['room' => $room, 'message' => 'Hi']));
        } else {
            foreach ($this->rooms[$room] as $client) {
                if ($from !== $client) {
                    $client->send(json_encode(['room' => $room, 'message' => $message]));
                }
            }
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        foreach ($this->rooms as $room => $clients) {
            if ($clients->contains($conn)) {
                $clients->detach($conn);
            }
        }
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
    switch ($path) {
        case '/api':
            return (new HttpEndpoint())($request);
        case '/chat':
            $html = file_get_contents("./index.html");
            return Response::html($html);
        default:
            return Response::plaintext("Not Found", 404);
    }
});

$socket = new SocketServer('0.0.0.0:8000');
$httpServer->listen($socket);

$app->run();