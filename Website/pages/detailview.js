export default class detailPage {
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