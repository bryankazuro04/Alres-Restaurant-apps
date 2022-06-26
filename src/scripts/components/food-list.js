// import "../data/food-data.js";

class Food extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {}
}

customElements.define("food-list", Food);
