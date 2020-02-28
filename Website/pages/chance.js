import couponService from "../services/coupon.js";

export default class ChancePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="chance" class="page">
          <header class="topbar">
            <h1>Prøv lykken!</h1>
          </header>
          <section class="chance-intro">
          <h2>Vind en kupon!</h2>
          <p>Prøv chancen og vind en kupon til en bar. Du kan vinde alt fra en gratis drink til et beerpong-sæt!</p>
          <img src="images/spin.png" alt="spin">
          <div class="chance-btn" onclick="appendCoupons()">TRYK HER</div>

          </section>
          <section id="coupon-container" class="grid-container"></section>
          <form id="barForm">
      <!-- <h2>Tilføj en ny kupon</h2>
      
      <input type="text" id="coupon-rabat" placeholder="Indtast hvor meget rabat" required>
      <input type="text" id="coupon-for" placeholder="Indtast hvad rabatten er til" required> 
      <input type="url" id="coupon-img" placeholder="Indtast url for et billede af gevinsten" required> 
      <input type="text" id="coupon-to" placeholder ="Indtast hvor man kan indløse kuponen" required> 
      <button type="button" name="button" onclick="createCoupon()">Lav kupon</button>
    </form>  -->
        </section>
      `;
    }

    addToOwnedBars(couponId) {
      couponService.addToOwnedCoupons(couponId);
    }
  }