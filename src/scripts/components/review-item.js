class ReviewItem extends HTMLElement {
  set reviews(review) {
    this._reviews = review;
    this.render();
  }

  get reviews() {
    return this._reviews;
  }

  render() {
    this.innerHTML = `
      <h4>${this._reviews.name}</h4>
      <h5>${this._reviews.date}</h5>
      <p>${this._reviews.review}</p>
    `;
  }
}
customElements.define("review-item", ReviewItem);
