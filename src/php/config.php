<?php

// Config
$config = array();
switch($_SERVER['HTTP_HOST'])
{
    case 'localhost':
    case 'localhost:8080':
    case 'localhost:8888':
    case 'localhost:7777':
        $config['debug']   = true;
        $config['db_host'] = 'localhost';
        $config['db_name'] = 'hetic_partiel_t3';
        $config['db_user'] = 'root';
        $config['db_pass'] = 'root123';
        break;
}