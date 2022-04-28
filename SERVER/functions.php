<?php
//Error reports på = -1, av = 0
error_reporting(-1);

//Variable med server request
//$rqstMethod = $_SERVER["REQUEST_METHOD"];
//$contentType = "application/json";

//Checks if contenttype is set to application/json
function checkContentType() {
    $contentType = $_SERVER["CONTENT_TYPE"];

    if ($contentType !== "application/json") {
        sendJson(
            [
                "error" => "The API only accepts JSON!",
                "message" => "Bad request!"
            ],
            400
        );
    }
}

//Checks if the method is the same as the server has requested
function requestMethod($method) {
    $rqstMethod = $_SERVER["REQUEST_METHOD"];
    if($rqstMethod !== "$method") {
        sendJson(
            ["message" => "Method not allowed"],
            405
        );
        exit();
    }
}

//openJSON function, file argument
function openJSON($fileName) {
    $dataLoadJSON = json_decode(file_get_contents($fileName), true);
    return $dataLoadJSON;
}

//SaveToJSON function, file/data argument
function saveToJSON($filename, $data) {
    $json = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
    
    return true;
}

//SendJSON function, message/httpcode argument
function sendJSON($message, $statusCode = 200) {
    header("Content-Type: application/json");
    http_response_code($statusCode);
    $json = json_encode($message);
    echo $json;
    exit();
}

?>
