<?php

return [
    //projects
    ['method' => 'POST', 'origin' => 'admin', 'name' => 'projects'],
    ['method' => 'PUT', 'origin' => 'admin', 'name' => 'projects/{id}'],
    ['method' => 'DELETE', 'origin' => 'admin', 'name' => 'projects'],

    //templates
    ['method' => 'POST', 'name' => 'templates'],
    ['method' => 'PUT', 'name' => 'templates/{id}'],
    ['method' => 'DELETE', 'name' => 'templates'],
];