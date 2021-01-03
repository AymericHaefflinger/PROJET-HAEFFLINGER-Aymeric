<?php

namespace App\controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;
use Article;
use Firebase\JWT\JWT;



class articleController
{

    public function get(Request $request, Response $response, array $args): Response
    {
        require_once __DIR__ . '/../Doctrine/bootstrap.php';

        $articleRepo = $entityManager->getRepository('Article');
        $allArticles = $articleRepo->findAll();       

        $arrayCollection = array();

        foreach($allArticles as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'nom' => $item->getNom(),
                'prix' => $item->getPrix(),
                'img' => $item->getImg(),
            );
        }

        $response->getBody()->write(json_encode([
            $arrayCollection
        ]));
        return $response
            ->withHeader("Content-Type", "application/json");
    }


    public function search(Request $request, Response $response, array $args): Response
    {
        require_once __DIR__ . '/../Doctrine/bootstrap.php';

        $searchT = $request->getParsedBody();
        
        $searchTerm = $searchT["term"];
        $searchTerm = '%' . $searchTerm . '%';

        $query = $entityManager->createQuery("SELECT a FROM Article a WHERE a.nom LIKE '$searchTerm' OR a.prix LIKE '$searchTerm'");

        $searchedArticles = $query->getResult(); 

        $arrayCollection = array();

        foreach($searchedArticles as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'nom' => $item->getNom(),
                'prix' => $item->getPrix(),
                'img' => $item->getImg(),
            );
        }

        $response->getBody()->write(json_encode([
            $arrayCollection
        ]));
        return $response
            ->withHeader("Content-Type", "application/json");
    }
}