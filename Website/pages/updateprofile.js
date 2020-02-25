import authService from "../services/auth.js";
export default class UpdatePage {
  constructor() {
    this.template();
    this.authService = authService;
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="update" class="page">
      <header class="topbar">
            <div class="topbar-wrapper">
            <div class="topbar-left">
            <a href="#profile"><</a>
            <h1>PROFIL</h1>
            </div>
            <a class="logout" href="#" onclick="logout()">Log Ud</a>
            </div> 
          </header>
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Ændre dit navn">
        <label for="mail">Mail</label>
        <input type="email" id="mail" placeholder="Ændre din mail" >
        <label for="mail">Phone</label>
        <a href="#profile" type="button" name="button" onclick="updateUser()">Save</a>
      </form>
    </section>
    `;
  }

  updateUser() {
    let name = document.querySelector('#name').value;
    let mail = document.querySelector("#mail").value;

    this.authService.updateAuthUser(name, mail);
    console.log();
    
  }
}