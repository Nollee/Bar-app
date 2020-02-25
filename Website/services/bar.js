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
            
            snapshotData.forEach(doc => {
                this.bar = doc.data();
                this.bar.id = doc.id;
                this.bars.push(this.bar);  
            });
            this.appendBars(this.bars);       
        });
        this.appendFavBars();
    }  

    appendBars(bars) {
        let htmlTemplate = "";
        for (let index = 0; index < bars.length; index++) {
            let bar = bars[index];     
             htmlTemplate += /* html */ `
            <article onclick="showDetailView('${bar.id}')" class="bar-card">  
              <h2>${bar.name}</h2> 
              <p>${bar.id}</p> 
              <p>${bar.address}</p>
              <p>${bar.description}</p>
              <p>plads: 0 - ${bar.space}</p>
              <p>pris: ${bar.price}kr.</p> 
              <p>${bar.opening}</p>
              <p>${bar.games}</p>   
            </article> 
            <style> 
            .bar-card {background-image: url(${bar.img});}   
            </style> 
            ${this.generateFavBarButton(bar.id)}
          `;
        } 
        document.querySelector('#bar-container').innerHTML = htmlTemplate;
        console.log(bars);
      }
    




    showDetailView(id) { 

        for (let bar of this.bars) {
            if (bar.id === id) {
              this._selectedBar = bar;
            }
        } 
        document.querySelector("#detail-view").innerHTML = `
        <article>
            <h1>${this._selectedBar.name}</h1>
            <h1>${this._selectedBar.games}</h1>
            <img src="${this._selectedBar.img}">
        </article>
  `;
    this.spaService.navigateTo("detail-view");

    }

    generateFavBarButton(barId) {
        let btnTemplate = `
          <button onclick="addToFavourites('${barId}')">Add to favourites</button>`;
        if (this.userHasFav(barId)) {
            btnTemplate = `
            <button onclick="removeFromFavourites('${barId}')" class="rm">Remove from favourites</button>`;
        } 
        return btnTemplate;
    }

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
                bar.id = doc.id;;
                favBars.push(Bar);
            });
        }
        return favBars;
    }

    async appendFavBars() {
        let bars = await barService.getFavBars();
        let template = "";
        for (let bar of bars) {
            template +=  `
            <article>
              <h2>${bar.title} (${bar.year})</h2>
              <img src="${bar.img}">
              <p>${bar.description}</p>
              <button onclick="removeFromFavourites('${bar.id}')" class="rm">Remove from favourites</button>
            </article>
          `;
        }
        if (bars.length === 0) {
            template = `
                <p>No Bars added</p>
            `;
        }
        document.querySelector('#favourite').innerHTML = template;
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


          
/* search(value) {
    let searchQuery = value.toLowerCase();
    let filteredMovies = []; 
    for (let bar of this.bars) {    
      let title = bar.name.toLowerCase();
      if (title.includes(searchQuery)) {
        filteredMovies.push(bar);
      }
    }
    console.log(filteredMovies);
    this.appendBars(filteredMovies); 
  }  */   
}  

const barService = new BarService();
export default barService




 
