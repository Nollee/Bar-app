// import your pages

import LoginPage from "./pages/login.js";
import BarPage from "./pages/bars.js";
import ProfilePage from "./pages/profile.js";
import HomePage from "./pages/home.js";
import ChancePage from "./pages/chance.js";
import Tabbar from "./pages/tabbar.js"
import UpdatePage from "./pages/updateprofile.js"

// import your services
import spaService from "./services/spa.js";
import BarService from "./services/bar.js";
import authService from "./services/auth.js";
import FavouritePage from "./pages/favourite.js";



// Declare and init pages
let loginPage = new LoginPage();
let barPage = new BarPage();
let favouritePage = new FavouritePage();
let profilePage = new ProfilePage();
let homePage = new HomePage();
let chancePage = new ChancePage();
let tabbar = new Tabbar();
let detailPage = new BarService();
let updatePage = new UpdatePage();
let _barDatabase = new BarService();
const barService = new BarService();

// init services 
spaService.init();
barService.init();
authService.init();
_barDatabase.init();
 
// onclick handlers
window.pageChange = () => spaService.pageChange();
window.logout = () => profilePage.logout();
window.showDetailView = (id) => _barDatabase.showDetailView(id); 
window.addToFavourites = (barId) => favouritePage.addToFavourites(barId);
window.removeFromFavourites = (barId) => favouritePage.removeFromFavourites(barId);  
window.search = (value) => barService.search(value);   
window.updateUser = () => updatePage.updateUser();
window.previewImage = (file, previewId) => updatePage.previewImage(file, previewId);


   
