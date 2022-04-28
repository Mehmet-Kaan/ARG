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
$posts = openJSON("database/posts.json");

sendJSON($posts, 200);

exit();