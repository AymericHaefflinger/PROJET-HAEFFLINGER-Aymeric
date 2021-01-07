<?php

use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app){

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


