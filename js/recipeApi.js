
const BASE_URL =
  "https://www.themealdb.com/api/json/v1/1";

export const RecipeAPI = {
  async search(name) {
    const response = await fetch(
      `${BASE_URL}/search.php?s=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      throw new Error("Recipe search failed");
    }

    const data = await response.json();
    return data.meals || [];
  },

  async searchByIngredient(ingredient) {
    const response = await fetch(
      `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
    );

    if (!response.ok) {
      throw new Error("Ingredient search failed");
    }

    const data = await response.json();
    return data.meals || [];
  },

  async random() {
    const response = await fetch(`${BASE_URL}/random.php`);

    if (!response.ok) {
      throw new Error("Could not load random recipe");
    }

    const data = await response.json();
    return data.meals?.[0] || null;
  },

  async details(id) {
    const response = await fetch(
      `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`
    );

    if (!response.ok) {
      throw new Error("Could not load recipe details");
    }

    const data = await response.json();
    return data.meals?.[0] || null;
  }
};
