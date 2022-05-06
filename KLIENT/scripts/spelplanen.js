"use strict";

let latitude, longitude, currentPositionOfPlayer, playerInCircle, user;
let map;
const MALMO_BOUNDS = {
  north: 55.639951,
  south: 55.500386,
  west: 12.8811839,
  east: 13.1507609,
};

// set the logged in user in a key
async function setUserVariable(){
  let users = await getUsers();
  console.log(users)
  user = users.find((u) => u.userID == getFromSession("user").userID);
}

setUserVariable();


// Checks if user is logged in / otherwise sends them to first place
if (getFromSession("user") === null) {
  window.location.replace("http://localhost:8000/php/index.php");
};

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

// PAge three, also sets the user to user.
function pageThree(info, button, user) {

  // The wrapper
  let page = document.createElement("div");
  page.setAttribute("id", "thirdPhase")

  let title = document.createElement("h1");
  title.innerHTML = info.headlines.pageThree.title + ` ${user.username}!`;
  title.className = info.classes.title;
  title.setAttribute("data-text", info.headlines.pageThree.title + ` ${user.username}!`);


  let bodyText = document.createElement("p");
  bodyText.innerHTML = info.headlines.pageThree.bodyText;
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
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

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
}, 20000);

// Creates the map
function initMap() {

  // The map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 55.604980, lng: 13.003822 },
    restriction: {
      latLngBounds: MALMO_BOUNDS,
      strictBounds: false,
    },
    zoom: 13,
    mapId: "1e40c73b7572b645"
  });


  // How to release the spots
  let spotsFirst = teams.find(team => team.teamID = user.teamID).phaseOne;
  let spotsSecond = teams.find(team => team.teamID = user.teamID).phaseTwo;
  let spotsThird = teams.find(team => team.teamID = user.teamID).phaseThree;
  let spotsFourth = teams.find(team => team.teamID = user.teamID).phaseFour;

  publishSpots(spotsFirst);

  setTimeout(() => {
    publishSpots(spotsSecond);
  }, 10000)
  setTimeout(() => {
    publishSpots(spotsThird);
  }, 20000)
  setTimeout(() => {
    publishSpots(spotsFourth);
  }, 30000);

  // //Updates the position of player
  // setInterval(() => {
  //   //Deletes the latest position marker from map
  //   locPlayer.setMap(null);

  //   //Gets new location
  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  //   //Updates the lat and lang
  //   currentPositionOfPlayer = new google.maps.LatLng(latitude, longitude);

  //   //Creates new marker for the current position
  //   locPlayer = new google.maps.Marker({
  //     position: currentPositionOfPlayer,
  //     map: map,
  //   });

  //   //Controls if player in the circle
  //   playerInCircle = circleFour.getBounds().contains(locPlayer.getPosition());
  //   console.log(locPlayer.getPosition());

  // }, 20000);


  // // Check if in spot
  // console.log(circleFour.getBounds().contains(locfour.getPosition()));
  // console.log(circleFour.getBounds().contains(locfive.getPosition()));

}
// Creates the circles and markers / Argument that is sent to the parameter is the locationID
function createSpot(spot) {

  // Marker Icon
  const svgMarker = {
    path: "M25.2,8.4c0-0.4,0-0.8,0-1.2c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.3-0.1-0.4C25,6.3,25,6.2,24.9,6c-0.1-0.4-0.2-0.9-0.4-1.3l0,0c-0.3-0.4-0.7-0.5-0.9-0.9c-0.1-0.2-0.1-0.4-0.2-0.6C23.3,3,23,2.9,22.8,2.8c-1.4-0.4-3-0.1-4,0.9c-0.2,0.2-0.5,0.5-0.8,0.6c-0.5,0.2-1.1,0-1.5-0.4c-0.4-0.4-0.6-0.9-0.9-1.4c-0.3-0.5-0.7-0.9-1.2-1.1c-0.7-0.2-1.5,0.2-1.8,0.9c-0.2,0.6,0.1,1.3,0.3,1.8c0.2,0.6,0.4,1.3,0.1,1.8c-0.2,0.4-0.7,0.7-1.2,0.7c-0.5,0.1-1,0-1.5-0.1c-0.2,0-0.4-0.1-0.5-0.2C9.6,6.2,9.5,6,9.5,5.7c0-0.3,0.1-0.5,0.1-0.8C9.6,4.4,9.4,4,9,3.6C8.5,3.5,8,3.8,7.7,4.2c0,0,0,0,0,0.1C7.2,5.2,7,6.1,6.9,7.1c0,0,0,0.1,0,0.1c0,0.4,0,0.8,0,1.2v0.2c0,0.1,0,0.3,0,0.4c0,5,7.8,9.4,7.8,20.2v0c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0.1,0.3c0.1,0.2,0.2,0.3,0.3,0.5c0.2,0.2,0.6,0.4,1,0.4s0.7-0.2,1-0.4c0.1-0.1,0.2-0.3,0.3-0.5c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2,0-0.3v0c0-9.6,6.1-14.1,7.5-18.5c0.2-0.5,0.3-1.1,0.3-1.7C25.2,8.9,25.2,8.6,25.2,8.4z M16,13.4c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4C18.4,12.3,17.3,13.4,16,13.4z",
    fillColor: "#00FF01",
    fillColor: "#00FF01",
    fillColor: "#00FF01",
    fillOpacity: 0.6,
    anchor: new google.maps.Point(16, 30),
  };

  // Position for each position
  let loc = new google.maps.LatLng(spot.lat, spot.lng);

  // Marker for each position
  const marker = new google.maps.Marker({
    position: loc,
    icon: svgMarker,
    map: map
  });

  // Circle for each position
  let circle = new google.maps.Circle({
    strokeColor: "#00FF01",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#00FF01",
    fillOpacity: 0.19,
    map: map,
    center: loc,
    radius: spot.circleRadius
  });

  // Pulse effect
  nextAssignment(circle, spot.circleRadius);

  // Click Event
  google.maps.event.addListener(marker, 'click', function () {
    let message;
    let booleanValue = checkIfInZone(circle);

    if (booleanValue) {
      message = "Now, keep an eye on your geiger meter. You just entered a designated area where you will have to be fast and nimble. Go check out what your leader sent you.";
    } else {
      message = "You’re not in the area of this task, therefore its prohibited to enter a code for completing the task, be aware of the geiger counter";
    }

    createMessageBox(message, booleanValue, spot);
  });
}
// Publishing the spots / Array with locationIDs
function publishSpots(spotsArray) {
  spotsArray.forEach(spot => {
    locations.forEach(loc => {
      if (spot === loc.locationID) {
        
        createSpot(loc);
        console.log(loc);
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
  let playerLoc = new google.maps.LatLng(55.60753, 12.98978);

  return circle.getBounds().contains(playerLoc);
}
// Creates a message box that appears when marker is being clicked
async function createMessageBox(message, booleanValue, spot) {
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

    // ENBART HÄR FÖR TEST
    riddleNotification(false);
    diaryNotification(false);
  });

  let riddles = await getRiddles();

  let riddle = riddles.mainRiddles.find((riddle) => riddle.locationID == spot.locationID);

  console.log(riddle);

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
        diaryNotification();

        // Save the process in persons object
        let preRiddle = null;

        if (riddle.relatedPreRiddles.length != 0) {
          preRiddle = riddle.relatedPreRiddles[0];
        }

        updateUserProcess(riddle);

        async function updateUserProcess(riddle) {
          let users = await getUsers();

          let userFromServer = users.find((u) => u.userID == user.userID);


          let uppdatedRiddle = userFromServer.riddlesSolved.push(`${riddle.riddleID}`);
          let updatedPreRiddle = userFromServer.preRiddlesSolved.push(`${preRiddle}`);
          let updatedLocation = userFromServer.locationAchieved.push(`${riddle.locationID}`);
          console.log(updatedLocation, updatedPreRiddle, uppdatedRiddle);
          update(userFromServer.userID, uppdatedRiddle, updatedPreRiddle, updatedLocation);
        }

      } else {
        // When you enter the wrong code - it gives out a shake
        codeBox.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both";
        setTimeout(() => {
          codeBox.style.animation = "pulse 3s infinite";
        }, 1000)
      }

    });
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

  //Creates div element for the Diary Excerpts
  let diaryBox = createContainerBox("diaryBox", "Diary Excerpts");

  //För every excerpt
  forEachDiary(diaryBox);

  //Creates a close button
  createCloseButton(diaryBox);
}
//Creates Riddles view
function createRiddlesView() {
  //Creates the main riddles container
  let riddlesContainer = createContainerBox("riddlesContainer", "Riddles");

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
    <h1 style="text-align:center; margin-bottom:10px;">${titleOfBox}</h1>
  `;

    setTimeout(() => {
      theBoxName.classList.add("up");
    }, 100);
  }
  return theBoxName;
}
//Foreach diary creates diary excerpts
function forEachDiary(containerBox) {
  diary.forEach(excerpt => {

    //Creates a excerpt box for every excerpts received for inlogged user
    if (user.diaryExcerpts.includes(excerpt.id)) {

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
      excerptBox.innerHTML += `
            <p class="excerptText">${excerpt.bodyText.start}</p>
            <p class="excerptText">${excerpt.bodyText.end}</p>
            <p style="color:white; text-align:right;" class="excerptPage">s. ${excerpt.page}</p>
          `;
      containerBox.append(excerptBox);
    }

  });
}
//Foreach riddle creates a box and eventlisteners to the boxes
async function forEachRiddle(containerBox, innerContainerBox) {
  let riddles = await getRiddles();

  riddles.mainRiddles.forEach(riddle => {
    //Creates a box
    let riddleBox = createContainerBox("riddleBox");

    //Checks if the inlogged user has unlocked the riddle
    if (user.riddlesSolved.includes(riddle.riddleID)) {
      riddleBox.innerHTML = ` 
            <img src="../images/unlocked.png" class="riddleBoxImg"> 
          `;
      riddleBox.classList.add("unlocked");
    } else {
      riddleBox.innerHTML = ` 
            <img src="../images/locked.png" class="riddleBoxImg"> 
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

        let unlockedRiddleBox = createContainerBox("unlockedRiddleBox");
        setTimeout(() => {
          unlockedRiddleBox.classList.add("opacity");
        }, 500);

        if (riddle.img !== "" || riddle.img !== null) {
          unlockedRiddleBox.innerHTML += `
              <img src="../images/${riddle.img}" class="riddleImg">
            `;

          unlockedRiddleBox.innerHTML += `
              <h2>${riddle.riddle}</h2>
            `;

          //Creates close riddleBox button
          let closeBtnUnlockedRiddle = document.createElement("button");
          closeBtnUnlockedRiddle.classList.add("closeBtnUnlockedRiddle");

          setTimeout(() => {
            closeBtnUnlockedRiddle.classList.add("opacity");
          }, 1000);

          closeBtnUnlockedRiddle.innerText = `X`;

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
        containerBox.append(unlockedRiddleBox);
      })
    }
    //Appends the box inte riddlesboxes container
    innerContainerBox.append(riddleBox);
  });
}
//Creates a close button and appends it in the argument sended
function createCloseButton(contianerBox) {
  let closeBtn = document.createElement("button");
  closeBtn.classList.add("closeBtn");

  setTimeout(() => {
    closeBtn.classList.add("opacity");
  }, 750);

  closeBtn.innerText = `→`;

  closeBtn.addEventListener("click", () => {
    contianerBox.classList.remove("up");
    closeBtn.remove();

    setTimeout(() => {
      contianerBox.remove();
    }, 750);
  })

  contianerBox.append(closeBtn);
  document.body.append(contianerBox);
}