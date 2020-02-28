
export default class DetailPage {

    constructor() {
        this.template();
      }
    
      template() {
        document.getElementById('content').innerHTML += /* html */ `
        <section id="detail-view" class="page">
        </section>
        `;
}
}
