import UrlParser from "../../routes/url-parser";
import RestaurantData from "../../data/restaurant-source";
import {
  createRestaurantDetailTemplate,
  createMenuTemplate,
  createReviewFormTemplate,
  createLoaderTemplate,
  createFailedLoadItemTemplate,
} from "../templates/template-creator";
import LikeButtonInitiator from "../../utils/like-button-initiator";
import addReviewHelper from "../../utils/add-review-helper";

const Detail = {
  async render() {
    return `
    <restaurant-detail>
      <div class="loader-wrapper"></div>
      <section class="restaurant__container"></section>
      <section class="menu__container"></section>
    </restaurant-detail>

    <review-container>
      <div class="loader-wrapper"></div>
      <section class="review__container-list" tabindex="0">
        <h2>Reviews</h2>
        <review-list></review-list>
      </section>

      <section class="review__container-form">
        <h2>Share your experience about our service</h2>
        <div class="review__form"></div>
      </section>
    </review-container>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetail = await RestaurantData.detailRestaurant(url.id);
    const { restaurant } = restaurantDetail;
    const restoContainer = document.querySelector(".restaurant__container");
    const menuContainer = document.querySelector(".menu__container");
    const reviewList = document.querySelector("review-list");
    const reviewForm = document.querySelector(".review__form");
    const loader = document.querySelector(".loader-wrapper");

    try {
      loader.innerHTML = createLoaderTemplate();
      restoContainer.innerHTML += createRestaurantDetailTemplate(restaurant);
      menuContainer.innerHTML += createMenuTemplate(restaurant.menus);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector(".button-like"),
        restaurant: {
          id: restaurant.id,
          pictureId: restaurant.pictureId,
          name: restaurant.name,
          address: restaurant.address,
          city: restaurant.city,
          rating: restaurant.rating,
          description: restaurant.description,
        },
      });

      reviewList.reviewList = restaurant.customerReviews;
      reviewForm.innerHTML += createReviewFormTemplate(restaurant.id);
      if (navigator.onLine) {
        addReviewHelper.send(url);
      }
      loader.style.display = "none";
    } catch (error) {
      restoContainer.innerHTML = createFailedLoadItemTemplate();
    }
  },
};

export default Detail;
