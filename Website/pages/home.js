export default class homePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="home" class="page">
          <header class="topbar">
            <h2>home</h2>
            <a href="#profile">profile</a>
          </header>
          <section id="home-container" class="grid-container">

            <section class="slider" id="bar-highlight">
            </section>

            <section class="slider coupon-slider" id="myCoupons">
            </section>

          </section>
        </section>
      `;
    }
  }