import spaService from "../services/spa.js";
import authService from "./auth.js";
import loaderService from "./loader.js";

export default class BarService {
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
     
    //////////////////////////////////////////////////////////////////
    createBar() {
        // references to the input fields
        let nameInput = document.querySelector('#form-name');
        let descriptionInput = document.querySelector('#form-description');
        let imgInput = document.querySelector('#form-img');
        let spaceInput = document.querySelector('#form-space'); 
        let priceInput = document.querySelector('#form-price');
        let addressInput = document.querySelector('#form-address');
        let typeInput = document.querySelector('#form-type'); 
        console.log(nameInput.value);
        console.log(descriptionInput.value);
        console.log(imgInput.value);
        console.log(spaceInput.value);
        console.log(priceInput.value);
        console.log(addressInput.value);
        console.log(typeInput.value);  
      
        let newBar = {
            name: nameInput.value,
            description: descriptionInput.value, 
            img: imgInput.value,  
            space: spaceInput.value,
            price: priceInput.value,
            address: addressInput.value,
            type: typeInput.value
        }; 
        /* location.reload();  */
        this.barRef.add(newBar);    
      }  
    ////////////////////////////////////////////////////////////////





}    

 
 
