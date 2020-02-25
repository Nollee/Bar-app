import spaService from "../services/spa.js";


export default class ProfileService {
    constructor() {
            
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