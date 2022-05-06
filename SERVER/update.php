<?php

require_once "access-control.php";
//Inkluderar funktioner 
require_once "functions.php";

// Kontrollera att rätt content-type skickades med
checkContentType();

// Kontrollera att rätt metod skickades med
requestMethod("PATCH");

// Hämtar users
$users = openJSON("DATABASE/users.json");

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
        if(!empty($requestData["diaryExcerpts"])) {
            $user["diaryExcerpts"] = $requestData["diaryExcerpts"];
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
        
saveToJSON("DATABASE/users.json", $users);
sendJSON(["message" => "Changes saved"]);

?>