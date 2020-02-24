export default class BarService {
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
            <article onclick="showDetailView('${bar.id}','${bar.name}')">  
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
            article {background-image: url(${bar.img});}   
            </style> 
          `;
        }
        document.querySelector('#bar-container').innerHTML = htmlTemplate;
        console.log(bars);
        
    }

    showDetailView(id, name) {
        console.log(id, name);    
    }
   
} 

