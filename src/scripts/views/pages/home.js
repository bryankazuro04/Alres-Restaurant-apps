import RestaurantData from "../../data/restaurant-source";
import {
  createRestaurantContainerTemplate,
  createFoodContainerTemplate,
  createFailedLoadItemTemplate,
  createSkeletonRestoLoadedTemplate,
  createSkeletonFoodLoadedTemplate,
} from "../templates/template-creator";

const Home = {
  async render() {
    return `
      <section class="jumbotron">
        <h1>Welcome to Alres</h1>
        <p>We serve delicious and quality food and drinks</p>
       </section>
        
      <div class="main-container">
        <h1 class="mb1 p1">Explore Restaurant</h1>
        <section class="restaurant px-2">
          ${createSkeletonRestoLoadedTemplate(12)}
        </section>
        
        <h1 class="mt2 mb1 p1">Foods</h1>        
        <section class="food p2">
          ${createSkeletonFoodLoadedTemplate(7)}
        </section>
      </div>
        `;
  },

  async afterRender() {
    const restaurantList = await RestaurantData.restaurantList();
    const foodList = await RestaurantData.foodList();
    const { restaurants } = restaurantList;
    const { feed } = foodList;
    const restoContainer = document.querySelector(".restaurant");
    const foodContainer = document.querySelector(".food");

    try {
      restoContainer.innerHTML = "";
      restaurants.forEach((resto) => {
        restoContainer.innerHTML += createRestaurantContainerTemplate(resto);
      });

      foodContainer.innerHTML = "";
      feed.forEach((food) => {
        foodContainer.innerHTML += createFoodContainerTemplate(food);
        feed.splice(2, 1);
      });
    } catch (error) {
      restoContainer.innerHTML = createFailedLoadItemTemplate();
      foodContainer.innerHTML = createFailedLoadItemTemplate();
    }
  },
};

export default Home;
