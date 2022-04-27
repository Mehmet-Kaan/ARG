"use strict";

const pageInformation = {
    headlines: {
        pageOne: {
            title: "The Malmö Project", 
            bodyText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        pageTwo: {
            title: "Vem är du?", 
            bodyText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        pageThree: {
            title: "Välkommen ", // put variable here from the one that logged in 
            bodyText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        information: {
            title: "Viktig information", 
            bodyText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
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
    titleTwo.innerHTML = "Let's verify your identity"; 
    titleTwo.className = info.classes.middleTitle; // <- cause it should have source code

    // FORM that will be sending a post and get a response
    let form = document.createElement("form");
    form.setAttribute("id", "form");
    // form.setAttribute("method", "POST");
    // form.setAttribute("action", ""); 
    //
    // ---> Where to send when to verify? <---
    //

    let user = document.createElement("div");
    user.setAttribute("id", "userBox");
    // username
    let label1 = document.createElement("label");
    label1.innerHTML = "username";
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
    label2.innerHTML = "password";
    label2.className = "bodyText";
    let input2 = document.createElement("input");
    input2.setAttribute("type", "password");
    input2.setAttribute("name", "password");
    input2.setAttribute("id", "password");
    
    let verifyButton = document.createElement("button");
    // verifyButton.setAttribute("type", "submit")
    verifyButton.className = button.verify.class;
    verifyButton.innerHTML = button.verify.innerText;

    // Second Press        
    // verifyButton.addEventListener("click", () => {
    //     const phaseTwo = document.querySelector("#secondPhase");
    //     phaseTwo.style.animation =  "fadeOut 2s";
            
    //     // setTimeout(()=> {
    //     //     wrapper.innerHTML = "";
    //     //     pageThree(pageInformation, buttons);
            
    //     //     // Fade In
    //     //     const phaseThree = document.querySelector("#thirdPhase");
    //     //     phaseThree.style.animation =  "fadeIn 3s";
             
    //     // }, 1700);   
    // });
    
    user.append(label1, input1);
    password.append(label2, input2);
    form.append(user, password, verifyButton);
    logIn.append(titleTwo, form);
    page.append(title, bodyText, logIn);
    wrapper.append(page);
}

function pageThree(info, button){
    // The wrapper
    let page = document.createElement("div");
    page.setAttribute("id", "thirdPhase")

    let title = document.createElement("h1");
    title.innerHTML = info.headlines.pageThree.title;
    title.className = info.classes.title;

    let bodyText = document.createElement("p");
    bodyText.innerHTML = info.headlines.pageThree.bodyText;
    bodyText.className = info.classes.bodyText;

    let letsBeginButton = document.createElement("button");
    letsBeginButton.className = button.letsBegin.class;
    letsBeginButton.innerHTML = button.letsBegin.innerText;

    // Important Information
    let informationWrapper = document.createElement("div");
    informationWrapper.setAttribute("id", "information");

    let titleTwo = document.createElement("h1");
    titleTwo.innerHTML = info.headlines.information.title;
    titleTwo.className = info.classes.middleTitle; // <- cause it should have source code

    let bodyTextTwo = document.createElement("p");
    bodyTextTwo.innerHTML = info.headlines.pageThree.bodyText;
    bodyTextTwo.className = info.classes.bodyText;

    titleTwo.addEventListener("click", () => {
        informationWrapper.classList.toggle("openUp");
    });

    // let closeWrap = document.createElement("div");
    // closeWrap.className = "closeWrap";
    // let closeButton = document.createElement("img");
    // closeButton.setAttribute("src", "../icons/arrow_down.png")

    // closeButton.addEventListener("click", () => {
    //     informationWrapper.classList.toggle("openUp");
    //     console.log(informationWrapper.scroll)
    // })
    
    // closeWrap.append(closeButton);
    informationWrapper.append(titleTwo, bodyTextTwo);

    page.append(title, bodyText, letsBeginButton, informationWrapper);
    wrapper.append(page);
}