// Translation

// Checks if we have a language set from last time, if not default to user's browser
let language = localStorage.getItem("lang") || navigator.language

// These are the ones at the top right navbar
const languageButtonFr = document.getElementById("language-button-fr")
const languageButtonEn = document.getElementById("language-button-en")

console.log(language) //debug delete later

// Create an event to use later when we change language
// Events docs: https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
const langChange = new CustomEvent("langChange");

// Resposible for page translation, event handler, KEEP THIS RIGHT HERE
document.addEventListener("langChange", (e) => {

    // If it's french, we apply translations by getting them from json.
    // The json is a list of IDs of elements which contain text. 
    // We did it manualy since we don't want to have containers included. When we run "innerText" on a container, it returns text of sub elements.
    // It then gets the element with the corresponding ids and changes its innerText.


    if (navigator.language.includes('fr') || localStorage.getItem("lang") === "fr") {
        
        console.log("language changed to fr")

        // Remove ".html" from the end and replace it with "-fr.json" which is where are translations are stored
        const frTranslationsUrl = window.location.pathname.replace(/\.html$/, "-fr.json")

        // Fetch Docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // Gets our translation from the json they're stored in with fetch
        async function getData() {
            const url = frTranslationsUrl;
            try {
                const response = await fetch(url);

                const frTranslationsAsObj = await response.json();
                console.log(frTranslationsAsObj)

                // We save it as obj, so we consider it through keys,values

                const ids = Object.keys(frTranslationsAsObj);

                ids.forEach(key => {
                    let elementToTR = document.getElementById(key);

                    elementToTR.innerText = frTranslationsAsObj[key]
                });


                } catch (error) {
                    console.error(error.message);
                }
        }

        getData()

        languageButtonEn.style.display = 'block'
        languageButtonFr.style.display = 'none'
    } else {
        // Otherwise, its english so refresh because our html file is eng
        console.log("Changed to english") //debug

        // Hide en, show fr button
        languageButtonEn.style.display = 'none'
        languageButtonFr.style.display = 'block'
        window.location.reload();
    }
})

// First check for french
if (navigator.language.includes('fr') || localStorage.getItem("lang") === "fr") {
    document.dispatchEvent(langChange)

    // Hide fr button
    languageButtonFr.style.display = 'none'
}

// Handles the button click
// Stores the input and calls the handler to translate page
function setLang(languageUserChose) {
    console.log(languageUserChose) //debug
    localStorage.setItem("lang", languageUserChose.toString())
    
    document.dispatchEvent(langChange)
}
