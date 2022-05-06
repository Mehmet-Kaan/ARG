<?php

require_once "access-control.php";
//Gets functions.php
require_once("functions.php");

$dataPHP = file_get_contents("php://input");
$requestData = json_decode($dataPHP, true);

checkContentType();
$data = openJSON("database/users.json");

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