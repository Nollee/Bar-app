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
            <div class="topbar-wrapper">
            <div class="topbar-left">
            <a href="#home"><</a>
            <h1>PROFIL</h1>
            </div>
            <a class="logout" href="#" onclick="logout()">Log Ud</a>
            </div> 
          </header>
          <section id="profile-container" class="grid-container"></section>
        </section>
      `;
    }

    logout() {
        this.authService.logout();
      }
  }