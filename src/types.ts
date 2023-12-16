export type RecipeDetailsType = {
  [key: string]: any;
  idMeal?: string;
  idDrink?: string;
  strMeal?: string;
  strDrink?: string;
  strCategory?: string;
  strAlcoholic?: string;
  strMealThumb?: string;
  strDrinkThumb?: string;
  strInstructions?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
};

export type RecipeFavoriteType = {
  id: string;
  type: string;
  nationality?: string;
  category?: string;
  alcoholicOrNot?: string;
  name: string;
  image: string;
};

export type RecipeDataType = {
  meals?: Array<{ [key: string]: any }>;
  drinks?: Array<{ [key: string]: any }>;
};

export type DoneRecipeType = {
  id: string;
  nationality: string;
  name: string;
  category?: string;
  image: string;
  tags: string[];
  alcoholicOrNot?: string;
  type: string;
  doneDate: string;
};

export type IngredientType = {
  name: string;
  measure: string;
};

export type RecipeType = {
  idMeal?: string;
  strMeal?: string;
  strMealThumb?: string;
  strInstructions?: string;
  strTags?: string;
  strYoutube?: string;
  strCategory?: string;
  strArea?: string;
  ingredients?: IngredientType[];
  strDrinkThumb?: string;
  strDrink?: any;
  idDrink?: any;
};
