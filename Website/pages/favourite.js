export default class FavouritePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="favourite" class="page">
          <header class="topbar">
            <h2>favourites</h2>
            <a class="right" href="#favourite">Favourites</a>
          </header>
          <section id="bar-container" class="grid-container"></section>
        </section>
      `;
    }  
  }