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
          <div class="pic-wrapper"></div>
            <h1>FAVORITTER</h1>   
            </div>
            </div>  
          </header>

          <section id="fav-container" class="grid-container">
          <p class="nothing">Ingen favoritter</p>
          </section>
        </section>
      `;
    }  
  } 