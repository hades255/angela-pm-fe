<?php
namespace MyApp;

use Psr\Http\Message\ServerRequestInterface;
use React\Http\Message\Response;

class HttpEndpoint
{
    public function __invoke(ServerRequestInterface $request)
    {
        // Handle HTTP requests
        return Response::plaintext("Hello from HTTP endpoint!");
    }
}