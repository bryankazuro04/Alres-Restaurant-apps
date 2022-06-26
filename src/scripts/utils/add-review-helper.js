import RestaurantData from "../data/restaurant-source";
import "../components/review-list";

const addReviewHelper = {
  async send(url) {
    const sendReviewButton = document.querySelector("#reviewSendButton");
    const nameForm = document.querySelector("#name");
    const messageReviewColumn = document.querySelector("#review");

    sendReviewButton.addEventListener("click", async() => {
      const review = {
        id: url.id,
        name: nameForm.value,
        review: messageReviewColumn.value,
      };

      if (review.name && review.review) {
        const reviewContainer = document.querySelector("review-list");
        try {
          const response = await RestaurantData.addReview(review);
          RestaurantData.detailRestaurant(url.id);
          reviewContainer.reviewList = response.customerReviews;
        } catch (error) {
          alert(`
            Gagal menambahkan review. Silakan periksa koneksi internet Anda!
          `);
        }
      }

      this._resetForm();
    });
  },

  async _resetForm() {
    const nameForm = document.querySelector("#name");
    const messageReviewColumn = document.querySelector("#review");
    nameForm.value = "";
    messageReviewColumn.value = "";
  },
};

export default addReviewHelper;
