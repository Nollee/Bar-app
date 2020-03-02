import spaService from "./spa.js";
import loaderService from "./loader.js";
import barService from "./bar.js";
import couponService from "./coupon.js"

class AuthService {
    constructor() {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.userRef = _db.collection("users");
        this.spaService = spaService;
        this.loaderService = loaderService;
        this.authUser;
        this.authUserRef;
    }

    init() {
        // Listen on authentication state change
        firebase.auth().onAuthStateChanged(user => {
            if (user) { // if user exists and is authenticated
                this.userAuthenticated(user);
            } else { // if user is not logged in
                this.userNotAuthenticated();
            }
        });
    }

    // if user is authenticated, start following functions
    userAuthenticated(user) {
        this.spaService.hideTabbar(false);
        this.initAuthUserRef();
        this.loaderService.show(false);
        console.log(user);
        this.appendUserData(user);
        this.insertProfilePic(user);

    }
    // if user is not authenticated, start following functions
    userNotAuthenticated() {
        this.spaService.hideTabbar(true);
        this.spaService.navigateTo("login");

        // Firebase UI configuration
        const uiConfig = {
            credentialHelper: firebaseui.auth.CredentialHelper.NONE,
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: '#home'
        };
        this.ui.start('#firebaseui-auth-container', uiConfig);
        this.loaderService.show(false);
    }

    initAuthUserRef() {
        let authUser = firebase.auth().currentUser;
        this.authUserRef = _db.collection("users").doc(authUser.uid);
        // init user data, init barService and init couponService
        this.authUserRef.onSnapshot({
            includeMetadataChanges: true
        }, userData => {
           // if (!userData.metadata.hasPendingWrites && userData.data()) {
                let user = {
                    ...authUser,
                    ...userData.data()
                }; //concating two objects: authUser object and userData objec from the db
                this.authUser = user;
                barService.init();
                couponService.init();
                loaderService.show(false);
            //}

        });

    }

    // Appends the data of the user 
    appendUserData(user){
        document.querySelector('#profile-container').innerHTML += /* html */ `
             <article class="profiledata">
             <img id="profile-pic" src="${user.photoURL}?height=500" alt="user">
             <h3>${user.displayName}</h3>
             <div class="profile-info"> 
             <img class="icon" src="./images/mail.svg" alt="mail">
            <p>${user.email}</p>
            </div>
             </article>
          `;
        console.log(user);
    }
    
    // insets profile pic in the top-left of the screen
    insertProfilePic(user){

        let elements = document.querySelectorAll('.pic-wrapper')
        for (let element of elements) {
            element.innerHTML = /* html */ `
            <a href="#profile"><img src="${user.photoURL}?height=200"></a>
            `
            
        }
    }
    // Makes the user log out
    logout() {
        firebase.auth().signOut();
    }
    
    // deletes the account
    deleteAccount(){
        let user = firebase.auth().currentUser;

        user.delete();
    }


    

}

const authService = new AuthService();
export default authService;