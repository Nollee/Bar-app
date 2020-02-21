class BarService {
    constructor() {
        this.movieRef = _db.collection("bars");
    }
    init() {
        // init all movies
        this.movieRef.onSnapshot(snapshotData => {
            let bars = []; 
            snapshotData.forEach(doc => {
                let bar = doc.data();
                bar.id = doc.id;
                bars.push(bar);
            });
            this.appendBars(bars);
            this.showDetailView();  
        });
    } 

    appendBars(bars) {
        let htmlTemplate = "";
        for (let bar of bars) {
             htmlTemplate += /* html */ `
            <article onclick="showDetailView(${bar.id})">  
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
    }

    showDetailView(id) {
        for (let bar of bars) {
            if (bar.id === id) {
                selectedBar = bar; 
            }
        } 
        document.querySelector("#detail-view").innerHTML = /*html*/ `
        <article>  
              <h2>${selectedBar.name}</h2>
              <p>${selectedBar.location}</p>
              <p>${selectedBar.address}</p>
              <p>${selectedBar.description}</p>
              <p>plads: 0 - ${selectedBar.space}</p>
              <p>pris: ${selectedBar.price}kr.</p> 
              <p>${selectedBar.opening}</p>
              <p>${selectedBar.games}</p>  
            </article>
            <style> 
            article {background-image: url(${bar.img});}   
            </style>  
        `;
        navigateTo("detail-view");  
    }

} 

const barService = new BarService();
export default barService;