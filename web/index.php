<?php

use Symfony\Component\HttpFoundation\Request;

// Require Loader
$loader = require_once __DIR__.'/../vendor/autoload.php';
$loader->addPsr4('Site\\', __DIR__.'/../src/php/');

require_once __DIR__.'/../src/php/config.php';
require_once __DIR__.'/../src/php/init.php';
require_once __DIR__.'/../src/php/services.php';






// Create routes
$app->before(function() use ($app){
  $app['twig']->addGlobal('title', 'Prohibition');
});


$app->get('/', function() use ($app){
  return $app['twig']->render('pages/home.twig');
})
->bind('home');






// Error
$app->error(function (\Exception $e, Request $request, $code) use ($app){
  if ($app['debug']) {
    return;
  }
  $data = array();
  $data['title'] = 'Error';
  $data['code'] = $code;

  return $app['twig']->render('pages/error.twig', $data);
});


// Run Silex
$app->run();