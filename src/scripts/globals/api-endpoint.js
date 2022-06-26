import CONFIG from "./config";

const API_ENDPOINT = {
  home: `${CONFIG.BASE_URL}/list`,
  detail: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  review: `${CONFIG.BASE_URL}/review`,
  food: CONFIG.BASE_FOOD_URL,
};

export default API_ENDPOINT;
