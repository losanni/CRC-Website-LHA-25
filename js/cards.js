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
      color: var(--primary-color);
      border-color: var(--primary-color);
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
      <p id="grade"><span>Grade:</span></p>
      <p id="info"><span>Task:</span></p>
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
      ' ' + this.getAttribute('info')
    this.shadowRoot.querySelector('p#grade').innerText +=
      ' ' + this.getAttribute('grade')
  }
}

window.customElements.define('profile-card', ProfileCard)
