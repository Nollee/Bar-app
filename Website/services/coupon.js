import spaService from "./spa.js";
import authService from "./auth.js";
import loaderService from "./loader.js";

class CouponService {
    constructor(){
        this.couponRef = _db.collection("coupons");
        this.spaService = spaService;
        this.coupons = [];
        
    }

    init() {
        // init all bars
        this.couponRef.onSnapshot(snapshotData => {
            this.coupons = [];
            snapshotData.forEach(doc => {
                this.coupon = doc.data();
                this.coupon.id = doc.id;
                this.coupons.push(this.coupon);  
            });
            console.log(this.coupons);
                    });
        this.appendOwnedCoupons();
    }

    appendCoupons(){
        let coupons = this.coupons
        this.randomCoupon = coupons[Math.floor(Math.random()*coupons.length)];
        console.log(this.randomCoupon);
        if (this.randomCoupon.lose === "lose") {
            document.querySelector("#coupon-container").innerHTML = /* html */ `
            <article class="coupon-wrapper">
            <img src="https://i.redd.it/mzz6i3sjrsd11.png" alt="tabt">
            <h3>Ingen gevinst i dag. Prøv igen imorgen!</h3>
            </article>
            `;
        
            
        } else {
            document.querySelector("#coupon-container").innerHTML = /* html */ `
            <article class="coupon-wrapper">
            <img src="${this.randomCoupon.img}" alt="gevinst">
            <h3>${this.randomCoupon.rabat}</h3>
            <h3>${this.randomCoupon.for}</h3>
            <h3>${this.randomCoupon.to}</h3>
            ${this.generateGetCouponButton(this.randomCoupon.id)}
            </article>
            `; 
        }
    }

    generateGetCouponButton(couponId) {
        let btnTemplate = /*html*/ `
        <button onclick="addToOwnedCoupons('${couponId}')">Add to favourites</button>
          `; 
        return btnTemplate;
    }; 

    // adds a given Id to the favMovies array inside _currentUser

    addToOwnedCoupons(couponId) {
        loaderService.show(true);
        authService.authUserRef.set({
            ownedCoupons: firebase.firestore.FieldValue.arrayUnion(couponId)
        }, {
            merge: true
        });
        this.spaService.navigateTo("home");
        loaderService.show(false);

    }


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

    async appendOwnedCoupons() {
        let coupons = await couponService.getOwnedCoupons();
        let template = "";
        for (let coupon of coupons) {
            template += /* html*/ `
            <div class="slide coupon" style="background-image: url('${coupon.img}');">
            <h3>${coupon.rabat}</h3>
            <p>${coupon.for}</p>
            </div>
          `;
        }
        if (coupons.length === 0) {
            template = `
                <p>No Bars added</p>
            `;
        }
        document.querySelector('#myCoupons').innerHTML = template;
    }; 



    createCoupon() {
        // references to the input fields
        let rabatInput = document.querySelector('#coupon-rabat');
        let forInput = document.querySelector('#coupon-for');
        let imgInput = document.querySelector('#coupon-img'); 
        let toInput = document.querySelector('#coupon-to'); 

        let newCoupon = {
            rabat: rabatInput.value,
            for: forInput.value, 
            img: imgInput.value,  
            to: toInput.value,
        };
        
        let lose = {
            lose: "lose"
        };
        /* location.reload();  */
        this.couponRef.add(newCoupon);
        this.couponRef.add(lose);
        this.couponRef.add(lose);
        console.log(this.coupons);
      } 
}

const couponService = new CouponService();
export default couponService;