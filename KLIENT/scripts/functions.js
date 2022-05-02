"use strict!";

async function login(username, password){

    let rqst = new Request("http://localhost:9000/login.php");
    
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

function postFormData(formData) {
    let postData = JSON.stringify(Object.fromEntries(formData));
    let settings = {
      method: "POST",
      body: postData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    return settings;
}

function createCloseButton(contianerBox) {
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("closeBtn");
  
    setTimeout(() => {
      closeBtn.classList.add("opacity");
    }, 750);
  
    closeBtn.innerText = `→`;
  
    closeBtn.addEventListener("click", ()=>{
  
        contianerBox.classList.remove("up");
        closeBtn.remove();
    
        setTimeout(() => {
            contianerBox.remove();
        }, 750);
    })
  
    contianerBox.append(closeBtn);
    document.body.append(contianerBox);
}