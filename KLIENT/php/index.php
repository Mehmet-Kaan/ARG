<?php
    require_once "head.php";
?>

<body>
    <div id="wrapper">

    </div>

    <header class="hide">THE MALMÖ PROJECT</header>
    <div class="hide" id="map">
        
    <div class="hide" id="subContent">
      <img id="geigermeter" src="../images/geigermeter.png" alt="geiger_meter">
      <img id="diary_icon" src="../images/diary_icon.png" alt="diary_icon">
      <img id="riddles_icon" src="../images/riddle_icon.png" alt="riddles_icon">
    </div>
    
    <script src="../scripts/functions.js"></script>
    <script src="../scripts/logIn.js"></script>
    <script src="../scripts/spelplanen.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC94Qi9OPA7V43ooB5f0gqSv8lmYm730RE&callback=initMap"
    async defer></script>
</body>
</html>