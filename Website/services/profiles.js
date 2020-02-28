import spaService from "../services/spa.js";
import loaderService from "./loader.js";
import barService from "./bar.js";

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



    







    
}
