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
        <div class="search-bar-container">
        <input id="search-bar" type="search" placeholder="Search" onkeyup="search(this.value)"> 
        </div>    
        <section id="bar-container" class="grid-container"></section>
        <!---------- create new bar ------------->
    <form id="barForm">
      <h2>Add a new bar</h2>
      <input type="text" id="form-name" placeholder="Indtast bar navn" required>
      <textarea id="form-description" cols="30" rows="5" required placeholder="Indtast beskrivelse af bar"></textarea> 
      <input type="number" id="form-space" placeholder="Indtast maks antallet af besøgende på én gang" required>
      <input type="text" id="form-address" placeholder="Indtast bars addresse" required>
      <input type="text" id="form-price" placeholder="Indtast bars pris" required>
      <input type="text" id="form-type" placeholder="Indtast bars stemning" required> 
      <input type="url" id="form-img" placeholder="Indtast url for bar billede" required> 
      <input type="number" id="form-age" placeholder ="Indtast mindstealder" required> 
      
      <!------------- opening hours for form ------->
      <div class="form-days">
      <p>Mandag</p>
      <input type="number" id="form-from-monday" placeholder="Indtast tidspunkt for åbning (fx 15)" required> <p> - </p>
      <input type="number" id="form-to-monday" placeholder="Indtast tidspunkt for lukning (fx 02)" required> 
      </div>
      <div class="form-days">
      <p>Tirsdag</p>
      <input type="number" id="form-from-tuesday" placeholder="Indtast tidspunkt for åbning (fx 15)" required> <p> - </p>
      <input type="number" id="form-to-tuesday" placeholder="Indtast tidspunkt for lukning (fx 02)" required> 
      </div>
      <div class="form-days">
      <p>Onsdag</p>
      <input type="number" id="form-from-wednesday" placeholder="Indtast tidspunkt for åbning (fx 15)" required> <p> - </p>
      <input type="number" id="form-to-wednesday" placeholder="Indtast tidspunkt for lukning (fx 02)" required> 
      </div>
      <div class="form-days">
      <p>Torsdag</p>
      <input type="number" id="form-from-thursday" placeholder="Indtast tidspunkt for åbning (fx 15)" required> <p> - </p>
      <input type="number" id="form-to-thursday" placeholder="Indtast tidspunkt for lukning (fx 02)" required> 
      </div>
      <div class="form-days">
      <p>Fredag</p>
      <input type="number" id="form-from-friday" placeholder="Indtast tidspunkt for åbning (fx 15)" required> <p> - </p>
      <input type="number" id="form-to-friday" placeholder="Indtast tidspunkt for lukning (fx 02)" required> 
      </div>
      <div class="form-days">
      <p>Lørdag</p>
      <input type="number" id="form-from-saturday" placeholder="Indtast tidspunkt for åbning (fx 15)" required> <p> - </p>
      <input type="number" id="form-to-saturday" placeholder="Indtast tidspunkt for lukning (fx 02)" required> 
      </div>
      <div class="form-days">
      <p>Søndag</p>
      <input type="number" id="form-from-sunday" placeholder="Indtast tidspunkt for åbning (fx 15)" required> <p> - </p>
      <input type="number" id="form-to-sunday" placeholder="Indtast tidspunkt for lukning (fx 02)" required> 
      </div>
      
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