<?php

$method = $_SERVER["REQUEST_METHOD"];

// Den sk. preflight förfrågan ("får jag anropa dig")
if ($method === "OPTIONS") {
    // Tillåt alla (origins) och alla headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    exit();
} 

// Alla är vällkommna
header("Access-Control-Allow-Origin: *");

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