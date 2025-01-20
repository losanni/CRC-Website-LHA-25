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
    this.shadowRoot.querySelector('p#info').innerHTML +=
      this.getAttribute('info')
    this.shadowRoot.querySelector('p#grade').innerHTML +=
      this.getAttribute('grade')
    this.shadowRoot
      .querySelector('.profile-card')
      .classList.add('profile-card-' + this.getAttribute('element'))
  }
}

window.customElements.define('profile-card', ProfileCard)
