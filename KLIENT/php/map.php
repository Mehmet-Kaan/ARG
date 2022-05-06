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
        
      </div>
      <div id="diary_icon" >
        <img id="diaryIMG" src="../icons/diary_icon.svg" alt="*messages">
      </div>
      <div id="riddles_icon" >
        <img id="riddlesIMG" src="../icons/riddle_icon.svg" alt="*riddles">
      </div>
      <div id="hintWrapper">
        <p class="bodyText">THIS IS NOT A GAME! THIS IS NOT A GAME! THIS IS NOT A GAME!</p>
      </div>
    </div>

    <script src="../scripts/DB.js"></script>
    <script src="../scripts/functions.js"></script>
    <script src="../scripts/spelplanen.js"></script>
    <?php
    // FETCH API KEY FROM SERVER
    // SÄTT VARIABEL TILL APIKEY
        require_once "head.php";
    ?>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC94Qi9OPA7V43ooB5f0gqSv8lmYm730RE" async defer></script>
    
</body>
</html>