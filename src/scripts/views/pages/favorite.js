import FavoriteRestaurantDB from "../../data/favorite-restaurant";
import {
  createLoaderTemplate,
  createRestaurantContainerTemplate,
  createFailedLoadItemTemplate,
} from "../templates/template-creator";

const Favorite = {
  async render() {
    return `
      <section class="main-container favorite-container">
        <h1 class="no-restaurant-favorite">Favorite Restaurant</h1>
        <div class="loader-wrapper"></div>
        <section class="restaurant__favorite px-2"></section>
      </section>
    `;
  },

  async afterRender() {
    const loader = document.querySelector(".loader-wrapper");
    const restoFav = await FavoriteRestaurantDB.getAllResto();
    const restoContainer = document.querySelector(".restaurant__favorite");
    const emptyRestaurant = document.querySelector(".no-restaurant-favorite");

    try {
      loader.innerHTML = createLoaderTemplate();
      if (restoFav.length <= 0) {
        emptyRestaurant.innerHTML = "No restaurant you like yet";
      }
      restoFav.forEach((resto) => {
        restoContainer.innerHTML += createRestaurantContainerTemplate(resto);
      });
      loader.style.display = "none";
    } catch (error) {
      restoContainer.innerHTML = createFailedLoadItemTemplate();
    }
  },
};

export default Favorite;
