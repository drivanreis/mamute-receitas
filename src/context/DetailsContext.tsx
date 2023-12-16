import { createContext } from 'react';
import { DrinkDetailsType, MealDetailsType } from '../types';

type DetailsContextType = {
  mealDetails: MealDetailsType,
  setMealDetails: (mealDetails: MealDetailsType) => void,
  drinkDetails: DrinkDetailsType,
  setDrinkDetails: (drinkDetails: DrinkDetailsType) => void,
  recommendationDrinks: DrinkDetailsType[],
  setRecommendationDrinks: (drinkDetails: DrinkDetailsType[]) => void,
  recommendationMeals: MealDetailsType[],
  setRecommendationMeals: (mealDetails: MealDetailsType[]) => void,
};

export const DetailsContext = createContext({} as DetailsContextType);
