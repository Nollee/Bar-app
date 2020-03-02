export default class LoginPage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /*html*/ `
        <section id="login" class="page">
        <div class="toppic">
        <h1>BarHunt</h1>
        <img src="images/cheers.jpg">
        <div class="top-gradient"></div>
        </div>
          <!-- firebase auth container  -->
          <section id="firebaseui-auth-container"></section>
        </section>
      `;
    }
  }