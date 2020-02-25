// import your pages

import LoginPage from "./pages/login.js";
import BarPage from "./pages/bars.js";
import ProfilePage from "./pages/profile.js";
import HomePage from "./pages/home.js";
import ChancePage from "./pages/chance.js";
import Tabbar from "./pages/tabbar.js";
import UpdatePage from "./pages/updateprofile.js";
import DetailPage from "./pages/detailview.js";

// import your services
import spaService from "./services/spa.js";
import authService from "./services/auth.js";
import FavouritePage from "./pages/favourite.js";
import barService from "./services/bar.js";




// Declare and init pages
let loginPage = new LoginPage();
let barPage = new BarPage();
let favouritePage = new FavouritePage();
let profilePage = new ProfilePage();
let homePage = new HomePage();
let chancePage = new ChancePage();
let tabbar = new Tabbar();
let detailPage = new DetailPage();
let updatePage = new UpdatePage();
let _barDatabase = new BarPage();




// init services 
spaService.init();
authService.init();
 
// onclick handlers
window.pageChange = () => spaService.pageChange();
window.logout = () => profilePage.logout();
window.showDetailView = (id) => _barDatabase.showDetailView(id); 
window.addToFavourites = (barId) => barPage.addToFavourites(barId);
window.removeFromFavourites = (barId) => barPage.removeFromFavourites(barId);  
window.search = (value) => barService.search(value);   
window.updateUser = () => updatePage.updateUser();
window.previewImage = (file, previewId) => updatePage.previewImage(file, previewId);
window.createBar = () => barService.createBar(); 


   
