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
$data = openJSON("databas/users.json");

if(isset($requestData["username"], $requestData["password"])) {
    $username = $requestData["username"];
    $password = $requestData["password"];
    $foundUser = null;
    foreach($data as $user) {
        if($user["username"] === $username && $user["password"] === $password) {
            $foundUser = $user;
        }
    }
    //Checks that foundUser has been given a user
    if($foundUser !== null) {
        sendJSON($foundUser, 200);
        exit();
    } else {
        //Retuns a message that something when wrong when atempting to login
        sendJSON("User not found", 404);
        exit();
    }
} else{
    sendJSON("PASSWORD OR USERNAME MISSING", 400);
    exit();
}