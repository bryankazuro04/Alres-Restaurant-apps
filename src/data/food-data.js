import axios from "axios";

const options = {
  method: "GET",
  url: "https://yummly2.p.rapidapi.com/feeds/list",
  params: { limit: "24", start: "0" },
  headers: {
    "X-RapidAPI-Key": "16ef4349b2msh3ce44bd12ea0b87p1a4f7djsn7711e7866bf5",
    "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
  },
};

const data = () => {
  axios
    .request(options)
    .then((response) => {
      const loader = document.querySelector(".loader");
      const dataFood = response.data.feed;
      loadFood(dataFood);
      loader.style.display = "none";
    })
    .catch((error) => {
      console.log(error);
    });
};

data();

const loadFood = (foodDetail) => {
  const foodContainer = document.querySelector(".food");
  foodContainer.innerHTML = "";

  foodDetail.forEach((foodData) => {
    const { display } = foodData;

    foodContainer.innerHTML += `
    <food-list tabindex="0">
      <img src="${display.images[0]}" alt="${display.displayName}">

      <h2 class="p1">${display.displayName}</h2>
    </food-list>
    `;
    foodDetail.splice(2, 1);
  });
};
