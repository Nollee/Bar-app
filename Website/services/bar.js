class BarService {
    constructor() {
        this.barRef = _db.collection("bars");
    }
    init() {
        // init all movies
        this.barRef.onSnapshot(snapshotData => {
            let bars = [];
            snapshotData.forEach(doc => {
                let bar = doc.data();
                bar.id = doc.id;
                bars.push(bar);
            });
            this.appendBars(bars);

        });a
    }

    appendBars(bars) {
        let htmlTemplate = "";
        for (let bar of bars) {
            htmlTemplate += /* html */ `
            <article>
              <h2>${bar.name}</h2>
              <p>${bar.location}</p>
            </article>
            
          `;
        }
        document.querySelector('#bar-container').innerHTML = htmlTemplate;
    }
}

const barService = new BarService();
export default barService;