class RestaurantDetail extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {}
}

customElements.define("restaurant-detail", RestaurantDetail);
