// Add avatar progress to HTML dynamically
document.body.innerHTML += `
<div id="avatar-progress">
  <a href="/pages/water/water.html">
    <img
      class="avatar-progress-icon"
      id="avatar-prog-water-icon"
      src="/assets/map/water-nation.png"
      alt="Avatar Progress Water Icon"
    />
  </a>
  <a href="/pages/fire/fire.html">
    <img
      class="avatar-progress-icon"
      id="avatar-prog-fire-icon"
      src="/assets/map/fire-nation.png"
      alt="Avatar Progress Fire Icon"
    />
  </a>
  <a href="/pages/air/air.html">
    <img
      class="avatar-progress-icon"
      id="avatar-prog-air-icon"
      src="/assets/map/air-nation.png"
      alt="Avatar Progress Air Icon"
    />
  </a>
  <a href="/pages/earth/earth.html">
    <img
      class="avatar-progress-icon"
      id="avatar-prog-earth-icon"
      src="/assets/map/earth-nation.png"
      alt="Avatar Progress Earth Icon"
    />
  </a>

  
  <a href="/pages/air/video.html" class="disabled-link" id="avatar-icon-link">
    <img
      class="avatar-progress-icon"
      id="avatar-prog-avatar-icon"
      src="/assets/LHA/video.png"
      alt="Avatar Progress Avatar Icon"
    />
  </a>
</div>
`

// Code for avatar progress

const natureElements = ['fire', 'earth', 'water', 'air', 'avatar']

// Create the elements
natureElements.forEach(item => {
  if (sessionStorage.getItem(item) === null) {
    // If they don't exist
    sessionStorage.setItem(item, 'false')
    console.log(`Creating ${item}`)
  }
})

// 'Mastering' a new element and obtaining 'avatar status' will depend on whether the page is visited.
// We'll determine so by checking if the url contains the named element

// Essentially all we need comes from pathname.
// Check if our path has the element then changes the status of the elements on the page
natureElements.forEach(item => {
  if (window.location.pathname.includes(item)) {
    sessionStorage.setItem(item, 'true') // re-asign to true
    console.log(`Visited ${item}`)

     //  Ungrey, and grow if its first time
      setInterval(() => {
        const elementToUnlock = document.getElementById(`avatar-prog-${item}-icon`)
        elementToUnlock.style.filter = 'grayscale(0%)';
        elementToUnlock.style.transition = "transform 0.5s ease-in-out";
        elementToUnlock.style.transform = "scale(1.25)";
        
          setTimeout(() => {
              elementToUnlock.style.transform = "scale(1)";
          }, 500);
      }, (1500))
  }
})

natureElements.forEach(item => {
  if (sessionStorage.getItem(item) === 'true' ) {
    console.log(`${item} element will be unlocked`)

      const elementToUnlock = document.getElementById(`avatar-prog-${item}-icon`)
      elementToUnlock.style.filter = 'grayscale(0%)'
    
    }
})

// We'll run one final check to see if all the elemts are unlocked, and thus 'unlock avatar status'
if (
  sessionStorage.getItem('fire') === 'true' &&
  sessionStorage.getItem('water') === 'true' &&
  sessionStorage.getItem('earth') === 'true' &&
  sessionStorage.getItem('air') === 'true'
) {
  console.log('Mastered all the elements!')
  sessionStorage.setItem('avatar', 'true')

  const avatarIcon = document.getElementById('avatar-prog-avatar-icon')
  avatarIcon.style.filter = 'grayscale(0%)'
  
  const avatarIconLink = document.getElementById("avatar-icon-link")
  avatarIconLink.classList.remove("disabled-link");
  avatarIconLink.href = "/pages/air/video.html" //Link to videos
}
