"use strict!";
const urlAPI = "https://api.themalmoproject.se";
const url = "https://themalmoproject.se";

async function checkHTTP() {
  if (!window.location.href.includes("https")) {
    sessionStorage.clear();
    window.location.href = url;
  }
}

checkHTTP();

async function login(username, password) {

    let rqst = new Request(`${urlAPI}/login.php`);

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

async function update(userID, riddlesSolved, preRiddlesSolved, locationAchieved) {
    
    let update = {
        "userID": userID,
        "riddlesSolved": riddlesSolved,
        "preRiddlesSolved": preRiddlesSolved,
        "locationAchieved": locationAchieved
    };
    console.log(update);

    // let rqst = new Request("https://localhost:9000/update.php");
    let rqst = new Request(`${urlAPI}/update.php`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
    });

    let response = await fetch(rqst);
    let data = await response.json();
    return data;




    fetch("https://localhost:9000/update.php", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something missing!");
                return false;
            }
        })
        .then(data => {
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

// Save to session
function saveToSession(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

// Get from session
function getFromSession(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

// Save to local
function saveToLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Get from local
function getFromLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Fetches all riddles
async function getRiddles() {
    let response = await fetch(`${urlAPI}/get.php`, {
        method: 'POST',
        body: JSON.stringify({ riddles: true }),
        headers: { "Content-type": "application/json" },
    });
    let data = await response.json();
    return data;
}

async function getUsers() {
    let response = await fetch(`${urlAPI}/get.php`, {
        method: 'POST',
        body: JSON.stringify({ users: true }),
        headers: { "Content-type": "application/json" },
    });
    let data = await response.json();
    return data;
}

function loadingPage() {
    let overlay = document.createElement("div");
    overlay.setAttribute("id", "loadingPage");

    let logo = document.createElement("img");
    logo.setAttribute("src", "../images/TheMalmoProject_Logo.png");

    overlay.append(logo);
    document.body.append(overlay);

    if (getFromSession("entered") != true) {
        overlay.style.animation = "fadeIn 2s";
    }

    setTimeout(() => {
        overlay.style.animation = "fadeOut 2s";

        setTimeout(() => {
            overlay.remove();
        }, 1700)
    }, 4000)
}

function displayMap() {
    let title = document.getElementById("titleO");
    let subContent = document.getElementById("subContent");
    title.classList.remove("hide");
    subContent.classList.remove("hide");
    wrapper.setAttribute("id", "map");
    initMap();
};
