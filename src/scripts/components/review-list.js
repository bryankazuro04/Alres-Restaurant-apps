import "./review-item";

class ReviewList extends HTMLElement {
  set reviewList(reviewItem) {
    this._reviewList = reviewItem;
    this.render();
  }

  get reviewList() {
    return this._reviewList;
  }

  render() {
    this._reviewList.forEach((review) => {
      const reviewItem = document.createElement("review-item");
      reviewItem.reviews = review;
      this.appendChild(reviewItem);
    });
  }
}

customElements.define("review-list", ReviewList);
