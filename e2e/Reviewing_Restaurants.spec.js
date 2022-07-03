const assert = require("assert");

Feature("Reviewing Restaurants");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("reviewing one restaurant", async({ I }) => {
  I.waitForElement("restaurant-list restaurant-item");
  I.click(locate("restaurant-item").first());
  I.waitForElement("#formAddNewReview");

  const name = "Muhammad Alana Fauzan";
  const review = "This is so cool";

  I.seeElement("[name=name]");
  I.fillField("[name=name]", name);
  I.seeElement("[name=review]");
  I.fillField("[name=review]", review);

  I.seeElement("#reviewSendButton");
  I.click("#reviewSendButton");

  I.refreshPage();

  I.waitForElement("#restaurantReviews");

  const lastReview = locate("review-item").last();
  const reviewerName = await I.grabTextFrom(lastReview.find(".review__name"));
  const reviewerMessage = await I.grabTextFrom(
    lastReview.find(".review__commmentor")
  );

  assert.strictEqual(name, reviewerName);
  assert.strictEqual(review, reviewerMessage);
});
