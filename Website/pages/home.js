export default class homePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="home" class="page">
          <header class="topbar">
            <h2>home</h2>
            <a class="right" href="#favorites">hjem kære hjem</a>
          </header>
          <section id="home-container" class="grid-container"></section>
        </section>
      `;
    }
  }