const successCallback = (position) => {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

   document.querySelector("#location").innerHTML = `Latitude = ${latitude} - Longitude = ${longitude}`;
}

const errorCallback = (position) => {
    console.log(position);
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

