<?php

namespace App\controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class homeController
{

    public function home(Request $request, Response $response, array $args): Response
    {
        $response->getBody()->write("Page d'accueil");
        return $response;
    }

}