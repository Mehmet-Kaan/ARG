<?php

require_once "access-control.php";
//Gets functions.php
require_once("functions.php");

$dataPHP = file_get_contents("php://input");
$requestData = json_decode($dataPHP, true);

checkContentType();

if(isset($requestData["riddles"])){
    $riddles = openJSON("database/riddles.json");
    sendJSON($riddles, 200);
}
if(isset($requestData["teams"])){
    $teams = openJSON("database/teams.json");
    sendJSON($teams, 200);
}
if(isset($requestData["users"])){
    $users = openJSON("database/users.json");
    sendJSON($users, 200);
}

exit();
