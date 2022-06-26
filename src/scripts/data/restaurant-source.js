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
        "X-RapidAPI-Key": "0d5b945f44msh99dce988816d63ep1f8743jsn48968f893c8c",
        "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    return responseJson;
  }
}

export default RestaurantData;
