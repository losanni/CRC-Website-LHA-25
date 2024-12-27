// Code for avatar progress

const natureElements = ["fire", "earth", "water", "air"];

// Create the elements
natureElements.forEach(item => {
  if (sessionStorage.getItem(item) === null) { // If they don't exist
    sessionStorage.setItem(item, "false");
    console.log(`Creating ${item}`)
  }
});

// 'Mastering' a new element and obtaining 'avatar status' will depend on whether the page is visited. 
// We'll determine so by checking if the url contains the named element

// Essentially all we need comes from pathname.
// Check if our path has the element then changes the status of the elements on the page
natureElements.forEach(item => {
    if (window.location.pathname.includes(item)) { 
        sessionStorage.setItem(item, "true"); // re-asign to true
        console.log(`Visited ${item}`)
    }
})

// After everything has loaded, we'll check if the item has been unlocked, and un-grey it. DOM needs to be loaded first.
document.addEventListener("DOMContentLoaded",() => {

    natureElements.forEach(item => {
        if (sessionStorage.getItem(item) === "true") { 
            console.log(`${item} element will be unlocked`);
        
            elementToUnlock = document.getElementById(`avatar-prog-${item}-icon`);
            elementToUnlock.style.filter = 'grayscale(0%)';
        }
    })

    // We'll run one final check to see if all the elemts are unlocked, and thus 'unlock avatar status'
    if (
        sessionStorage.getItem("fire") === "true" &&
        sessionStorage.getItem("water") === "true" &&
        sessionStorage.getItem("earth") === "true" &&
        sessionStorage.getItem("air") === "true"
    ) {
        console.log("Mastered all the elements!");
        sessionStorage.setItem("avatar", "true");
       
        const avatarIcon = document.getElementById("avatar-prog-avatar-icon");
        avatarIcon.style.filter = "grayscale(0%)";
    }
})
