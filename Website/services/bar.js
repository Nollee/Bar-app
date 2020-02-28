import spaService from "./spa.js";
import authService from "./auth.js";
import loaderService from "./loader.js";



class BarService {
    constructor() {
        this.barRef = _db.collection("bars");
        this.bars = [];
        this._selectedBar;
        this.spaService = spaService;    
    }
    init() {
        // init all bars
        this.barRef.onSnapshot(snapshotData => {
            this.bars = []; 
            snapshotData.forEach(doc => {
                let bar = doc.data();
                bar.id = doc.id;
                this.bars.push(bar);  
            });
            console.log(this.bars); 
            this.appendBars(this.bars);
            this.appendBarsHome(this.bars);       
        });
        this.appendFavBars();
    }  

    appendBars(bars) {
        let htmlTemplate = "";
        for (let index = 0; index < bars.length; index++) {
            let bar = bars[index];     
             htmlTemplate += /* html */ `
            <article class="bar-card" style="background-image: url('${bar.img}');">
            <div class="bar-card-onclick" onclick="showDetailView('${bar.id}')"></div> 
            <div>
            <div class="bar-card-gradient"></div> 
            </div>  
            <h2>${bar.name}</h2>  
            <div class="bar-card-info"> 
            <p>${bar.price}kr.</p>  
              <div class="small-dot"></div>    
              <p>${bar.type}</p> 
              <div class="small-dot"></div>
              <p>${bar.age}+</p>  
              <div class="small-dot"></div> 
             <!--<a href="https://maps.google.com/?q=${bar.address}">${bar.address}</a>  --> 
             <!--<img class="bar-card-heart" src="../images/heart.svg" alt="image of heart">-->  
             ${this.generateFavBarButton(bar.id)}
             </div>      
             </article>       
          `;
        } 
        document.querySelector('#bar-container').innerHTML = htmlTemplate;
        
        console.log(bars);
      }

      appendBarsHome(bars) {
        let htmlTemplate = "";
        for (let index = 0; index < bars.length; index++) {
            let bar = bars[index];     
             htmlTemplate += /* html */ `
            <article class="bar-card bar-card-home" style="background-image: url('${bar.img}');">
            <div class="bar-card-onclick" onclick="showDetailView('${bar.id}')"></div>
            <div> 
            <div class="bar-card-gradient"></div>
            </div>
            <div class="bar-card-home-info">   
            <h2>${bar.name}</h2>  
            <div class="bar-card-info"> 
            <p>${bar.price}kr.</p>  
              <div class="small-dot"></div>    
              <p>${bar.type}</p> 
              <div class="small-dot"></div>
              <p>${bar.age}+</p>  
              <div class="small-dot"></div> 
             <!--<a href="https://maps.google.com/?q=${bar.address}">${bar.address}</a>  --> 
             <!--<img class="bar-card-heart" src="../images/heart.svg" alt="image of heart">-->  
             ${this.generateFavBarButton(bar.id)}
             </div>
             </div>     
             </article>
          `;
        } 
        document.querySelector('#bar-highlight').innerHTML = htmlTemplate;
    
      }
    
    showDetailView(id) { 

        for (let bar of this.bars) {
            if (bar.id === id) {
              this._selectedBar = bar;
            }
        } 
        document.querySelector("#detail-view").innerHTML = /*html */ `
        <a href="#bars" class="exit"><img src="images/x.svg"></a>
        <article class="detailview"> 
            <div class="detailview-content">
            <div class="detailview-gradient"><h1>${this._selectedBar.name}</h1></div> 
            <div class="detailview-img" style="background-image: url('${this._selectedBar.img}');"></div> 
            <a href="https://maps.google.com/?q=${this._selectedBar.address}" target="_blank"><img src="images/pin.svg" alt="ikon af addresse">${this._selectedBar.address}    
            </a>   
            ${this.generateFavBarButton(this._selectedBar.id)} 
            <p>${this._selectedBar.description}</p> 
            <h2>Stedet</h2> 
            <div class="detailview-info">
            <div class="detailview-info-content">
            <img src="../images/age-white.svg" alt="ikon af mindstealder"> 
            <p>${this._selectedBar.age}+</p>
            </div>  
            <div class="detailview-info-content">
            <img src="../images/coins.svg" alt="ikon af pris">
            <p>${this._selectedBar.price}kr.</p> 
            </div> 
            <div class="detailview-info-content">
            <img src="../images/smile.svg" alt="ikon af stemning">
            <p>${this._selectedBar.type}</p> 
            </div>
            <div class="detailview-info-content">
            <img src="../images/space.svg" alt="ikon af rummelighed"> 
            <p>0 - ${this._selectedBar.space}</p> 
            </div>
            </div>
            <!---åbningstider---> 
            <h2>Åbningstider</h2>
            <div class="detailview-openings">
            <div class="openings-content">Mandag:</div> 
            <div class="openings-content">
            ${this._selectedBar.mondayFrom}
            </div><p> - </p>
            <div class="openings-content">
            ${this._selectedBar.mondayTo}
            </div> 
            </div>  
            <div class="detailview-openings">
            <div class="openings-content">Tirsdag:</div>
            <div class="openings-content">
            ${this._selectedBar.tuesdayFrom}
            </div><p> - </p>
            <div class="openings-content">
            ${this._selectedBar.tuesdayTo}
            </div> 
            </div> 
            <div class="detailview-openings">
            <div class="openings-content">Onsdag:</div>
            <div class="openings-content">
            ${this._selectedBar.wednesdayFrom}
            </div><p> - </p>
            <div class="openings-content">
            ${this._selectedBar.wednesdayTo}
            </div>
            </div>  
            <div class="detailview-openings">
            <div class="openings-content">Torsdag:</div>
            <div class="openings-content">
            ${this._selectedBar.thursdayFrom}</div><p> - </p>
            <div class="openings-content">
            ${this._selectedBar.thursdayTo}
            </div>
            </div>
            <div class="detailview-openings"> 
            <div class="openings-content">Fredag:</div>
            <div class="openings-content">           
            ${this._selectedBar.fridayFrom}</div><p> - </p>
            <div class="openings-content">
            ${this._selectedBar.fridayTo}
            </div>
            </div>  
            <div class="detailview-openings">
            <div class="openings-content">Lørdag:</div>
            <div class="openings-content">
            ${this._selectedBar.saturdayFrom}
            </div><p> - </p>
            <div class="openings-content">
            ${this._selectedBar.saturdayTo}
            </div>
            </div>  
            <div class="detailview-openings">
            <div class="openings-content">Søndag:</div>
            <div class="openings-content">
            ${this._selectedBar.sundayFrom}
            </div><p> - </p>
            <div class="openings-content">
            ${this._selectedBar.sundayTo}
            </div>
            </div>    
            </div>        
        </article> 
  `; 
            
    this.spaService.navigateTo("detail-view");

    }

    generateFavBarButton(barId) {
        let btnTemplate = /*html*/ `
        <div class="fav-btn" onclick="addToFavourites('${barId}')">   
        <img src="../images/heart.svg">
        </div> 
          `; 
        if (this.userHasFav(barId)) {
            btnTemplate = /*html*/ ` 
            <img class="fav-btn-rm" src="../images/heart-fill.svg" onclick="removeFromFavourites('${barId}')"> 
            `;  
        }; 
        return btnTemplate;
    }; 

     userHasFav(favBarId) {
        if (authService.authUser.favBars && authService.authUser.favBars.includes(favBarId)) {
            return true;
        } else {
            return false;
        }
    } 

    // adds a given movieId to the favMovies array inside _currentUser

    addToFavourites(barId) {
        loaderService.show(true);
        authService.authUserRef.set({
            favBars: firebase.firestore.FieldValue.arrayUnion(barId)
        }, {
            merge: true
        });
        
    }

    // removes a given movieId to the favMovies array inside _currentUser
    removeFromFavourites(barId) {
        loaderService.show(true);
        authService.authUserRef.update({
            favBars: firebase.firestore.FieldValue.arrayRemove(barId)
        });
    }


    async getFavBars() {
        let favBars = [];
        for (let barId of authService.authUser.favBars) {
            await this.barRef.doc(barId).get().then(function (doc) {
                let bar = doc.data();
                bar.id = doc.id;  
                favBars.push(bar);
            });
        }
        return favBars;
    }

    async appendFavBars() {
        let bars = await barService.getFavBars();
        let template = "";
        for (let bar of bars) {
            template += /*html*/ `
            <article class="bar-card" style="background-image: url('${bar.img}');">
            <div class="bar-card-onclick" onclick="showDetailView('${bar.id}')"></div> 
            <div class="bar-card-gradient"></div>   
            <h2>${bar.name}</h2>  
            <div class="bar-card-info"> 
            <p>${bar.price}kr.</p>  
              <div class="small-dot"></div>    
              <p>${bar.type}</p> 
              <div class="small-dot"></div>
              <p>${bar.age}+</p>  
              <div class="small-dot"></div> 
             <!--<a href="https://maps.google.com/?q=${bar.address}">${bar.address}</a>  --> 
             <!--<img class="bar-card-heart" src="../images/heart.svg" alt="image of heart">-->  
             ${this.generateFavBarButton(bar.id)}
             </div>      
             </article> 
          `;
        }
        if (bars.length === 0) {
            template = `
                <p>No Bars added</p>
            `;
        }
        document.querySelector('#fav-container').innerHTML = template;
    }
 



    search(value) {
        let searchQuery = value.toLowerCase();
        let filteredBars = [];  
        for (let bar of this.bars) {    
        let title = bar.name.toLowerCase();
          if (title.includes(searchQuery)) {
            filteredBars.push(bar);
            this.appendBars(filteredBars);            
        } 
        
    }           
    console.log(filteredBars);  
    }  


  createBar() {
    // references to the input fields
    let nameInput = document.querySelector('#form-name');
    let descriptionInput = document.querySelector('#form-description');
    let imgInput = document.querySelector('#form-img');
    let spaceInput = document.querySelector('#form-space'); 
    let priceInput = document.querySelector('#form-price');
    let addressInput = document.querySelector('#form-address');
    let typeInput = document.querySelector('#form-type'); 
    let ageInput = document.querySelector('#form-age'); 
    let mondayFromInput = document.querySelector('#form-from-monday'); 
    let mondayToInput = document.querySelector('#form-to-monday'); 
    let tuesdayFromInput = document.querySelector('#form-from-tuesday'); 
    let tuesdayToInput = document.querySelector('#form-to-tuesday'); 
    let wednesdayFromInput = document.querySelector('#form-from-wednesday'); 
    let wednesdayToInput = document.querySelector('#form-to-wednesday'); 
    let thursdayFromInput = document.querySelector('#form-from-thursday'); 
    let thursdayToInput = document.querySelector('#form-to-thursday'); 
    let fridayFromInput = document.querySelector('#form-from-friday'); 
    let fridayToInput = document.querySelector('#form-to-friday'); 
    let saturdayFromInput = document.querySelector('#form-from-saturday'); 
    let saturdayToInput = document.querySelector('#form-to-saturday'); 
    let sundayFromInput = document.querySelector('#form-from-sunday'); 
    let sundayToInput = document.querySelector('#form-to-sunday'); 
    console.log(nameInput.value);
    console.log(descriptionInput.value);
    console.log(imgInput.value);
    console.log(spaceInput.value);
    console.log(priceInput.value);
    console.log(addressInput.value);
    console.log(typeInput.value); 
    console.log(ageInput.value);  
    console.log(mondayFromInput.value);
    console.log(mondayToInput.value); 
    console.log(tuesdayFromInput.value);
    console.log(tuesdayToInput.value); 
    console.log(wednesdayFromInput.value);
    console.log(wednesdayToInput.value); 
    console.log(thursdayFromInput.value);
    console.log(thursdayToInput.value); 
    console.log(fridayFromInput.value);
    console.log(fridayToInput.value); 
    console.log(saturdayFromInput.value);
    console.log(saturdayToInput.value); 
    console.log(sundayFromInput.value);
    console.log(sundayToInput.value); 
    
  
    let newBar = {
        name: nameInput.value,
        description: descriptionInput.value, 
        img: imgInput.value,  
        space: spaceInput.value,
        price: priceInput.value,
        address: addressInput.value,
        type: typeInput.value, 
        age: ageInput.value,
        /* days */
        mondayFrom: mondayFromInput.value,
        mondayTo: mondayToInput.value, 
        tuesdayFrom: tuesdayFromInput.value,
        tuesdayTo: tuesdayToInput.value,
        wednesdayFrom: wednesdayFromInput.value,
        wednesdayTo: wednesdayToInput.value,
        thursdayFrom: thursdayFromInput.value,
        thursdayTo: thursdayToInput.value,
        fridayFrom: fridayFromInput.value,
        fridayTo: fridayToInput.value,
        saturdayFrom: saturdayFromInput.value,
        saturdayTo: saturdayToInput.value,
        sundayFrom: sundayFromInput.value,
        sundayTo: sundayToInput.value 
    }; 
    /* location.reload();  */
    this.barRef.add(newBar);
    this.appendBars(this.bars);   
  }  

  showAddBar() {
     let form = document.getElementById("form-popup");
     form.classList.add("active");       
  }

  hideAddBar() {
      let form = document.getElementById("form-popup");
      form.classList.remove("active"); 
  } 
  
  
}     

const barService = new BarService();
export default barService  
     
    
     


   

 
 
