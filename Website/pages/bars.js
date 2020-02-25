import barService from "../services/bar.js";

export default class BarPage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /* html */ `
      <section id="bars" class="page">
        <header class="topbar">
          <h2>SEARCH</h2>
          <a class="right" href="#favourite">Favourites</a>
        </header>
        <input id="search-bar" type="search" placeholder="Search" onkeyup="search(this.value)">    
        <section id="bar-container" class="grid-container"></section>
        <!---------- create new bar ------------->
    <form id="barForm">
      <h2>Add a new bar</h2>
      <input type="text" id="form-name" placeholder="Indtast bar navn" required>
      <textarea id="form-description" cols="30" rows="10" required placeholder="Indtast beskrivelse af bar"></textarea> 
      <input type="number" id="form-space" placeholder="Indtast maks antallet af besøgende på én gang" required>
      <input type="text" id="form-address" placeholder="Indtast bars addresse" required>
      <input type="text" id="form-price" placeholder="Indtast bars pris" required>
      <input type="text" id="form-type" placeholder="Indtast bars stemning" required> 
      <input type="url" id="form-img" placeholder="Indtast url for bar billede" required> 
      <button type="button" name="button" onclick="createBar()">Create Bar</button>
    </form> 
        <!---------- create new bar ------------->


      </section>
    `;
  }  

  addToFavourites(barId) {
    barService.addToFavourites(barId);
  }

  removeFromFavourites(barId) {
    barService.removeFromFavourites(barId);
  }

  removeFromFavourites(barId) {
    barService.removeFromFavourites(barId);
  }
}