<?php

// Init Silex
$app = new Silex\Application();
$app['config'] = $config;
$app['debug']  = $app['config']['debug'];