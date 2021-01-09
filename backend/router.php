<?php

use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use Tuupola\Middleware\JwtAuthentication;



return function (App $app){


    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        return $response;
    });

    $options = [
        "attribute" => "token",
        "header" => "Authorization",
        "secure" => false,
        "algorithm" => ["HS256"],
        "secret" => $_ENV["JWT_SECRET"],
        "path" => ["/user"],
        "ignore" => ["/user/login", "/user/register"],
        "error" => function ($response, $arguments) {
            $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
            $response = $response->withStatus(401);
            return $response
                ->withHeader("Content-Type", "application/json")
                ->getBody()->write(json_encode($data));
        }
    ];
    
    // Chargement du Middleware
    $app->add(new JwtAuthentication($options));


    $app->get('/', "App\controller\homeController:home"); 

    $app->group('/user', function(Group $group){
        $group->post('/login', "App\controller\userController:login");
        $group->post('/register', "App\controller\userController:register");
        $group->post('/modify', "App\controller\userController:modify");
    });

    $app->group('/article', function(Group $group){
        $group->get('/get', "App\controller\articleController:get");
        $group->post('/search', "App\controller\articleController:search");
    });

};


