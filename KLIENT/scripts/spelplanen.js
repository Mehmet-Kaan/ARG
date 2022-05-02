"use strict";

let latitude, longitude, currentPositionOfPlayer, playerInCircle, inLoggedUser;
let map;
const MALMO_BOUNDS = {
  north: 55.639951,
  south: 55.500386,
  west: 12.8811839,
  east: 13.1507609,
};
let user = {
  username: "Niklas",
  email: "niklas.sta@hotmail.com",
  riddlesSolved: [
      5,
      5,
      5,
      5,
      5
  ],
  preRiddlesSolved: [
      6,
      6,
      6,
      6,
      6
  ],
  locationAchieved: [
      7,
      5
  ],
  diaryExcerpts: [],
  userID: 1,
  password: "0000",
  teamID: 1
};

// Get position of player 
function getLocation() {
  if(navigator.geolocation){
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
function errorCallback(error){
  switch(error.code) {
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
function playerLocation(){
  getLocation();
  let playerLocation = new google.maps.LatLng(latitude, longitude);
  return playerLocation;
}

// Updating the latitude and longitude every 20sec
setInterval(()=> {
  getLocation();
},20000);

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
function createSpot(spot){

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
  google.maps.event.addListener(marker,'click',function() {
    let message;
    let booleanValue = checkIfInZone(circle);

    if(booleanValue){
      message = "Now, keep an eye on your geiger meter. You just entered a designated area where you will have to be fast and nimble. Go check out what your leader sent you.";
    } else {
      message = "You’re not in the area of this task, therefore its prohibited to enter a code for completing the task, be aware of the geiger counter";
    }
    
    createMessageBox(message, booleanValue, spot);
  });
}
// Publishing the spots / Array with locationIDs
function publishSpots(spotsArray){
    spotsArray.forEach(spot => {
      locations.forEach(loc => {
        if(spot === loc.locationID){
          console.log(spot)
          console.log(loc.locationID)
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
function checkIfInZone(circle){
  // Get players location
  // let playerLoc = playerLocation();
  let playerLoc = new google.maps.LatLng(55.60753, 12.98978);

  return circle.getBounds().contains(playerLoc);
}
// Creates a message box that appears when marker is being clicked
async function createMessageBox(message, booleanValue, spot){
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

  let riddles = await getRiddles();
  console.log(riddles);

  let riddle = riddles.mainRiddles.find((riddle) => riddle.locationID == spot.locationID);

  console.log(riddle);
  // Fixa sifferkodsinmatning och vad som sker när det är rätt
  if(booleanValue){
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
        if(number != document.querySelector(`#number${i}`).value){
          answer = false;
          break;
        } else {
          answer = true;
        }
      }

      if(answer){
        // When you enter the right code
        // Make the spot unavaible and grey
        // Send them part 2 of the diarypost
        window.alert("Yäääy rätt svar")
      } else {
        // When you enter the wrong code
        // Message "try again, so close or not"
        window.alert("FEEEEEEEEEEEEL")
      }

    });
      // let answear = 
      // const formData = new FormData(form);

      // const req2 = new Request(`http://localhost:9000/login.php`, 
      //     postFormData(formData)
      // );
  }


  titleWrapper.append(title, closeButton);
  codeBox.prepend(titleWrapper, bodyText);
  document.body.append(codeBox);
}

// //Dagboksutdrag
// //Fetchs excerpts from diary.json
// fetch("http://localhost:8000/json/diary.json").then(r => r.json()).then(data => {
//   excerpts = data;
// });

// fetch("http://localhost:9000/get.php",{
//   method: 'POST',
//   body: JSON.stringify({"riddle":true}),
//   headers: {"Content-type": "application/json; charset=UTF-8"},
// }).then(r => r.json()).then(data => {
//   riddles = data;
//   console.log(data);
// });

// diaryIcon.addEventListener("click", ()=>{
//   let diaryBox = document.createElement("div");
//   // diaryBox.classList.add("diaryBox");
//   diaryBox.setAttribute("class", "diaryBox");

//   setTimeout(() => {
//     diaryBox.classList.add("up");
//   }, 100);

//   //För every excerpt
//   excerpts.forEach(excerpt => {
//     let excerptBox = document.createElement("div");
//     excerptBox.classList.add("excerptBox");

//     excerptBox.innerHTML = `
//       <p style ="color:white;" class="date_time"> ${excerpt.date} - ${excerpt.time}</p>
//     `;
    
//     // if(excerpt.img !== null && excerpt.img !== ""){
//     //   excerptBox.innerHTML += `
//     //   <img src="../images/${excerpt.img}.png" class="excerptImg">
//     // `;
//     // }
    
//     excerptBox.innerHTML +=`
//       <p class="excerptText">${excerpt.text}</p>
//       <p style="color:white; text-align:right;" class="excerptPage">s. ${excerpt.page}</p>
//     `;
//     diaryBox.append(excerptBox);
//   });

//   let closeBtn = document.createElement("button");
//   closeBtn.classList.add("closeBtn");

//   setTimeout(() => {
//     closeBtn.classList.add("opacity");
//   }, 750);

//   closeBtn.innerText = `→`;

//   closeBtn.addEventListener("click", ()=>{

//     diaryBox.classList.remove("up");
//     closeBtn.remove();

//     setTimeout(() => {
//       diaryBox.remove();
//     }, 750);
//   })

//   diaryBox.append(closeBtn);
//   document.body.append(diaryBox);
// })

// riddlesIcon.addEventListener("click", ()=>{
//   let riddlesBox = document.createElement("div");
//   riddlesBox.setAttribute("class", "riddlesBox");

//   setTimeout(() => {
//     riddlesBox.classList.add("up");
//   }, 100);

//   riddlesBox.innerHTML = `
//     <h2 style="text-align:center;">Riddles</h2>
//   `;
  
//   //För every riddle
//   riddles.forEach(riddle => {
//     let riddleBox = document.createElement("div");
//     riddleBox.classList.add("riddleBox");

//     riddlesBox.append(riddleBox);
//   });

//   let closeBtn = document.createElement("button");
//   closeBtn.classList.add("closeBtn");

//   setTimeout(() => {
//     closeBtn.classList.add("opacity");
//   }, 750);

//   closeBtn.innerText = `→`;

//   closeBtn.addEventListener("click", ()=>{

//     riddlesBox.classList.remove("up");
//     closeBtn.remove();

//     setTimeout(() => {
//       riddlesBox.remove();
//     }, 750);
//   })

//   riddlesBox.append(closeBtn);
//   document.body.append(riddlesBox);
// })


// DAGBOKSINLÄGG I EN FUNKTION

// RIDDLES I EN FUNKTION 

// EVENTLISTENER PÅ IKONERNA SOM FINNS SOM STATISKA ELEMENT I PHP FILEN