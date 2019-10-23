
var G = G || {}; /*global*/

function setGlobal (){
    G.CardsTorandomize = [1, 2, 3];
    G.cardFromFile = [1, 2, 3];
    G.window_width = window.innerWidth;
    G.window_height = window.innerHeight;
    G.audiofolderPath = "CardSound/";
    G.developeMode = false;
    G.gameTrophy = storeInLocal()[0];
    G.gamelevel = storeInLocal()[1];
    G.wasTheGamewone = false;
    G.NumOfChalangeFlips = 99; //number of flips do the flip challange
    G.NumOfChalangeSeconds = 100;
    G.NumOfRemainigFlips = G.NumOfChalangeFlips;
    G.ChallangeLost = false;
    G.cutedImage = "Defaultimage/frontOfcards.png";
    G.back_image = "Defaultimage/back_Groundimage.jpg";
    G.stopWatchTIME = new Date();
    G.numColsToCut = 6;
    G.ThegameHeadline = "משחק הזיכרון";
    /*changing the header*/
    G.consoleIsopen = false; // if the console is open
    G.NumOflips = 0;
    G.errorString = "Error no data";
    G.numRowsToCut = 4;
    G.cardFromFile.lenth = 100;
    G.wins = 0;
    G.woncardSound = new Audio("Sounds/Woncardsound.mp3");
    G.wonboardSound = new Audio("Sounds/Victory.mp3");
    G.popboardSound = new Audio("Sounds/BubblePop.mp3");
    G.timeoutId = new Object();
    G.NumOfcard = 24;
    G.card = [];
    G.statuS = {};
    G.statuS.turn = false;
    G.statuS.card1 = 0;
    G.statuS.card2 = 0;
    G.statuS.endingTurn = false;

}
function BuildAPP () {
    function randomColorForCards (cardNumber,rndNum = 0.5) {
        let coloeDeg = rndNum*388;
        let color = `linear-gradient(to right, hsl(${coloeDeg}, 44%, 68%) 0%, hsl(${coloeDeg}, 24%, 44%) 100%)`;
        return color;
    }
    function getRandomFromGameName (string) {
        let total = 0;
        for (let i = 0 ; i < string.length ; i++){
            const num = string.charCodeAt(i);
            total += num;
        }
        return (Math.sin(total) / 2) + 0.5;
    }
    function buildCards() {

        for (i = 1; i < (G.NumOfcard / 2) + 2; i++) {
            G.cardFromFile[i] = {
                "valueOfcard": i,
                "Apart": "a",
                "Apart": "b ",
                "cardWone": false
            };
        }
        for (i = 1; i < (G.NumOfcard) + 5; i++) {
            G.CardsTorandomize[i] = {
                "valueOfcard": i,
                "color": "white",
                "cardBack": "InTheCard",
                "cardWone": false
            };
        }

        var foo = 1;
        for (i = 0; i < G.NumOfcard + 40; i++) {
            G.card[i] = {
                "number": i,
                "color": "white",
                "cardBack": "Card number " + i,
                "cardWone": false,
                "picture": "",
                "DivForPictureInCard": "",
                "PictureInCard": ""
            };
        };
        for (i = 1; i < 10; i++) {
            G.cardFromFile[i].Apart = "Card0" + i + "A";
            G.cardFromFile[i].Bpart = "Card0" + i + "B";
        }
        for (i = 10; i < 13; i++) {
            G.cardFromFile[i].Apart = "Card" + i + "A";
            G.cardFromFile[i].Bpart = "Card" + i + "B";
        }
        for (i = 1; i <= (G.NumOfcard); i++) {
            if (i <= (G.NumOfcard / 2)) {
                G.CardsTorandomize[i].valueOfcard = G.cardFromFile[i].valueOfcard;
                G.CardsTorandomize[i].InTheCard = G.cardFromFile[i].Apart;
            } else {
                G.CardsTorandomize[i].valueOfcard = G.cardFromFile[i - (G.NumOfcard / 2)].valueOfcard;
                G.CardsTorandomize[i].InTheCard = G.cardFromFile[i - (G.NumOfcard / 2)].Bpart;
            }
        }
        for (i = 1; i < 27; i++) {
            G.card[i].contentOfcard = G.errorString;
            G.CardsTorandomize[i].writtenTocard = false
        }
        var n = 1;
        while (n < (G.NumOfcard + 1)) {
            var i = 0;
            var rnd = Math.floor((Math.random() * 24) + 1);
            if (G.CardsTorandomize[rnd].writtenTocard == false) {
                G.card[n].contentOfcard = G.CardsTorandomize[rnd].InTheCard;
                G.CardsTorandomize[rnd].writtenTocard = true;
                n++;
            }
        }
        for (i = 1; i < G.NumOfcard + 1; i++) {
            G.card[i].picture = G.card[i].contentOfcard
        }
        for (i = 1; i < G.NumOfcard + 1; i++) {
            var str = G.card[i].contentOfcard
            var lnth = str.length;
            var strWithoutAB = str.substring(0, lnth - 1)
            G.card[i].contentOfcard = strWithoutAB
        }
    }
    function setCardsize() {

        var styleEl = document.createElement("style"), styleSheet;
        document.head.appendChild(styleEl);
        styleSheet = styleEl.sheet;
        var wideConst = 8;
        var highConst = 5.5;
        var Widefit = Math.round(G.window_width / wideConst);
        var heightfit = Math.round(G.window_height / highConst);
        styleSheet.insertRule(".flip-container {width:" + Widefit + "px; height: " + heightfit + "px;}", 0);
    }
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
        if (G.name_of_game !== "undefined") {
            G.ThegameHeadline = G.name_of_game;
        };
        if (typeof G.flip_chalange !== "undefined") {
            validatValue(G.flip_chalange, "int") ? G.NumOfChalangeFlips = G.flip_chalange : errorWithValue = true
        }
        if (typeof G.seconds_challange !== "undefined") {
            validatValue(G.seconds_challange, "int") ? G.NumOfChalangeSeconds = G.seconds_challange : errorWithValue = true
        }
        if (typeof G.mute !== "undefined" && (localStorage.StorageSoundIsOn !== "true" && localStorage.StorageSoundIsOn !== "false")) {
            validatValue(G.mute, "boolean") ? G.soundIson = !G.mute : errorWithValue = true
        }
        if (typeof G.dev_mode !== "undefined") {
            validatValue(G.dev_mode, "boolean") ? G.developeMode = G.dev_mode : errorWithValue = true
        }
        return errorWithValue
    }
    function boardBuilder() {
        const randFromName = getRandomFromGameName(G.name_of_game || "123")
        function turnCard(cardnum) {
            function wonTurn() {
                G.wins++

                G.card[G.statuS.card1].cardWone = true;
                G.card[G.statuS.card2].cardWone = true;
                G.statuS.card1 = 0;
                G.statuS.card2 = 0;
                G.statuS.turn = false;
                G.statuS.endingTurn = false;

                if (G.wins == (G.NumOfcard / 2)) {
                    ConsoleBoard(true)
                }

                if (G.soundIson == true) {
                    setTimeout(G.woncardSound.play(), 200);
                }
            }
            function endTurn() {
                //conWrite ("endturnd starts");
                if (G.statuS.endingTurn == false) { //conWrite ("endturnd canceled");
                } else {
                    G.card[G.statuS.card1].Cobject.classList.remove("flipped");
                    G.card[G.statuS.card2].Cobject.classList.remove("flipped");;
                    G.statuS.card1 = 0;
                    G.statuS.card2 = 0;
                    G.statuS.turn = false;
                    G.statuS.endingTurn = false;
                    //conWrite ("endturnd finished");
                }
            }
            function AddtoFlipCount(cardnumberforaudio) {
                function playCardAudio(num) {
                    if (G.soundIson == false) {
                        return
                    }
                    var Audiofilepath = G.audiofolderPath + "Sound" + G.card[num].picture.substring(4, 10) + ".mp3"
                    var cardsoundObj = new Audio(Audiofilepath)
                    cardsoundObj.play()
                    return;


                }
                playCardAudio(cardnumberforaudio); // this is the place where the play sound card is invoked.
                G.NumOflips++;
                var flipNodeTexT = 0;
                if (G.gamelevel == 2) {
                    G.NumOfRemainigFlips = G.NumOfChalangeFlips - G.NumOflips;
                    flipNodeTexT = G.NumOfRemainigFlips;
                } else {
                    flipNodeTexT = G.NumOflips;
                }
                if (G.NumOfRemainigFlips < 1) {
                    G.ChallangeLost = true;
                    ConsoleBoard(false, true)
                } //loset the game

                //G.HeaderCountObject.innerHTML = flipNodeTexT;
                flipNodeText = "<table style='table-layout:fixed; width:3vmin'><tr><th>" + flipNodeTexT + "</th></tr></table>"
                G.HeaderCountND.innerHTML = flipNodeText;

            }
            if (G.consoleIsopen == true) {
                return
            };


            if (G.card[cardnum].cardWone == true || G.statuS.card1 == cardnum || G.statuS.card2 == cardnum) {}
            else if (G.statuS.endingTurn == true) {
                var Keep_cardVlaue = cardnum;
                clearTimeout(endTurn);
                endTurn();
                G.statuS.card1 = 0;
                G.statuS.card2 = 0;
                cardnum = Keep_cardVlaue;
                G.statuS.card1 = cardnum;
                G.statuS.turn = true;
                turnCard(cardnum);
                G.card[cardnum].Cobject.classList.add("flipped")
                AddtoFlipCount(cardnum);
            } else if (G.statuS.turn == false && G.statuS.endingTurn == false) {
                G.statuS.turn = true;
                G.statuS.card1 = cardnum;
                G.card[cardnum].Cobject.classList.add("flipped");
                AddtoFlipCount(cardnum);
            } else if (G.statuS.turn == true && G.statuS.endingTurn == false) {
                G.statuS.card2 = cardnum;
                G.card[cardnum].Cobject.classList.add("flipped");
                G.statuS.endingTurn = true;
                AddtoFlipCount(cardnum);
                if (G.card[G.statuS.card1].contentOfcard == G.card[G.statuS.card2].contentOfcard) {
                    wonTurn()
                } else {
                    //conWrite ("endturnd timer");
                    clearTimeout(G.timeoutId);
                    G.timeoutId = setTimeout(endTurn, 4000);
                }
                //conWrite (cardnum);
            }
            //conWrite ("turncard");
        }


        for (i = 1; i < G.NumOfcard + 1; i++) {
            /*FRAME*/
            var card01 = document.createElement("div");
            G.card[i].Cobject = card01;
            G.card[i].Cobject.class = i;
            G.card[i].Cobject.classList.add("flip-container");
            G.card[i].Cobject.style.height = G.cardHeight;
            G.card[i].Cobject.style.width = G.cardWidth;
            G.card[i].Cobject.number = i;
            G.card[i].number = "numbers " + i;
            G.card[i].Cardwrapper = document.createElement("div");
            G.card[i].BackObject = document.createElement("div");
            G.card[i].FrontObject = document.createElement("div");
            G.card[i].Cobject.number = i;
            G.card[i].FrontObject.number = i;
            G.card[i].BackObject.number = i;
            G.card[i].Cardwrapper.number = i;



            G.card[i].Cardwrapper.appendChild(G.card[i].Cobject);
            G.card[i].Cobject.appendChild(G.card[i].BackObject);
            G.card[i].Cobject.appendChild(G.card[i].FrontObject);
            G.card[i].BackObject.classList.add("back");
            G.card[i].FrontObject.classList.add("front");


            G.card[i].FrontObject.style.background = randomColorForCards(i,randFromName );
            G.card[i].Cardwrapper.classList.add("cardWrappStyle");




            G.widthOfcard = window.getComputedStyle(G.card[1].Cobject, null).getPropertyValue("width");
            G.heightOfcard = window.getComputedStyle(G.card[1].Cobject, null).getPropertyValue("height");

            G.card[i].press = function() {
                turnCard(event.target.number);
            };
            G.card[i].Cobject.addEventListener("click", G.card[i].press, false);


            var y = i - 1 // new line every 4 rows
            if (Math.ceil(y / G.numColsToCut) == (y / G.numColsToCut)) {
                G.card[i].Cardwrapper.style.clear = "left"
            }
            document.getElementById("wrapper01").appendChild(G.card[i].Cardwrapper);
        }

        document.getElementById("wrapper01").ondragstart = function() {
            return false;
        };

    }
    function cutImageUp() {
        function cutedImageSize () {
            var DroneImage = document.createElement("img");
            DroneImage.src = G.cutedImage; // the whole picture to be cut
            DroneImage.style.position = "fixed";
            DroneImage.style.left = "-20000px";
            document.body.appendChild(DroneImage);
            DroneImage.onload = function() {
                G.SplicedImage_height = DroneImage.height;
                G.SplicedImage_width = DroneImage.width;
            }
        }
        cutedImageSize();
        var theCSS_height = window.getComputedStyle(G.card[1].Cobject, null).getPropertyValue("height");
        theCSS_height = parseInt(theCSS_height)
        var theCSS_width = window.getComputedStyle(G.card[1].Cobject, null).getPropertyValue("width");
        G.widthOfcard = theCSS_width;
        G.heightOfcard = theCSS_height;
        theCSS_width = parseInt(theCSS_height);
        var ImageObject123 = document.createElement("IMG");
        ImageObject123.src = G.cutedImage;
        window.onload = drawCanvasParts;
        ImageObject123.onload = drawCanvasParts;
        function drawCanvasParts () {
            for (i = 1; i < G.NumOfcard + 1; i++) {
                var z = i;
                G.card[i].partiatImage = document.createElement("IMG");
                G.card[i].partiatImage.src = G.cutedImage;

                G.card[i].Frontcanvas = document.createElement("canvas");
                G.card[i].Frontcanvas.style.position = "absolute";
                G.card[i].Cobject.style.zIndex = "1";
                G.card[i].FrontObject.appendChild(G.card[i].Frontcanvas);
                var ctx = G.card[i].Frontcanvas.getContext("2d");
                G.numRowsToCut = 4;
                G.numColsToCut = 6;
                var x_numTocut = Math.ceil(i / G.numColsToCut);
                var y_numTocut = Math.ceil(i / G.numRowsToCut);
                var overallResize1 = 1;
                var overallResize2 = 1;
                var stretchX = G.SplicedImage_width; //equals original width
                var stretchY = G.SplicedImage_height; //equals original height

                var Magic_number1 = 1.3 //original 1.3
                var Magic_number2 = 1.6 //original 1.5
                if (G.SplicedImage_width < theCSS_width * G.numColsToCut * Magic_number1) {
                    overallResize1 = ((theCSS_width * G.numColsToCut * Magic_number1) + G.SplicedImage_width) / (G.SplicedImage_width)
                };
                stretchX = G.SplicedImage_width * overallResize1;
                stretchY = G.SplicedImage_height * overallResize1;

                if (stretchY < theCSS_height * G.numRowsToCut * Magic_number1) {
                    overallResize2 = ((theCSS_height * G.numRowsToCut * Magic_number1) + stretchY) / (stretchY)
                };
                stretchX = G.SplicedImage_width * overallResize1 * overallResize2;
                stretchY = G.SplicedImage_height * overallResize1 * overallResize2;
                var x_Position_of_image = i - ((x_numTocut - 1) * G.numColsToCut);
                var y_Position_of_image = x_numTocut - 1;

                var drawx = (theCSS_width * -1 * (x_Position_of_image - 1) * Magic_number2);
                var drawy = (theCSS_width * -1 * y_Position_of_image * 1.0);

                ctx.drawImage(G.card[i].partiatImage, drawx, drawy, stretchX, stretchY);
                // ctx.drawImage(G.card[i].partiatImage,0,0,stretchX,stretchY);
                G.card[i].Frontcanvas.number = i;
                G.card[i].partiatImage.number = i;
                G.card[i].pressobj = document.createElement("DIV");
                G.card[i].pressobj.style.position = "fixed";
                G.card[i].pressobj.className += "pressobjclass"
                G.card[i].pressobj.style.zIndex = "20";
                G.card[i].pressobj.style.backgroundColor = "red";
                G.card[i].FrontObject.appendChild(G.card[i].pressobj);
            };
        }
    }
    function cardPictureBuilder() {
        for (i = 1; i < G.NumOfcard + 1; i++) {

            if (i > 0) {

                var PictureInCard = document.createElement("img");
                G.card[i].DivForPictureInCard = document.createElement("div");

                PictureInCard.scr = "CardsImage/" + G.card[i].picture + ".jpg"
                G.card[i].picture.obj = PictureInCard;
                G.card[i].BackObject.appendChild(G.card[i].DivForPictureInCard);
                G.card[i].DivForPictureInCard.appendChild(PictureInCard);

                G.card[i].BackObject.style.backgroundImage = "url(" + PictureInCard.scr + ")";
                G.card[i].BackObject.style.height = "100%" ;
                G.card[i].BackObject.style.width = "100%" ;
                G.card[i].BackObject.style.backgroundSize = "100% 100%";
                G.card[i].BackObject.style.backfaceVisibility = "hidden";
                G.card[i].BackObject.style.zIndex = "-1";
                G.card[i].FrontObject.style.backfaceVisibility = "hidden";

                G.card[i].Back_pressobj = document.createElement("div");

                G.card[i].Back_pressobj.style.position = "fixed";
                G.card[i].Back_pressobj.style.top = "0px"
                G.card[i].Back_pressobj.style.left = "0px"

                G.card[i].Back_pressobj.className += "pressobjclass2"
                G.card[i].Back_pressobj.style.zIndex = "20";

                G.card[i].Back_pressobj.style.backfaceVisibility = "visible";
                G.card[i].Back_pressobj.style.height = "100%";
                G.card[i].Back_pressobj.style.width = "100%";
                G.card[i].BackObject.appendChild(G.card[i].Back_pressobj);
            } // close the if
        }
    }
    function HeaderBuilder() {
        function settingsConsoleButtonPress() {
            if (G.consoleIsopen == true) {
                DeleteConsole()
            } else {
                ConsoleBoard();
            }
        }

        // BUILDING THE TEXT OF HEADER
        G.HeaderText = "";
        if (G.gameTrophy == "B") {
            G.HeaderText += " ⭐️ "
        }
        if (G.gameTrophy == "C") {
            G.HeaderText += " ⭐️⭐️ "
        }
        if (G.gameTrophy == "D") {
            G.HeaderText += " ⭐️⭐️⭐️"
        }
        G.HeaderText += G.ThegameHeadline;
        if (G.gamelevel > 1) {
            G.HeaderText = G.HeaderText + "" //
        };


        G.bodyObject = document.getElementsByTagName("BODY")[0];
        G.bodyObject.style.backgroundColor = "#666666";
        G.bodyObject.style.backgroundImage = "url(" + G.back_image + ")";
        G.bodyObject.style.backgroundBlendMode = "lighten";
        G.bodyObject.style.backgroundSize = "cover";


        G.cog_img = document.createElement("IMG");
        G.cog_img.src = "GUIimage/settingCog.png";
        G.sound_img = document.createElement("IMG");
        G.sound_img.src = "GUIimage/soundOn.png";
        G.HeaderTitle = document.createElement("div");
        G.HeaderTextND = document.createElement("div");
        G.HeaderTextND.style.float = "left";
        // adds spaces to the text according to the length
        var lnth = G.HeaderText.length || 0
        var added_spaces = "";
        for (x = 20; x > lnth; x--) {
            added_spaces += "&nbsp"

        }
        G.HeaderTextND.innerHTML = added_spaces + G.HeaderText
        G.HeaderCountObject = document.createElement("div");
        G.HeaderStoperObject = document.createElement("div"); //the stopper
        G.HeaderStoperND = document.createTextNode("00:00");
        G.HeaderCountObject.style.shadow = "text-shadow: 2px 2px 4px #000;";
        G.HeaderTitle.appendChild(G.HeaderCountObject);
        G.HeaderTitle.appendChild(G.HeaderStoperObject);
        G.HeaderStoperObject.appendChild(G.HeaderStoperND);
        var flipNodeText = 0;

        if (G.gamelevel == 2) {
            flipNodeText = G.NumOfRemainigFlips;
        } else {
            flipNodeText = G.NumOflips;
        }
        flipNodeText = "<table style='table-layout:fixed; width:3vmin'><tr><th>" + flipNodeText + "</th></tr></table>"
        G.HeaderCountND = document.createElement("div");
        G.HeaderCountND.innerHTML = flipNodeText;

        G.HeaderCountObject.appendChild(G.HeaderCountND);
        G.HeaderCountObject.style.float = "left";
        G.HeaderStoperObject.style.float = "left";
        G.HeaderStoperObject.style.margin = "0px 0px 0px 40px";
        G.HeaderTitle.appendChild(G.HeaderTextND);
        document.getElementById("gameConsole").appendChild(G.HeaderTitle);
        G.HeaderTitle.style.textAlign = "center";
        //G.HeaderTitle.style.fontWeight = "bold";
        G.HeaderTitle.style.textShadow = "2px 2px 1px #44297a, 3px 3px 1px #20133a"
        G.HeaderTitle.appendChild(G.sound_img);
        G.HeaderTitle.appendChild(G.cog_img);
        G.cog_img.style.float = "right";
        G.cog_img.style.width = "4%"
        G.cog_img.style.height = "4%"
        G.cog_img.style.marginRight = "2%"
        G.cog_img.style.marginTop = "0.5%"
        G.cog_img.addEventListener("click", settingsConsoleButtonPress, false);
        G.sound_img.style.float = "right";
        G.sound_img.style.width = "5%"
        G.sound_img.style.height = "5%"
        G.sound_img.addEventListener("click", soundToggle, false);
        //G.sound_img.style.position = "absolute";
        document.getElementById("gameConsole").ondragstart = function() {
            return false;
        };

    }
    function stopWatchBuilder() {
        function monospaceHtml(htm) {
            let arr = htm.split("");
            let addedChar = "</th><th>"
            let prefix = "<table style='table-layout:fixed; width:32vmin'><tr><th>"
            let finString = prefix;
            for (i in arr) {
                finString += arr[i]
                if (arr[i] === "." || arr[i] === ":" || i < 6) {
                    continue
                }
                finString += addedChar
            }
            return finString + "</tr></table>"
        }
        G.stopWatchTIME = 0;
        var ChangeTimeInterval = 100 //change time interval every X milisecinds
        if (G.gamelevel == 3) {
            var TimeClicks = G.NumOfChalangeSeconds * 10;
        } else {
            var TimeClicks = 0;
        } // each time the function adds a time

        function secondPrint() {
            var formattedminutes = ("0" + G.minutes).slice(-2);
            var formattedseconse = ("0" + G.seconds).slice(-2);
            var TheTimeText = formattedminutes + ":" + formattedseconse + "." + G.miliseconds;
            G.woneTime = TheTimeText;
            let monoTxt = monospaceHtml(TheTimeText)
            TheTimeText = monoTxt;
            let specialFont = "<font>" // "<font face="david">"
            G.HeaderStoperObject.innerHTML = TheTimeText;

            if (G.consoleIsopen == true) {
                G.HeaderStoperObject.classList.add("blink_me");
            } else {
                G.HeaderStoperObject.classList.remove("blink_me");
            }


            if (G.consoleIsopen == false) {
                if (G.gamelevel == 3) {
                    TimeClicks--
                } else {
                    TimeClicks++
                }
            }
            if (G.gamelevel == 3 && TimeClicks < 1 && G.ChallangeLost == false) {
                G.ChallangeLost = true;
                ConsoleBoard(false, true)
            }
            if (G.seconds >= 0) {} else {
                G.seconds = 0;
            };
            G.seconds = Math.floor(TimeClicks / ChangeTimeInterval * 10) - (G.minutes * 60);

            var str = TimeClicks + "0";
            G.miliseconds = str.charAt(str.length - 2); // geting only the last Char of the TIME clicks wich is the ones

            if (G.seconds >= 0) {} else {
                G.seconds = 0;
            };
            G.minutes = Math.floor(Math.floor(TimeClicks / ChangeTimeInterval * 10) / 60);
        }

        if (G.stopWatchInterval){clearInterval(G.stopWatchInterval)}
        G.stopWatchInterval = setInterval(function() {
            secondPrint();
        }, ChangeTimeInterval);
    }
    setGlobal ()

    if (G.isLanguageEnglish) { G.name_of_game = G.name_of_gameEN || G.name_of_game}
    if (localStorage.StorageSoundIsOn == "false") {G.soundIson = false} else {G.soundIson = true}
    document.getElementById("ErrorCheck").innerHTML = "";
    document.onkeydown = function(evt) {
        if (G.developeMode == false) {
            return
        };
        evt = evt || window.event;
        var isPushWin = false;
        var isPushLose = false;
        if ("key" in evt) {
            isPushWin = (evt.key == 1)
            isPushLose = (evt.key == 2) }
        if (isPushWin) {ConsoleBoard(true)}
        if (isPushLose) {ConsoleBoard(false, true);}
    };

    buildCards()
    setCardsize()
    getValuesFromConfig()
    boardBuilder();
    cutImageUp();
    cardPictureBuilder();
    HeaderBuilder();
    stopWatchBuilder();
    soundToggle();
    soundToggle();






}
function ConsoleBoard(woneOrnot, LooseOrnot) {

    function levelUp() {

        switch (G.gameTrophy) {
            case "A":
                G.gameTrophy = "B";
                storeInLocal(true) // change the "save"
                break;
            case "B":
                if (G.gamelevel == 2) {
                    G.gameTrophy = "C";
                    storeInLocal(true)
                }
                break;

            case "C":
                if (G.gamelevel == 3) {
                    G.gameTrophy = "D";
                    storeInLocal(true)
                }
                break;
        }

    }
    function RequestNewGame(newGamenumber) {

        switch (newGamenumber) {

            case 1:
                G.gamelevel = 1;
                storeInLocal(true);
                NewGame();
                break;

            case 2:

                if (G.gameTrophy != "A") {
                    G.gamelevel = 2;
                    storeInLocal(true)
                    NewGame();
                    break;
                };
                break;

            case 3:

                if (G.gameTrophy == "C" || G.gameTrophy == "D") {
                    G.gamelevel = 3;
                    storeInLocal(true);
                    NewGame();
                    break;
                }
                break;

        }

        G.winningScreen.extraTextDiv.innerHTML = buttonNewgame[newGamenumber].textIfneedsTofinish ////

        //G.winningScreen.extraTextDiv.innerHTML = "fsdfasdf" //buttonNewgame[newGamenumber].textIfneedsTofinish;
    }
    const EN = G.isLanguageEnglish || false;
    if (woneOrnot == true) {
        (G.soundIson == true) ? G.wonboardSound.play(): 1
        levelUp()
    } else {
        (G.soundIson == true) ? G.popboardSound.play(): 1
    }




    G.consoleIsopen = true;
    G.winningScreen = {}
    /*  game consol design */

    G.winningScreen.Divobject = document.createElement("div");
    //   G.winningScreen.Divobject.style.backgroundColor = "#800040";
    G.winningScreen.Divobject.style.background = "  linear-gradient(to bottom, rgba(1,59,66,0.95) 0%,rgba(2,71,88,0.95) 3%,rgba(3,92,124,0.95) 8%,rgba(39,63,117,0.95) 29%,rgba(17,59,95,0.94) 67%,rgba(0,56,79,0.94) 96%)";
    G.winningScreen.Divobject.style.position = "fixed";
    G.winningScreen.Divobject.style.left = "10%"
    G.winningScreen.Divobject.style.bottom = "10%";
    G.winningScreen.Divobject.style.height = "70%";
    G.winningScreen.Divobject.style.width = "80%";
    G.winningScreen.Divobject.style.padding = "-15px"
    G.winningScreen.Divobject.style.borderRadius = "50% / 10%";
    G.winningScreen.Divobject.style.border = "ridge #3d3d29 6px";
    G.winningScreen.Divobject.style.fontSize = "130%";

    var textFinished = ["", "", ""]
    var NumberOfFinishtexts = 3;
/* heb */
    if (woneOrnot == true) {
        textFinished[1] = "כל הכבוד !"
        if (EN) {textFinished[1] = "Good Job!"}
    } else if (LooseOrnot == true) {
        textFinished[1] = " לא נורא !" + " " + "נסו שוב !"
        if (EN) {textFinished[1] = "Try Again!" }
    }
    //else {textFinished [1] = "משחק מושהה"};
    textFinished[2] = "זמן: " + G.woneTime
    textFinished[3] = "קלפים שנהפכו: " + G.NumOflips;
    textFinished[4] = "" //"משחק נוסף";
    if (EN) {
        textFinished[2] = "Time: " + G.woneTime
        textFinished[3] = "Cards turned: " + G.NumOflips;
        textFinished[4] = "" //"משחק נוסף";
    }



    G.FinishTextNode = ["", "", ""];

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
        if (EN) {buttonReturnToGame.textOnButton = "Back to the game"}
        if (G.ChallangeLost == true) {
            buttonReturnToGame.textOnButton = "משחק חוזר"
            if (EN) {buttonReturnToGame.textOnButton = "Another game"}
        }
        buttonReturnToGame.buttonObj = document.createElement("BUTTON");
        var textnode = document.createTextNode(buttonReturnToGame.textOnButton);
        buttonReturnToGame.buttonObj.appendChild(textnode)
        buttonReturnToGame.buttonObj.number = i;
        buttonReturnToGame.buttonObj.classList.add("flash-button")
        buttonReturnToGame.buttonObj.classList.add("button")
        G.winningScreen.Divobject.appendChild(buttonReturnToGame.buttonObj);
        buttonReturnToGame.ClickerFunc = function() {
            DeleteConsole()
        } // delete console
        buttonReturnToGame.buttonObj.addEventListener("click", DeleteConsole, false)
    }

    for (y = 0; y < textFinished.length; y++) {



        G.FinishTextNode[y] = document.createTextNode(textFinished[y]);

        var span = document.createElement("span");
        span.appendChild(G.FinishTextNode[y]);

        var HTMLbreak = document.createElement("br");
        span.style.fontSize = "130%";



        if (y == 1) {
            span.style.fontSize = "150%";
        } else if (y == 2) {
            G.winningScreen.Divobject.appendChild(HTMLbreak)
        } else {
            span.style.fontSize = "130%"
        }

        G.winningScreen.Divobject.appendChild(span);

        var br_node = document.createElement("BR");
        br_node.style.lineHeight = "0";
        br_node.style.fontSize = "10%"
        G.winningScreen.Divobject.appendChild(br_node);
    }
    G.winningScreen.Divobject.style.textAlign = "center";
    G.winningScreen.Divobject.style.color = "white";
    G.winningScreen.Divobject.style.direction = "rtl";
    if (EN) {G.winningScreen.Divobject.style.direction = "ltr";}
    G.winningScreen.Divobject.style.verticalAlign = "middle"

    //G.winningScreen.Divobject.style.fontWeight = "bold";
    G.winningScreen.Divobject.style.textShadow = "2px 2px 1px #44297a, 3px 3px 1px #20133a";
    G.winningScreen.Divobject.style.fontSize = "130%";
    G.winningScreen.Divobject.style.fontFamily = "noot";
    // var droneTextnode = document.createTextNode(":");   G.winningScreen.Divobject.appendChild(droneTextnode);
    //G.winningScreen.Divobject.appendChild(br_node);

    document.getElementById("wrapper01").appendChild(G.winningScreen.Divobject);

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

    if (G.ChallangeLost == true) {
        buttonNewgame[0].textOnButton = "נסיון חוזר";
        if (EN){buttonNewgame[0].textOnButton = "Another game";}

    } else {
        buttonNewgame[0].textOnButton = "חזרה למשחק";
        if (EN){buttonNewgame[0].textOnButton ="Back to the game";}
    }
    buttonNewgame[1].textOnButton = "משחק חדש -רגיל ";
    buttonNewgame[2].textOnButton = " אתגר " + G.NumOfChalangeFlips + " היפוכים "
    buttonNewgame[3].textOnButton = " אתגר  " + G.NumOfChalangeSeconds + " שניות ";
    buttonNewgame[2].textIfneedsTofinish = "יש לסיים משחק רגיל"
    buttonNewgame[3].textIfneedsTofinish = "יש לסיים את האתגר הקודם"
    if (EN){
        buttonNewgame[1].textOnButton = "Start a basic game"
        buttonNewgame[2].textOnButton = "A challange of " + G.NumOfChalangeFlips + " flips"
        buttonNewgame[3].textOnButton = "A challange of " + G.NumOfChalangeSeconds + " seconds";
        buttonNewgame[2].textIfneedsTofinish = "Please complete a basic game"
        buttonNewgame[3].textIfneedsTofinish = "Please complete the next challange"

    }


    for (i = 1; i < 4; i++) {
        buttonNewgame[i].buttonObj = document.createElement("BUTTON");
        var textnode = document.createTextNode(buttonNewgame[i].textOnButton);
        buttonNewgame[i].buttonObj.appendChild(textnode)
        buttonNewgame[i].buttonObj.number = i;
        buttonNewgame[i].buttonObj.classList.add("button")
        G.winningScreen.Divobject.appendChild(buttonNewgame[i].buttonObj);
        buttonNewgame[i].ClickerFunc = function() {
            RequestNewGame(event.target.number)
        }
        buttonNewgame[i].buttonObj.addEventListener("click", buttonNewgame[i].ClickerFunc, false)
    }



    G.winningScreen.extraTextDiv = document.createElement("div");
    G.winningScreen.Divobject.appendChild(G.winningScreen.extraTextDiv)
    G.winningScreen.extraTextDiv.style.fontSize = "20px";
    G.winningScreen.extraTextDiv.style.color = "yellow";



}
function DeleteConsole() {
    if (G.ChallangeLost == true) {
        NewGame()
    }
    G.consoleIsopen = false;
    (G.soundIson == true) ? G.popboardSound.play(): null
    G.winningScreen.Divobject.parentNode.removeChild(G.winningScreen.Divobject);
}
function storeInLocal(changeTheFrameOrnot) {
    var createEvent  = (actionType, key, value)  => {
        let ev = new Event ("storage");
        ev.key = key; ev.value = value
        ev.actionType = actionType; return window.dispatchEvent(ev)}
    let saveObj = {gameTrophy:G.gameTrophy ,gamelevel: G.gamelevel}
    let firstLevelObj = {gameTrophy: "A" ,gamelevel:"1"}

    let saved = sessionStorage.getItem(G.saveInLocalStorageKey)
    if (!saved) {
    //    sessionStorage.setItem(G.saveInLocalStorageKey,"A,1")
        sessionStorage.setItem(G.saveInLocalStorageKey,JSON.stringify(firstLevelObj))
    } else if (changeTheFrameOrnot == true) {
    //    sessionStorage.setItem(G.saveInLocalStorageKey,G.gameTrophy + "," + G.gamelevel)
        sessionStorage.setItem(G.saveInLocalStorageKey,JSON.stringify(saveObj))


        createEvent  ("save",G.saveInLocalStorageKey , JSON.stringify(saveObj))


    };
    saved = sessionStorage.getItem(G.saveInLocalStorageKey)
    var fromSS = JSON.parse(saved);
    var modearray = [fromSS.gameTrophy,fromSS.gamelevel]
    console.log(modearray)
    return modearray;
}
function test () {
G.developeMode = true;
return "develope mode: on"
}
function soundToggle() {

    if (G.soundIson == true) {
        G.sound_img.src = "GUIimage/soundOff.png";
        G.soundIson = false;
    } else if (G.soundIson == false) {
        G.sound_img.src = "GUIimage/soundOn.png";
        G.soundIson = true;
    }
    var bool = G.soundIson;
    localStorage.StorageSoundIsOn = bool.toString();

}
function NewGame (){
    let originalHtml = `<div id="gameConsole"> </div><div id = "wrapper01"><span id="ErrorCheck">Loading... </span></div><script src="js/config.js" type="text/javascript"></script> <script src="js/memoryGame.js" type="text/javascript"></script>`;
    document.getElementById('gameConsole').innerHTML = ""
    document.getElementById('wrapper01').innerHTML = ""
    //document.body.innerHTML = originalHtml;
    BuildAPP ()

}

/* main*/
BuildAPP ()
