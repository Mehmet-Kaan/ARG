"use strict";


const wrapper = document.querySelector("#wrapper");

if (getFromSession("entered") != true) {

    enterCode();
    // pageOne(pageInformation, buttons);
    // const phaseOne = document.querySelector("#firstPhase");
    // phaseOne.style.animation = "fadeIn 3s";
} else {
    window.location.replace(`${url}/map.php`);
    loadingPage();
    setTimeout(() => {
        displayMap();
    }, 2000);
}

function enterCode() {
    let landingPage = document.createElement("div");
    landingPage.setAttribute("id", "landingPage");

    // FORM that will be sending a post and get a response
    let form = document.createElement("form");
    form.setAttribute("id", "form");
    form.setAttribute("method", "POST");


    let password = document.createElement("div");
    password.setAttribute("id", "passwordBox");
    // password
    let label2 = document.createElement("label");
    label2.innerHTML = "DATUM";
    label2.className = "bodyText";
    let input2 = document.createElement("input");
    input2.setAttribute("type", "password");
    input2.setAttribute("name", "password");
    input2.setAttribute("id", "password");

    let errorMessage = document.createElement("p");
    errorMessage.className = "errorMessage";

    // let verifyButton = document.createElement("button");
    // // verifyButton.setAttribute("type", "submit")
    // verifyButton.className = buttons.verify.class;
    // verifyButton.innerHTML = buttons.verify.innerText;

    // Second Press        
    form.addEventListener("keydown", (event) => {
        
        if (event.key === "Enter") {
            event.preventDefault();

            const formData = new FormData(form);
            const req2 = new Request(`${urlAPI}/enter-page.php`,
                postFormData(formData)
            )

            fetch(req2)
                .then((response) => {
                    if (response.ok) {
                        console.log(response);
                        return response.json();
                    } else {
                        throw new Error("Password or username is wrong");
                    }
                })
                .then((data) => {
                    // FADE OUT 
                    landingPage.style.animation = "fadeOut 2s";

                    setTimeout(() => {
                        landingPage.remove();
                        pageOne(pageInformation, buttons);
                        const phaseOne = document.querySelector("#firstPhase");
                        phaseOne.style.animation = "fadeIn 3s";
                    }, 1700);

                })
                .catch((error) => {
                    console.log("not OK");
                    errorMessage.style.animation = "fadeIn 2s";
                    errorMessage.innerHTML = "*Du vet när du vet, va inte orolig.";

                    //   document.getElementById("errorDiv").innerHTML = "Wrong combination of username and password";
                    //   sessionStorage.clear();
                })
        };
    });



    password.append(label2, input2);
    form.append(password, errorMessage);
    landingPage.append(form);
    wrapper.append(landingPage);
}


function pageOne(info, button) {
    // The wrapper
    let page = document.createElement("div");
    page.setAttribute("id", "firstPhase")

    let title = document.createElement("h1");
    title.innerHTML = info.headlines.pageOne.title;
    title.className = info.classes.title;
    title.setAttribute("data-text", info.headlines.pageOne.title);

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
        page.style.animation = "fadeOut 2s";

        setTimeout(() => {
            wrapper.innerHTML = "";
            pageTwo(pageInformation, buttons);

            // Fade In
            const phaseTwo = document.querySelector("#secondPhase");
            phaseTwo.style.animation = "fadeIn 3s";


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

function pageTwo(info, button) {
    // The wrapper
    let page = document.createElement("div");
    page.setAttribute("id", "secondPhase");

    let title = document.createElement("h1");
    title.innerHTML = info.headlines.pageTwo.title;
    title.className = info.classes.title;
    title.setAttribute("data-text", info.headlines.pageTwo.title);

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

        const req2 = new Request(`${urlAPI}/login.php`,
            postFormData(formData)
        );

        fetch(req2)
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                } else {
                    throw new Error("Password or username is wrong");
                }
            })
            .then((data) => {
                // Save to session
                saveToSession("user", data);

                // FADE OUT 
                const phaseTwo = document.querySelector("#secondPhase");
                phaseTwo.style.animation = "fadeOut 2s";

                setTimeout(() => {
                    window.location.replace(`${url}/map.php`);

                }, 1700);
            })
            .catch((error) => {
                console.log("not OK");
                errorMessage.style.animation = "fadeIn 2s";
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
