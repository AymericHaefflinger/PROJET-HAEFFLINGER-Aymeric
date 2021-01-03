<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');

require_once __DIR__ . "/../../vendor/autoload.php";

$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);

$conn = array(
'driver' => 'pdo_mysql',
'user' => 'apiWeb',
'host' => 'localhost',
'password' => 'apiWeb',
'dbname' => 'PROJET_WEB_HAEFFLINGER',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);
