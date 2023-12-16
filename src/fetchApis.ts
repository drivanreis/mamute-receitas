export const fetchIngredient = async (ingredient: string) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals;
  // } catch (error: any) {
  //   return error.message;
  // }
};

export const fetchName = async (name: string) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  console.log('Data in fetchName:', data);
  return data.meals;
  // } catch (error: any) {
  //   return error.message;
  // }
};

export const fetchLetter = async (letter: string) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.meals;
  // } catch (error: any) {
  //   return error.message;
  // }
};

export const searchIngredientDrink = async (ingredient: string) => {
  // try {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.drinks;
  // } catch (error: any) {
  //   return error.message;
  // }
};

export const searchNameDrink = async (name:string) => {
  // try {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.drinks;
  // } catch (error: any) {
  //   return error.message;
  // }
};

export const searchLetterDrink = async (latter: string) => {
  // try {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${latter}`);
  const data = await response.json();
  return data.drinks;
  // } catch (error: any) {
  //   return error.message;
  // }
};

// Dois fetchs do requisito 18

export const fetchMeals = async () => {
  // try {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  console.log('Endpoint: https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  console.log(data);
  return data;
  // } catch (error: any) {
  //   console.error(error);
  //   throw error;
  // }
};

fetchMeals();

export const fetchDrinks = async () => {
  // try {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  console.log('Endpoint: https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  console.log(data);
  return data;
  // } catch (error: any) {
  //   console.error(error);
  //   throw error;
  // }
};

fetchDrinks();

// Estes 2 fetchs armazenam somente as chaves strCategory, desta forma: { strCategory: 'Ordinary Drink' }, { strCategory: 'Cocktail' },

export const fetchCategoryMeals = async () => {
  // try {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  console.log('Endpoint: https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  console.log(data);
  return data;
  // } catch (error: any) {
  //   console.error(error);
  //   throw error;
  // }
};

fetchCategoryMeals();

export const fetchMealsById = async (id: string) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  console.log('Response from fetchMealsById:', data);
  return data;
  // } catch (error: any) {
  //   console.error('Error in fetchMealsById:', error);
  //   return error.message;
  // }
};

export const fetchDrinksById = async (id: string) => {
  // try {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const data = await response.json();
  console.log('Response from fetchDrinksById:', data);
  return data;
  // } catch (error: any) {
  //   console.error('Error in fetchDrinksById:', error);
  //   return error.message;
  // }
};

export const fetchDetailMeals = async (mealId: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    return data.meals[0];
  } catch (error: any) {
    return error.message;
  }
};

export const fetchDetailDrinks = async (drinkId: string) => {
  try {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    const data = await response.json();
    return data.drinks[0];
  } catch (error: any) {
    return error.message;
  }
};

export const fetchRecommendationMeals = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const slicedMeals = data.meals.slice(0, 6);
    return slicedMeals;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchRecommendationDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const slicedDrinks = data.drinks.slice(0, 6);
    return slicedDrinks;
  } catch (error: any) {
    return error.message;
  }
};

// fetchCategoryMeals();

export const fetchCategoryDrinks = async () => {
  // try {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  console.log('Endpoint: https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  console.log(data);
  return data;
  // } catch (error: any) {
  //   console.error(error);
  //   throw error;
  // }
};

// fetchCategoryDrinks();
