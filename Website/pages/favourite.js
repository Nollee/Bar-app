export default class FavouritePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="favourite" class="page">
          <header class="topbar">
            <h2>FAVOURITES</h2>     
          </header>

          <section id="fav-container" class="grid-container"></section>
        </section>
      `;
    }  
  } 