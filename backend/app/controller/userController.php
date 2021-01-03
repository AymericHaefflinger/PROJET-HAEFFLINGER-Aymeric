<?php

namespace App\controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;
use User;
use Firebase\JWT\JWT;



class userController
{

    public function login(Request $request, Response $response, array $args): Response
    {
        require_once __DIR__ . '/../Doctrine/bootstrap.php';

        $user = $request->getParsedBody();
        
        $mail = $user["mail"] ?? "_";
        $mdp = $user["mdp"] ?? "_";

        $userRepo = $entityManager->getRepository('User');
        $userCorrect = $userRepo->findOneBy(array("mail" => $mail, "mdp" => $mdp));

        if(!$userCorrect){
            return $response->withStatus(401);
        }

        $issuedAt = time();

        $payload = [
            "user" => [
                "id" => 1,
                "email" => $user["mail"]
            ],
            "iat" => $issuedAt,
            "exp" => $issuedAt + 60
        ];

        $tokenJWT = JWT::encode($payload, $_ENV["JWT_SECRET"], "HS256");

        $response->getBody()->write(json_encode([
            "user" => [
                "nom" => $userCorrect->getNom(),
                "prenom" => $userCorrect->getPrenom(),
                "mail" => $userCorrect->getMail()
            ],
            "success" => true
        ]));
        return $response
            ->withHeader("Authorization", $tokenJWT)
            ->withHeader("Content-Type", "application/json");
    }

    public function register(Request $request, Response $response, array $args): Response
    {
        require_once __DIR__ . '/../Doctrine/bootstrap.php';

        $value = $request->getParsedBody();
        $mail = $value["mail"];
        $userRepo = $entityManager->getRepository('User');
        $userExist = $userRepo->findOneBy(array("mail" => $mail));
        
        if(!$userExist){


            $user = new User;
            $user->setNom($value["nom"]);
            $user->setPrenom($value["prenom"]);
            $user->setMail($value["mail"]);
            $user->setMdp($value["mdp"]);

            $result = [
                "success" => true,
                "user" => $user
            ];

            $entityManager->persist($user);
            $entityManager->flush();


            $issuedAt = time();

            $payload = [
                "user" => [
                    "id" => 1,
                    "email" => "aymeric@email.com"
                ],
                "iat" => $issuedAt,
                "exp" => $issuedAt + 60
            ];
    
            $tokenJWT = JWT::encode($payload, $_ENV["JWT_SECRET"], "HS256");
    
            $response->getBody()->write(json_encode([
                "user" => [
                    "mail" => $user->getMail(),
                    "nom" => $user->getNom(),
                    "prenom" => $user->getPrenom(),
                    "mail" => $user->getMail()
                ],
                "success" => true
            ]));



            return $response
            ->withHeader("Authorization", $tokenJWT)
            ->withHeader("Content-Type", "application/json");
        }
        else{
            return $response
                    ->withStatus(401);

        }
    }

}