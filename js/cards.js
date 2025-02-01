const template = document.createElement("template")
template.innerHTML = `
  <style>
    .profile-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 2rem;
      border-radius: 2rem;
      border: 0.3rem solid;
      color: var(--primary-color);
      border-color: var(--primary-color);
    }

    .profile-card img {
      border-radius: 50%;
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }

    .profile-card h3 {
      text-align: center;
    }

    .profile-card p {
      font-size: 1em;
      display: flex;
      justify-content: space-between;
    }

    .profile-card div {
      width: 100%;
    }

    .bold {
      font-weight: bold;
    }
  </style>
  <div class="profile-card">
    <img />
    <div>
      <h3></h3>
      <p><span class="bold">Level:</span><span id="level"></span></p>
      <p><span class="bold">Role:</span><span id="role"></span></p>
    </div>
  </div>
`

class ProfileCard extends HTMLElement {
  constructor() {
    super()

    this.showInfo = true

    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name")
    this.shadowRoot.querySelector("img").src =
      "/assets/Roster/" + this.getAttribute("name") + ".webp"
    this.shadowRoot.querySelector("img").alt = this.getAttribute("name")
    this.shadowRoot.querySelector("#role").innerText = this.getAttribute("role")
    this.shadowRoot.querySelector("#level").innerText =
      this.getAttribute("level")
  }
}

window.customElements.define("profile-card", ProfileCard)
