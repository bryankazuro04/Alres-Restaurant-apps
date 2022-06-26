class ReviewContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {}
}

customElements.define("review-container", ReviewContainer);
