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
        <input type="text" id="name" placeholder="Type your name" required>
        <label for="mail">Mail</label>
        <input type="email" id="mail" placeholder="Type your mail" disabled>
        <label for="mail">Phone</label>
        <input type="phone" id="phone" placeholder="Type your phone number">
        <input type="file" id="img" accept="image/*" onchange="previewImage(this.files[0], 'imagePreview')">
        <img id="imagePreview" class="image-preview">
        <a href="#profile" type="button" name="button" onclick="updateUser()">Save</a>
      </form>
    </section>
    `;
  }

  updateUser() {
    let name = document.querySelector('#name').value;
    let img = document.querySelector('#imagePreview').src;
    let phone = document.querySelector('#phone').value;

    this.authService.updateAuthUser(name, img, phone);
    console.log();
    
  }

  previewImage(file, previewId) {
    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        document.querySelector('#' + previewId).setAttribute('src', event.target.result);
      };
      reader.readAsDataURL(file);
    }
}
}