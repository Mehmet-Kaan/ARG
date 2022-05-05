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

//Creates and returns a div element (and a title if argument sended)
function createContainerBox(theBoxName, titleOfBox){
  let className = theBoxName.toString();
  theBoxName = document.createElement("div");
  theBoxName.classList.add(className);

  if(titleOfBox !== undefined){
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
        if(inloggeduser.diaryExcerpts.includes(excerpt.id)){
         
          //Creates the excerpt container
          let excerptBox = createContainerBox("excerptBox");
    
          //Date and Time
          excerptBox.innerHTML = `
            <p class="date_time"> ${excerpt.date} - ${excerpt.time}</p>
          `;
          
          //Creates an img element If excerpt has one
          if(excerpt.img !== null && excerpt.img !== ""){
            excerptBox.innerHTML += `
              <img src="../images/${excerpt.img}.png" class="excerptImg">
          `;
          }
          
          //Body text and page number
          excerptBox.innerHTML +=`
            <p class="excerptText">${excerpt.bodyText.start}</p>
            <p class="excerptText">${excerpt.bodyText.end}</p>
            <p style="color:white; text-align:right;" class="excerptPage">s. ${excerpt.page}</p>
          `;
          containerBox.append(excerptBox);
        }
      
      });
}
//Foreach riddle creates a box and eventlisteners to the boxes
function forEachRiddle(containerBox, innerContainerBox){
    riddles.mainRiddles.forEach(riddle => {
        //Creates a box
        let riddleBox = createContainerBox("riddleBox");
    
        //Checks if the inlogged user has unlocked the riddle
        if(inloggeduser.riddlesSolved.includes(riddle.riddleID)){
          riddleBox.innerHTML = ` 
            <img src="../images/unlocked.png" class="riddleBoxImg"> 
          `;
          riddleBox.classList.add("unlocked");
        }else{
          riddleBox.innerHTML = ` 
            <img src="../images/locked.png" class="riddleBoxImg"> 
          `;
          riddleBox.classList.add("locked");
        }
    
        if(riddleBox.classList.contains("unlocked")){
          riddleBox.addEventListener("click", ()=>{
            //Hides riddlesBoxes
            setTimeout(() => {
              document.querySelector(".riddlesContainer > h1").style.display = "none";
              document.querySelector(".riddlesBoxes").style.display = "none";
            }, 500);
         
            let unlockedRiddleBox = createContainerBox("unlockedRiddleBox");
            setTimeout(() => {
              unlockedRiddleBox.classList.add("opacity");
            }, 500);
    
            if(riddle.img !== "" || riddle.img !== null){
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
            }, 750);
          
            closeBtnUnlockedRiddle.innerText = `X`;
          
            closeBtnUnlockedRiddle.addEventListener("click", ()=>{
          
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

function createDiaryView() {
    
}

function createRiddlesView() {

}