export default class CouponPage {
    constructor() {
        this.template();
      }

      template(){
        document.getElementById('content').innerHTML += /* html */ `
        <section id="coupon-container" class="page">
        </section>
        `


      }

    }