<?php

//Inkluderar funktioner 
require_once "functions.php";

// Kontrollera att rätt content-type skickades med
checkContentType();

// Kontrollera att rätt metod skickades med
requestMethod("POST");

// Hämtar users
$users = openJSON("database/users.json");

// Hämtar data som skickats med requesten
$data = file_get_contents("php://input");
$requestData = json_decode($data, true);

// Kontrollerar att "userID"
if (!isset($requestData["userID"]) ) {
    sendJSON(
        [
            "message" => "Enter an userID!"
        ],
        400
    );
}

$userID = $requestData["userID"];

$found = false;

foreach($users as $index => $user) {
    if($user["userID"] == $userID) {
        $found = true;
                
        if(!empty($requestData["riddlesSolved"])) {
            $user["riddlesSolved"] = $requestData["riddlesSolved"];
        }
        if(!empty($requestData["preRiddlesSolved"])) {
            $user["preRiddlesSolved"] = $requestData["preRiddlesSolved"];
        }
        if(!empty($requestData["locationAchieved"])) {
            $user["locationAchieved"] = $requestData["locationAchieved"];
        }
        $users[$index] = $user;
    }
}

if($found === false) {
    sendJSON(
        ["message" => "User could not found"],
        404
    );
    exit();
}
        
saveToJSON("databas/users.json", $users);
sendJSON(["message" => "Changes saved"]);

?>