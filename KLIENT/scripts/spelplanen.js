"use strict";

let latitude, longitude, currentPositionOfPlayer, playerInCircle, user;
let map;
let circles = {};
let meter = document.querySelector('.meter');
var exposed = document.querySelector('.exposed');

if (getFromSession("exposureLevel") === null) {
  exposed.innerText = 0;
}
exposed.innerText = getFromSession("exposureLevel");
const GAME_BOUNDS = {
  north: 55.638067,
  south: 55.583009,
  west: 12.962928,
  east: 13.033099,
};


// set the logged in user in a key
async function setUserVariable() {
  let users = await getUsers();
  console.log(users)
  user = users.find((u) => u.userID == getFromSession("user").userID);

  function initStart() {
    // Checks if the user already entered the map view, to not give them permission to go backwards. 
    if (getFromSession("entered") != true) {
      pageThree(pageInformation, buttons, user);
      // Fade In
      const phaseThree = document.querySelector("#thirdPhase");
      phaseThree.style.animation = "fadeIn 3s";
    } else {
      loadingPage();
      setTimeout(() => {
        displayMap();
      }, 2000)

    }
  }
  initStart();
}

setUserVariable();

//Checks if any team has cleared the all zones
async function controlTeams() {
  //Fetches teams 
  let teamsOnServer = await getTeams();

  let nonWinnerYet = true;

  //Controls if the any team has already won
  teamsOnServer.forEach(team => {
    if(team.wins == true){
      nonWinnerYet = false;
    }
  });

  if(nonWinnerYet == false && getFromSession(`infoAboutWinnerTeam`) == null){
   
    teamsOnServer.forEach(team => {
      if(team.teamID == user.userID){
        //If true creates the win box
        if(team.wins == true){
          // SPARAR IN SESSION NÄR MAN ÄR INLOGGAD PÅ FÖRSTA GÅNGEN!
          if (getFromSession(`infoAboutWinnerTeam`) === null) {
            saveToSession(`infoAboutWinnerTeam`, team.name);
          }
          createWinLoseBox("win");
        }else{
          createWinLoseBox("lose");
        }
      }
    });
  }
}
// controlTeams();

//Checks the teams for every 20s
let controlTheTeams = setInterval(() => {
  controlTeams()
}, 20000);

// Checks if user is logged in / otherwise sends them to first place
if (getFromSession("user") === null) {
  window.location.replace(`${url}/index.php`);
};

// PAge three, also sets the user to user.
function pageThree(info, button, user) {

  // The wrapper
  let page = document.createElement("div");
  page.setAttribute("id", "thirdPhase")

  let title = document.createElement("h1");
  title.innerHTML = info.headlines.pageThree.title + ` ${user.username}!`;
  title.className = info.classes.title;
  title.setAttribute("data-text", info.headlines.pageThree.title + ` ${user.username}!`);


  let teamName;
  let leader;
  teams.forEach(team => {
    if (team.teamID == user.teamID){
      teamName = team.teamName;
      leader = team.name;
    }
  })
  let bodyText = document.createElement("p");
  bodyText.innerHTML = `"Du är utvald av en anledning. Din träning är över och du är nu en medlem av det särskilda operationsteamet ${teamName}. Uppdraget är hemlighetsstämplat av en anledning, men jag vet att ni inte kommer säga något om vart ni tillhör, det har vi tränat er för. Ligg lågt och använd det här emblemet för att hitta dina kamrater. Ta dig vidare in och låt oss börja. Tiden är knapp och liv kan vara i fara. </br></br>- ${leader}`;
  bodyText.className = info.classes.bodyText;

  let letsBeginButton = document.createElement("button");
  letsBeginButton.className = button.letsBegin.class;
  letsBeginButton.innerHTML = button.letsBegin.innerText;

  // Button Event
  letsBeginButton.addEventListener("click", () => {
    const phaseThree = document.querySelector("#thirdPhase");
    phaseThree.style.animation = "fadeOut 2s";

    setTimeout(() => {
      wrapper.innerHTML = "";
      loadingPage();

      setTimeout(() => {
        displayMap();
        saveToSession("entered", true);
      }, 3000)

    }, 1700);
  })

  // Important Information
  let informationWrapper = document.createElement("div");
  informationWrapper.setAttribute("id", "information");

  let titleTwo = document.createElement("h1");
  titleTwo.innerHTML = info.headlines.information.title;
  titleTwo.className = info.classes.middleTitle; // <- cause it should have source code

  let bodyTextTwo = document.createElement("p");
  bodyTextTwo.innerHTML = info.headlines.information.bodyText;
  bodyTextTwo.className = info.classes.bodyText;

  titleTwo.addEventListener("click", () => {
    informationWrapper.classList.toggle("openUp");
  });

  informationWrapper.append(titleTwo, bodyTextTwo);

  page.append(title, bodyText, letsBeginButton, informationWrapper);
  wrapper.append(page);
}
// Get position of player 
function getLocation() {
  if (navigator.geolocation) {
    var options = {
      enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

  } else {
    // Deras telefon har inte möjlighet till att dela plats
    // x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function successCallback(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  console.log(latitude, longitude);
}
function errorCallback(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
    // Starta dela plats
    // x.innerHTML = "User denied the request for Geolocation."
    // break;
    case error.POSITION_UNAVAILABLE:
    // OPS
    // x.innerHTML = "Location information is unavailable."
    // break;
    case error.TIMEOUT:
    // x.innerHTML = "The request to get user location timed out."
    // break;
    case error.UNKNOWN_ERROR:
    // x.innerHTML = "An unknown error occurred."
    // break;
  }
}
function playerLocation() {
  getLocation();
  let playerLocation = new google.maps.LatLng(latitude, longitude);
  return playerLocation;
}

// Updating the latitude and longitude every 20sec
setInterval(() => {
  getLocation();

}, 1000);

// Checks if person in zone and then updating the exposure level
setInterval(() => {
  let seconds;
  let values = [];
  let execute;

  Object.values(circles).forEach((circle) => {
    let booleanValue = checkIfInZone(circle);
    values.push(booleanValue);
  });

  for (let i = 0; i < values.length; i++) {
    if (values[i] == true) {
      execute = true;
      break;
    }
  }

  if (execute) {
    // play();
    controlGeigerMeter(execute);

    if (getFromSession("exposureLevel") === null) {
      seconds = 0;
    } else {
      seconds = getFromSession("exposureLevel")
    }

    function incrementSeconds() {
      seconds += 1;
      exposed.innerText = seconds;
      saveToSession("exposureLevel", seconds);
    }

    incrementSeconds();

    values = [];
  } else {
    console.log(false);

    if (meter.classList.contains("mid")) {
      meter.classList.remove('mid');
      meter.classList.add('low');
      meter.style.animation = "meter 1s infinite alternate";

    } else if (meter.classList.contains("high")) {
      meter.classList.remove('high');
      meter.classList.add('low');
      meter.style.animation = "meter 1s infinite alternate";

    }
    values = [];
  }
}, 1000);

function updateExposureLevel(parameter) {

  if (getFromSession("exposureLevel") === null) {
    var seconds = 0;
  } else {
    var seconds = getFromSession("exposureLevel")
  }

  function incrementSeconds() {
    seconds += 1;
    exposed.innerText = seconds;
  }

  var cancel = setInterval(incrementSeconds, 1000);

  if (!parameter) {
    saveToSession("exposureLevel", seconds);
    clearInterval(cancel);
  }
}

// Creates the map
async function initMap() {

  // The map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 55.61045267448197, lng: 12.994294825044932 },
    restriction: {
      latLngBounds: GAME_BOUNDS,
      strictBounds: false
    },
    zoom: 14.75,
    mapId: "1e40c73b7572b645"
  });


  let spotsFirst = teams.find(team => team.teamID == user.teamID).phaseOne;
  let spotsSecond = teams.find(team => team.teamID == user.teamID).phaseTwo;
  let spotsThird = teams.find(team => team.teamID == user.teamID).phaseThree;
  let spotsFourth = teams.find(team => team.teamID == user.teamID).phaseFour;

  publishSpots(spotsFirst);

  let users = await getUsers();
  let userFromServer = users.find((u) => u.userID == user.userID);

  let solvedLocation = userFromServer.locationAchieved.length;
  if (solvedLocation >= 1 & solvedLocation <= 3) {
    publishSpots(spotsSecond);
  } else if (solvedLocation >= 4 && solvedLocation <= 6) {
    publishSpots(spotsSecond);
    publishSpots(spotsThird);
  } else if (solvedLocation >= 7) {
    publishSpots(spotsSecond);
    publishSpots(spotsThird);
    publishSpots(spotsFourth);
  }
}

// function playerSpot(lat, lng) {

//   let loc = new google.maps.LatLng(lat, lng);

//   let circle = new google.maps.Circle({
//     strokeColor: "#000000",
//     strokeOpacity: 0.5,
//     strokeWeight: 2,
//     fillColor: "#00FF01",
//     fillOpacity: 0.19,
//     map: map,
//     center: loc,
//     radius: 20
//   });
// }

// Creates the circles and markers / Argument that is sent to the parameter is the locationID
function createSpot(spot) {
  let svgMarker;
  // Marker Icon
  if (user["locationAchieved"].includes(spot.locationID)) {

    // Marker Icon
    svgMarker = {
      path: "M25.2,8.4c0-0.4,0-0.8,0-1.2c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.3-0.1-0.4C25,6.3,25,6.2,24.9,6c-0.1-0.4-0.2-0.9-0.4-1.3l0,0c-0.3-0.4-0.7-0.5-0.9-0.9c-0.1-0.2-0.1-0.4-0.2-0.6C23.3,3,23,2.9,22.8,2.8c-1.4-0.4-3-0.1-4,0.9c-0.2,0.2-0.5,0.5-0.8,0.6c-0.5,0.2-1.1,0-1.5-0.4c-0.4-0.4-0.6-0.9-0.9-1.4c-0.3-0.5-0.7-0.9-1.2-1.1c-0.7-0.2-1.5,0.2-1.8,0.9c-0.2,0.6,0.1,1.3,0.3,1.8c0.2,0.6,0.4,1.3,0.1,1.8c-0.2,0.4-0.7,0.7-1.2,0.7c-0.5,0.1-1,0-1.5-0.1c-0.2,0-0.4-0.1-0.5-0.2C9.6,6.2,9.5,6,9.5,5.7c0-0.3,0.1-0.5,0.1-0.8C9.6,4.4,9.4,4,9,3.6C8.5,3.5,8,3.8,7.7,4.2c0,0,0,0,0,0.1C7.2,5.2,7,6.1,6.9,7.1c0,0,0,0.1,0,0.1c0,0.4,0,0.8,0,1.2v0.2c0,0.1,0,0.3,0,0.4c0,5,7.8,9.4,7.8,20.2v0c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0.1,0.3c0.1,0.2,0.2,0.3,0.3,0.5c0.2,0.2,0.6,0.4,1,0.4s0.7-0.2,1-0.4c0.1-0.1,0.2-0.3,0.3-0.5c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2,0-0.3v0c0-9.6,6.1-14.1,7.5-18.5c0.2-0.5,0.3-1.1,0.3-1.7C25.2,8.9,25.2,8.6,25.2,8.4z M16,13.4c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4C18.4,12.3,17.3,13.4,16,13.4z",
      fillColor: "#404040",
      fillColor: "#404040",
      fillColor: "#404040",
      fillOpacity: 0.6,
      anchor: new google.maps.Point(16, 30),
    };
  } else {
    // Marker Icon
    svgMarker = {
      path: "M25.2,8.4c0-0.4,0-0.8,0-1.2c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.3-0.1-0.4C25,6.3,25,6.2,24.9,6c-0.1-0.4-0.2-0.9-0.4-1.3l0,0c-0.3-0.4-0.7-0.5-0.9-0.9c-0.1-0.2-0.1-0.4-0.2-0.6C23.3,3,23,2.9,22.8,2.8c-1.4-0.4-3-0.1-4,0.9c-0.2,0.2-0.5,0.5-0.8,0.6c-0.5,0.2-1.1,0-1.5-0.4c-0.4-0.4-0.6-0.9-0.9-1.4c-0.3-0.5-0.7-0.9-1.2-1.1c-0.7-0.2-1.5,0.2-1.8,0.9c-0.2,0.6,0.1,1.3,0.3,1.8c0.2,0.6,0.4,1.3,0.1,1.8c-0.2,0.4-0.7,0.7-1.2,0.7c-0.5,0.1-1,0-1.5-0.1c-0.2,0-0.4-0.1-0.5-0.2C9.6,6.2,9.5,6,9.5,5.7c0-0.3,0.1-0.5,0.1-0.8C9.6,4.4,9.4,4,9,3.6C8.5,3.5,8,3.8,7.7,4.2c0,0,0,0,0,0.1C7.2,5.2,7,6.1,6.9,7.1c0,0,0,0.1,0,0.1c0,0.4,0,0.8,0,1.2v0.2c0,0.1,0,0.3,0,0.4c0,5,7.8,9.4,7.8,20.2v0c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0.1,0.3c0.1,0.2,0.2,0.3,0.3,0.5c0.2,0.2,0.6,0.4,1,0.4s0.7-0.2,1-0.4c0.1-0.1,0.2-0.3,0.3-0.5c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2,0-0.3v0c0-9.6,6.1-14.1,7.5-18.5c0.2-0.5,0.3-1.1,0.3-1.7C25.2,8.9,25.2,8.6,25.2,8.4z M16,13.4c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4C18.4,12.3,17.3,13.4,16,13.4z",
      fillColor: "#00FF01",
      fillColor: "#00FF01",
      fillColor: "#00FF01",
      fillOpacity: 0.6,
      anchor: new google.maps.Point(16, 30),
    };
  }

  // Position for each position
  let loc = new google.maps.LatLng(spot.lat, spot.lng);

  // Marker for each position
  const marker = new google.maps.Marker({
    position: loc,
    icon: svgMarker,
    map: map
  });

  // Circle for each position
  let circle;
  if (user["locationAchieved"].includes(spot.locationID)) {
    // Circle for each position
    circle = new google.maps.Circle({
      strokeColor: "#404040",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#404040",
      fillOpacity: 0.19,
      map: map,
      center: loc,
      radius: spot.circleRadius
    });
  } else {
    // Circle for each position
    circle = new google.maps.Circle({
      strokeColor: "#00FF01",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#00FF01",
      fillOpacity: 0.19,
      map: map,
      center: loc,
      radius: spot.circleRadius
    });
  }

  circles[`circle${spot.locationID}`] = circle;
  console.log(circle);
  console.log(circles[`circle${spot.locationID}`]);

  // Pulse effect
  nextAssignment(circle, spot.circleRadius);

  // Click Event
  let booleanValue;
  google.maps.event.addListener(marker, 'click', function () {
    let message;
    booleanValue = checkIfInZone(circle);
    let zoneCleared = user["locationAchieved"].includes(spot.locationID);

    if (zoneCleared == false) {
      if (booleanValue) {
        message = "Grymt, var nu försiktig. Du har kommit in i ett ostabilt område. Håll koll på din Geigermätare. Du behöver nu skynda dig och lösa uppdraget. Se över dina notiser, de är oerhört betydande.";
      } else {
        message = "Jag ser att du ännu inte lyckats ta dig till platsen. Du kommer enbart kunna skriva koden när du är där.";
      }
      createMessageBox(message, booleanValue, spot, marker, circle, zoneCleared);
    } else {
      message = "You have already cleared the area!";
      booleanValue = false;
      createMessageBox(message, booleanValue, spot, marker, circle, zoneCleared);
    }
  });
}
// Publishing the spots / Array with locationIDs
function publishSpots(spotsArray) {
  spotsArray.forEach(spot => {
    locations.forEach(loc => {
      if (spot === loc.locationID) {

        createSpot(loc);
      }
    })
  })
}
// Pulse effect - next assignment / circle and radius 
function nextAssignment(circle, radiusBase) {
  let currentRadius = radiusBase;
  let rMin = currentRadius * 3 / 4;
  let rMax = currentRadius;
  let direction = 1;

  const circleInterval = setInterval(() => {
    var radius = circle.getRadius();

    if ((radius > rMax) || (radius < rMin)) {
      direction *= -1;
    }

    circle.radius = radius + direction * 2;
    circle.setOptions(circle);
  }, 100)

  setTimeout(() => {
    myStopFunction(circleInterval);
  }, 10000)

  function myStopFunction(interval) {
    clearInterval(interval);
  }
}
// Returns true/false if player in bad zone
function checkIfInZone(circle) {
  // Get players location
  // let playerLoc = playerLocation();
  // Gäddan
  let playerLoc = new google.maps.LatLng(55.60753, 12.98978);
  //orkanen
  // setTimeout(() => {
  //   playerLoc = new google.maps.LatLng(55.61079, 12.99538);
  // }, 20000);

  let loc = new google.maps.LatLng(playerLoc);

  return circle.getBounds().contains(loc);
}
// Creates a message box that appears when marker is being clicked
async function createMessageBox(message, booleanValue, spot, marker, circle, zoneCleared = true) {
  // Create Message box
  let codeBox = document.createElement("div");
  codeBox.classList.add("codeBox");

  let titleWrapper = document.createElement("div");
  titleWrapper.className = "titleWrapper";

  let title = document.createElement("h1");
  title.className = "title";
  title.innerHTML = spot.title;

  let bodyText = document.createElement("p");
  bodyText.className = "bodyText";
  bodyText.innerHTML = message;


  let closeButton = document.createElement("button");
  closeButton.className = "closeButton";
  closeButton.innerHTML = `<img src="../icons/x.png">`;

  closeButton.addEventListener("click", () => {
    codeBox.remove();
  });

  let teamsOnServer = await getTeams();
  let riddles = await getRiddles();
  let riddle = riddles.mainRiddles.find((riddle) => riddle.locationID == spot.locationID);


  // Fixa sifferkodsinmatning och vad som sker när det är rätt
  if (booleanValue) {

    // FIXA EN IF SATS FÖR ATT ENBART SKE NÄR DU TRYCKER FÖRSTA GÅNGEN!
    if (getFromSession(`location${riddle.locationID}OnGoing`) === null) {
      saveToSession(`location${riddle.locationID}OnGoing`, "true");

      setTimeout(() => {
        riddleNotification(true);
        diaryNotification(true);
      }, 2000);
    }

    //if riddlesSolved does not already includes riddle id 
    if (!user["riddlesSolved"].includes(riddle.riddleID)) {
      //Updates the user riddlesSolved 
      user["riddlesSolved"].push(riddle.riddleID);
      let change = {
        "userID": user.userID,
        "riddlesSolved": user["riddlesSolved"]
      }
      update(change);
    }

    //if diaryExcerpts does not already includes diary id 
    if (!user["diaryExcerpts"].includes(riddle.diaryid)) {
      //Updates the user riddlesSolved 
      user["diaryExcerpts"].push(riddle.diaryid);
      let change = {
        "userID": user.userID,
        "diaryExcerpts": user["diaryExcerpts"]
      }
      update(change);

    }

    let form = document.createElement("form");
    form.setAttribute("id", "answer");
    form.setAttribute("method", "POST");

    for (let i = 0; i < riddle.correctAnswer.toString().length; i++) {
      let input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("name", `${i}`);
      input.setAttribute("id", `number${i}`);
      input.className = "number bodyText";
      form.append(input);
    }

    let button = document.createElement("button");
    button.className = "button callToAction bodyText";
    button.innerHTML = "skicka"
    form.append(button);
    codeBox.append(form);

    // Submit Answer        
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let answer;

      for (let i = 0; i < riddle.correctAnswer.toString().length; i++) {

        const number = riddle.correctAnswer.toString()[i];
        if (number != document.querySelector(`#number${i}`).value) {
          answer = false;
          break;
        } else {
          answer = true;
        }
      }

      if (answer) {
        // When you enter the right code

        // Make the spot unavaible and grey - USE SPOT
        // Notification Send them part 2 of the diarypost
        diaryNotification(true);

        closeButton.remove();
        form.remove();
        bodyText.innerHTML = "<p>Snyggt jobbat! Jag visste väl att jag kunde anförtro mig till dig. Du visar på otroliga egenskaper jag önskade jag hade.</p>";
        setTimeout(() => {
          codeBox.remove();
        }, 5000);

        //Creates responsebox when location achieved
        function createResponseBox() {
          let responseBox = createContainerBox("responseBox");
          let responseIcon = document.createElement("img");

          let usersTeam = teams.find(team => team.teamID = user.teamID);
          responseIcon.setAttribute("src", usersTeam["avatar"]);

          responseIcon.addEventListener("click", () => {
            responseBox.classList.add("bigger");
            responseBox.innerHTML = "";
            console.log(riddle["response"])
            responseBox.innerHTML = `
            <div class="innerResponseBox">
              <h2 class="title">Team ${usersTeam["teamName"]}</h2>
              <p class="bodyText">${riddle["response"][`${usersTeam["name"]}`].toLowerCase()}</p>
              <p class="bodyText">- ${usersTeam["name"]}</p>
            </div> 
            `;

            let closeResponseBoxButton = document.createElement("button");
            closeResponseBoxButton.className = "closeResponseBoxButton button callToAction bodyText";
            closeResponseBoxButton.innerHTML = `<img src="icons/x.png">`;

            closeResponseBoxButton.addEventListener("click", () => {
              responseBox.remove();
            })
            responseBox.append(closeResponseBoxButton);
          });

          responseBox.append(responseIcon);
          document.body.append(responseBox);
        }
        createResponseBox();

        //Deletes the old marker to create a new one with gray color
        function reCreateMarker() {
          //Gets positions of the marker inside the clicked area
          let clickedMarkerLat = marker.position.lat();
          let clickedMarkerLng = marker.position.lng();

          //Deletes the marker
          marker.setMap(null);

          //New svg marker for cleared area - solved riddle
          const clearedSvgMarker = {
            path: "M25.2,8.4c0-0.4,0-0.8,0-1.2c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.3-0.1-0.4C25,6.3,25,6.2,24.9,6c-0.1-0.4-0.2-0.9-0.4-1.3l0,0c-0.3-0.4-0.7-0.5-0.9-0.9c-0.1-0.2-0.1-0.4-0.2-0.6C23.3,3,23,2.9,22.8,2.8c-1.4-0.4-3-0.1-4,0.9c-0.2,0.2-0.5,0.5-0.8,0.6c-0.5,0.2-1.1,0-1.5-0.4c-0.4-0.4-0.6-0.9-0.9-1.4c-0.3-0.5-0.7-0.9-1.2-1.1c-0.7-0.2-1.5,0.2-1.8,0.9c-0.2,0.6,0.1,1.3,0.3,1.8c0.2,0.6,0.4,1.3,0.1,1.8c-0.2,0.4-0.7,0.7-1.2,0.7c-0.5,0.1-1,0-1.5-0.1c-0.2,0-0.4-0.1-0.5-0.2C9.6,6.2,9.5,6,9.5,5.7c0-0.3,0.1-0.5,0.1-0.8C9.6,4.4,9.4,4,9,3.6C8.5,3.5,8,3.8,7.7,4.2c0,0,0,0,0,0.1C7.2,5.2,7,6.1,6.9,7.1c0,0,0,0.1,0,0.1c0,0.4,0,0.8,0,1.2v0.2c0,0.1,0,0.3,0,0.4c0,5,7.8,9.4,7.8,20.2v0c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0.1,0.3c0.1,0.2,0.2,0.3,0.3,0.5c0.2,0.2,0.6,0.4,1,0.4s0.7-0.2,1-0.4c0.1-0.1,0.2-0.3,0.3-0.5c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2,0-0.3v0c0-9.6,6.1-14.1,7.5-18.5c0.2-0.5,0.3-1.1,0.3-1.7C25.2,8.9,25.2,8.6,25.2,8.4z M16,13.4c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4C18.4,12.3,17.3,13.4,16,13.4z",
            fillColor: "#404040",
            fillColor: "#404040",
            fillColor: "#404040",
            fillOpacity: 1,
            anchor: new google.maps.Point(16, 30),
          };

          //Creates a new marker
          const newMarker = new google.maps.Marker({
            position: { lat: clickedMarkerLat, lng: clickedMarkerLng },
            icon: clearedSvgMarker,
            map: map
          });

          // Adds new click event
          google.maps.event.addListener(newMarker, 'click', function () {
            let message = "You have already cleared the area!";
            booleanValue = false;
            createMessageBox(message, booleanValue, spot);
          });
        }
        reCreateMarker();

        //Updates the circle
        //Changes the color of circle to dark gray (#404040)
        function updateCirle() {
          const circleOptions = {
            strokeColor: "#404040",
            fillColor: "#404040"
          }
          circle.setOptions(circleOptions);
        }
        updateCirle();


        // UPDATES SOLVED RIDDLE & RELEASES THE PHASES
        let preRiddle = null;
        if (riddle.relatedPreRiddles.length != 0) {
          preRiddle = riddle.relatedPreRiddles[0];
        }

        async function updateUserProcess(riddle) {
          let users = await getUsers();

          let userFromServer = users.find((u) => u.userID == user.userID);

          if (!userFromServer.riddlesSolved.includes(riddle.riddleID)) {
            //Updates the user riddlesSolved 
            userFromServer.riddlesSolved.push(riddle.riddleID);
          }

          userFromServer.preRiddlesSolved.push(preRiddle);
          userFromServer.locationAchieved.push(riddle.locationID);

          let change = {
            "userID": userFromServer.userID,
            "preRiddlesSolved": userFromServer.preRiddlesSolved,
            "riddlesSolved": userFromServer.riddlesSolved,
            "locationAchieved": userFromServer.locationAchieved
          };

          update(change);

          let spotsSecond = teams.find(team => team.teamID = user.teamID).phaseTwo;
          let spotsThird = teams.find(team => team.teamID = user.teamID).phaseThree;
          let spotsFourth = teams.find(team => team.teamID = user.teamID).phaseFour;

          if (userFromServer.locationAchieved.length == 1) {
            publishSpots(spotsSecond);
          } else if (userFromServer.locationAchieved.length == 4) {
            publishSpots(spotsThird);
          } else if (userFromServer.locationAchieved.length == 7) {
            publishSpots(spotsFourth);
          }
        }

        updateUserProcess(riddle);

        //If the last riddle solved
        if(riddle.riddleID == 8){

          let nonWinnerYet = true;

          //Controls if the any team has already won
          teamsOnServer.forEach(team => {
            if(team.wins == true){
              nonWinnerYet = false;
            }
          });

          //Controls if the users team key "wins" is true
          if(nonWinnerYet){
            let changeOnTeam = {
              "userID": user["userID"],
              "teamID": user["teamID"]
            }
            update(changeOnTeam);

            createWinLoseBox("win", );
          }
        }

        // PLAYER WILL GET A MESSAGE/SHORT NOTIFICATION

      } else {
        // When you enter the wrong code - it gives out a shake
        codeBox.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both";
        setTimeout(() => {
          codeBox.style.animation = "pulse 3s infinite";
        }, 1000);
      }

    });
  } else {
    if (zoneCleared == false) {
      // Updates the user riddlesSolved 
      user["riddlesSolved"].forEach(riddleId => {
        locations.forEach(location => {
          if (location.locationID == spot.locationID) {
            if (riddleId == location.diaryID) {
              let index = user["riddlesSolved"].indexOf(riddleId);
              user["riddlesSolved"].splice(index, 1);
            };
          };
        });
      });

      let change = {
        "userID": user.userID,
        "riddlesSolved": user["riddlesSolved"]
      }
      update(change);
    }
  }


  titleWrapper.append(title, closeButton);
  codeBox.prepend(titleWrapper, bodyText);
  document.body.append(codeBox);
}

function diaryNotification(boolean) {
  let notificationIMG = document.querySelector("#diary_icon > img");
  if (boolean) {
    notificationIMG.setAttribute("src", "../icons/diary_icon_notification.svg");
  } else {
    notificationIMG.setAttribute("src", "../icons/diary_icon.svg");
  }

}

function riddleNotification(boolean) {
  let notificationIMG = document.querySelector("#riddles_icon > img");
  if (boolean) {
    notificationIMG.setAttribute("src", "../icons/riddle_icon_notification.svg");
  } else {
    notificationIMG.setAttribute("src", "../icons/riddle_icon.svg");
  }
}

// Creates Diaries view on click
document.getElementById("diary_icon").addEventListener("click", createDiaryView);

// Creates Riddles view on click
document.getElementById("riddles_icon").addEventListener("click", createRiddlesView);


//FUNCTIONS - DIARY and RIDDLES
//MAIN FUNCTIONS (DIARY and RIDDLES)
//Creates Diaries view
function createDiaryView() {

  setTimeout(() => {
    diaryNotification(false);
  }, 2000);

  //Creates div element for the Diary Excerpts
  let diaryBox = createContainerBox("diaryBox", "Dagboksutdrag");

  //För every excerpt
  forEachDiary(diaryBox);

  //Creates a close button
  createCloseButton(diaryBox);
}
//Creates Riddles view
function createRiddlesView() {

  setTimeout(() => {
    riddleNotification(false);
  }, 2000);

  //Creates the main riddles container
  let riddlesContainer = createContainerBox("riddlesContainer", "Uppdrag");

  //Creates the container for riddleboxes
  let riddlesBoxes = createContainerBox("riddlesBoxes");

  //For every riddle 
  forEachRiddle(riddlesContainer, riddlesBoxes);

  //Appends the riddlesboxes in the main riddles container  for all riddles
  riddlesContainer.append(riddlesBoxes);

  //Creates a close button
  createCloseButton(riddlesContainer);
}
//INNER FUNCTIONS FOR DIARY AND RIDDLES VIEWS
//Creates and returns a div element (and a title if argument sended)
function createContainerBox(theBoxName, titleOfBox) {
  let className = theBoxName.toString();
  theBoxName = document.createElement("div");
  theBoxName.classList.add(className);

  if (titleOfBox !== undefined) {
    theBoxName.innerHTML = `
    <h1 class="middleTitle">${titleOfBox}</h1>
  `;

    setTimeout(() => {
      theBoxName.classList.add("up");
    }, 100);
  }
  return theBoxName;
}
//Foreach diary creates diary excerpts
async function forEachDiary(containerBox) {
  let users = await getUsers();
  let userFromServer = users.find((u) => u.userID == user.userID);

  diary.forEach(excerpt => {


    //Creates a excerpt box for every excerpts received for inlogged user
    if (userFromServer.diaryExcerpts.includes(excerpt.id)) {

      //Creates the excerpt container
      let excerptBox = createContainerBox("excerptBox");

      //Date and Time
      excerptBox.innerHTML = `
            <p class="date_time"> ${excerpt.date} - ${excerpt.time}</p>
          `;

      //Creates an img element If excerpt has one
      if (excerpt.img !== null && excerpt.img !== "") {
        excerptBox.innerHTML += `
              <img src="../images/${excerpt.img}.png" class="excerptImg">
          `;
      }

      //Body text and page number
      //Body text and page number
      if (!userFromServer["locationAchieved"].includes(excerpt.locationID)) {
        excerptBox.innerHTML += `
          <p class="excerptText">${excerpt.bodyText.start}</p>
        `;
      } else {
        excerptBox.innerHTML += `
        <p class="excerptText">${excerpt.bodyText.start}</p>
          <p class="excerptText">${excerpt.bodyText.end}</p>
        `;
      }
      excerptBox.innerHTML += `
        <p style="color:white; text-align:right;" class="excerptPage">s. ${excerpt.page}</p>
      `;
      containerBox.append(excerptBox);
    }

  });
}
//Foreach riddle creates a box and eventlisteners to the boxes
async function forEachRiddle(containerBox, innerContainerBox) {
  let riddles = await getRiddles();
  let users = await getUsers();
  let userFromServer = users.find((u) => u.userID == user.userID);

  riddles.mainRiddles.forEach(riddle => {
    //Creates a box
    let riddleBox = createContainerBox("riddleBox");

    //Checks if the inlogged user has unlocked the riddle
    if (userFromServer.riddlesSolved.includes(riddle.riddleID)) {
      if (userFromServer["locationAchieved"].includes(riddle.locationID)) {
        riddleBox.innerHTML = ` 
          <img src="../icons/checked.svg" class="riddleBoxImg"> 
        `;
        riddleBox.classList.add("solved");
      } else {
        riddleBox.innerHTML = ` 
          <img src="../icons/unlocked.svg" class="riddleBoxImg"> 
        `;
        riddleBox.classList.add("unlocked");
      }
    } else {
      riddleBox.innerHTML = ` 
            <img src="../icons/locked.svg" class="riddleBoxImg"> 
          `;
      riddleBox.classList.add("locked");
    }

    if (riddleBox.classList.contains("unlocked")) {
      riddleBox.addEventListener("click", () => {

        
        //Hides riddlesBoxes
        setTimeout(() => {
          document.querySelector(".riddlesContainer > h1").style.display = "none";
          document.querySelector(".riddlesBoxes").style.display = "none";
        }, 500);

        let preRiddlesSolvedByUser = true;

        //Controlls if user solved all preriddles
        function checkTheUserPreRiddlesSolved() {
          riddle.relatedPreRiddles.forEach(ridID => {
            if (!userFromServer["preRiddlesSolved"].includes(ridID)) {
              preRiddlesSolvedByUser = false;
            }
          })
        }
        checkTheUserPreRiddlesSolved(user["preRiddlesSolved"]);

        //If user does not solved all pre-riddles
        if (riddle.relatedPreRiddles.length > 0 && preRiddlesSolvedByUser == false) {
          let preRiddleBoxes = createContainerBox("preRiddleBoxes");

          //Creates info about preriddles if user did not take info before
          let infoAboutPreRiddles;
          if (getFromSession(`preRiddlesInfoTaken`) === null) {
            infoAboutPreRiddles = document.createElement("p");
            infoAboutPreRiddles.style.textAlign = "center";
            infoAboutPreRiddles.style.marginBottom = "10px";
            infoAboutPreRiddles.style.fontSize = "14px";
            infoAboutPreRiddles.innerText = "Du måste lösa dessa uppdrag innan du kan skriva in den slutgiltiga koden och röra dig vidare.";
            containerBox.append(infoAboutPreRiddles);
            saveToSession(`preRiddlesInfoTaken`, "true");
          }

          setTimeout(() => {
            document.querySelector(".riddlesContainer > h1").style.display = "inherit";
            document.querySelector(".riddlesContainer > h1").innerText = "Förberedande";
            preRiddleBoxes.classList.add("opacity");
          }, 500);

          //For every preRiddle 
          riddle.relatedPreRiddles.forEach(preRiddleID => {
            //The finds the clicked preRiddle
            let preRiddle = riddles.preRiddles.find(preRidd => preRidd.riddleID == preRiddleID);

            let preRiddleBox = createContainerBox("preRiddleBox");

            if (userFromServer.preRiddlesSolved.includes(preRiddle.riddleID)) {
              preRiddleBox.innerHTML = ` 
                <img src="../icons/unlocked.svg" class="riddleBoxImg"> 
              `;
              preRiddleBox.classList.add("solved");
            } else {
              preRiddleBox.innerHTML = ` 
                <img src="../icons/unlocked.svg" class="riddleBoxImg"> 
              `;
              preRiddleBox.classList.add("unlocked");
            }

            //Click on preRiddles that does not solved yet
            if (preRiddleBox.classList.contains("unlocked")) {
              //On click to preRiddleBox
              preRiddleBox.addEventListener("click", function createPreRiddleBox() {

                setTimeout(() => {
                  document.querySelector(".riddlesContainer > h1").style.display = "none";
                  preRiddleBoxes.style.display = "none";
                  backBtnUnlockedRiddle.style.display = "none";

                  if (infoAboutPreRiddles) {
                    infoAboutPreRiddles.remove();
                  }
                }, 500);

                let unlockedPreRiddleBox = createContainerBox("unlockedPreRiddleBox");
                setTimeout(() => {
                  unlockedPreRiddleBox.classList.add("opacity");
                }, 500);

                unlockedPreRiddleBox.innerHTML += `
                    <h2 class="middleTitle">${preRiddle.riddle}</h2>
                `;

                //Controls if the preRiddle has an img or not
                if (preRiddle.img !== "" || preRiddle.img !== null) {
                  unlockedPreRiddleBox.innerHTML += `
                    <img src="${preRiddle.img}.png" class="riddleImg">
                  `;
                }


                //Creates a form for preRiddle
                let preRiddleform;
                function createPreRiddleForm() {
                  preRiddleform = document.createElement("form");
                  preRiddleform.setAttribute("id", "preRiddleAnswer");
                  preRiddleform.setAttribute("method", "POST");

                  for (let i = 0; i < preRiddle.correctAnswer.toString().length; i++) {
                    let input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("name", `${i}`);
                    input.setAttribute("id", `number${i}`);
                    input.className = "number bodyText";
                    preRiddleform.append(input);
                  }

                  let preRiddleSubmitButton = document.createElement("button");
                  preRiddleSubmitButton.className = "button callToAction bodyText";
                  preRiddleSubmitButton.innerHTML = "Skicka";
                  preRiddleform.append(preRiddleSubmitButton);
                  unlockedPreRiddleBox.append(preRiddleform);

                  // Submit preRiddle Answer        
                  preRiddleform.addEventListener("submit", (event) => {
                    event.preventDefault();
                    let preRiddleAnswer;

                    for (let i = 0; i < preRiddle.correctAnswer.toString().length; i++) {
                      const numberPreRiddleForm = preRiddle.correctAnswer.toString()[i];
                      if (numberPreRiddleForm != document.querySelector(`#number${i}`).value) {
                        preRiddleAnswer = false;
                        break;
                      } else {
                        preRiddleAnswer = true;
                      }
                    }

                    //If given answer is true
                    if (preRiddleAnswer) {

                      //Adds the id of preRiddle if user does not already contains the id of the solved preriddle 
                      if (!userFromServer["preRiddlesSolved"].includes(preRiddle.riddleID)) {
                        userFromServer["preRiddlesSolved"].push(preRiddle.riddleID);
                      }

                      //Updates the user
                      let change = {
                        "userID": userFromServer["userID"],
                        "preRiddlesSolved": userFromServer.preRiddlesSolved
                      }
                      update(change);

                      unlockedPreRiddleBox.classList.remove("opacity");

                      setTimeout(() => {
                        unlockedPreRiddleBox.style.height = "85%";
                        unlockedPreRiddleBox.innerHTML = `
                          <h1>Bra jobbat!</h1> 
                          <p>Du har nu löst en del av uppdraget, se över nästa uppgift för koppla ner hela platsen.</p>
                        `;

                        // //Call the function to check if user solved other preriddles to
                        // checkTheUserPreRiddlesSolved();

                        // //If user solved others preriddles also
                        //   if(userPreRiddlesSolved == true){
                        //     unlockedPreRiddleBox.innerHTML += `
                        //       <p>Well done! You have now solved all Pre-riddles and will unlock the Main riddle!</p>
                        //     `;
                        //   }else{
                        //     unlockedPreRiddleBox.innerHTML += `
                        //       <p>Pre-riddle solved, Solve the other Pre-riddles to unlock the Main riddle!</p>
                        //     `;
                        //   }

                        unlockedPreRiddleBox.classList.add("opacity");
                        closeBtnUnlockedPreRiddle.remove();
                      }, 500);

                      setTimeout(() => {
                        //Removes created unlockbox for preriddle
                        unlockedPreRiddleBox.remove();
                        //Click to close button on the preriddleunlocked box to move
                        closeBtnUnlockedPreRiddle.click();
                        //Removes event listener on preRiddleBox
                        preRiddleBox.removeEventListener("click", createPreRiddleBox);
                        //Replaces class unlocked with solved to change color on box
                        preRiddleBox.classList.replace("unlocked", "solved");
                      }, 2000);
                    } else {

                      unlockedPreRiddleBox.classList.remove("opacity");

                      setTimeout(() => {
                        unlockedPreRiddleBox.style.height = "85%";
                        unlockedPreRiddleBox.innerHTML = `
                          <h1 style="color:red;">Wrong Answer!</h1> 
                          <p  style="color:red;">Try again!</p>
                        `;
                        unlockedPreRiddleBox.classList.add("opacity");
                        closeBtnUnlockedPreRiddle.style.display = "none";
                      }, 500);

                      setTimeout(() => {
                        unlockedPreRiddleBox.remove();
                        closeBtnUnlockedPreRiddle.click();
                      }, 2000);

                    }

                  });
                }
                createPreRiddleForm();

                //Creates close button for UnlockedPreRiddleBox button
                let closeBtnUnlockedPreRiddle;
                function createCloseBtnUnlockedPreRiddle() {
                  closeBtnUnlockedPreRiddle = document.createElement("button");
                  closeBtnUnlockedPreRiddle.className = "closeBtnUnlockedPreRiddle button callToAction";

                  setTimeout(() => {
                    closeBtnUnlockedPreRiddle.classList.add("opacity");
                  }, 1000);

                  closeBtnUnlockedPreRiddle.innerHTML = `<img src="icons/x.png">`;

                  closeBtnUnlockedPreRiddle.addEventListener("click", () => {

                    unlockedPreRiddleBox.classList.remove("opacity");
                    closeBtnUnlockedPreRiddle.classList.remove("opacity");

                    setTimeout(() => {
                      document.querySelector(".riddlesContainer > h1").style.display = "";
                      preRiddleBoxes.style.display = "";
                      backBtnUnlockedRiddle.style.display = "";
                    }, 600);

                    setTimeout(() => {
                      unlockedPreRiddleBox.remove();
                      closeBtnUnlockedPreRiddle.remove();
                    }, 750);
                  });
                  containerBox.append(closeBtnUnlockedPreRiddle);
                }
                createCloseBtnUnlockedPreRiddle();

                containerBox.append(unlockedPreRiddleBox);
              });
            }

            preRiddleBoxes.append(preRiddleBox);
          });

          let backBtnUnlockedRiddle;
          //Creates close preUnlockedRiddleBox button
          function createBackBtnUnlockedRiddle() {
            backBtnUnlockedRiddle = document.createElement("button");
            backBtnUnlockedRiddle.className = "backBtnUnlockedRiddle button callToAction";

            setTimeout(() => {
              backBtnUnlockedRiddle.classList.add("opacity");
            }, 1000);

            backBtnUnlockedRiddle.innerHTML = `<img src="icons/arrow_down.png">`;

            backBtnUnlockedRiddle.addEventListener("click", () => {

              preRiddleBoxes.classList.remove("opacity");
              backBtnUnlockedRiddle.classList.remove("opacity");

              if (infoAboutPreRiddles) {
                infoAboutPreRiddles.remove();
              }

              setTimeout(() => {
                document.querySelector(".riddlesContainer > h1").style.display = "";
                document.querySelector(".riddlesContainer > h1").innerText = "Riddles";
                document.querySelector(".riddlesBoxes").style.display = "";
              }, 600);

              setTimeout(() => {
                preRiddleBoxes.remove();
                backBtnUnlockedRiddle.remove();
              }, 750);
            })
            containerBox.append(backBtnUnlockedRiddle);
          }
          createBackBtnUnlockedRiddle();

          containerBox.append(preRiddleBoxes);

        } else {

          let unlockedRiddleBox = createContainerBox("unlockedRiddleBox");
          setTimeout(() => {
            unlockedRiddleBox.classList.add("opacity");
          }, 500);

          if (riddle.img !== "" || riddle.img !== null) {
            unlockedRiddleBox.innerHTML += `
                <img src="${riddle.img}.png" class="riddleImg">
              `;

            unlockedRiddleBox.innerHTML += `
                <h2>${riddle.riddle}</h2>
              `;

            //Creates close riddleBox button
            let closeBtnUnlockedRiddle;
            function createCloseBtnUnlockedRiddle() {
              closeBtnUnlockedRiddle = document.createElement("button");
              closeBtnUnlockedRiddle.className = "closeBtnUnlockedRiddle button callToAction";

              setTimeout(() => {
                closeBtnUnlockedRiddle.classList.add("opacity");
              }, 1000);

              closeBtnUnlockedRiddle.innerHTML = `<img src="icons/x.png">`;


              closeBtnUnlockedRiddle.addEventListener("click", () => {

                unlockedRiddleBox.classList.remove("opacity");
                closeBtnUnlockedRiddle.classList.remove("opacity");

                setTimeout(() => {
                  document.querySelector(".riddlesContainer > h1").style.display = "";
                  document.querySelector(".riddlesBoxes").style.display = "";
                }, 600);

                setTimeout(() => {
                  unlockedRiddleBox.remove();
                  closeBtnUnlockedRiddle.remove();
                }, 750);
              })
              containerBox.append(closeBtnUnlockedRiddle);
            }
            createCloseBtnUnlockedRiddle();

          }
          containerBox.append(unlockedRiddleBox);
        }

      })
    }
    //Appends the box inte riddlesboxes container
    innerContainerBox.append(riddleBox);
  });
}
//Creates a close button and appends it in the argument sended
function createCloseButton(contianerBox) {
  let closeBtn = document.createElement("button");
  closeBtn.className = "closeBtn button callToAction";

  setTimeout(() => {
    closeBtn.classList.add("opacity");
  }, 750);

  closeBtn.innerHTML = `<img src="../icons/arrow_down.png">`;

  closeBtn.addEventListener("click", () => {
    if (document.querySelector(".closeBtnUnlockedRiddle")) {
      document.querySelector(".closeBtnUnlockedRiddle").remove();
    }
    contianerBox.classList.remove("up");
    closeBtn.remove();

    setTimeout(() => {
      contianerBox.remove();
    }, 750);
  })

  contianerBox.append(closeBtn);
  document.body.append(contianerBox);
}

//Creates a winner box if users team has won completed all 
function createWinLoseBox(arg) {
    let usersTeam = teams.find(team => team.teamID = user.teamID);

    let responseBox = createContainerBox("responseBox");
    responseBox.classList.add("winnerBox");
    
    responseBox.style.background = "unset";
    responseBox.style.border = "unset";
    responseBox.style.left = "unset";
    responseBox.style.right = "3%";

    let attentionIcon = document.createElement("img");
    attentionIcon.setAttribute("src", "icons/attention.svg");

    let winnerTeam;
    let loserTeam;

      attentionIcon.addEventListener("click", () => {
        
        responseBox.classList.add("bigger");
        responseBox.innerHTML = "";
        if(arg == "win"){

          if(usersTeam.teamID == 1){
            winnerTeam = "Vishnu";
            loserTeam = "Shiva";
          }else{
            winnerTeam = "Shiva";
            loserTeam = "Vishnu";
          }
          responseBox.innerHTML = `
            <div class="innerResponseBox">
              <h2>Grupp ${usersTeam["name"]}</h2>
              <p>GRATTIS! Bra kämpat lag ${winnerTeam}. Ni lyckades genomföra alla uppgifter före 
              lag ${loserTeam} och makten är därför nu i era händer. Detta innebär att ni nu besitter 
              maken att bestämma vad ni vill göra med receptet. Vill ni använda det eller vill ni förstöra det? 
              Valet är ert.</p>
              <p>- ${usersTeam["name"]}</p>
            </div> 
          `;
        }else{

          if(usersTeam.teamID == 1){
            winnerTeam = "Vishnu";
            loserTeam = "Shiva";
          }else{
            winnerTeam = "Shiva";
            loserTeam = "Vishnu";
          }

          responseBox.innerHTML = `
            <div class="innerResponseBox">
              <h2>Grupp ${usersTeam["name"]}</h2>
              <p>SORRY! Lag ${winnerTeam} lyckades genomföra alla uppgifter före 
              lag ${loserTeam} och makten är därför nu i deras händer.</p>
              <p>- ${usersTeam["name"]}</p>
            </div> 
          `;
        }
      
        let closeWinBoxButton = document.createElement("button");
        closeWinBoxButton.classList.add("closeResponseBoxButton");
        closeWinBoxButton.innerHTML = "X";
  
        closeWinBoxButton.addEventListener("click", () => {
          responseBox.remove();
        })
        responseBox.append(closeWinBoxButton);
      });

    responseBox.append(attentionIcon);
    document.body.append(responseBox);
}

// 
function controlGeigerMeter(parameter) {

  if (parameter) { //Om man är innanför området
    meter.classList.remove('low');
    meter.classList.add('mid');

    meter.style.animation = "meterMid .5s infinite alternate";
    //Efter en stund i området, aktivera high
    setTimeout(() => {
      meter.classList.remove('mid');
      meter.classList.add('high');


      meter.style.animation = "meterHigh .3s infinite alternate";
    }, 5 * 60 * 1000)
  }
}

// function play() {
//   var audio = document.getElementById("audio");
//   audio.play();
// }