<?php

require_once "access-control.php";
//Inkluderar funktioner 
require_once "functions.php";

// Kontrollera att rätt content-type skickades med
checkContentType();

// Kontrollera att rätt metod skickades med
requestMethod("PATCH");

// Hämtar users
$users = openJSON("database/users.json");

// Hämtar teams
$teams = openJSON("database/teams.json");

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

if(isset($requestData["teamID"])){
    foreach($teams as $index => $team){
        if($team["teamID"] == $requestData["teamID"]){
            $team["wins"] = true;
            $teams[$index] = $team;
        }
    }
    saveToJSON("database/teams.json", $teams);
    sendJSON(["message" => "team updated"]);
}

$userID = $requestData["userID"];
$found = false;

foreach($users as $index => $user) {
    if($user["userID"] == $userID) {
        $found = true;
                
        if(isset($requestData["riddlesSolved"])) {
            $user["riddlesSolved"] = $requestData["riddlesSolved"];
        }
        if(isset($requestData["preRiddlesSolved"])) {
            $user["preRiddlesSolved"] = $requestData["preRiddlesSolved"];
        }
        if(isset($requestData["locationAchieved"])) {
            $user["locationAchieved"] = $requestData["locationAchieved"];
        }
        if(isset($requestData["diaryExcerpts"])) {
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
        
saveToJSON("database/users.json", $users);
sendJSON(["message" => "Changes saved"]);

?>