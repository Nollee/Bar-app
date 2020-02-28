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
          <h1>Hjem</h1>
          </div>
          <div class="topbar-right">
            </div>
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