// import your pages

import BarPage from "./pages/bars.js";
import ProfilePage from "./pages/profile.js";
import HomePage from "./pages/home.js";
import ChancePage from "./pages/chance.js";
import Tabbar from "./pages/tabbar.js"

// import your services
import spaService from "./services/spa.js";
import barService from "./services/bar.js";



// Declare and init pages

let barPage = new BarPage();
let profilePage = new ProfilePage();
let homePage = new HomePage();
let chancePage = new ChancePage();
let tabbar = new Tabbar();



// init services 
spaService.init();
barService.init(); 

// onclick handlers
window.pageChange = () => spaService.pageChange();
