import LikeButtonInitiator from "../src/scripts/utils/like-button-presenter";
import FavoriteRestaurantDB from "../src/scripts/data/favorite-restaurant";
import * as TestFactories from "./helpers/testFactories";

describe("Unlike a Restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<section class="button-like"></section>';
  };

  beforeEach(async() => {
    addLikeButtonContainer();
    await FavoriteRestaurantDB.putResto({ id: 1 });
  });

  afterEach(async() => {
    await FavoriteRestaurantDB.deleteRestoFav(1);
  });

  it("Should display unlike widget when the movie has been liked", async() => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  it("Should not display like widget when the restaurant has been liked", async() => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  it("Should be able to remove liked restaurant from the list", async() => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantDB.getAllResto()).toEqual([]);
  });

  it("Should not throw error if the unliked restaurant is not in the list", async() => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantDB.deleteRestoFav(1);

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteRestaurantDB.getAllResto()).toEqual([]);
  });
});
