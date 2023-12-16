import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchMeals,
  fetchDrinks,
  fetchCategoryMeals,
  fetchCategoryDrinks,
} from '../fetchApis';
import './Recipes.css';

interface Ingredient {
  name: string;
  measure: string;
}

interface Recipe {
  idMeal?: string;
  strMeal?: string;
  strMealThumb?: string;
  strInstructions?: string;
  strTags?: string;
  strYoutube?: string;
  strCategory?: string;
  strArea?: string;
  ingredients?: Ingredient[];
  strDrinkThumb?: string;
  strDrink?: any;
  idDrink?: any;
}

interface Category {
  strCategory: string;
}

function Recipes({ category }: { category: string }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [initialRecipes, setInitialRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let data;

      if (category === 'Meals') {
        data = await fetchMeals();
      } else if (category === 'Drinks') {
        data = await fetchDrinks();
      }

      const { meals, drinks } = data;
      setRecipes(meals || drinks);
      setInitialRecipes(meals?.slice(0, 12) || drinks?.slice(0, 12));

      const categoryData = await (category === 'Meals'
        ? fetchCategoryMeals()
        : fetchCategoryDrinks());
      const { meals: categoryMeals, drinks: categoryDrinks } = categoryData;
      setCategories(categoryMeals || categoryDrinks);
    };

    fetchData();
  }, [category]);

  const handleCategoryClick = async (clickedCategory: string) => {
    if (selectedCategory === clickedCategory) {
      setSelectedCategory(null);
      setRecipes(initialRecipes);
    } else {
      setSelectedCategory(clickedCategory);

      let data;

      if (category === 'Meals') {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${clickedCategory}`;
        data = await fetch(endpoint).then((res) => res.json());
      } else if (category === 'Drinks') {
        const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${clickedCategory}`;
        data = await fetch(endpoint).then((res) => res.json());
      }

      const { meals, drinks } = data;
      setRecipes(meals || drinks);
    }
  };

  const handleAllClick = () => {
    setSelectedCategory(null);
    setRecipes(initialRecipes);
  };

  return (
    <div className="recipes-container">
      <div className="categories-container">
        <h3>Categories:</h3>
        <div className="categories-buttons">
          {categories.slice(0, 5).map(({ strCategory }, index) => (
            <button
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleCategoryClick(strCategory) }
              className="category-button"
            >
              {strCategory}
            </button>
          ))}
          <button
            data-testid="All-category-filter"
            onClick={ handleAllClick }
            className="category-button"
          >
            All
          </button>
        </div>
      </div>
      <div className="recipeList" data-testid="DivRecipes">
        {recipes.slice(0, 12).map(
          ({ idMeal, idDrink, strMeal, strDrink,
            strMealThumb, strDrinkThumb }, index) => (
              <Link
                key={ idMeal || idDrink }
                to={ `/${idMeal ? 'meals' : 'drinks'}/${idMeal || idDrink}` }
                data-testid={ `${index}-recipe-card-link` }
                className="recipe-card-link"
              >
                <div data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ strMealThumb || strDrinkThumb }
                    alt={ strMeal || strDrink }
                    data-testid={ `${index}-card-img` }
                    className="recipe-img"
                  />
                  <h3 data-testid={ `${index}-card-name` }>{strMeal || strDrink}</h3>
                </div>
              </Link>
          ),
        )}
      </div>
    </div>
  );
}

export default Recipes;
