<?php
    require_once "head.php";
?>

<body>

    <div id="wrapper">

    </div>
    <header id="titleO" class="hide">
        <h1 class="title" data-text="THE MALMÖ PROJECT">THE MALMÖ PROJECT</h1>
    </header>
        
    <div class="hide" id="subContent">
      <div id="geigermeter" >
      <div class="numbersBox">
            <div class="MaxP">Max</div>
            <div class="exposedP">Exposed</div>
            <div class="maximum">7000</div>
            <div class="exposed">0</div>
          </div>
          <div class="line"><div class="meter low"></div></div>
          <div class="numbersBottom">
            <span>100</span>
            <span>200</span>
            <span>300</span>
            <span>400</span>
            <span>500</span>
            <span>600</span>
          </div>
      </div>
      <div id="diary_icon" >
        <img src="../icons/diary_icon.svg" alt="*messages">
      </div>
      <div id="riddles_icon" >
        <img src="../icons/riddle_icon.svg" alt="*riddles">
      </div>
      <div id="hintWrapper">
        <p class="bodyText">THIS IS NOT A GAME! THIS IS NOT A GAME! THIS IS NOT A GAME!</p>
      </div>
    </div>
    <audio id="audio" src="audio/alarm.wav"></audio>

    <script src="../scripts/DB.js"></script>
    <script src="../scripts/functions.js"></script>
    <script src="../scripts/spelplanen.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC94Qi9OPA7V43ooB5f0gqSv8lmYm730RE" async defer></script>
    
</body>
</html>