import LikeButtonInitiator from "../../src/scripts/utils/like-button-presenter";

const createLikeButtonPresenterWithRestaurant = async(restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector(".button-like"),
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
