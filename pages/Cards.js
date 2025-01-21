const template = document.createElement('template')
template.innerHTML = `
  <style>
    .profile-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 20rem;
      height: 5rem;
      padding: 2rem;
      border-radius: 2rem;
      border: 0.5rem solid;
    }
    
    .profile-card-earth {
      background-color: #24220a;
      color:hsl(59, 45.70%, 50%);
      border-color: #6e6d29;
    }

    /* Fix these colours */
    .profile-card-fire {
    background-color: #8b0000; /* Dark Red */
    color: #ff4500; /* Orange-Red */
    border-color: #b22222; /* Firebrick */
  }

  .profile-card-water {
    background-color: #001f3f; /* Dark Blue */
    color: #00bfff; /* Deep Sky Blue */
    border-color: #4682b4; /* Steel Blue */
  }

  .profile-card-air {
    background-color: #ffffff; /* White */
    color: #a9a9a9; /* Dark Gray */
    border-color: #dcdcdc; /* Gainsboro */
  }

    .profile-card img {
      border-radius: 50%;
    }

    .profile-card span {
      font-weight: bold;
    }
  </style>
  <div class="profile-card">
    <img />
    <div>
      <h3></h3>
      <p id="grade"><span>Grade: </span>Sec </p>
      <p id="info"><span>Task: </span></p>
    </div>
  </div>
`

class ProfileCard extends HTMLElement {
  constructor() {
    super()

    this.showInfo = true

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name')
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar')
    this.shadowRoot.querySelector('p#info').innerText +=
      this.getAttribute('info')
    this.shadowRoot.querySelector('p#grade').innerText +=
      this.getAttribute('grade')
    this.shadowRoot
    .querySelector('.profile-card')
    .classList.add('profile-card-' + window.location.pathname.split('/').pop().replace('.html', '')) // it gets the team based on the url aka which team page
  }
}

window.customElements.define('profile-card', ProfileCard)
