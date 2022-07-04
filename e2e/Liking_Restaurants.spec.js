const assert = require("assert");

const likingRestaurants = async({ I }) => {
  I.see("No restaurant you like yet", ".no-restaurant-favorite");

  I.amOnPage("/");
  I.wait(7);
  I.seeElement(".restaurant-list a");
  const firstRestaurant = locate(".restaurant-list a").first();
  const firstRestaurantTitle = await I.grabTextFrom(
    firstRestaurant.find(".details .details__name")
  );
  I.wait(5);
  I.click(firstRestaurant);

  const detailRestaurant = await locate(
    ".restaurant__container .restaurant__container-detail .detail__header .button-like"
  );
  I.wait(5);
  I.seeElement(detailRestaurant);

  const likeButton = await locate(detailRestaurant.find("#likeButton"));
  I.wait(3);
  I.click(likeButton);

  I.wait(3);
  I.amOnPage("/#/favorite-restaurants");
  I.wait(5);
  I.seeElement(".restaurant-list a");

  const likedRestaurant = await I.grabTextFrom(".details .details__name");
  assert.strictEqual(firstRestaurantTitle, likedRestaurant);
};

Feature("Liking Restaurants");

Before(({ I }) => {
  I.amOnPage("/#/favorite-restaurants");
});

Scenario("Showing empty liked restaurants", ({ I }) => {
  I.see("No restaurant you like yet", ".no-restaurant-favorite");
});

Scenario("Favoriting one restaurant", async({ I }) => {
  await likingRestaurants({ I });
});

Scenario("unliking one restaurant", async({ I }) => {
  await likingRestaurants({ I });

  I.amOnPage("/#/favorite-restaurants");
  I.seeElement("restorante-list");
  I.click("ristorante-list a");
  I.seeElement("#likeButton");
  I.click("#likeButton");
  I.amOnPage("/#/favorite-restaurants");
  I.see("No restaurant you like yet", ".no-restaurant-favorite");
});
