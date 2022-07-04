const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it("Should return the restaurant that has been added", async() => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });

    expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getRestaurant(3)).toEqual(undefined);
  });

  it("Should refuse a restaurant from being added if it does not have the correct property", async() => {
    favoriteRestaurant.putResto({ aProperty: "property" });
    expect(await favoriteRestaurant.getAllResto()).toEqual([]);
  });

  it("Can return all of the restaurants that have been added", async() => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });

    expect(await favoriteRestaurant.getAllResto()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it("Should remove favorite restaurant", async() => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });
    favoriteRestaurant.putResto({ id: 3 });

    await favoriteRestaurant.deleteRestoFav(1);

    expect(await favoriteRestaurant.getAllResto()).toEqual([
      { id: 2 },
      { id: 3 },
    ]);
  });

  it("Should handle request to remove a restaurant event though the restaurant has not been added", async() => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });
    favoriteRestaurant.putResto({ id: 3 });

    await favoriteRestaurant.deleteRestoFav(4);

    expect(await favoriteRestaurant.getAllResto()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });
};

export { itActsAsFavoriteRestaurantModel };
