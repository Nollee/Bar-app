export default class ChancePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="chance" class="page">
          <header class="topbar">
            <h2>Prøv lykken!</h2>
            <a class="right" href="#home">Tryk her!</a>
          </header>
          <section id="chance-container" class="grid-container"></section>
        </section>
      `;
    }
  }