import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantData {
  static async restaurantList() {
    const response = await fetch(API_ENDPOINT.home);
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.detail(id));
    const responseJson = await response.json();
    return responseJson;
  }

  static async addReview(data) {
    const response = await fetch(API_ENDPOINT.review, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    return responseJson;
  }

  static async foodList(data) {
    const response = await fetch(API_ENDPOINT.food, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "16ef4349b2msh3ce44bd12ea0b87p1a4f7djsn7711e7866bf5",
        "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    return responseJson;
  }
}

export default RestaurantData;
