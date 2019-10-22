
var global_Data = {
    CardsTorandomize: [1, 2, 3],
    cardFromFile: [1, 2, 3],
}

var modeAndLevel = gameModeStatus();
/*default variables*/
global_Data.window_width = window.innerWidth;
global_Data.window_height = window.innerHeight;
setCardsize()
global_Data.audiofolderPath = "CardSound/"
global_Data.developeMode = false // do you have to win games or you can press esc to win them
global_Data.gameTrophy = modeAndLevel[0]; //witch type of game the player can play if he wants to   (A B C) + D
global_Data.gamelevel = modeAndLevel[1]; //witch type of level the player chooses to play (1 2 3)
global_Data.wasTheGamewone = false
global_Data.NumOfChalangeFlips = 99; //number of flips do the flip challange
global_Data.NumOfChalangeSeconds = 100;
//number of seconds to do the time challange
global_Data.NumOfRemainigFlips = global_Data.NumOfChalangeFlips;
global_Data.ChallangeLost = false;

if (localStorage.StorageSoundIsOn == "false") {
    global_Data.soundIson = false
} else {
    global_Data.soundIson = true
}


global_Data.cutedImage = "Defaultimage/frontOfcards.png";
global_Data.back_image = "Defaultimage/back_Groundimage.jpg";
global_Data.stopWatchTIME = new Date();
global_Data.numColsToCut = 6;
global_Data.ThegameHeadline = "משחק הזיכרון"

/*changing the header*/
global_Data.consoleIsopen = false; // if the console is open
global_Data.NumOflips = 0;
global_Data.errorString = "Error no data"
global_Data.numRowsToCut = 4;
/*
global_Data.cardWidth = "160px";
global_Data.cardHeight = "110px";
global_Data.window_width = window.innerWidth;
global_Data.window_height = window.innerHeight;

global_Data.cardWidth = "160px";
global_Data.cardHeight = window.innerHeight/5 + "px";*/
global_Data.cardFromFile.lenth = 100;

global_Data.wins = 0;
global_Data.woncardSound = new Audio('Sounds/Woncardsound.mp3');
global_Data.wonboardSound = new Audio('Sounds/Victory.mp3');
global_Data.popboardSound = new Audio('Sounds/BubblePop.mp3');

function monospaceHtml(htm) {
    let arr = htm.split('');
    let addedChar = '</th><th>'
    let prefix = "<table style='table-layout:fixed; width:32vmin'><tr><th>"
    let finString = prefix;
    for (i in arr) {
        finString += arr[i]
        if (arr[i] === '.' || arr[i] === ':' || i < 6) {
            continue
        }
        finString += addedChar
    }
    return finString + '</tr></table>'
}
var timeoutId = new Object();
var NumOfcard = 24;
var card = [];


for (i = 1; i < (NumOfcard / 2) + 2; i++) {
    global_Data.cardFromFile[i] = {
        "valueOfcard": i,
        "Apart": "a",
        "Apart": "b ",
        "cardWone": false
    };
}
for (i = 1; i < (NumOfcard) + 5; i++) {
    global_Data.CardsTorandomize[i] = {
        "valueOfcard": i,
        "color": "white",
        "cardBack": "InTheCard",
        "cardWone": false
    };
}

unResize = function() {
    var viewport = window.visualViewport;

    //  alert (global_Data.window_width + "  X " + global_Data.window_height + " VP " + Math.round(viewport.height));
    //window.resizeTo(global_Data.window_width,global_Data.window_height)
}

window.onresize = unResize;


buildCards()
for (i = 1; i < 10; i++) {
    global_Data.cardFromFile[i].Apart = "Card0" + i + "A";
    global_Data.cardFromFile[i].Bpart = "Card0" + i + "B";
}
for (i = 10; i < 13; i++) {
    global_Data.cardFromFile[i].Apart = "Card" + i + "A";
    global_Data.cardFromFile[i].Bpart = "Card" + i + "B";
}
for (i = 1; i <= (NumOfcard); i++) {
    if (i <= (NumOfcard / 2)) { //פונקציה של סידור הקלפים בצורה אקראית
        global_Data.CardsTorandomize[i].valueOfcard = global_Data.cardFromFile[i].valueOfcard;
        global_Data.CardsTorandomize[i].InTheCard = global_Data.cardFromFile[i].Apart;
    } else {
        global_Data.CardsTorandomize[i].valueOfcard = global_Data.cardFromFile[i - (NumOfcard / 2)].valueOfcard;
        global_Data.CardsTorandomize[i].InTheCard = global_Data.cardFromFile[i - (NumOfcard / 2)].Bpart;
    }
}
for (i = 1; i < 27; i++) {
    card[i].contentOfcard = global_Data.errorString;
    global_Data.CardsTorandomize[i].writtenTocard = false
}
var n = 1
while (n < (NumOfcard + 1)) {
    var i = 0;
    var rnd = Math.floor((Math.random() * 24) + 1);
    if (global_Data.CardsTorandomize[rnd].writtenTocard == false) {
        card[n].contentOfcard = global_Data.CardsTorandomize[rnd].InTheCard;
        global_Data.CardsTorandomize[rnd].writtenTocard = true;
        n++;
    }
}
for (i = 1; i < NumOfcard + 1; i++) {
    card[i].picture = card[i].contentOfcard
}
// הפיכת המשתנה, תוכן הקלף למשתנה ללא האותיות A B
for (i = 1; i < NumOfcard + 1; i++) {
    var str = card[i].contentOfcard
    var lnth = str.length;
    var strWithoutAB = str.substring(0, lnth - 1)
    card[i].contentOfcard = strWithoutAB
}


n = 3

var statuS = new Object();
statuS.turn = false;
statuS.card1 = 0;
statuS.card2 = 0;
statuS.endingTurn = false;
var StWrite = new Object();
StWrite.Pobject = "p";

global_Data.cutedImageSize = function() // this function creats an element with the image that needs to be cut
{
    var DroneImage = document.createElement("img");
    DroneImage.src = global_Data.cutedImage; // the whole picture to be cut
    DroneImage.style.position = "fixed";
    DroneImage.style.left = "-20000px";
    document.body.appendChild(DroneImage);
    DroneImage.onload = function() {
        global_Data.SplicedImage_height = DroneImage.height;
        global_Data.SplicedImage_width = DroneImage.width;
    }
}

function buildCards() {
    var foo = 1;
    for (i = 0; i < NumOfcard + 40; i++) {
        card[i] = {
            "number": i,
            "color": "white",
            "cardBack": "Card number " + i,
            "cardWone": false,
            "picture": "",
            "DivForPictureInCard": "",
            "PictureInCard": ""
        };
    };
}
function cutImageUp() {
    global_Data.cutedImageSize();
    var theCSS_height = window.getComputedStyle(card[1].Cobject, null).getPropertyValue("height");
    theCSS_height = parseInt(theCSS_height)
    var theCSS_width = window.getComputedStyle(card[1].Cobject, null).getPropertyValue("width");
    global_Data.widthOfcard = theCSS_width;
    global_Data.heightOfcard = theCSS_height;
    theCSS_width = parseInt(theCSS_height);

    // משום מה אסור למחוק את זה לא מבין למה
    var ImageObject123 = document.createElement("IMG");
    ImageObject123.src = global_Data.cutedImage;
    window.onload = function() {
        for (i = 1; i < NumOfcard + 1; i++) {
            var z = i;
            card[i].partiatImage = document.createElement("IMG");
            card[i].partiatImage.src = global_Data.cutedImage;

            card[i].Frontcanvas = document.createElement("canvas");
            card[i].Frontcanvas.style.position = "absolute";
            card[i].Cobject.style.zIndex = "1";
            card[i].FrontObject.appendChild(card[i].Frontcanvas);
            var ctx = card[i].Frontcanvas.getContext("2d");
            global_Data.numRowsToCut = 4;
            global_Data.numColsToCut = 6;
            var x_numTocut = Math.ceil(i / global_Data.numColsToCut);
            var y_numTocut = Math.ceil(i / global_Data.numRowsToCut);
            var overallResize1 = 1;
            var overallResize2 = 1;
            var stretchX = global_Data.SplicedImage_width; //equals original width
            var stretchY = global_Data.SplicedImage_height; //equals original height
            // אם הגודל של התמונה קטן מהתוצאה הסופית, מגדילים את התמונה

            var Magic_number1 = 1.3 //original 1.3
            var Magic_number2 = 1.6 //original 1.5
            if (global_Data.SplicedImage_width < theCSS_width * global_Data.numColsToCut * Magic_number1) {
                overallResize1 = ((theCSS_width * global_Data.numColsToCut * Magic_number1) + global_Data.SplicedImage_width) / (global_Data.SplicedImage_width)
            };
            stretchX = global_Data.SplicedImage_width * overallResize1;
            stretchY = global_Data.SplicedImage_height * overallResize1;
            // כנל לגבי הגובה של התמונה
            if (stretchY < theCSS_height * global_Data.numRowsToCut * Magic_number1) {
                overallResize2 = ((theCSS_height * global_Data.numRowsToCut * Magic_number1) + stretchY) / (stretchY)
            };
            stretchX = global_Data.SplicedImage_width * overallResize1 * overallResize2;
            stretchY = global_Data.SplicedImage_height * overallResize1 * overallResize2;
            var x_Position_of_image = i - ((x_numTocut - 1) * global_Data.numColsToCut);
            var y_Position_of_image = x_numTocut - 1;

            var drawx = (theCSS_width * -1 * (x_Position_of_image - 1) * Magic_number2);
            var drawy = (theCSS_width * -1 * y_Position_of_image * 1.0);

            ctx.drawImage(card[i].partiatImage, drawx, drawy, stretchX, stretchY);
            // ctx.drawImage(card[i].partiatImage,0,0,stretchX,stretchY);
            card[i].Frontcanvas.number = i;
            card[i].partiatImage.number = i;
            // בניית אובייקט לחיצה
            card[i].pressobj = document.createElement("DIV");
            card[i].pressobj.style.position = "fixed";
            card[i].pressobj.className += "pressobjclass"
            card[i].pressobj.style.zIndex = "20";
            card[i].pressobj.style.backgroundColor = "red";
            card[i].FrontObject.appendChild(card[i].pressobj);
        };
    }
}
function turnCard(cardnum) {
    // אם המצב שווה ללא נכון, אז מבצעים את הפעילויות האלו
    if (global_Data.consoleIsopen == true) {
        return
    };

    if (card[cardnum].cardWone == true || statuS.card1 == cardnum || statuS.card2 == cardnum) {} //אם אחד מהתנאים מתקיים אל תעשה כלום
    else if (statuS.endingTurn == true) { // אם לוחצים באמצע התור
        var Keep_cardVlaue = cardnum;
        window.clearTimeout(endTurn);
        endTurn();
        statuS.card1 = 0;
        statuS.card2 = 0;
        cardnum = Keep_cardVlaue;
        statuS.card1 = cardnum
        statuS.turn = true;
        turnCard(cardnum);
        card[cardnum].Cobject.classList.add("flipped")
        AddtoFlipCount(cardnum);
    } else if (statuS.turn == false && statuS.endingTurn == false) {
        statuS.turn = true;
        statuS.card1 = cardnum;
        card[cardnum].Cobject.classList.add("flipped");
        AddtoFlipCount(cardnum);
    } else if (statuS.turn == true && statuS.endingTurn == false) {
        statuS.card2 = cardnum;
        card[cardnum].Cobject.classList.add("flipped");
        statuS.endingTurn = true;
        AddtoFlipCount(cardnum);
        if (card[statuS.card1].contentOfcard == card[statuS.card2].contentOfcard) {
            wonTurn()
        } else {
            //conWrite ("endturnd timer");
            window.clearTimeout(timeoutId);
            timeoutId = setTimeout(endTurn, 4000);
        }
        //conWrite (cardnum);
    }
    //conWrite ("turncard");
}
function AddtoFlipCount(cardnumberforaudio) {
    playCardAudio(cardnumberforaudio); // this is the place where the play sound card is invoked.
    global_Data.NumOflips++;
    var flipNodeTexT = 0
    if (global_Data.gamelevel == 2) {
        global_Data.NumOfRemainigFlips = global_Data.NumOfChalangeFlips -
            global_Data.NumOflips;
        flipNodeTexT = global_Data.NumOfRemainigFlips;
    } else {
        flipNodeTexT = global_Data.NumOflips
    }
    if (global_Data.NumOfRemainigFlips < 1) {
        global_Data.ChallangeLost = true;
        ConsoleBoard(false, true)
    } //loset the game

    //global_Data.HeaderCountObject.innerHTML = flipNodeTexT;
    flipNodeText = "<table style='table-layout:fixed; width:3vmin'><tr><th>" + flipNodeTexT + "</th></tr></table>"
    global_Data.HeaderCountND.innerHTML = flipNodeText;

}
function wonTurn() {
    global_Data.wins++

    card[statuS.card1].cardWone = true;
    card[statuS.card2].cardWone = true;
    statuS.card1 = 0;
    statuS.card2 = 0;
    statuS.turn = false;
    statuS.endingTurn = false;

    if (global_Data.wins == (NumOfcard / 2)) {
        ConsoleBoard(true)
    }

    if (global_Data.soundIson == true) {
        window.setTimeout(global_Data.woncardSound.play(), 200);
    }
}
function endTurn() {
    //conWrite ("endturnd starts");
    if (statuS.endingTurn == false) { //conWrite ("endturnd canceled");
    } else {
        card[statuS.card1].Cobject.classList.remove("flipped");
        card[statuS.card2].Cobject.classList.remove("flipped");;
        statuS.card1 = 0;
        statuS.card2 = 0;
        statuS.turn = false;
        statuS.endingTurn = false;
        //conWrite ("endturnd finished");
    }
}
function boardBuilder() {


    for (i = 1; i < NumOfcard + 1; i++) {
        /*FRAME*/
        var card01 = document.createElement("div");
        window.card[i].Cobject = card01;
        card[i].Cobject.class = i;
        card[i].Cobject.classList.add("flip-container");
        card[i].Cobject.style.height = global_Data.cardHeight;
        card[i].Cobject.style.width = global_Data.cardWidth;
        card[i].Cobject.number = i;
        card[i].number = "numbers " + i;
        card[i].Cardwrapper = document.createElement("div");
        card[i].BackObject = document.createElement("div");
        card[i].FrontObject = document.createElement("div");
        card[i].Cobject.number = i;
        card[i].FrontObject.number = i;
        card[i].BackObject.number = i;
        card[i].Cardwrapper.number = i;



        card[i].Cardwrapper.appendChild(card[i].Cobject);
        card[i].Cobject.appendChild(card[i].BackObject);
        card[i].Cobject.appendChild(card[i].FrontObject);
        card[i].BackObject.classList.add("back");
        card[i].FrontObject.classList.add("front");
        card[i].Cardwrapper.classList.add("cardWrappStyle");




        global_Data.widthOfcard = window.getComputedStyle(card[1].Cobject, null).getPropertyValue("width");
        global_Data.heightOfcard = window.getComputedStyle(card[1].Cobject, null).getPropertyValue("height");

        card[i].press = function() {
            turnCard(event.target.number);
        };
        card[i].Cobject.addEventListener("click", card[i].press, false);


        var y = i - 1 // new line every 4 rows
        if (Math.ceil(y / global_Data.numColsToCut) == (y / global_Data.numColsToCut)) {
            card[i].Cardwrapper.style.clear = "left"
        }
        document.getElementById("wrapper01").appendChild(card[i].Cardwrapper);
    }

    document.getElementById('wrapper01').ondragstart = function() {
        return false;
    };

}
function cardPictureBuilder() { // if you dont need this the erase the function
    for (i = 1; i < NumOfcard + 1; i++) {

        if (i > 0) {

            //card[i].picture.adress = "CardsImage/" + card[i].contentOfcard + ".jpg" ;
            var PictureInCard = document.createElement("img");
            card[i].DivForPictureInCard = document.createElement("div");

            PictureInCard.scr = "CardsImage/" + card[i].picture + ".jpg"
            card[i].picture.obj = PictureInCard;
            // appending a div inside the back object
            card[i].BackObject.appendChild(card[i].DivForPictureInCard);
            card[i].DivForPictureInCard.appendChild(PictureInCard);

            card[i].BackObject.style.backgroundImage = "url(" + PictureInCard.scr + ")";
            card[i].BackObject.style.height = "100%" // global_Data.heightOfcard;
            card[i].BackObject.style.width = "100%" // global_Data.widthOfcard;
            card[i].BackObject.style.backgroundSize = "100% 100%";
            card[i].BackObject.style.backfaceVisibility = "hidden";
            card[i].BackObject.style.zIndex = "-1";
            card[i].FrontObject.style.backfaceVisibility = "hidden";

            card[i].Back_pressobj = document.createElement("div");

            card[i].Back_pressobj.style.position = "fixed";
            card[i].Back_pressobj.style.top = "0px"
            card[i].Back_pressobj.style.left = "0px"

            card[i].Back_pressobj.className += "pressobjclass2"
            card[i].Back_pressobj.style.zIndex = "20";

            card[i].Back_pressobj.style.backfaceVisibility = "visible";
            card[i].Back_pressobj.style.height = "100%";
            card[i].Back_pressobj.style.width = "100%";
            card[i].BackObject.appendChild(card[i].Back_pressobj);
        } // close the if
    }
}
function HeaderBuilder() {

    // BUILDING THE TEXT OF HEADER
    global_Data.HeaderText = ""
    if (global_Data.gameTrophy == "B") {
        global_Data.HeaderText += " ⭐️ "
    }
    if (global_Data.gameTrophy == "C") {
        global_Data.HeaderText += " ⭐️⭐️ "
    }
    if (global_Data.gameTrophy == "D") {
        global_Data.HeaderText += " ⭐️⭐️⭐️"
    }
    global_Data.HeaderText += global_Data.ThegameHeadline;
    if (global_Data.gamelevel > 1) {
        global_Data.HeaderText = global_Data.HeaderText + "" //  "  אתגר  "
    };


    global_Data.bodyObject = document.getElementsByTagName("BODY")[0];
    global_Data.bodyObject.style.backgroundColor = "#666666";
    global_Data.bodyObject.style.backgroundImage = "url(" + global_Data.back_image + ")";
    global_Data.bodyObject.style.backgroundBlendMode = "lighten";
    global_Data.bodyObject.style.backgroundSize = "cover";


    global_Data.cog_img = document.createElement("IMG");
    global_Data.cog_img.src = 'GUIimage/settingCog.png';
    global_Data.sound_img = document.createElement("IMG");
    global_Data.sound_img.src = 'GUIimage/soundOn.png';
    global_Data.HeaderTitle = document.createElement("div");
    global_Data.HeaderTextND = document.createElement("div");
    global_Data.HeaderTextND.style.float = "left";
    // adds spaces to the text according to the length
    var lnth = global_Data.HeaderText.length || 0
    var added_spaces = "";
    for (x = 20; x > lnth; x--) {
        added_spaces += "&nbsp"

    }
    global_Data.HeaderTextND.innerHTML = added_spaces + global_Data.HeaderText
    global_Data.HeaderCountObject = document.createElement("div");
    global_Data.HeaderStoperObject = document.createElement("div"); //the stopper
    global_Data.HeaderStoperND = document.createTextNode("00:00");
    global_Data.HeaderCountObject.style.shadow = "text-shadow: 2px 2px 4px #000;";
    global_Data.HeaderTitle.appendChild(global_Data.HeaderCountObject);
    global_Data.HeaderTitle.appendChild(global_Data.HeaderStoperObject);
    global_Data.HeaderStoperObject.appendChild(global_Data.HeaderStoperND);
    var flipNodeText = 0;

    if (global_Data.gamelevel == 2) {
        flipNodeText = global_Data.NumOfRemainigFlips
    } else {
        flipNodeText = global_Data.NumOflips
    }
    flipNodeText = "<table style='table-layout:fixed; width:3vmin'><tr><th>" + flipNodeText + "</th></tr></table>"
    global_Data.HeaderCountND = document.createElement('div');
    global_Data.HeaderCountND.innerHTML = flipNodeText;

    global_Data.HeaderCountObject.appendChild(global_Data.HeaderCountND);
    global_Data.HeaderCountObject.style.float = "left";
    global_Data.HeaderStoperObject.style.float = "left";
    global_Data.HeaderStoperObject.style.margin = "0px 0px 0px 40px";
    global_Data.HeaderTitle.appendChild(global_Data.HeaderTextND);
    document.getElementById("gameConsole").appendChild(global_Data.HeaderTitle);
    global_Data.HeaderTitle.style.textAlign = "center";
    //global_Data.HeaderTitle.style.fontWeight = "bold";
    global_Data.HeaderTitle.style.textShadow = "2px 2px 1px #44297a, 3px 3px 1px #20133a"
    global_Data.HeaderTitle.appendChild(global_Data.sound_img);
    global_Data.HeaderTitle.appendChild(global_Data.cog_img);
    global_Data.cog_img.style.float = "right";
    global_Data.cog_img.style.width = '4%'
    global_Data.cog_img.style.height = '4%'
    global_Data.cog_img.style.marginRight = "2%"
    global_Data.cog_img.style.marginTop = "0.5%"
    global_Data.cog_img.addEventListener("click", settingsConsoleButtonPress, false);
    global_Data.sound_img.style.float = "right";
    global_Data.sound_img.style.width = '5%'
    global_Data.sound_img.style.height = '5%'
    global_Data.sound_img.addEventListener("click", soundToggle, false);
    //global_Data.sound_img.style.position = "absolute";
    document.getElementById('gameConsole').ondragstart = function() {
        return false;
    };

}
function settingsConsoleButtonPress() {
    if (global_Data.consoleIsopen == true) {
        DeleteConsole()
    } else {
        ConsoleBoard();
    }
}
function soundToggle() {

    if (global_Data.soundIson == true) {
        global_Data.sound_img.src = 'GUIimage/soundOff.png';
        global_Data.soundIson = false;
    } else if (global_Data.soundIson == false) {
        global_Data.sound_img.src = 'GUIimage/soundOn.png';
        global_Data.soundIson = true;
    }
    var bool = global_Data.soundIson
    localStorage.StorageSoundIsOn = bool.toString()

}
function stopWatch() {
    global_Data.stopWatchTIME = 0;
    var ChangeTimeInterval = 100 //change time interval every X milisecinds
    if (global_Data.gamelevel == 3) {
        var TimeClicks = global_Data.NumOfChalangeSeconds * 10;
    } else {
        var TimeClicks = 0
    } // each time the function adds a time

    function secondPrint() {
        var formattedminutes = ("0" + global_Data.minutes).slice(-2);
        var formattedseconse = ("0" + global_Data.seconds).slice(-2);
        var TheTimeText = formattedminutes + ":" + formattedseconse + "." + global_Data.miliseconds;
        global_Data.woneTime = TheTimeText;
        let monoTxt = monospaceHtml(TheTimeText)
        TheTimeText = monoTxt;
        let specialFont = "<font>" // "<font face='david'>"
        global_Data.HeaderStoperObject.innerHTML = TheTimeText;

        if (global_Data.consoleIsopen == true) {
            global_Data.HeaderStoperObject.classList.add('blink_me');
        } else {
            global_Data.HeaderStoperObject.classList.remove('blink_me');
        }


        if (global_Data.consoleIsopen == false) {
            if (global_Data.gamelevel == 3) {
                TimeClicks--
            } else {
                TimeClicks++
            }
        }
        if (global_Data.gamelevel == 3 && TimeClicks < 1 && global_Data.ChallangeLost == false) {
            global_Data.ChallangeLost = true;
            ConsoleBoard(false, true)
        }
        if (global_Data.seconds >= 0) {} else {
            global_Data.seconds = 0
        };
        global_Data.seconds = Math.floor(TimeClicks / ChangeTimeInterval * 10) - (global_Data.minutes * 60);

        var str = TimeClicks + "0";
        global_Data.miliseconds = str.charAt(str.length - 2); // geting only the last Char of the TIME clicks wich is the ones

        if (global_Data.seconds >= 0) {} else {
            global_Data.seconds = 0
        };
        global_Data.minutes = Math.floor(Math.floor(TimeClicks / ChangeTimeInterval * 10) / 60);
    }


    window.setInterval(function() {
        secondPrint();
    }, ChangeTimeInterval);
}
function ConsoleBoard(woneOrnot, LooseOrnot) {

    if (woneOrnot == true) {
        (global_Data.soundIson == true) ? global_Data.wonboardSound.play(): 1
        levelUp()
    } else {
        (global_Data.soundIson == true) ? global_Data.popboardSound.play(): 1
    }




    global_Data.consoleIsopen = true;
    winningScreen = new Object();
    /*  game consol design */

    winningScreen.Divobject = document.createElement("div");
    //   winningScreen.Divobject.style.backgroundColor = "#800040";
    winningScreen.Divobject.style.background = '  linear-gradient(to bottom, rgba(1,59,66,0.95) 0%,rgba(2,71,88,0.95) 3%,rgba(3,92,124,0.95) 8%,rgba(39,63,117,0.95) 29%,rgba(17,59,95,0.94) 67%,rgba(0,56,79,0.94) 96%)';
    winningScreen.Divobject.style.position = "fixed";
    winningScreen.Divobject.style.left = "10%"
    winningScreen.Divobject.style.bottom = "10%";
    winningScreen.Divobject.style.height = "70%";
    winningScreen.Divobject.style.width = "80%";
    winningScreen.Divobject.style.padding = "-15px"
    winningScreen.Divobject.style.borderRadius = "50% / 10%";
    winningScreen.Divobject.style.border = "ridge #3d3d29 6px";
    winningScreen.Divobject.style.fontSize = "130%";

    var textFinished = ["", "", ""]
    var NumberOfFinishtexts = 3;

    if (woneOrnot == true) {
        textFinished[1] = "כל הכבוד !"
    } else if (LooseOrnot == true) {
        textFinished[1] = " לא נורא !" + " " + "נסו שוב !"
    }
    //else {textFinished [1] = "משחק מושהה"};
    textFinished[2] = "זמן: " + global_Data.woneTime
    textFinished[3] = "קלפים שנהפכו: " + global_Data.NumOflips;
    textFinished[4] = "" //"משחק נוסף";



    global_Data.FinishTextNode = ["", "", ""];

    // make a for loop for creating a winning text"
    //golobal_data.FinishTextNode.length
    if (woneOrnot == true) {} else {
        buttonReturnToGame = {
            "number": i,
            "color": "white",
            "buttonObj": "Card number " + i,
            "buttonHoverText": false,
            "textOnButton": "חזרה למשחק",
            "DivForPictureInCard": "",
            "PictureInCard": ""
        };
        if (global_Data.ChallangeLost == true) {
            buttonReturnToGame.textOnButton = "משחק חוזר"
        }
        buttonReturnToGame.buttonObj = document.createElement("BUTTON");
        var textnode = document.createTextNode(buttonReturnToGame.textOnButton);
        buttonReturnToGame.buttonObj.appendChild(textnode)
        buttonReturnToGame.buttonObj.number = i;
        buttonReturnToGame.buttonObj.classList.add("flash-button")
        buttonReturnToGame.buttonObj.classList.add("button")
        winningScreen.Divobject.appendChild(buttonReturnToGame.buttonObj);
        buttonReturnToGame.ClickerFunc = function() {
            DeleteConsole()
        } // delete console
        buttonReturnToGame.buttonObj.addEventListener("click", DeleteConsole, false)
    }

    for (y = 0; y < textFinished.length; y++) {



        global_Data.FinishTextNode[y] = document.createTextNode(textFinished[y]);

        var span = document.createElement("span");
        span.appendChild(global_Data.FinishTextNode[y]);

        var HTMLbreak = document.createElement("br");
        span.style.fontSize = "130%";



        if (y == 1) {
            span.style.fontSize = "150%";
        } else if (y == 2) {
            winningScreen.Divobject.appendChild(HTMLbreak)
        } else {
            span.style.fontSize = "130%"
        }

        winningScreen.Divobject.appendChild(span);

        var br_node = document.createElement("BR");
        br_node.style.lineHeight = "0";
        br_node.style.fontSize = "10%"
        winningScreen.Divobject.appendChild(br_node);
    }
    winningScreen.Divobject.style.textAlign = "center";
    winningScreen.Divobject.style.color = "white";
    winningScreen.Divobject.style.direction = "rtl";
    winningScreen.Divobject.style.verticalAlign = "middle"

    //winningScreen.Divobject.style.fontWeight = "bold";
    winningScreen.Divobject.style.textShadow = "2px 2px 1px #44297a, 3px 3px 1px #20133a";
    winningScreen.Divobject.style.fontSize = "130%";
    winningScreen.Divobject.style.fontFamily = 'noot';
    // var droneTextnode = document.createTextNode(":");   winningScreen.Divobject.appendChild(droneTextnode);
    //winningScreen.Divobject.appendChild(br_node);

    document.getElementById("wrapper01").appendChild(winningScreen.Divobject);

    buttonNewgame = ["", "", ""]
    for (i = 0; i < 4; i++) {
        buttonNewgame[i] = {
            "number": i,
            "color": "white",
            "buttonObj": "Card number " + i,
            "buttonHoverText": false,
            "textOnButton": "",
            "DivForPictureInCard": "",
            "PictureInCard": ""
        };
    };

    if (global_Data.ChallangeLost == true) {
        buttonNewgame[0].textOnButton = "נסיון חוזר"
    } else {
        buttonNewgame[0].textOnButton = "חזרה למשחק";
    }
    buttonNewgame[1].textOnButton = "משחק חדש -רגיל ";
    buttonNewgame[2].textOnButton = " אתגר " + global_Data.NumOfChalangeFlips + " היפוכים "
    buttonNewgame[3].textOnButton = " אתגר  " + global_Data.NumOfChalangeSeconds + " שניות ";
    buttonNewgame[2].textIfneedsTofinish = "יש לסיים משחק רגיל"
    buttonNewgame[3].textIfneedsTofinish = "יש לסיים את האתגר הקודם"


    for (i = 1; i < 4; i++) {
        buttonNewgame[i].buttonObj = document.createElement("BUTTON");
        var textnode = document.createTextNode(buttonNewgame[i].textOnButton);
        buttonNewgame[i].buttonObj.appendChild(textnode)
        buttonNewgame[i].buttonObj.number = i;
        buttonNewgame[i].buttonObj.classList.add("button")
        winningScreen.Divobject.appendChild(buttonNewgame[i].buttonObj);
        buttonNewgame[i].ClickerFunc = function() {
            RequestNewGame(event.target.number)
        }
        buttonNewgame[i].buttonObj.addEventListener("click", buttonNewgame[i].ClickerFunc, false)
    }



    winningScreen.extraTextDiv = document.createElement("div");
    winningScreen.Divobject.appendChild(winningScreen.extraTextDiv)
    winningScreen.extraTextDiv.style.fontSize = "20px"
    winningScreen.extraTextDiv.style.color = "yellow"



}
function DeleteConsole() {
    if (global_Data.ChallangeLost == true) {
        location.reload()
    }
    global_Data.consoleIsopen = false;
    (global_Data.soundIson == true) ? global_Data.popboardSound.play(): null
    winningScreen.Divobject.parentNode.removeChild(winningScreen.Divobject);
}
function RequestNewGame(newGamenumber) {

    switch (newGamenumber) {

        case 1:
            global_Data.gamelevel = 1;
            gameModeStatus(true);
            location.reload();
            break;

        case 2:

            if (global_Data.gameTrophy != "A") {
                global_Data.gamelevel = 2;
                gameModeStatus(true)
                location.reload();
                break;
            };
            break;

        case 3:

            if (global_Data.gameTrophy == "C" || global_Data.gameTrophy == "D") {
                global_Data.gamelevel = 3
                gameModeStatus(true);
                location.reload();
                break;
            }
            break;

    }

    winningScreen.extraTextDiv.innerHTML = buttonNewgame[newGamenumber].textIfneedsTofinish ////

    //winningScreen.extraTextDiv.innerHTML = "fsdfasdf" //buttonNewgame[newGamenumber].textIfneedsTofinish;
}
function gameModeStatus(changeTheFrameOrnot) { // if changeframe is true than it copies the values to the "cookie", else it creats a new game.
    //G.saveInLocalStorageKey // session storage;
    let saved = sessionStorage.getItem(G.saveInLocalStorageKey)
    console.log (saved)
    if (window.name == "") {
        window.name = "A,1"
        sessionStorage.setItem(G.saveInLocalStorageKey,"A,1")
    } else if (changeTheFrameOrnot == true) {
        window.name = global_Data.gameTrophy + "," + global_Data.gamelevel
        sessionStorage.setItem(G.saveInLocalStorageKey,global_Data.gameTrophy + "," + global_Data.gamelevel)
    };
    var stringFromWindowName = window.name;
    var modearray = stringFromWindowName.split(",");
    return modearray;
}
function levelUp() {

    switch (global_Data.gameTrophy) {
        case "A":
            global_Data.gameTrophy = "B";
            gameModeStatus(true) // change the "save"
            break;

        case "B":
            if (global_Data.gamelevel == 2) {
                global_Data.gameTrophy = "C";
                gameModeStatus(true)
            }
            break;

        case "C":
            if (global_Data.gamelevel == 3) {
                global_Data.gameTrophy = "D";
                gameModeStatus(true)
            }
            break;
    }

}
function test () {
global_Data.developeMode = true;
return "develope mode: on"
}

function GetvaluesfromConfigFile() {
    //global_Data.developeMode = true;
    global_Data.NumOfChalangeFlips = 0;
    global_Data.NumOfChalangeSeconds = 0;

}


/* the program itself*/
// the start if the program and calling the functions Is from here ->

/*testing for boardwining quiq///*/
/*this code allows you to win with esc key*/
document.onkeydown = function(evt) {

    if (global_Data.developeMode == false) {
        return
    };
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc" || evt.key == 1);
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
        ConsoleBoard(true);
    }
};
function getValuesFromConfig() {

    function validatValue(theVar, typeOfvar) {
        if (typeOfvar == "boolean") {
            return (theVar == 0 || theVar == 1) ? true : false
        } else if (typeOfvar == "int") {
            return (theVar > 0 && theVar < 1000) ? true : false
        } else {
            return false
        }
    }
    var errorWithValue = false;

    if (G.name_of_game !== 'undefined') {
        global_Data.ThegameHeadline = G.name_of_game
    };

    if (typeof G.flip_chalange !== 'undefined') {
        validatValue(G.flip_chalange, "int") ? global_Data.NumOfChalangeFlips = G.flip_chalange : errorWithValue = true
    }
    if (typeof G.seconds_challange !== 'undefined') {
        validatValue(G.seconds_challange, "int") ? global_Data.NumOfChalangeSeconds = G.seconds_challange : errorWithValue = true
    }

    if (typeof G.mute !== 'undefined' && (localStorage.StorageSoundIsOn !== "true" && localStorage.StorageSoundIsOn !== "false")) {
        validatValue(G.mute, "boolean") ? global_Data.soundIson = !G.mute : errorWithValue = true
    }

    if (typeof G.dev_mode !== 'undefined') {
        validatValue(G.dev_mode, "boolean") ? global_Data.developeMode = G.dev_mode : errorWithValue = true
    }

    return errorWithValue
}
function setCardsize() {
    // this part is taken fron the web:
    var styleEl = document.createElement('style'),
        styleSheet
    // Append style element to head
    document.head.appendChild(styleEl);
    // Grab style sheet
    styleSheet = styleEl.sheet;
    //global_Data.window_width
    //global_Data.window_height


    var wideConst = 8
    var highConst = 5.5

    var Widefit = Math.round(global_Data.window_width / wideConst);
    var heightfit = Math.round(global_Data.window_height / highConst);
    styleSheet.insertRule('.flip-container {width:' + Widefit + 'px; height: ' + heightfit + 'px;}', 0);
}
function playCardAudio(num) {
    if (global_Data.soundIson == false) {
        return
    }
    var Audiofilepath = global_Data.audiofolderPath + "Sound" + card[num].picture.substring(4, 10) + ".mp3"
    var cardsoundObj = new Audio(Audiofilepath)
    cardsoundObj.play()
    return;


}
document.getElementById("ErrorCheck").innerHTML = "";
getValuesFromConfig()
boardBuilder();
cutImageUp();
cardPictureBuilder();
HeaderBuilder();
stopWatch();
soundToggle();
soundToggle();
