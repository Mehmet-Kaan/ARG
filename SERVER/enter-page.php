<?php

require_once "access-control.php";
//Gets functions.php
require_once("functions.php");

$dataPHP = file_get_contents("php://input");
$requestData = json_decode($dataPHP, true);

checkContentType();


if(isset($requestData["password"])) {

    $password = $requestData["password"];
    
    if(20220519 == $password) {
        sendJSON(true, 200);
        exit();
    } else {
        sendJSON("WRONG password", 400);
        exit();
    }
    
} else{
    sendJSON("PASSWORD MISSING", 400);
    exit();
}