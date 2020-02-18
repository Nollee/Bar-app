export default class ProfilePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="profile" class="page">
          <header class="topbar">
            <h2>profile</h2>
            <a class="right" href="#favorites">name</a>
          </header>
          <section id="profile-container" class="grid-container"></section>
        </section>
      `;
    }
  }