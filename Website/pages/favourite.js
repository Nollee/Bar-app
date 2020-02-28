export default class FavouritePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="favourite" class="page">
          <header class="topbar">
          <div class="topbar-wrapper">
          <div class="topbar-left">
            <h1>FAVORITTER</h1>   
            </div>
            </div>  
          </header>

          <section id="fav-container" class="grid-container"></section>
        </section>
      `;
    }  
  } 