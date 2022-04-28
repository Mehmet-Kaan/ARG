<?php
//Inkluderar funktioner 
require_once "functions.php";

// Kontrollera att rätt content-type skickades med
checkContentType();

// Kontrollera att rätt metod skickades med
requestMethod("POST");

// Hämtar users
$users = openJSON("databas/users.json");

// Hämtar data som skickats med requesten
$data = file_get_contents("php://input");
$requestData = json_decode($data, true);

// Kontrollerar att "username" och "email" skickats med
if (!isset($requestData["username"]) && !isset($requestData["email"])) {
    sendJSON(
        [
            "message" => "You're missing `username` or `email` of request body!"
        ],
        400
    );
}

$username = $requestData["username"]; 
$email =  $requestData["email"];

    //Fetching data from database
    $data = openJSON("databas/users.json");
    //Creating a user
    $newUser = [
        "username" => $username,
        "email" => $email,
        "riddlesSolved" => [],
        "preRiddlesSolved" => [],
        "locationAchieved" => []
    ];

    foreach($data as $user) {
	    if ($user["username"] == $username && $user["email"] == $email) {
            sendJSON("Username and email adress are already taken");
		    return false;
	    }
    }

    //Creating an ID for the new user
    $highestId = 0;
    foreach($data as $user) {
        if($user["userID"] > $highestId) {
            $highestId = $user["userID"];
        }
    }
    $newUser["userID"] = $highestId + 1;

    //Generates password by using username, email and userID (Gets 3 of the letters, email and new user id) 
    $newUser["password"] = substr($newUser["username"], 1, 3) .substr($newUser["email"], 0, 4) .$newUser["userID"];

    // //Creating an teamID for the new user
    $latestTeamID = $data[count($data)-1]["teamID"];
    if($latestTeamID == 1){
        $newUser["teamID"] = 2;
    }else{
        $newUser["teamID"] = 1;
    }

    //Saving the new user
    array_push($data, $newUser);
    saveToJSON("databas/users.json", $data);

    if (saveToJSON("databas/users.json", $data)) {
        sendJSON($newUser);
    } else{
        sendJSON("Writing to file failed", 500);
    }
?>