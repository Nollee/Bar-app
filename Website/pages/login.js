export default class LoginPage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /*html*/ `
        <section id="login" class="page">
        <div class="toppic">
        <img src="../images/cheers.jpg">
        </div>
          <!-- firebase auth container  -->
          <section id="firebaseui-auth-container"></section>
        </section>
      `;
    }
  }