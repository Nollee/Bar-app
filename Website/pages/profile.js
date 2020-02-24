import authService from "../services/auth.js";
export default class ProfilePage {
    constructor() {
      this.template();
      this.authService = authService;   
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="profile" class="page">
          <header class="topbar">
            <h2>PROFIL</h2>
          </header>
          <section id="profile-container" class="grid-container"></section>
          <a class="right" href="#" onclick="logout()">Logout</a>
        </section>
      `;
    }

    logout() {
        this.authService.logout();
      }
  }