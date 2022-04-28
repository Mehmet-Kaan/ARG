"use strict!";

async function login(username, password){

    let rqst = new Request("backend/login.php");
    
    let data = {
        "username": username,
        "password": password
    }
    
    let response = await fetch(rqst, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    });
    inLoggedUser = await response.json();
}

async function update(userID, riddlesSolved, preRiddlesSolved, locationAchieved){

    let rqst = new Request("backend/login.php");
    
    let data = {
        "userID":userID,
        "riddlesSolved":riddlesSolved,
        "preRiddlesSolved":preRiddlesSolved,
        "locationAchieved":locationAchieved
    }
    
    fetch(rqst, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then( response => {
            if( response.status === 200 ){
                return response.json();
            }else{
                alert("Something missing!");
                return false;
            }
        })
        .then( data => {
            return data;
        })
}