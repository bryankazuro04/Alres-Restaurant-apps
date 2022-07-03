const assert = require("assert");

const likingRestaurants = async({ I }) => {
  I.see("No restaurant you like yet", ".no-restaurant-favorite");

  I.amOnPage("/");
  I.seeElement("ristorante-list a");

  const firstRestaurant = locate("ristorante-list a").first();
  I.click(firstRestaurant);
  const firstRestaurantTitle = await I.grabTextFrom(
    firstRestaurant.find(".details__name")
  );

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite-restaurants");
  I.seeElement("ristorante-list");

  const likedRestaurant = await I.grabTextFrom(
    "ristorante-list .details__name"
  );
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
