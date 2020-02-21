export default class homePage {
    constructor() {
      this.template();
    }
  
    template() {
      document.getElementById('content').innerHTML += /* html */ `
        <section id="home" class="page">
          <header class="topbar">
            <h2>home</h2>
          </header>
          <section id="home-container" class="grid-container">
          <section class="slider">
    <div class="slide">slide 1</div>
    <div class="slide">slide 2</div>
    <div class="slide">slide 3</div>
    <div class="slide">slide 4</div>
    <div class="slide">slide 5</div>
    <div class="slide">slide 6</div>
    <div class="slide">slide 7</div>
  </section></section>
        </section>
      `;
    }
  }