// Create translation elements

const translationContainer = document.createElement('div')
translationContainer.id = 'translation-container'

const homeLink = document.createElement('a')
homeLink.href = '/'

const homeLinkImg = document.createElement('img')
homeLinkImg.src = '/assets/LHA/LHA Avatar small.webp'
homeLinkImg.id = 'translation-home-img'
homeLinkImg.alt = 'Home'

const languageButtonFr = document.createElement('button')
languageButtonFr.classList.add('language-button')
languageButtonFr.innerText = 'FR'

const languageButtonEn = document.createElement('button')
languageButtonEn.classList.add('language-button')
languageButtonEn.innerText = 'EN'
languageButtonEn.style.display = 'none'

languageButtonFr.addEventListener('click', () => setLang('fr'))
languageButtonEn.addEventListener('click', () => setLang('en'))

// Translation Logic

// Checks if we have a language set from last time, if not default to user's browser
let language = localStorage.getItem('lang') || navigator.language

console.log(language) //debug delete later

// Create an event to use later when we change language
// Events docs: https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
const langChange = new CustomEvent('langChange')

// Resposible for page translation, event handler, KEEP THIS RIGHT HERE
document.addEventListener('langChange', e => {
  // If it's french, we apply translations by getting them from json.
  // The json is a list of IDs of elements which contain text.
  // We did it manualy since we don't want to have containers included. When we run "innerText" on a container, it returns text of sub elements.
  // It then gets the element with the corresponding ids and changes its innerText.

  if (
    navigator.language.includes('fr') ||
    localStorage.getItem('lang') === 'fr'
  ) {
    console.log('language changed to fr')

    // Remove ".html" from the end and replace it with "-fr.json" which is where are translations are stored
    const frTranslationsUrl = window.location.pathname.replace(
      /\.html$/,
      '-fr.json'
    )

    // Fetch Docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // Gets our translation from the json they're stored in with fetch
    async function getData() {
      const url = frTranslationsUrl
      try {
        const response = await fetch(url)

        const frTranslationsAsObj = await response.json()
        console.log(frTranslationsAsObj)

        // We save it as obj, so we consider it through keys,values

        const ids = Object.keys(frTranslationsAsObj)

        ids.forEach(key => {
          let elementToTR = document.getElementById(key)

          elementToTR.innerText = frTranslationsAsObj[key]
        })
      } catch (error) {
        console.error(error.message)
      }
    }

    getData()

    languageButtonEn.style.display = 'block'
    languageButtonFr.style.display = 'none'
  } else {
    // Otherwise, its english so refresh because our html file is eng
    console.log('Changed to english') //debug

    // Hide en, show fr button
    languageButtonEn.style.display = 'none'
    languageButtonFr.style.display = 'block'
    window.location.reload()
  }
})

// First check for french
if (
  navigator.language.includes('fr') ||
  localStorage.getItem('lang') === 'fr'
) {
  document.dispatchEvent(langChange)

  // Hide fr button
  languageButtonFr.style.display = 'none'
}

// Handles the button click
// Stores the input and calls the handler to translate page
function setLang(languageUserChose) {
  console.log(languageUserChose) //debug
  localStorage.setItem('lang', languageUserChose.toString())

  document.dispatchEvent(langChange)
}

// Add all elements to DOM when it is loaded
document.addEventListener('DOMContentLoaded', () => {
  homeLink.appendChild(homeLinkImg)
  translationContainer.appendChild(homeLink)
  translationContainer.appendChild(languageButtonFr)
  translationContainer.appendChild(languageButtonEn)
  document.body.appendChild(translationContainer)
})
