/*© 2019 Chen Peleg All Rights Reserved */
var G = G || {}; /*global*/

function setGlobal() {
    G.CardsTorandomize = [1, 2, 3];
    G.cardFromFile = [1, 2, 3];
    G.window_width = window.innerWidth;
    G.window_height = window.innerHeight;
    G.audiofolderPath = "CardSound/";
    G.developeMode = false;
    G.PlayerStatus = {};
    G.PlayerStatus.Trophy = "A"
    G.PlayerStatus.Level = "1"
    G.PlayerStatus.History = []
    G.PlayerStatus.nameOfplayer = G.clickFullNameOfUser || "";
    G.PlayerStatus.soundIson = true;
    G.PlayerStatus = storeInLocal(false, 'load') || G.PlayerStatus;
    G.wasTheGamewone = false;
    G.NumOfChalangeFlips = 99; //number of flips do the flip challange
    G.NumOfChalangeSeconds = 100;
    G.maxHistoryInSave = 20;
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

function BuildAPP() {
    function randomColorForCards(cardNumber, rndNum = 0.5) {
        let coloeDeg = rndNum * 388;
        let color = `linear-gradient(to right, hsl(${coloeDeg}, 44%, 68%) 0%, hsl(${coloeDeg}, 24%, 44%) 100%)`;
        return color;
    }

    function getRandomFromGameName(string) {
        let total = 0;
        for (let i = 0; i < string.length; i++) {
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

        var styleEl = document.createElement("style"),
            styleSheet;
        document.head.appendChild(styleEl);
        styleSheet = styleEl.sheet;
        var wideConst = 8;
        var highConst = 5.5;
        var Widefit = Math.round(G.window_width / wideConst);
        var heightfit = Math.round(G.window_height / highConst);
        const clacWidth = wideConst + "vw"
        const clacHeight = highConst + "vh"

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

                if (G.PlayerStatus.soundIson == true) {
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
                    if (G.PlayerStatus.soundIson == false) {
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
                if (G.PlayerStatus.Level == 2) {
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
                // flipNodeText = "<table style='table-layout:fixed; width:3vmin'><tr><th>" + flipNodeTexT + "</th></tr></table>"
                G.HeaderCountND.innerHTML = flipNodeTexT;

            }
            if (G.consoleIsopen == true) {
                return
            };


            if (G.card[cardnum].cardWone == true || G.statuS.card1 == cardnum || G.statuS.card2 == cardnum) {} else if (G.statuS.endingTurn == true) {
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


            G.card[i].FrontObject.style.background = randomColorForCards(i, randFromName);
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
            document.getElementById("boardWrapper").appendChild(G.card[i].Cardwrapper);
        }

        document.getElementById("boardWrapper").ondragstart = function() {
            return false;
        };

    }

    function cutImageUp() {
        function cutedImageSize() {
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

        function drawCanvasParts() {
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
                G.card[i].BackObject.style.height = "100%";
                G.card[i].BackObject.style.width = "100%";
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
        if (G.PlayerStatus.Trophy == "B") {
            G.HeaderText += " ⭐️ "
        }
        if (G.PlayerStatus.Trophy == "C") {
            G.HeaderText += " ⭐️⭐️ "
        }
        if (G.PlayerStatus.Trophy == "D") {
            G.HeaderText += " ⭐️⭐️⭐️"
        }
        G.HeaderText += G.ThegameHeadline;
        if (G.PlayerStatus.Level > 1) {
            G.HeaderText = G.HeaderText + "" //
        };


        G.bodyObject = document.getElementsByTagName("BODY")[0];
        G.mainGameConsole = document.getElementById("gameConsole");
        G.bodyObject.style.backgroundColor = "#666666";
        G.bodyObject.style.backgroundImage = "url(" + G.back_image + ")";
        G.bodyObject.style.backgroundBlendMode = "lighten";
        G.bodyObject.style.backgroundSize = "cover";


        G.cog_img = document.createElement("IMG");
        G.cog_img.src = "GUIimage/settingCog.png";
        G.sound_img = document.createElement("IMG");
        G.sound_img.src = "GUIimage/soundOn.png";
        // G.HeaderTitle = document.createElement("div");
        G.HeaderTextND = document.createElement("div");

        G.HeaderTextND.classList.add("headertext", "headerElement");
        // G.HeaderTextND.style.float = "left";
        // adds spaces to the text according to the length
        var lnth = G.HeaderText.length || 0
        var added_spaces = "";
        for (x = 20; x > lnth; x--) {
            added_spaces += "&nbsp"

        }
        G.HeaderTextND.innerHTML = added_spaces + G.HeaderText
        G.HeaderCountObject = document.createElement("div");
        G.HeaderStoperObject = document.createElement("div"); //the stopper
        G.uiButtonWrap = document.createElement("div");
        G.uiButtonWrap.classList.add("uibuttonwrap");

        G.countersWrap = document.createElement("div");
        G.countersWrap.classList.add("countersWrap");

        G.HeaderStoperND = document.createTextNode("00:00");
        // G.HeaderCountObject.style.shadow = "text-shadow: 2px 2px 4px #000;";

        G.mainGameConsole.appendChild(G.countersWrap);
        G.countersWrap.appendChild(G.HeaderCountObject);
        G.countersWrap.appendChild(G.HeaderStoperObject);

        G.HeaderStoperObject.appendChild(G.HeaderStoperND);
        var flipNodeText = 0;

        if (G.PlayerStatus.Level == 2) {
            flipNodeText = G.NumOfRemainigFlips;
        } else {
            flipNodeText = G.NumOflips;
        }
        flipNodeText = "<table style='table-layout:fixed; width:3vmin'><tr><th>" + flipNodeText + "</th></tr></table>"
        G.HeaderCountND = document.createElement("div");
        G.HeaderCountND.innerHTML = flipNodeText;

        G.HeaderCountObject.appendChild(G.HeaderCountND);
        G.HeaderCountObject.classList.add("HeaderCount", "headerElement");
        // G.HeaderCountObject.style.float = "left";
        // G.HeaderStoperObject.style.float = "left";
        G.HeaderStoperObject.classList.add("Headerstopper", "headerElement");
        // G.HeaderStoperObject.style.margin = "0px 0px 0px 40px";
        G.mainGameConsole.appendChild(G.HeaderTextND);
        G.mainGameConsole.appendChild(G.uiButtonWrap);

        G.uiButtonWrap.appendChild(G.sound_img);
        G.uiButtonWrap.appendChild(G.cog_img);
        G.sound_img.classList.add("headerSound", "headerElement")
        G.cog_img.classList.add("headerCog", "headerElement")

        G.cog_img.addEventListener("click", settingsConsoleButtonPress, false);

        G.sound_img.addEventListener("click", soundToggle, false);
        //G.sound_img.style.position = "absolute";
        document.getElementById("gameConsole").ondragstart = function() {
            return false;
        };

    }

    function stopWatchBuilder() {
        function monospaceHtml(htm) {
            return htm

        }
        G.stopWatchTIME = 0;
        var ChangeTimeInterval = 100 //change time interval every X milisecinds
        if (G.PlayerStatus.Level == 3) {
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
                if (G.PlayerStatus.Level == 3) {
                    TimeClicks--
                } else {
                    TimeClicks++
                }
            }
            if (G.PlayerStatus.Level == 3 && TimeClicks < 1 && G.ChallangeLost == false) {
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

        if (G.stopWatchInterval) { clearInterval(G.stopWatchInterval) }
        G.stopWatchInterval = setInterval(function() {
            secondPrint();
        }, ChangeTimeInterval);
    }
    setGlobal()

    if (G.isLanguageEnglish) {
        G.name_of_game = G.name_of_gameEN || G.name_of_game
        let title = `<title>משחק הזיכרון</title>`;
        document.title = "Memory Game"
    }

    document.getElementById("ErrorCheck").innerHTML = "";
    document.onkeydown = function(evt) {
        if (G.developeMode == false) { return };

        evt = evt || window.event;
        var isPushWin = false;
        var isPushLose = false;
        if ("key" in evt) {
            isPushWin = (evt.key == 1)
            isPushLose = (evt.key == 2)
        }
        if (isPushWin) {
            ConsoleBoard(true);
            G.PlayerStatus.cheat = true;
        }
        if (isPushLose) {
            ConsoleBoard(false, true);
            G.PlayerStatus.cheat = true;
        }
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
    function pushHistory() {
        let historyDoc = { L: G.PlayerStatus.Level, F: G.NumOflips, T: G.seconds + (G.minutes * 60) }
        while (G.PlayerStatus.History.length >= G.maxHistoryInSave) { G.PlayerStatus.History.shift() }
        G.PlayerStatus.History.push(historyDoc)

    }

    function levelUp() {

        switch (G.PlayerStatus.Trophy) {
            case "A":
                G.PlayerStatus.Trophy = "B";
                break;
            case "B":
                if (G.PlayerStatus.Level == 2) {
                    G.PlayerStatus.Trophy = "C";
                }
                break;

            case "C":
                if (G.PlayerStatus.Level == 3) {
                    G.PlayerStatus.Trophy = "D";
                }
                break;
        }

        storeInLocal(true, 'save')
    }

    function RequestNewGame(newGamenumber) {

        switch (newGamenumber) {

            case 1:
                G.PlayerStatus.Level = 1;
                storeInLocal(true, 'silentSave')
                NewGame();
                break;

            case 2:

                if (G.PlayerStatus.Trophy != "A") {
                    G.PlayerStatus.Level = 2;
                    storeInLocal(true, 'silentSave')
                    NewGame();
                    break;
                };
                break;

            case 3:

                if (G.PlayerStatus.Trophy == "C" || G.PlayerStatus.Trophy == "D") {
                    G.PlayerStatus.Level = 3;
                    storeInLocal(true, 'silentSave')
                    NewGame();
                    break;
                }
                break;

        }



        G.winningScreen.extraTextDiv.innerHTML = buttonNewgame[newGamenumber].textIfneedsTofinish ////


    }
    const EN = G.isLanguageEnglish || false;
    if (woneOrnot == true) {
        (G.PlayerStatus.soundIson == true) ? G.wonboardSound.play(): 1
        levelUp()
    } else {
        (G.PlayerStatus.soundIson == true) ? G.popboardSound.play(): 1
    }




    G.consoleIsopen = true;
    G.winningScreen = {}
        /*  game consol design */

    G.winningScreen.Divobject = document.createElement("div");
    G.winningScreen.Divobject.classList.add("winnigScreen");


    var textFinished = ["", "", ""]
    var NumberOfFinishtexts = 3;
    /* heb */
    if (woneOrnot == true) {

        textFinished[1] = "כל הכבוד !"
        if (EN) { textFinished[1] = "Good Job!" }
        pushHistory()
    } else if (LooseOrnot == true) {
        textFinished[1] = " לא נורא !" + " " + "נסו שוב !"
        if (EN) { textFinished[1] = "Try Again!" }
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
        if (EN) { buttonReturnToGame.textOnButton = "Back to the game" }
        if (G.ChallangeLost == true) {
            buttonReturnToGame.textOnButton = "משחק חוזר"
            if (EN) { buttonReturnToGame.textOnButton = "Another game" }
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




        if (y == 1) {

        } else if (y == 2) {
            G.winningScreen.Divobject.appendChild(HTMLbreak)
        } else {

        }

        G.winningScreen.Divobject.appendChild(span);

        var br_node = document.createElement("BR");

        G.winningScreen.Divobject.appendChild(br_node);
    }

    if (EN) { G.winningScreen.Divobject.style.direction = "ltr"; }
    G.winningScreen.Divobject.style.verticalAlign = "middle"



    document.body.appendChild(G.winningScreen.Divobject);

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
        if (EN) { buttonNewgame[0].textOnButton = "Another game"; }

    } else {
        buttonNewgame[0].textOnButton = "חזרה למשחק";
        if (EN) { buttonNewgame[0].textOnButton = "Back to the game"; }
    }
    buttonNewgame[1].textOnButton = "משחק חדש -רגיל ";
    buttonNewgame[2].textOnButton = " אתגר " + G.NumOfChalangeFlips + " היפוכים "
    buttonNewgame[3].textOnButton = " אתגר  " + G.NumOfChalangeSeconds + " שניות ";
    buttonNewgame[2].textIfneedsTofinish = "יש לסיים משחק רגיל"
    buttonNewgame[3].textIfneedsTofinish = "יש לסיים את האתגר הקודם"
    if (EN) {
        buttonNewgame[1].textOnButton = "Start a basic game"
        buttonNewgame[2].textOnButton = G.NumOfChalangeFlips + " Flip challenge"
        buttonNewgame[3].textOnButton = G.NumOfChalangeSeconds + " Seconds challenge";
        buttonNewgame[2].textIfneedsTofinish = "Please complete a basic game"
        buttonNewgame[3].textIfneedsTofinish = "Please complete the next challenge"

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
        // G.winningScreen.extraTextDiv.style.fontSize = "20px";
    G.winningScreen.extraTextDiv.style.color = "yellow";



}

function DeleteConsole() {
    if (G.ChallangeLost == true) {
        NewGame()
    }
    G.consoleIsopen = false;
    (G.PlayerStatus.soundIson == true) ? G.popboardSound.play(): null
    G.winningScreen.Divobject.parentNode.removeChild(G.winningScreen.Divobject);
}

function storeInLocal(saveOrnot, action) {
    var createEvent = (actionType, key, value) => {
        let ev = new Event("storage");
        ev.key = key;
        ev.value = value
        ev.actionType = actionType;
        return window.dispatchEvent(ev)
    }
    let savedBefore = localStorage.getItem(G.saveInLocalStorageKey)
        //let firstLevelObj = {gameTrophy: "A" ,gamelevel:"1"}
    switch (action) {
        case 'load':
            let savedBefore = localStorage.getItem(G.saveInLocalStorageKey)
            if (savedBefore) { return JSON.parse(savedBefore) } else { return false }
            break;

        case 'save':
            const lastGame = 'lst_';
            const now = Math.floor(Date.now() / 1000)
            G.PlayerStatus[lastGame] = now;
            createEvent("save", G.saveInLocalStorageKey, JSON.stringify(G.PlayerStatus));
        case 'silentSave':
            localStorage.setItem(G.saveInLocalStorageKey, JSON.stringify(G.PlayerStatus));
            return true
            break;
    }


}

function test() {
    G.developeMode = true;
    return "develope mode: on"
}

function soundToggle() {

    if (G.PlayerStatus.soundIson === true) {
        G.sound_img.src = "GUIimage/soundOff.png";
        G.PlayerStatus.soundIson = false;
    } else if (G.PlayerStatus.soundIson === false) {
        G.sound_img.src = "GUIimage/soundOn.png";
        G.PlayerStatus.soundIson = true;
    }
    storeInLocal(true, 'silentSave');

}

function NewGame() {
    let originalHtml = `<div id="gameConsole"> </div><div id = "boardWrapper"><span id="ErrorCheck">Loading... </span></div><script src="js/config.js" type="text/javascript"></script> <script src="js/memoryGame.js" type="text/javascript"></script>`;
    document.getElementById('gameConsole').innerHTML = ""
    document.getElementById('boardWrapper').innerHTML = "<span id='ErrorCheck'>Loading... </span>"
        //document.body.innerHTML = originalHtml;
    BuildAPP()

}

/* main*/
BuildAPP()
    // ConsoleBoard(false)