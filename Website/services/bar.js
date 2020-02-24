 class BarService {
    constructor() {
        this.barRef = _db.collection("bars");
        
    }
    init() {
        // init all bars
        this.barRef.onSnapshot(snapshotData => {
            let bars = [];
            snapshotData.forEach(doc => {
                let bar = doc.data();
                bar.id = doc.id;
                bars.push(bar);  
            });
            this.appendBars(bars);    
        });
    }  

    appendBars(bars) {
        let htmlTemplate = "";
        for (let bar of bars) {
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
        let bars = []; 
        for (let bar of bars) { 
            if (bar.id === id) {
                this._selectedBar = bar;  
            }
        } 
        document.querySelector("#detail-view").innerHTML = /*html*/ `
        <article>   
              <h2>${this._selectedBar.name}</h2>
              <p>${this._selectedBar.location}</p>
              <p>${this._selectedBar.address}</p>
              <p>${this._selectedBar.description}</p>
              <p>plads: 0 - ${this._selectedBar.space}</p>
              <p>pris: ${this._selectedBar.price}kr.</p> 
              <p>${this._selectedBar.opening}</p>
              <p>${this._selectedBar.games}</p>  
            </article>
            <style> 
            article {background-image: url(${this._selectedBar.img});}   
            </style>  
        `;
        navigateTo("detail-view");      
    } 

}  

const barService = new BarService();
export default barService;