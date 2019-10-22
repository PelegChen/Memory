
name_of_game =  "משחק הזיכרון פעולות"
seconds_challange = 100
flip_chalange = 101
mute = 0
dev_mode =0

/*
הסבר:
ניתן לשנות את המשתנים הבאים, על ידי שינוי הנתונים אחרי סימן השיוויון (=)

name_of_game - השם שרשום בכותרת המשחק
seconds_challange - כמות השניות שיש לשחקן באתגר הזמן
flip_chalange - כמות היפוכי הקלפים שיש לשחקן באתגר ההיפוכים
dev_mode1 - מצב מפתח, לחיצה על Esc גורמת לזכייה במשחק. (0 = לא פעיל, 1 = מצב מפתח פעיל)
mute - המשחק מתחיל כשהקול מושתק, ניתן להפעיל אותו שוב. (0 = לא פעיל, 1 = המשחק מושתק בהתחלה)

*/


let myFileName = location.pathname.split("/").slice(-1)

G.fileName = myFileName[0].replace(/\.html/ig,"")
G.saveInLocalStorageKey = 'English_' + G.fileName
G.saveBooleanValue = 'wasSaved_' + G.fileName


var urlParams = new URLSearchParams(window.location.search);
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
if (urlParams.has('api')) {
    if (urlParams.has(G.saveInLocalStorageKey)){
        const isSavedInSession = sessionStorage.getItem(G.saveBooleanValue);
        if (isSavedInSession == 'true') {
            //console.log ('exist In Session Storage')

        } else if (urlParams.has( G.saveInLocalStorageKey)) {

            let loadedGame = JSON.parse(urlParams.get( G.saveInLocalStorageKey));
            sessionStorage.setItem(G.saveInLocalStorageKey, JSON.stringify(loadedGame));
            sessionStorage.setItem(G.saveBooleanValue, 'true')
           // console.log ('game Saved In Session Storage')

        }

    } else {G.isClickGameSaveInSessionStore = true}



getClicktScript (urlParams.get('api'), urlParams.toString())
} else {console.log ('no Click site Connection')}

if (urlParams.has( 'userFullName')){
    G.clickFullNameOfUser = urlParams.get( 'userFullName')
    if (sessionStorage.getItem(G.saveInLocalStorageKey)) {
        let savedGameFromSS = JSON.parse(sessionStorage.getItem(G.saveInLocalStorageKey))
        if (savedGameFromSS.nameOfplayer === G.clickFullNameOfUser ){}
        else {console.log ('not the same player');  sessionStorage.setItem(G.saveBooleanValue, 'false')}
    }
}
