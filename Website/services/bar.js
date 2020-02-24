import spaService from "../services/spa.js";
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
            this.appendBars(bars);    
        });
    }  

    appendBars(bars) {
        let htmlTemplate = "";
        for (let bar of this.bars) {
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
} 
