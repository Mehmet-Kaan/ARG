"use strict";
let inloggeduser;

const pageInformation = {
    headlines: {
        pageOne: {
            title: "The Malmö Project", 
            bodyText: "The Malmö Project grundades av Oppenheimer som tillsammans med två assistenter lyckades skapa, något som idag, betraktas som världens farligaste vapen. Vi vet fortfarande inte om receptet för vapnet finns, eller om den sen länge har förstörts. Men vi vet att personen som innehar informationen kan förstöra allt eller rädda alla."
        },
        pageTwo: {
            title: "Vem är du?", 
            bodyText: "Använd ditt alias och kod för att få tillgång till konsolen. Vi behöver identifiera vem du är. Vi ses på andra sidan."
        },
        pageThree: {
            title: "Välkommen ", // put variable here from the one that logged in 
            bodyText: "Spelare XXX, du är utvald av en anledning. Din träning är över och du är nu en medlem av den särskilda operationsteamet “Shiva”. Uppdraget är hemlighetsstämplat av en anledning, men jag vet att ni inte kommer säga något om vart ni tillhör, det har vi tränat er för. Ligg lågt och använd det här emblemet för att hitta dina kamrater. Ta dig vidare in och låt oss börja. Tiden är knapp och liv kan vara i fara. </br> - Bethe"
        },
        information: {
            title: "Viktig information", 
            bodyText: "Öppna sidan i din mobil. </br> Tillåt platstjänster på din mobil. </br> Undvik att spendera för mycket tid inom radioaktiva områden.</br> Gåtorna kommer utspelas både fysiskt och på mobilen.",
        }
    },
    classes: {
        title: "title",
        middleTitle: "middleTitle",
        bodyText: "bodyText",
    }
};
const buttons = {
    yes: {
        innerText: "Ja",
        class: "button callToAction bodyText"
    },
    no: {
        innerText: "Nej",
        class: "button bodyText"
    },
    verify: {
        innerText: "Verfiera",
        class: "button callToAction bodyText"
    },
    letsBegin: {
        innerText: "Låt oss börja",
        class: "button callToAction bodyText"
    }
};
const wrapper = document.querySelector("#wrapper");

// INIT
// Fade in
pageOne(pageInformation, buttons);
const phaseOne = document.querySelector("#firstPhase");
phaseOne.style.animation =  "fadeIn 3s";

// pageThree(pageInformation,buttons);


function pageOne(info, button){
    // The wrapper
    let page = document.createElement("div");
    page.setAttribute("id", "firstPhase")

    let title = document.createElement("h1");
    title.innerHTML = info.headlines.pageOne.title;
    title.className = info.classes.title;

    let bodyText = document.createElement("p");
    bodyText.innerHTML = info.headlines.pageOne.bodyText;
    bodyText.className = info.classes.bodyText;

    let choiceSection = document.createElement("div");
    choiceSection.setAttribute("id", "choiceSection");

    let titleTwo = document.createElement("h1");
    titleTwo.innerHTML = "Är du redo?"; 
    titleTwo.className = info.classes.middleTitle; // <- cause it should have source code

    let yesButton = document.createElement("button");
    let noButton = document.createElement("button");
    yesButton.className = button.yes.class;
    yesButton.innerHTML = button.yes.innerText;
    noButton.className = button.no.class;
    noButton.innerHTML = button.no.innerText;

    // event
    yesButton.addEventListener("click", () => {
        phaseOne.style.animation =  "fadeOut 2s";
        
        setTimeout(()=> {
            wrapper.innerHTML = "";
            pageTwo(pageInformation, buttons);
            
            // Fade In
            const phaseTwo = document.querySelector("#secondPhase");
            phaseTwo.style.animation =  "fadeIn 3s";
            
            
        }, 1700);
    });
    
    noButton.addEventListener("click", () => {

        let message = document.createElement("div");
        message.className = "message";
        message.style.animation = "fadeIn 2s";

        let exit = document.createElement("img");
        exit.setAttribute("src", "../icons/x.png");

        exit.addEventListener("click", () => {
            message.style.animation = "fadeOut 2s";
            setTimeout(() => {
                message.remove();
            }, 1700)
        })

        let text = document.createElement("p");
        text.className = "bodyText";
        text.innerHTML = "Vad tråkigt att du känner så. Jag behöver ha med dig i mitt team. Du har visat på stora färdigheter inom områden som värderas väldigt högt. Utan dig kommer jag nog inte klara detta. Jag tror på dig!"

        message.append(exit, text);
        wrapper.append(message);
        
    });

    choiceSection.append(titleTwo, yesButton, noButton);
    page.append(title, bodyText, choiceSection);
    wrapper.append(page);
}

function pageTwo(info, button){
    // The wrapper
    let page = document.createElement("div");
    page.setAttribute("id", "secondPhase")

    let title = document.createElement("h1");
    title.innerHTML = info.headlines.pageTwo.title;
    title.className = info.classes.title;

    let bodyText = document.createElement("p");
    bodyText.innerHTML = info.headlines.pageTwo.bodyText;
    bodyText.className = info.classes.bodyText;

    let logIn = document.createElement("div");
    logIn.setAttribute("id", "logIn");

    let titleTwo = document.createElement("h1");
    titleTwo.innerHTML = "Verifikation av identitet"; 
    titleTwo.className = info.classes.middleTitle; // <- cause it should have source code

    // FORM that will be sending a post and get a response
    let form = document.createElement("form");
    form.setAttribute("id", "form");
    form.setAttribute("method", "POST");
    // form.setAttribute("action", ""); 
    //
    // ---> Where to send when to verify? <---
    //

    let user = document.createElement("div");
    user.setAttribute("id", "userBox");
    // username
    let label1 = document.createElement("label");
    label1.innerHTML = "alias";
    label1.className = "bodyText";
    let input1 = document.createElement("input");
    input1.className = "bodyText";
    input1.setAttribute("type", "text");
    input1.setAttribute("name", "username");
    input1.setAttribute("id", "username");
    
    let password = document.createElement("div");
    password.setAttribute("id", "passwordBox");
    // password
    let label2 = document.createElement("label");
    label2.innerHTML = "kod";
    label2.className = "bodyText";
    let input2 = document.createElement("input");
    input2.setAttribute("type", "password");
    input2.setAttribute("name", "password");
    input2.setAttribute("id", "password");

    let errorMessage = document.createElement("p");
    errorMessage.className = "errorMessage";
    
    let verifyButton = document.createElement("button");
    // verifyButton.setAttribute("type", "submit")
    verifyButton.className = button.verify.class;
    verifyButton.innerHTML = button.verify.innerText;

    // Second Press        
    form.addEventListener("submit", (event) => {

        event.preventDefault();
        const formData = new FormData(form);
        console.log(formData.entries());

        const req2 = new Request(`http://localhost:9000/login.php`, 
            postFormData(formData)
        );
          
        fetch(req2)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Password or username is wrong");
                }
            })
            .then((data) => {
            //   saveToSession(data, "session");
                console.log("OK")
                console.log(data);

                // FADE OUT 
                const phaseTwo = document.querySelector("#secondPhase");
                phaseTwo.style.animation =  "fadeOut 2s";

                setTimeout(()=> {
                    wrapper.innerHTML = "";
                    pageThree(pageInformation, buttons, data);
                    
                    // Fade In
                    const phaseThree = document.querySelector("#thirdPhase");
                    phaseThree.style.animation =  "fadeIn 3s";
                    inloggeduser = data;
                }, 1700);
            })
            .catch((error) => {
                console.log("not OK");
                errorMessage.style.animation =  "fadeIn 2s";
                errorMessage.innerHTML = "*Om du är den utvalde, se över dina dokument för att ta dig vidare";
                
            //   document.getElementById("errorDiv").innerHTML = "Wrong combination of username and password";
            //   sessionStorage.clear();
            });
        });
       
    
    
    user.append(label1, input1);
    password.append(label2, input2);
    form.append(user, password, errorMessage, verifyButton);
    logIn.append(titleTwo, form);
    page.append(title, bodyText, logIn);
    wrapper.append(page);
}

function pageThree(info, button, user){

    // The wrapper
    let page = document.createElement("div");
    page.setAttribute("id", "thirdPhase")

    let title = document.createElement("h1");
    title.innerHTML = info.headlines.pageThree.title + ` ${user.username}!`;
    title.className = info.classes.title;

    let bodyText = document.createElement("p");
    bodyText.innerHTML = info.headlines.pageThree.bodyText;
    bodyText.className = info.classes.bodyText;

    let letsBeginButton = document.createElement("button");
    letsBeginButton.className = button.letsBegin.class;
    letsBeginButton.innerHTML = button.letsBegin.innerText;

    // Button Event
    letsBeginButton.addEventListener("click", () => {
        const phaseThree = document.querySelector("#thirdPhase");
        phaseThree.style.animation =  "fadeOut 2s";

            setTimeout(()=> {
                wrapper.innerHTML = "";
                // wrapper.remove();
                // document.getElementById("map").classList.remove("hide");
                document.getElementById("titleO").classList.remove("hide");
                document.getElementById("subContent").classList.remove("hide");
       
                // document.body.innerHTML += `
                //      <?php
                //          require_once "/api-key.php";                            
                //      ?>
                //     <script src="../scripts/spelplanen.js"></script>
                // `;

                wrapper.setAttribute("id", "map");
                initMap();
                // window.location.replace("php/gameFrame.php");
                // Här kallar vi på funktion som ska visa spelplanen, som kodas i spelplanen då :)
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