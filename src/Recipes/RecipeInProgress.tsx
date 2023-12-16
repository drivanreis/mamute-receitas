import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealsById, fetchDrinksById } from '../fetchApis';
import { RecipeDetailsType, RecipeFavoriteType, RecipeDataType } from '../types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './RecipeInProgress.css';

function RecipeInProgress({ type }: any) {
  const params = useParams();
  const id = params ? params.id || '' : '';
  const navigate = useNavigate();

  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsType | null>(null);
  const [isChecked, setIsChecked] = useState<{ [key: string]: boolean }>({});
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);
  const [isEveryIngredientChecked, setIsEveryIngredientChecked] = useState(false);

  const getFavoriteRecipes = (localStorageKey: string) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    if (favoriteRecipes.length !== 0) {
      const isFavorite = favoriteRecipes
        .find((recipe: RecipeFavoriteType) => recipe.id === id);
      return isFavorite;
    }
  };

  const handleCheckboxChange = (ingredientKey: string) => {
    setIsChecked((prevCheckedIngredients) => {
      const previousCheckedIngredients = {
        ...prevCheckedIngredients,
        [ingredientKey]: !prevCheckedIngredients[ingredientKey],
      };

      localStorage
        .setItem('inProgressRecipes', JSON.stringify(previousCheckedIngredients));
      const checkedIngredients = Object
        .values(previousCheckedIngredients).every((value) => value);
      setIsEveryIngredientChecked(checkedIngredients);

      return previousCheckedIngredients;
    });
  };
  const handleFavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newFavoriteRecipe = {
      id,
      type: type.toLowerCase() === 'meals' ? 'meal' : 'drink',
      nationality: recipeDetails?.strArea || '',
      category: recipeDetails?.strCategory || '',
      alcoholicOrNot: recipeDetails?.strAlcoholic || '',
      name: recipeDetails?.strMeal || recipeDetails?.strDrink || '',
      image: recipeDetails?.strMealThumb || recipeDetails?.strDrinkThumb || '',
    };
    if (getFavoriteRecipes('favoriteRecipes')) {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipe: RecipeFavoriteType) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        newFavoriteRecipes,
      ));
      setIsRecipeFavorite(!isRecipeFavorite);
    } else {
      const newFavoriteRecipes = [...favoriteRecipes, newFavoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        newFavoriteRecipes,
      ));
      setIsRecipeFavorite(!isRecipeFavorite);
    }
  };
  const handleShareClick = () => {
    const { protocol, host } = window.location;
    const link = `${protocol}//${host}${type === 'Meals' ? '/meals'
      : '/drinks'}/${id}`;
    navigator.clipboard.writeText(link);
    setIsLinkCopied(true);
  };
  const handleFinishClick = () => {
    const doneRecipe = {
      id,
      nationality: recipeDetails?.strArea || '',
      name: recipeDetails?.strMeal || recipeDetails?.strDrink || '',
      category: recipeDetails?.strCategory || '',
      image: recipeDetails?.strMealThumb || recipeDetails?.strDrinkThumb || '',
      tags: recipeDetails?.strTags ? recipeDetails.strTags.split(',') : [],
      alcoholicOrNot: recipeDetails?.strAlcoholic || '',
      type: type.toLowerCase() === 'meals' ? 'meal' : 'drink',
      doneDate: new Date(),
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));
    localStorage.removeItem('inProgressRecipes');
    navigate('/done-recipes');
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (favoriteRecipes.length !== 0) {
      const isFavorite = favoriteRecipes
        .find((recipe: RecipeFavoriteType) => recipe.id === id);
      if (isFavorite) {
        setIsRecipeFavorite(true);
      }
    }
  }, [id]);

  useEffect(() => {
    const allIngredientsChecked = Object.values(isChecked).every((checked) => checked);
    setIsEveryIngredientChecked(allIngredientsChecked);
  }, [isChecked, isEveryIngredientChecked]);

  useEffect(() => {
    const fetchRecipeInProgress = async () => {
      let data:RecipeDataType = {};

      if (type === 'Meals') {
        data = await fetchMealsById(id);
      } else if (type === 'Drinks') {
        data = await fetchDrinksById(id);
      }
      setRecipeDetails(data.meals?.[0] || data.drinks?.[0] || null);

      const maxIngredients = Object.keys(data.meals?.[0] || data.drinks?.[0] || {})
        .filter((key) => key.startsWith('strIngredient')
          && (data.meals?.[0][key] || data.drinks?.[0][key]))
        .length;

      const getProgress = localStorage.getItem('inProgressRecipes');
      const initialCheckedIngredients: { [key: string]: boolean } = getProgress
        ? JSON.parse(getProgress)
        : {};

      const checkedIngredients: { [key: string]: boolean } = {};
      for (let index = 1; index <= maxIngredients; index += 1) {
        const ingredientKey = `strIngredient${index}`;

        checkedIngredients[ingredientKey] = initialCheckedIngredients[ingredientKey]
          || false;
      }
      console.log('Checked Ingredients:', checkedIngredients);
      setIsChecked(checkedIngredients);
    };

    fetchRecipeInProgress();
  }, [id, type]);
  return (
    <div className="in-progress-container">
      {recipeDetails && (
        <div className="in-progress-container">
          <img
            src={ type === 'Meals' ? recipeDetails?.strMealThumb
              : recipeDetails?.strDrinkThumb }
            alt={ type === 'Meals' ? recipeDetails?.strMeal : recipeDetails?.strDrink }
            data-testid="recipe-photo"
            className="in-progress-img"
          />
          <h2 data-testid="recipe-title" className="in-progress-title">
            {type === 'Meals' ? recipeDetails?.strMeal : recipeDetails?.strDrink}
          </h2>
          <h3 data-testid="recipe-category" className="in-progress-category">
            <em>
              {type === 'Meals'
                ? recipeDetails?.strCategory : recipeDetails?.strAlcoholic}
            </em>
          </h3>
          <div className="buttons">
            {isLinkCopied && <p>Link copied!</p>}
            <button
              type="button"
              onClick={ handleFavoriteClick }
              className="fav-share-btn"
            >
              <img
                src={ isRecipeFavorite ? blackHeartIcon : whiteHeartIcon }
                alt="Favorite Recipe"
                data-testid="favorite-btn"
              />
            </button>
            <button
              type="button"
              onClick={ handleShareClick }
              className="fav-share-btn"
            >
              <img src={ shareIcon } alt="Share Button" />
            </button>

          </div>
          <h2 className="ingredients-header">Ingredients</h2>
          <ul className="in-progress-table">
            {Object.keys(recipeDetails).map((key) => {
              if (key.includes('strIngredient') && recipeDetails[key]) {
                const ingredientNumber = Number(key.replace('strIngredient', '')) - 1;
                const measureKey = `strMeasure${ingredientNumber + 1}`;
                const isCheckedValue = isChecked[key];

                return (
                  <li key={ key } data-testid={ `${key}-and-measure` }>
                    <label
                      data-testid={ `${ingredientNumber}-ingredient-step` }
                      style={ { textDecoration: isCheckedValue
                        ? 'line-through solid black' : 'none' } }
                    >
                      <input
                        type="checkbox"
                        checked={ isCheckedValue }
                        onChange={ () => handleCheckboxChange(key) }
                      />
                      <span>
                        {recipeDetails[key]}
                        {' '}
                        -
                        {' '}
                        {recipeDetails[measureKey]}
                      </span>
                    </label>
                  </li>
                );
              }
              return null;
            })}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions" className="in-progress-instructions">
            {recipeDetails.strInstructions}
          </p>
        </div>
      )}
      <button
        data-testid="finish-recipe-btn"
        disabled={ !isEveryIngredientChecked }
        onClick={ handleFinishClick }
        className="finish-recipe-btn"
      >
        Finalizar receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
