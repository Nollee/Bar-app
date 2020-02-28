// import your pages

import LoginPage from "./pages/login.js";
import BarPage from "./pages/bars.js";
import ProfilePage from "./pages/profile.js";
import HomePage from "./pages/home.js";
import ChancePage from "./pages/chance.js";
import Tabbar from "./pages/tabbar.js";
import UpdatePage from "./pages/updateprofile.js";

// import your services
import spaService from "./services/spa.js";
import authService from "./services/auth.js";
import FavouritePage from "./pages/favourite.js";
import barService from "./services/bar.js";
import couponService from "./services/coupon.js"; 




// Declare and init pages
let loginPage = new LoginPage();
let barPage = new BarPage();
let favouritePage = new FavouritePage();
let profilePage = new ProfilePage();
let homePage = new HomePage();
let chancePage = new ChancePage();
let tabbar = new Tabbar();
let updatePage = new UpdatePage();
let _barDatabase = new BarPage();




// init services 
spaService.init();
authService.init();
 
// onclick handlers

// coupon handlers
window.createCoupon = () => couponService.createCoupon();
window.appendCoupons = () => couponService.appendCoupons();
window.addToOwnedCoupons = (couponId) => chancePage.addToOwnedBars(couponId);
window.removeCoupon = (couponId) => couponService.removeCoupon(couponId);
window.showOwnedCoupon = (id) => couponService.showOwnedCoupon(id);

// spa handlers
window.pageChange = () => spaService.pageChange();

// profile handlers
window.logout = () => profilePage.logout();
window.deleteAccount = () => profilePage.deleteAccount();
window.toggleDelete = () => profilePage.toggleDelete();


// bar handlers
window.showDetailView = (id) => barService.showDetailView(id); 
window.addToFavourites = (barId) => barPage.addToFavourites(barId);
window.removeFromFavourites = (barId) => barPage.removeFromFavourites(barId);  
window.search = (value) => barService.search(value);   
window.createBar = () => barService.createBar();
window.showAddBar = () => barService.showAddBar(); 
window.hideAddBar = () => barService.hideAddBar();  


   
