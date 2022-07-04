import { itActsAsFavoriteRestaurantModel } from "./contract/favoriteRestaurantContract";
import FavoriteRestaurantDB from "../src/scripts/data/favorite-restaurant";

describe("Favorite Restaurant Idb Contract Test Implementation", () => {
  afterEach(async() => {
    (await FavoriteRestaurantDB.getAllResto()).forEach(async(resto) => {
      await FavoriteRestaurantDB.deleteRestoFav(resto.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantDB);
});
