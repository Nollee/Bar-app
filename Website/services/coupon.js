

// ================== MIKKEL NA ===========================

import spaService from "./spa.js";
import authService from "./auth.js";
import loaderService from "./loader.js";

class CouponService {
    constructor(){
        this.couponRef = _db.collection("coupons");
        this.spaService = spaService;
        this.coupons = [];
        this.selectedCoupon;
        
    }

    init() {
        // init all coupons from firebase
        this.couponRef.onSnapshot(snapshotData => {
            this.coupons = [];
            snapshotData.forEach(doc => {
                this.coupon = doc.data();
                this.coupon.id = doc.id;
                this.coupons.push(this.coupon);  
            });
            console.log(this.coupons);
                    });
        // Calls the append function which appends owned coupons in "home"
        this.appendOwnedCoupons();
    }

    //Appends 1 random coupon when clicked
    appendCoupons(){
        let coupons = this.coupons
        // Math which gives the user 1 coupon every time they click
        this.randomCoupon = coupons[Math.floor(Math.random()*coupons.length)];

        // if else statement that either gives a "you lose"-notification or a "congratulations!"-notification

        // if-statement which looks on the generated coupon's property. if the coupon has a property called "lose", which has the value "lose", it appends the following:
        if (this.randomCoupon.lose === "lose") {
            document.querySelector("#coupon-container").innerHTML = /* html */ `
            <article class="coupon-wrapper">
            <div class="img-wrapper">
            <div class="img-gradient"></div>
            <img src="https://i.redd.it/mzz6i3sjrsd11.png" alt="tabt">
            <h2>Øv!</h2>
            </div>
            <h3>Ingen gevinst</h3>
            <h4>Prøv igen imorgen!</h4>
            <a href="#home" class="seeMore">Hjem</a>
            </article>
            `;
        } 
        // else it appends a real coupon
        else {
            document.querySelector("#coupon-container").innerHTML = /* html */ `
            <article class="coupon-wrapper">
            <div class="img-wrapper">
            <div class="img-gradient"></div>
            <img src="${this.randomCoupon.img}" alt="gevinst">
            <h2>${this.randomCoupon.rabat}</h2>
            </div>
            <h3>${this.randomCoupon.for}</h3>
            <h4> På ${this.randomCoupon.to}</h4>
            <p>Indløs kuponen ved at vise den til en bartender hos ${this.randomCoupon.to}
            </p>
            <p class="expire">Udløber: ${this.randomCoupon.expire}</p>
            <a class="seeMore" href="#home">Se kuponer</a>
            </article>
            `;

            // calls the function addToOwnedCoupons() for the random coupon that has been generated
            this.addToOwnedCoupons(this.randomCoupon.id);

        }

        // navigates to the section "coupon-container", with the help of spa.js
        this.spaService.navigateTo("coupon-container");

        
    }
    
    // adds the ID of the generated coupon to an array called "ownedCoupons" 
    addToOwnedCoupons(couponId) {
        loaderService.show(true);

        //makes the array and adds a value which is equal to the id of the generated coupon

        // calls the variable authUserRef from authService in auth.js
        authService.authUserRef.set({
            ownedCoupons: firebase.firestore.FieldValue.arrayUnion(couponId)
        }, {
            merge: true
        });
        loaderService.show(false);

    }

    // gets the ID of the owned coupons from the array "ownedCoupons" and connects it with the same ID from the collection "coupons"
    async getOwnedCoupons() {
        let ownedCoupons = [];
        for (let couponId of authService.authUser.ownedCoupons) {
            await this.couponRef.doc(couponId).get().then(function (doc) {
                let coupon = doc.data();
                coupon.id = doc.id;
                ownedCoupons.push(coupon);
            });
        }
        return ownedCoupons;
    }

    // appends the ownedCoupons to "home"
    async appendOwnedCoupons() {
        loaderService.show(true);

        // calls getOwnedCoupons
        let coupons = await couponService.getOwnedCoupons();

        let template = "";
        for (let i = 0; i< coupons.length; i++) {
            let coupon = coupons[i];
            template += /* html*/ `
            <div class="coupon bar-card" style="background-image: url('${coupon.img}');">
            <div class="detail-view"onclick="showOwnedCoupon('${coupon.id}')"></div> 
            <div class="coupon-card-info">    
                <h3>${coupon.rabat}</h3>
                <p>${coupon.for}</p>
            </div>
            <div>
            <div class="bar-card-gradient"></div>
            </div>
            </div>
          `;
        }

        // if you don't have any coupons, show this
        if (coupons.length === 0) {
            template = `
                <p class="nothing">ingen kuponer</p>
            `;
        }
        document.querySelector('#myCoupons').innerHTML = template;
        loaderService.show(false);
    }; 


    // function which shows details of coupon, when clicked on
    async showOwnedCoupon(id){
        loaderService.show(true);
        
    let coupons = await couponService.getOwnedCoupons();

        for (let coupon of coupons) {
            if(coupon.id === id){
             this.selectedCoupon = coupon;
            }

        }
        console.log(this.selectedCoupon);
        document.querySelector("#detail-view").innerHTML = /* html */ `
        <a class="exit" href="#home"><img src="images/x.svg"></a>
        <article class="coupon-wrapper">

        <div class="img-wrapper">
        <div class="img-gradient"></div>
        <img src="${this.selectedCoupon.img}" alt="gevinst">
        <h2>${this.selectedCoupon.rabat}</h2>
        </div>
        <h3>${this.selectedCoupon.for}</h3>
        <h4> På ${this.selectedCoupon.to}</h4>
        <p class="expire">Udløber: ${this.selectedCoupon.expire}</p>
        <p class="obs">OBS! DENNE KUPON KAN KUN INDLØSES AF EN MEDARBEJDER HOS ${this.selectedCoupon.to}</p>
        <div class="seeMore" onclick="removeCoupon('${this.selectedCoupon.id}')">Indløs Kupon</div>
        </article>
        <div class="overlav"></div>
        `;

        // navigates to "detail-view, which includes the shown coupon"
        this.spaService.navigateTo("detail-view");
        loaderService.show(false);

    }


    // removes coupon from "ownedCoupons", when user click on "Indløs Kupon"
    removeCoupon(couponId) {
        loaderService.show(true);
        authService.authUserRef.update({
            ownedCoupons: firebase.firestore.FieldValue.arrayRemove(couponId)
        });
        setTimeout(this.spaService.navigateTo("home"), 1000
        )
 
    }



    // Creates a new coupon with the help of a form
    createCoupon() {
        // references to the input fields
        let rabatInput = document.querySelector('#coupon-rabat');
        let forInput = document.querySelector('#coupon-for');
        let imgInput = document.querySelector('#coupon-img'); 
        let toInput = document.querySelector('#coupon-to'); 
        let expireInput = document.querySelector('#expire');

        // makes a coupon with property and values
        let newCoupon = {
            rabat: rabatInput.value,
            for: forInput.value, 
            img: imgInput.value,  
            to: toInput.value,
            expire: expireInput
        };
        
        // makes a "loser-coupon"
        let lose = {
            lose: "lose"
        };

        this.couponRef.add(newCoupon);
        // adds two "loser-coupons" when creating 1 real coupon
       this.couponRef.add(lose);
        this.couponRef.add(lose);
        console.log(this.coupons);
      } 
}

const couponService = new CouponService();
export default couponService;

// ================== MIKKEL NA ===========================
