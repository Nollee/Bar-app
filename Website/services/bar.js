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

        });
    }

    appendBars(bars) {
        let htmlTemplate = "";
        for (let bar of bars) {
            htmlTemplate += /* html */ `
            <article>
            <h1>hej</h1>
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