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
      <h2>Tilføj en bar</h2>
      <div class="form-text-wrapper">
      <h3>Navn</h3>
      </div>  
      <input type="text" id="form-name" placeholder="Indtast bar navn" required>
      <div class="form-text-wrapper">
      <h3>Beskrivelse</h3>
      </div>  
      <textarea id="form-description" cols="30" rows="5" required placeholder="Indtast beskrivelse af bar"></textarea> 
      <div class="form-text-wrapper-space">
      <h4>Hvor mange er der plads til?</h4>
      <input type="number" id="form-space" placeholder="(fx 200)" required>
      </div> 
      <div class="form-text-wrapper">
      <img src="../images/pin.svg"><h3>Addresse</h3>
      </div> 
      <input type="text" id="form-address" placeholder="Indtast addresse (fx Klostergade 36, 8000 Aarhus)" required>

      <div class="form-input-wrapper">
      <div class="form-input-container">
      <div class="form-text-wrapper">
      <img src="../images/$.svg"><h3>Pris</h3>
      </div> 
      <input type="text" id="form-price" placeholder="Indtast pris (fx 200)" required>
      </div>   
      
      <div class="form-input-container">
      <div class="form-text-wrapper">
      <img src="../images/smiley.svg"><h3>Stemning</h3>
      </div> 
      <input type="text" id="form-type" placeholder="(fx hyggeligt el. festligt)" required>
      </div> 
      </div>
      
      <div class="form-input-wrapper">
      <div class="form-input-container">
      <div class="form-text-wrapper">
      <img src="../images/photo.svg"><h3>Billede url</h3>
      </div> 
      <input type="url" id="form-img" placeholder="Indtast url for billede" required>  
      </div>

      <div class="form-input-container"> 
      <div class="form-text-wrapper">
      <img src="../images/age.svg"><h3>Mindstealder</h3>
      </div> 
      <input type="number" id="form-age" placeholder ="Mindstealder (fx 18)" required> 
      </div>
      </div> 
      
      <!------------- opening hours for form ------->
      <div class="form-text-wrapper">
      <img src="../images/clock.svg"><h3>Åbningstider</h3>
      </div> 
      <div class="form-days">
      <p>Mandag</p>
      <div class="form-days-wrapper">
      <input type="number" id="form-from-monday" placeholder="(fx 15)" required> <span> - </span>
      <input type="number" id="form-to-monday" placeholder="(fx 02)" required> 
      </div> 
      </div>
      <div class="form-days">
      <span>Tirsdag</span>
      <div class="form-days-wrapper">
      <input type="number" id="form-from-tuesday" placeholder="(fx 15)" required> <span> - </span>
      <input type="number" id="form-to-tuesday" placeholder="(fx 02)" required> 
      </div>
      </div> 
      <div class="form-days">
      <p>Onsdag</p>
      <div class="form-days-wrapper">
      <input type="number" id="form-from-wednesday" placeholder="(fx 15)" required> <span> - </span>
      <input type="number" id="form-to-wednesday" placeholder="(fx 02)" required> 
      </div>
      </div>
      <div class="form-days">
      <p>Torsdag</p>
      <div class="form-days-wrapper">
      <input type="number" id="form-from-thursday" placeholder="(fx 15)" required> <span> - </span>
      <input type="number" id="form-to-thursday" placeholder="(fx 02)" required> 
      </div>
      </div>
      <div class="form-days">
      <p>Fredag</p>
      <div class="form-days-wrapper">
      <input type="number" id="form-from-friday" placeholder="(fx 15)" required> <span> - </span>
      <input type="number" id="form-to-friday" placeholder="(fx 02)" required> 
      </div>
      </div> 
      <div class="form-days">
      <p>Lørdag</p>
      <div class="form-days-wrapper">
      <input type="number" id="form-from-saturday" placeholder="(fx 15)" required> <span> - </span>
      <input type="number" id="form-to-saturday" placeholder="(fx 02)" required> 
      </div> 
      </div> 
      <div class="form-days">
      <p>Søndag</p>
      <div class="form-days-wrapper">
      <input type="number" id="form-from-sunday" placeholder="(fx 15)" required> <span> - </span>
      <input type="number" id="form-to-sunday" placeholder="(fx 02)" required> 
      </div>
      </div> 
      
      <button id="create-bar" type="button" name="button" onclick="createBar()">Tilføj bar</button>
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