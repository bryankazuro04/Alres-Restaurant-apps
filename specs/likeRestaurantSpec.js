import LikeButtonInitiator from "../src/scripts/utils/like-button-presenter";
import FavoriteRestaurantDB from "../src/scripts/data/favorite-restaurant";
import * as TestFactories from "./helpers/testFactories";

describe("Liking a Restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<section class="button-like"></section>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it("Should show the like button when the restaurant has not been liked before", async() => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });

  it("Should not show the unlike button when the restaurant has not been liked before", async() => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });

  it("Should be able to like the restaurant", async() => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    const restaurant = await FavoriteRestaurantDB.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantDB.deleteRestoFav(1);
  });

  it("Should not add a restaurant again when its already liked", async() => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantDB.putResto({ id: 1 });

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    expect(await FavoriteRestaurantDB.getAllResto()).toEqual([{ id: 1 }]);

    FavoriteRestaurantDB.deleteRestoFav(1);
  });

  it("Should not add a restaurant when it has no id", async() => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantDB.getAllResto()).toEqual([]);
  });
});
