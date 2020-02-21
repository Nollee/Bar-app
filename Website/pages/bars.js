export default class BarPage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /* html */ `
      <section id="bars" class="page">
        <header class="topbar">
          <h2>SEARCH</h2>
          <a class="right" href="#favorites">Favorites</a>
        </header>
        <section id="bar-container" class="grid-container"></section>
      </section>
    `;
  }
}