const assert = require("assert");

Feature("Reviewing Restaurants");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("reviewing one restaurant", async({ I }) => {
  I.wait(7);
  I.seeElement(".restaurant-list a");
  I.wait(3);
  const firstRestaurant = await locate(".restaurant-list a").first();
  I.click(firstRestaurant);
  I.wait(7);
  I.waitForElement(".review__form");

  const name = "Muhammad Alana Fauzan";
  const review = "This is so cool";

  I.seeElement("[name=name]");
  I.fillField("[name=name]", name);
  I.seeElement("[name=review]");
  I.fillField("[name=review]", review);

  I.wait(5);
  I.seeElement("#reviewSendButton");
  I.click("#reviewSendButton");

  I.refreshPage();

  I.wait(5);
  I.seeElement("review-item");

  const lastReview = locate("review-item").last();
  const reviewerName = await I.grabTextFrom(lastReview.find(".review__name"));
  const reviewerComment = await I.grabTextFrom(
    lastReview.find(".review__commmentor")
  );

  assert.strictEqual(name, reviewerName);
  assert.strictEqual(review, reviewerComment);
});
