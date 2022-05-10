const locations = [
    {
        "locationID":0,
        "title":"Upptäckten",
        "lat":"55.61173",
        "lng":"12.99411",
        "circleRadius": 50, 
        "mainRiddleID":4,  
        "diaryID": 2,
    },
    {
        "locationID":1,
        "title":"Receptet",
        "lat":"55.61062",
        "lng":"12.98636",
        "circleRadius":100,
        "mainRiddleID":2,
        "diaryID":6
    },
    {
        "locationID":2,
        "title":"Oppenheimers hemligheter",
        "lat":"55.61043",
        "lng":"12.99763",
        "circleRadius":100,
        "mainRiddleID":8,
        "diaryID": 5
    },
    {
        "locationID":3,
        "title":"Bråket",
        "lat":"55.61076",
        "lng":"13.00208",
        "circleRadius":100,
        "mainRiddleID":8,
        "diaryID":4
    },
    {
        "locationID":4,
        "title":"Vapnet",
        "lat":"55.61202",
        "lng":"12.99067",
        "circleRadius":100,
        "mainRiddleID":8,
        "diaryID":8
    },
    {
        "locationID":5,
        "title":"Första mötet",
        "lat":"55.61079",
        "lng":"12.99538",
        "circleRadius":100,
        "mainRiddleID":8,
        "diaryID":0
    },
    {
        "locationID":6,
        "title":"Labbet",
        "lat":"55.60753",
        "lng":"12.98978",
        "circleRadius":100,
        "mainRiddleID":8,
        "diaryID":1
    },
    {
        "locationID":7,
        "title":"Sveket",
        "lat":"55.60762",
        "lng":"12.97840",
        "circleRadius":100,
        "mainRiddleID":8,
        "diaryID":3
    }
    ,{
        "locationID":8,
        "title":"Dödsbädden",
        "lat":"55.604839",
        "lng":"12.987445",
        "circleRadius":100,
        "mainRiddleID":8,
        "diaryID":7
    }
];
// Ändra ID till diaryID
const diary = [
    {
        "id":0,
        "date":"29/04/1942",
        "time":"07:30 PM",
        "page":6,
        "title": "Första mötet",
        "bodyText": {
            "start": "Idag var första gången jag mötte mina nya kollegor på kontoret, de var nervösa över sin första tjänst. Bethe, en av dem, verkade fascinerad och såg sig omkring på kontoret och log. Tellers intryck har jag tänkt på mycket under resten av dagen. Han hade en rädsla och ängslighet i blicken som jag aldrig tidigare skådat hos en kärnfysiker på så här hög nivå. Jag har bestämt mig för att övervaka hur han beter sig, och hur hans syn på projektet utvecklas. På lunchen berättade jag såklart om min favorittext just nu, The Bhagavad Gita, jag hoppas de tyckte om den. Jag läste delar ur den för dem. En sådan fantastisk filosofi.",
            "end": "“I am the begi<span class='glitchedLetter' data-text='N'>N</span>ning, m<span class='glitchedLetter' data-text='I'>I</span>ddle, and end of creation.”"
        },  
        "img":"",
        "locationID": 5
    },
    {
        "id":1,
        "date":"29/04/1942",
        "time":"07:30 PM",
        "page":6,
        "title": "Labbhistoria",
        "bodyText": {
            "start": "Idag var första dagen vi arbetade med Malmö Project och Bethe sa att det vi ville uppnå var omöjligt. Både jag och Teller tittade på varandra och himlade med ögonen. Men vi var optimistiska och fortsatte med jobbet.",
            "end": "Vi har mer jobb a<span class='glitchedLetter' data-text='TT'>TT</span> utföra i framtiden men jag tror att vi kommer uppnå det vi vill göra med The Malmö Project."
        },  
        "img":"",
        "locationID": 6
    },
    {
        "id":2,
        "date":"29/04/1942",
        "time":"07:30 PM",
        "page":6,
        "title": "Upptäckten av det nya",
        "bodyText": {
            "start": "“Vad har vi gjort?” tänkte jag så fort jag såg hur väl experimentet hade lyckats. Jag önskar att vi inte hade upptäckt det, men det gjorde vi. Det förändrades oss som fysiker och kanske också vår moraliska kompass.",
            "end": "Jag minns vad Bethe sa till mig den dagen och hans <span class='glitchedLetter' data-text='O'>O</span>rd bekräftade min misstanke angående vad för slags perso<span class='glitchedLetter' data-text='N'>N</span> han är."
        },  
        "img":"",
        "locationID": 0
    },
    {
        "id":3,
        "date":"29/04/1942",
        "time":"07:30 PM",
        "page":6,
        "title": "Sveket",
        "bodyText": {
            "start": "Labbet har mestadels bestått av mig och Teller den här veckan. Bethe var borta och när vi frågade honom varför gav han inget tydligt svar. Idag valde vi att följa efter honom när han försvann och upptäckte att han hade fortsatt experimentera med ett projekt som vi sa att vi aldrig skulle fortsätta med. Det var sista droppen.",
            "end": "Det var som Bethe sa, ifall vi använde det kunde vi bli mäktigast i världen. Hans girighet tog över hans förn<span class='glitchedLetter' data-text='U'>U</span>ft och projektet kanske inte ka<span class='glitchedLetter' data-text='N'>N</span> fortsätta."
        },  
        "img":"",
        "locationID": 7
    },
    {
        "id":4,
        "date":"29/04/1942",
        "time":"07:30 PM",
        "page":6,
        "title": "Oppenheimers backstory",
        "bodyText": {
            "start": "Vi konfronterade Bethe idag. Hans aggressiva och arga sida visade sig återigen och han blev defensiv. Jag vill inte ha konflikter i min arbetsgrupp, men vet inte heller hur jag ska ignorera det faktum att en av mina närmsta kollegor svikit mig. Mest upprörd blev dock Teller. Han var så som han är, tyst och ängslig, men det syntes att detta tog hårt på honom.",
            "end": "Jag är räd<span class='glitchedLetter' data-text='D'>D</span> att han kommer gå sin egen väg snart, han brinner inte för detta på samma sätt som jag och Bethe gör. Han se<span class='glitchedLetter' data-text='R'>R</span> det inte på s<span class='glitchedLetter' data-text='A'>A</span>mma sätt."
        },  
        "img":"",
        "locationID": 3
    },
    {
        "id":5,
        "date":"29/04/1942",
        "time":"07:30 PM",
        "page":6,
        "title": "Oppenheimers hemligheter",
        "bodyText": {
            "start": "Jag vet vad Bethe gjorde fel. Jag vet vad han saknar och jag har börjat utveckla ett vapen som ingen någonsin har sett förut. Ifall informationen faller i fel händer kan det utrota allt liv på jorden.",
            "end": "Jag behöver hålla det hemligt För alla. T<span class='glitchedLetter' data-text='Y'>Y</span> inte ens mina a<span class='glitchedLetter' data-text='R'>R</span>betskollegor kan känna till den här hemligheten."
        },  
        "img":"",
        "locationID": 2
    },
    {
        "id":6,
        "date":"29/04/1942",
        "time":"07:30 PM",
        "page":6,
        "title": "Receptet",
        "bodyText": {
            "start": "Allt är klart. Jag har skrivit klart det. Efter en lång tids arbete så är det färdigt, receptet som jag kämpat så hårt med. Detta borde funka, alla formler stämmer och allt går ihop.",
            "end": "De<span class='glitchedLetter' data-text='T'>T</span> får inte hamna <span class='glitchedLetter' data-text='I'>I</span> fel händer, men jag har skapat något som gör dess ägare till den mäktigaste på jorden. Jag är den mäktigaste på j<span class='glitchedLetter' data-text='O'>O</span>rden."
        },  
        "img":"",
        "locationID": 1
    },
    {
        "id":7,
        "date":"29/04/1942",
        "time":"07:30 PM",
        "page":6,
        "title": "Dödsbädden",
        "bodyText": {
            "start": "Hur kan jag berätta det här? Jag har fått ett besked som har gjort mina år till ett par månader. Det finns inte längre någon tid. Jag kan inte berätta för Teller och Bethe, de har inte pratat med varandra sedan The Malmö Project avslutades. Jag hade all makt i världen men jag har inte längre tiden på min sida.",
            "end": "Den som får <span class='glitchedLetter' data-set='T'>T</span>ag i detta kan kontrollera allt men jag kan inte heller förstöra det. Under hela min karriär <span class='glitchedLetter' data-set='V'>V</span>ill jag påstå att det här är min största upptäckt. Å andra sidan vem vet vad jag hade gjort?"
        },  
        "img":"",
        "locationID": 8
    },
    {
        "id":8,
        "date":"29/04/1942",
        "time":"07:30 PM",
        "page":6,
        "title": "Slutet",
        "bodyText": {
            "start": "Hej min gamla vän. Jag spenderade mina sista år med att leda dig hit. Uppgiften har varit svår av en anledning men du förtjänar att ta min plats. Nu har du snart tillgång till världens farligaste vapen och all makt i världen. Det är upp till dig vad du vill göra med det. Minns du när vi läste i min favorittext? Väljer du att lyssna till Shiva, guden av all destruktion. Eller går du Vishnus väg, och beskyddar vår värld. “Now I am become Death, the destroyer of worlds.”",
            "end": "SKA VI HA NÅGOT HÄR?"
        },  
        "img":"",
        "locationID": 9
    }
];

const messages = [
    {
        "messageID":1,
        "message":"now, keep an eye on your geiger meter. You just entered a designated area where you will have to be fast and nimble. Go check out what your leader sent you.",
        "locationID":1
    },
    {
        "messageID":2,
        "message":"you’re not in the area of this task, therefore its prohibited to enter a code for completing the task, be aware of the geiger counter",
        "locationID":4
    }
];

const teams = [
    {
        "teamID": 1,
        "name": "Teller",
        "avatar":"",
        "phaseOne": [6],
        "phaseTwo": [7, 5, 0],
        "phaseThree": [8, 2, 1, 3],
        "phaseFour": [4],
        "notifications": ["Jag har fått uppgifter om att det finns värdefulla objekt placerade i staden, ert uppdrag är att lokalisera dess exakta position och föra den funna informationen till mig.</br>Jag har tagit reda på ett antal områden, men var vaksamma och använd er geigermätare då det har uppmätts hög radioaktiv strålning på platserna. Använd er utbildning, var effektiva och hjälp varandra. Objekten bör finnas placerade i dessa områden men det är upp till er att hitta exakt vart. Jag fortsätter lokalisera nya områden.", "Fortsätt med uppdraget. Var försiktiga i de radioaktiva områdena och ha koll på er geigermätare.", "Jag har lokaliserat 3 områden till. Kartan är uppdaterad. Skynda er.", "Jag har fått uppgifter om det finns dagboksutdrag från en gammal vän på stationerna. Ifall det finns fler så spara dem, men lägg störst fokus på uppdraget.", "Isotopia får inte hinna först, ni vet vad som händer ifall det sker. Fortsätt med uppdraget.", "Vad som än finns vid andra änden, låt inte Bethe komma först. Med honom vid makten hotas hela våra existens.", "Bra jobbat. Arbetet är långt ifrån klart. Tiden är snart slut, ni måste jobba snabbare.", "Uppdraget är inte färdigt. Vi kan inte ge upp än!", "Bra jobbat, fullfölj uppdraget."]
    },
    {
        "teamID": 2,
        "name": "Bethe",
        "avatar":"",
        "phaseOne": [5],
        "phaseTwo": [7, 6, 0],
        "phaseThree": [8, 2, 1, 3],
        "phaseFour": [4],
        "notifications": ["Jag har fått uppgifter om att det finns värdefulla objekt placerade i staden, ert uppdrag är att lokalisera dess exakta position och föra den funna informationen till mig.</br>Jag har tagit reda på ett antal områden, men var vaksamma och använd er geigermätare då det har uppmätts hög radioaktiv strålning på platserna. Använd er utbildning, var effektiva och hjälp varandra. Objekten bör finnas placerade i dessa områden men det är upp till er att hitta exakt vart. Jag fortsätter lokalisera nya områden.", "Fortsätt med uppdraget. Var försiktiga i de radioaktiva områdena och ha koll på er geigermätare.","Jag har lokaliserat 3 områden till. Kartan är uppdaterad. Skynda er.",  "Jag har fått uppgifter om det finns dagboksutdrag från en gammal bekant på stationerna. Ifall det uppkommer fler, spara dem men kom ihåg att inte tro på allt ni läser.", "Låt inte U92 hinna först, ni vet vad som händer ifall det sker. Fortsätt med uppdraget.", "Om ni hittar objektet kan vi tillsammans göra världen till en bättre plats. Jag håller alltid mitt löfte, ni kan lita på mig.", "Det är dem som förstör allt, det har de alltid gjort. Jag är för smart och det skrämmer dem.", "Uppdraget är inte färdigt, jag har tränat er för att hitta skatten och jag tänker inte ge upp.", "Jobba hårdare. De får inte komma först till slutmålet."]
    }
];

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