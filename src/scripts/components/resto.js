import dataRestaurants from "../../data/DATA.json";

const dataResto = dataRestaurants.restaurants;

const renderResto = (resto) => {
  const restoList = document.querySelector(".restaurant");
  restoList.innerHTML = "";

  resto.forEach((res) => {
    const { name, description, pictureId, city, rating } = res;

    restoList.innerHTML += `
    <ristorante-list tabindex="0">
      <img src="${pictureId}" alt="${name}">
      
      <div class="details p1 px-2">
        <h2>${name}</h2>
        
        <div class="rating">
          <h4>
            <i class="fa-solid fa-location-dot"></i>
            ${city}
          </h4>
          
          <h4><span>★ </span>${rating}</h4>
        </div>

        <p>${description}</p>
      </div>
    </ristorante-list>
    `;
  });
};

renderResto(dataResto);
