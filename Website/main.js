// import your pages

import BarPage from "./pages/bars.js";

import ProfilePage from "./pages/profile.js";
// import your services
import spaService from "./services/spa.js";



// Declare and init pages

let barPage = new BarPage();
let profilePage = new ProfilePage();



// init services 
spaService.init();


// onclick handlers
window.pageChange = () => spaService.pageChange();
