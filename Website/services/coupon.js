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
        } else {
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
            <div class="overlav"></div>
            `;
            this.addToOwnedCoupons(this.randomCoupon.id);
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
        loaderService.show(true);
        let coupons = await couponService.getOwnedCoupons();
        let template = "";
        for (let i = 0; i< coupons.length; i++) {
            let coupon = coupons[i];
            template += /* html*/ `
            <div class="slide coupon" onclick="showOwnedCoupon('${coupon.id}')">
            <h3>${coupon.rabat}</h3>
            <img src="${coupon.img}" alt="gevinst">
            <p>${coupon.for}</p>
            </div>
          `;
        }
        if (coupons.length === 0) {
            template = `
                <p>Du har ingen kuponer</p>
            `;
        }
        document.querySelector('#myCoupons').innerHTML = template;
        loaderService.show(false);
    }; 

    async showOwnedCoupon(id){
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
        this.spaService.navigateTo("detail-view");
    }

    removeCoupon(couponId) {
        loaderService.show(true);
        authService.authUserRef.update({
            ownedCoupons: firebase.firestore.FieldValue.arrayRemove(couponId)
        });
        setTimeout(this.spaService.navigateTo("home"), 1000
        )
 
    }




    createCoupon() {
        // references to the input fields
        let rabatInput = document.querySelector('#coupon-rabat');
        let forInput = document.querySelector('#coupon-for');
        let imgInput = document.querySelector('#coupon-img'); 
        let toInput = document.querySelector('#coupon-to'); 
        let expireInput = document.querySelector('#expire');

        let newCoupon = {
            rabat: rabatInput.value,
            for: forInput.value, 
            img: imgInput.value,  
            to: toInput.value,
            expire: expireInput
        };
        
        let lose = {
            lose: "lose"
        };
        /* location.reload();  */
        this.couponRef.add(newCoupon);
       /*  this.couponRef.add(lose);
        this.couponRef.add(lose); */
        console.log(this.coupons);
      } 
}

const couponService = new CouponService();
export default couponService;