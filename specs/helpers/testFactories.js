import LikeButtonPresenter from "../../src/scripts/utils/like-button-presenter";

const createLikeButtonPresenterWithRestaurant = async(restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector(".button-like"),
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
