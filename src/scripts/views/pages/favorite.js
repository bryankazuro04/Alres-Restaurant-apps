import FavoriteRestaurantDB from "../../data/favorite-restaurant";
import {
  createLoaderTemplate,
  createRestaurantContainerTemplate,
  createFailedLoadItemTemplate,
} from "../templates/template-creator";

const Favorite = {
  async render() {
    return `
      <section class="main-container">
        <h1>Halaman Favorite</h1>
        <div class="loader-wrapper"></div>
        <section class="restaurant__favorite px-2"></section>
      </section>
    `;
  },

  async afterRender() {
    const loader = document.querySelector(".loader-wrapper");
    const restoFav = await FavoriteRestaurantDB.getAllResto();
    const restoContainer = document.querySelector(".restaurant__favorite");

    try {
      loader.innerHTML = createLoaderTemplate();
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
