export default class homePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="home" class="page">
          <header class="topbar">
          <div class="topbar-wrapper">
          <div class="topbar-left">
          <div class="pic-wrapper"></div>
          <h1>HJEM</h1>
          </div>
          <div class="topbar-right">
            </div>
          </header>
          <section id="home-container" class="grid-container">
            <h2 class="home-h2">BARER</h2>
            <section class="slider" id="bar-highlight">
            </section>
            <h2 class="home-h2">DINE KUPONER</h2>
            <section class="slider coupon-slider" id="myCoupons">
            </section>

          </section>
        </section>
      `;
    }
  }