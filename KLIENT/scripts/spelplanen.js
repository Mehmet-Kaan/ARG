"use strict!";

let latitude, longitude, currentPositionOfPlayer, playerInCircle, inLoggedUser;

//To get inloggeduser
// login("Niklas", "0000");

const successCallback = (position) => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  console.log(latitude);
  console.log(longitude);
}

const errorCallback = (position) => {
  console.log(position);
}

//Get position of player 
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

var map;
const MALMO_BOUNDS = {
  north: 55.639951,
  south: 55.500386,
  west: 12.8811839,
  east: 13.1507609,
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 55.604980, lng: 13.003822 },
    restriction: {
      latLngBounds: MALMO_BOUNDS,
      strictBounds: false,
    },
    zoom: 13,
    mapId: "1e40c73b7572b645"
  });

  const spotOne = new google.maps.LatLng(55.604958, 13.003125);
  const spotTwo = new google.maps.LatLng(55.602412, 12.995289);
  const spotThree = new google.maps.LatLng(55.591704, 13.014402);
  const spotFour = new google.maps.LatLng(55.589861, 12.988219);

  const circleRadiusS = 100;
  const circleRadiusM = 200;
  const circleRadiusL = 300;

  const circleOne = new google.maps.Circle({
    strokeColor: "#00FF01",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#00FF01",
    fillOpacity: 0.19,
    map: map,
    center: spotOne,
    radius: circleRadiusS,
    clickable: false
  });

  const circleTwo = new google.maps.Circle({
    strokeColor: "#00FF01",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#00FF01",
    fillOpacity: 0.19,
    map: map,
    center: spotTwo,
    radius: circleRadiusM,
    clickable: false
  });

  const circleThree = new google.maps.Circle({
    strokeColor: "#00FF01",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#00FF01",
    fillOpacity: 0.19,
    map: map,
    center: spotThree,
    radius: circleRadiusL,
    clickable: false
  });

  const circleFour = new google.maps.Circle({
    strokeColor: "#00FF01",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#00FF01",
    fillOpacity: 0.19,
    map: map,
    center: spotFour,
    radius: circleRadiusL,
    clickable: false
  });

  // Remove circle
  // circle.setMap(null);

  // Pulse effect
  nextAssignment(circleFour, circleRadiusL);
  setTimeout(() => {
    nextAssignment(circleThree, circleRadiusL);
  }, 5000);

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

      circle.radius = radius + direction * 10;
      circle.setOptions(circle);
    }, 50)

    setTimeout(() => {
      myStopFunction(circleInterval);
    }, 10000)

    function myStopFunction(interval) {
      clearInterval(interval);
    }
  }


  // Marker icon
  const svgMarker = {
    path: "M25.2,8.4c0-0.4,0-0.8,0-1.2c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.3-0.1-0.4C25,6.3,25,6.2,24.9,6c-0.1-0.4-0.2-0.9-0.4-1.3l0,0c-0.3-0.4-0.7-0.5-0.9-0.9c-0.1-0.2-0.1-0.4-0.2-0.6C23.3,3,23,2.9,22.8,2.8c-1.4-0.4-3-0.1-4,0.9c-0.2,0.2-0.5,0.5-0.8,0.6c-0.5,0.2-1.1,0-1.5-0.4c-0.4-0.4-0.6-0.9-0.9-1.4c-0.3-0.5-0.7-0.9-1.2-1.1c-0.7-0.2-1.5,0.2-1.8,0.9c-0.2,0.6,0.1,1.3,0.3,1.8c0.2,0.6,0.4,1.3,0.1,1.8c-0.2,0.4-0.7,0.7-1.2,0.7c-0.5,0.1-1,0-1.5-0.1c-0.2,0-0.4-0.1-0.5-0.2C9.6,6.2,9.5,6,9.5,5.7c0-0.3,0.1-0.5,0.1-0.8C9.6,4.4,9.4,4,9,3.6C8.5,3.5,8,3.8,7.7,4.2c0,0,0,0,0,0.1C7.2,5.2,7,6.1,6.9,7.1c0,0,0,0.1,0,0.1c0,0.4,0,0.8,0,1.2v0.2c0,0.1,0,0.3,0,0.4c0,5,7.8,9.4,7.8,20.2v0c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0.1,0.3c0.1,0.2,0.2,0.3,0.3,0.5c0.2,0.2,0.6,0.4,1,0.4s0.7-0.2,1-0.4c0.1-0.1,0.2-0.3,0.3-0.5c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2,0-0.3v0c0-9.6,6.1-14.1,7.5-18.5c0.2-0.5,0.3-1.1,0.3-1.7C25.2,8.9,25.2,8.6,25.2,8.4z M16,13.4c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4C18.4,12.3,17.3,13.4,16,13.4z",
    fillColor: "#00FF01",
          fillColor: "#00FF01",                
    fillColor: "#00FF01",
    fillOpacity: 0.6,
    anchor: new google.maps.Point(16, 30),
  };


  const locthree = new google.maps.Marker({
    position: spotThree,
    icon: svgMarker,
    map: map,
  });

  const locfour = new google.maps.Marker({
    position: spotFour,
    icon: svgMarker,
    map: map,
  });

  const spotFive = new google.maps.LatLng(55.58716605414764, 12.982450138149538);
  const locfive = new google.maps.Marker({
    position: spotFive,
    icon: svgMarker,
    map: map,
  });


  //Onclick
  locfive.addListener("click", () => {
    let codeBox = document.createElement("div");
    codeBox.classList.add("codeBox");

    let closeButton = document.createElement("button");
    closeButton.classList.add("closeButton");
    closeButton.innerText = "X";

    playerInCircle = circleFour.getBounds().contains(locPlayer.getPosition());

    if (!playerInCircle) {
      codeBox.innerHTML = `
                <p class="codeText"> you’re not in the area of this task, therefore its prohibited to enter a code for completing the task, be aware of the geiger counter</p>
              `;
    }

    closeButton.addEventListener("click", () => {
      codeBox.remove();
    });

    codeBox.prepend(closeButton);
    document.body.append(codeBox);
  });

  //Players location image
  const image = "navIcon.png";

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  currentPositionOfPlayer = new google.maps.LatLng(latitude, longitude);
  let locPlayer = new google.maps.Marker({
    position: currentPositionOfPlayer,
    icon: image,
    map: map,
  });

  //Updates the position of player
  setInterval(() => {
    //Deletes the latest position marker from map
    locPlayer.setMap(null);

    //Gets new location
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    //Updates the lat and lang
    currentPositionOfPlayer = new google.maps.LatLng(latitude, longitude);

    //Creates new marker for the current position
    locPlayer = new google.maps.Marker({
      position: currentPositionOfPlayer,
      icon: image,
      map: map,
    });

    //Controls if player in the circle
    playerInCircle = circleFour.getBounds().contains(locPlayer.getPosition());
    console.log(playerInCircle);

  }, 20000);


  // // Check if in spot
  // console.log(circleFour.getBounds().contains(locfour.getPosition()));
  // console.log(circleFour.getBounds().contains(locfive.getPosition()));

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