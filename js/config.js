var G = {} // global for config
G.name_of_game =  "משחק הזיכרון פעולות";
G.name_of_gameEN = 'Memory Game Actions';
G.seconds_challange = 100;
G.flip_chalange = 101;
G.mute = 0;
G.dev_mode =1; //change back to 0
G.isLanguageEnglish = 0;
/*****/
 /*
הסבר:
ניתן לשנות את המשתנים הבאים, על ידי שינוי הנתונים אחרי סימן השיוויון (=)

G.name_of_game - השם שרשום בכותרת המשחק
G.seconds_challange - כמות השניות שיש לשחקן באתגר הזמן
G.flip_chalange - כמות היפוכי הקלפים שיש לשחקן באתגר ההיפוכים
G.dev_mode1 - מצב מפתח, לחיצה על Esc גורמת לזכייה במשחק. (0 = לא פעיל, 1 = מצב מפתח פעיל)
G.mute - המשחק מתחיל כשהקול מושתק, ניתן להפעיל אותו שוב. (0 = לא פעיל, 1 = המשחק מושתק בהתחלה)

*/
G.fileName = location.pathname.split("/").slice(-1)[0].replace(/\.html/ig,"")
G.saveInLocalStorageKey = G.fileName
G.saveBooleanValue = 'wasSaved_' + G.fileName

function activateClick (){
    let urlName, ssName;
    async function getClicktScript(url, urlGetPrams) {
        urlGetPrams += "&gameName=" +  G.saveInLocalStorageKey
        let response = await fetch(url + "?" + urlGetPrams , {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'text/plain',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
        })
        let responseScript = await response.text();
        let script = document.createElement('script');
        script.innerHTML =  responseScript ;//responseScript    // "clickScript.js"
        document.body.appendChild(script)
    }
    function loadGameFrom (source){

    }
    if (!urlParams.has('api')) {
        console.log('%c no site Connection - game saved on this PC \n אין חיבור לאתר, המשחק ישמר על מחשב זה', 'font-family:david; font-size: 3vmin; background: gold; color:blue;');
        return
    }

    var urlParams = new URLSearchParams(window.location.search);
    const saveFromSS = sessionStorage.getItem(G.saveInLocalStorageKey)
    const  saveFromURL = urlParams.get(G.saveInLocalStorageKey) || false;
    if (saveFromURL && saveFromSS){
        urlName = urlParams.get('userFullName') ;ssName = saveFromSS.nameOfplayer;

    }


    if (saveFromURL && saveFromSS && (urlName === ssName) ){

    const urlTime = Number(saveFromURL.lst_) || 0
    const ssTime =  Number(saveFromSS.lst_) || 0
    const higher = Math.max(urlTime,ssTime)
    if (higher === ssTime) {loadGameFrom ('ss')}
    else if (higher === urlTime)

        //const isSavedInSession = sessionStorage.getItem(G.saveBooleanValue);
    // if (urlParams.has(G.saveInLocalStorageKey)) {
    //         let loadedGame = JSON.parse(urlParams.get(G.saveInLocalStorageKey));
    //         console.log (loadedGame.lst_)
    //         sessionStorage.setItem(G.saveInLocalStorageKey, JSON.stringify(loadedGame));
    //         sessionStorage.setItem(G.saveBooleanValue, 'true')
    //     }

    } else {G.isClickGameSaveInSessionStore = true}
    if (urlParams.has( 'userFullName')){
        G.clickFullNameOfUser = urlParams.get( 'userFullName')
        if (sessionStorage.getItem(G.saveInLocalStorageKey)) {
            let savedGameFromSS = JSON.parse(sessionStorage.getItem(G.saveInLocalStorageKey))
            if (savedGameFromSS.nameOfplayer === G.clickFullNameOfUser ){}
            else {console.info ('not the same player');  sessionStorage.setItem(G.saveBooleanValue, 'false')}
        }
    }
    getClicktScript (urlParams.get('api'), urlParams.toString())
}


activateClick ()
