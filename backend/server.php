<?php
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\App;
use MyApp\HttpEndpoint;
use React\Http\HttpServer;
use React\Socket\SocketServer;
use Psr\Http\Message\ServerRequestInterface;
use React\Http\Message\Response;
use GuzzleHttp\Client;
use Dotenv\Dotenv;

require __DIR__ . '/vendor/autoload.php';
require 'HttpEndpoint.php';

class Chat implements MessageComponentInterface
{
    protected $clients;
    protected $rooms;
    protected $open_ai_key;

    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(__DIR__);  // Adjust path if needed
        $dotenv->load();
        // constants
        $this->open_ai_key = $_ENV["OPENAI_API_KEY"];

        $this->clients = new \SplObjectStorage;
        $this->rooms = [];

    }

    public function callOpenAI($prompt)
    {
        // Initialize the Guzzle HTTP client
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
        } catch (Exception $e) {
            // Handle errors (e.g., network or API errors)
            return 'Error: ' . $e->getMessage();
        }
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
            $response = $this->callOpenAI($message);
            $from->send(json_encode(['room' => $room, 'message' => $response]));
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

echo "Server is running";
$app->run();