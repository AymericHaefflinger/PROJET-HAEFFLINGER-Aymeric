<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');

require_once __DIR__ . "/../../vendor/autoload.php";

$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);

/*
$conn = array(
'driver' => 'pdo_mysql',
'user' => 'apiWeb',
'host' => 'localhost',
'password' => 'apiWeb',
'dbname' => 'PROJET_WEB_HAEFFLINGER',
'port' => '5432'
);*/


$conn = array(
    'driver' => 'pdo_pgsql',
    'user' => 'ekogrjuzlgoxlc',
    'host' => 'ec2-79-125-59-247.eu-west-1.compute.amazonaws.com',
    'password' => 'b75869f94902f4405757debdec375ee9588305c8c9e62bb9428746170cab0e1d',
    'dbname' => 'd78nl4glsmmjbo',
    'port' => '5432'
    );

$entityManager = EntityManager::create($conn, $config);
