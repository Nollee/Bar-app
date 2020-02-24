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
            <a class="right" href="#" onclick="logout()">Logout</a>
          </header>
          <section id="profile-container" class="grid-container"></section>
        </section>
      `;
    }

    logout() {
        this.authService.logout();
      }
  }