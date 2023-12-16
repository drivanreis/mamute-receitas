import { useState } from 'react';
import { DetailsContext } from './DetailsContext';
import { MealDetailsType, DrinkDetailsType } from '../types';

type UserProviderProps = {
  children: React.ReactNode;
};

export default function DetailsProvider({ children }: UserProviderProps) {
  const [mealDetails,
    setMealDetails] = useState<MealDetailsType>({} as MealDetailsType);
  const [drinkDetails,
    setDrinkDetails] = useState<DrinkDetailsType>({} as DrinkDetailsType);
  const [recommendationDrinks,
    setRecommendationDrinks] = useState<DrinkDetailsType[]>([]);
  const [recommendationMeals,
    setRecommendationMeals] = useState<MealDetailsType[]>([]);
  return (
    <DetailsContext.Provider
      value={ {
        mealDetails,
        setMealDetails,
        drinkDetails,
        setDrinkDetails,
        recommendationDrinks,
        setRecommendationDrinks,
        recommendationMeals,
        setRecommendationMeals,
      } }
    >
      {children}
    </DetailsContext.Provider>
  );
}
