<?php


namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\App;
use React\Http\HttpServer;
use React\Socket\SocketServer;
use Psr\Http\Message\ServerRequestInterface;
use React\Http\Message\Response;
use GuzzleHttp\Client;
use Dotenv\Dotenv;

date_default_timezone_set('UTC');

require __DIR__ . '/vendor/autoload.php';
require 'HttpEndpoint.php';



class Chat implements MessageComponentInterface
{
    protected $clients;
    protected $rooms;
    protected $open_ai_key;
    protected $admins;

    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        // constants
        $this->open_ai_key = $_ENV["OPENAI_API_KEY"];
        print($_ENV["OPENAI_API_KEY"]);

        $this->clients = new \SplObjectStorage;
        $this->admins = new \SplObjectStorage;
        $this->rooms = [];
    }

    public function callOpenAI($prompt)
    {
        $client = new Client(['base_uri' => 'https://api.openai.com/']);

        try {
            // Send a POST request to the Chat Completions endpoint
            $response = $client->post('v1/chat/completions', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->open_ai_key,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'gpt-4o',
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a helpful assistant.'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'temperature' => 0.7,
                    'max_tokens' => 100,
                ],
            ]);

            // Decode and return the response body
            $body = json_decode($response->getBody(), true);
            return $body['choices'][0]['message']['content'];
        } catch (\Exception $e) {
            return 'Error: ' . $e->getMessage();
        }
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

        if ($type === "select" && !empty($data)) {
            foreach ($this->rooms[$data] as $client) {
                if ($from == $client)
                    $this->rooms[$data]->detach($from);
            }
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
                $response = $this->callOpenAI($data->text);
                $newMessage = createMessage($room, $response, 1, $data->from);
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
echo("Server started");
$app->run();
