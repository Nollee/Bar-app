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
            <div class="show-delete" onclick="toggleDelete()">Slet konto</div>
            </div> 
          </header>
          <section id="profile-container">
          </section>
          <a class="logout" href="#" onclick="logout()">Log Ud</a>
          <div class="sure">
          <div class="delete">
          <h3>Er du sikker?</h3>
          <p>Du er er ved at slette din konto på Barhunt. Hvis dette ikke var meningen, tryk på "Tilbage"</p>
          <div class="buttons">
          <div class="button" id="delete-btn" onclick="deleteAccount()">Slet</div>
          <div class="button" id="back-btn" onclick="toggleDelete()">Tilbage</div>
          </div>
          </div>
          <div class="overlay" onclick="toggleDelete()"></div>
          </div>
        </section>
      `;
    }

    // calls logout() from auth.js
    logout() {
        this.authService.logout();
      }

    toggleDelete(){
      let sure = document.querySelector(".sure");
      sure.classList.toggle("show");
    }

        // calls deleteAccount() from auth.js
    deleteAccount(){
    this.authService.deleteAccount();
    }

  }