import CONFIG from "../../globals/config";

const createRestaurantContainerTemplate = (resto) => `
  <ristorante-list tabindex="0">
    <a href="${`#/detail/${resto.id}`}">
      <img src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${
  resto.name
}" class="restaurant-thumbnail">
      
      <div class="details p1 px-2">
        <h2>${resto.name}</h2>
        
        <div class="details__sub">
          <div class ="details__sub-location">
            <img src="/icons/location-dot-solid.svg" alt="Location Icon">
            <span>${resto.city}</span>
          </div>
          
          <div class="details__sub-rating">
            <img src="/icons/star-solid.svg" alt="Rating Icon" class="rating-icon">
            <span>${resto.rating}</span>
          </div>
        </div>

        <p>${resto.description}</p>
      </div>
    </a>
  </ristorante-list>
`;

const createFoodContainerTemplate = (food) => `
  <food-list tabindex="0">
    <img src="${food.display.images}" alt="${food.display.displayName}">

    <h2 class="p1">${food.display.displayName}</h2>
  </food-list>
`;

const createRestaurantDetailTemplate = (resto) => `
  <div class="restaurant__container-image">
    <img src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}">
  </div>

  <div class="restaurant__container-detail" tabindex="0">
    <div class="detail__header">
      <h2>${resto.name}</h2>

      <section class="button-like"></section>
    </div>  

    <div class="detail__place">
      <div class="detail__place-address">
        <img src="/icons/location-dot-solid.svg" alt="Location Tag">
        <h4>${resto.city},</h4>
        <h4>${resto.address}</h4>
      </div>

      <div class="detail__place-rating">
        <img src="/icons/star-solid.svg" alt="Star Rating">
        <span>${resto.rating}</span>
      </div>  
    </div>
    
    <p>${resto.description}</p>

    <div class="detail__category">
      <h4>Category</h4>
      <div>
      ${resto.categories
        .map(
          (category) =>
            `<img src="/icons/tag-solid.svg" alt="Tag Category"> <span>${category.name}</span>`
        )
        .join("")}
      </div>
    </div>
  </div>
`;

const createMenuTemplate = (menu) => `
  <section class="menu__container-foods" tabindex="0">
    <h3>Foods</h3>

    <div>
      ${menu.foods.map((food) => `<p>${food.name}</p>`).join("")}
    </div>
  </section>

  <section class="menu__container-drinks" tabindex="0">
    <h3>Drinks</h3>

    <div>
      ${menu.drinks.map((drink) => `<p>${drink.name}</p>`).join("")}
    </div>
  </section>
`;

const createReviewFormTemplate = (id) => `
  <input type="text" name="id" value="${id}" hidden>
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Fill in your name" autocomplete="off" required>

  <label for="review">Review</label>
  <textarea name="review" id="review" cols="30" rows="10" placeholder="Fill with your review message" required></textarea>

  <button type="submit" id="reviewSendButton" aria-label="Submit button for send review"><img src="/icons/paper-plane-solid.svg" alt="Send Icon"><p>Post</p></button>
`;

const createLoaderTemplate = () => `
	<div class="loader"></div>
`;

const createLikeButtonTemplate = () => `
  <button id="likeButton" class="like" aria-label="like this restaurant" >
    <img src="/icons/heart-regular.svg" alt="Like Icon">
  </button>
`;

const createLikedButtonTemplate = () => `
  <button id="likeButton" class="like" aria-label="unlike this restaurant">
    <img src="/icons/heart-solid.svg" alt="Liked Icon">
  </button>
`;

const createFailedLoadItemTemplate = () => `
	<div class="failed-load">
		<h1 class="failed-alert">
			Failed to load page <br />Please check your internet connection
		</h1>
	</div>
`;

export {
  createRestaurantContainerTemplate,
  createFoodContainerTemplate,
  createRestaurantDetailTemplate,
  createMenuTemplate,
  createReviewFormTemplate,
  createLoaderTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createFailedLoadItemTemplate,
};
