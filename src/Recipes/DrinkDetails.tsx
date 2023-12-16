import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDetailDrinks, fetchRecommendationMeals } from '../fetchApis';
import { DetailsContext } from '../context/DetailsContext';
import '../components/Carousel.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './DrinkDetails.css';

function DrinkDetails() {
  const { id } = useParams<{ id: string }>();
  const { drinkDetails,
    setDrinkDetails,
    recommendationMeals,
    setRecommendationMeals,
  } = useContext(DetailsContext);

  const [handlerMeasure, setHandlerMeasure] = useState<any>([]);
  const [handlerIngredient, setHandlerIngredient] = useState<any>([]);
  const [favorite, setFavorite] = useState(() => {
    const hasRecipes = localStorage.getItem('favoriteRecipes')
  || '[]';
    const stringFavoriteRecipes = JSON.parse(hasRecipes)
      .some((recipe: any) => recipe.id === id && recipe.type === 'drink');
    return stringFavoriteRecipes;
  });
  const [shareButton, setShareButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const drinkDetailsResponse = await fetchDetailDrinks(id as string);
      setDrinkDetails(drinkDetailsResponse);

      const recommendationMealsResponse = await fetchRecommendationMeals();
      setRecommendationMeals(recommendationMealsResponse);
      handlerMeasureNIngredients(drinkDetailsResponse);
    };

    fetchData();
  }, [id]);

  // Object.keys => pegaria as chaves do objeto
  // Object.values => pegaria os valores do objeto
  // Object.entries => pegaria as chaves e os valores do objeto

  const handlerMeasureNIngredients = (drinkDetailsResponse: any) => {
    const mealDetailsArray = Object.entries(drinkDetailsResponse);
    const strIngredient = mealDetailsArray
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map(([, value]) => value);
    const strMeasureArray = Object.entries(drinkDetailsResponse);
    const strMeasure = strMeasureArray
      .filter(([key, value]) => key.includes('strMeasure') && value)
      .map(([, value]) => value);
    setHandlerMeasure(strMeasure);
    setHandlerIngredient(strIngredient);
  };

  // if (id === undefined) return <div>Receita não encontrada!</div>;

  const inProgressRecipes = localStorage
    .getItem('inProgressRecipes') || '{ "drinks": {}, "meals":  {} }';
  const stringInProgressRecipes = JSON.parse(inProgressRecipes);
  let startRecipeOrContinueRecipe;
  if (stringInProgressRecipes.drinks[id as string]) {
    startRecipeOrContinueRecipe = 'Continue Recipe';
  } else {
    startRecipeOrContinueRecipe = 'Start Recipe';
  }

  const shareMealOrDrink = () => {
    const { pathname } = window.location;
    const url = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(url);
    setShareButton((ShareButton) => !ShareButton);
  };

  const favoriteRecipe = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
  || '[]';
    const stringFavoriteRecipes = JSON.parse(favoriteRecipes);
    const hasRecipes = stringFavoriteRecipes
      .some((recipe: any) => recipe.id === id && recipe.type === 'drink');
    setFavorite(hasRecipes === false);
    if (hasRecipes) {
      const newFavoriteRecipes = stringFavoriteRecipes
        .filter((recipe: any) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipes = [
        ...stringFavoriteRecipes,
        {
          id,
          type: 'drink',
          nationality: '',
          category: drinkDetails.strCategory,
          alcoholicOrNot: drinkDetails.strAlcoholic,
          name: drinkDetails.strDrink,
          image: drinkDetails.strDrinkThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
  };

  return (
    <div className="drink-details-container">
      {drinkDetails && drinkDetails.strDrink && (
        <>
          <div className="drink-details-container">
            <img
              src={ drinkDetails.strDrinkThumb }
              alt={ `Foto da bebida: ${drinkDetails.strDrink}` }
              data-testid="recipe-photo"
              className="drink-img"
            />
            <h1
              data-testid="recipe-title"
              className="drink-title"
            >
              {drinkDetails.strDrink}
            </h1>
            <h3
              data-testid="recipe-category"
              className="meal-category"
            >
              {drinkDetails.strAlcoholic}
            </h3>
            <div className="buttons">
              {!shareButton && <p>Link copied!</p>}
              <button
                type="button"
                onClick={ favoriteRecipe }
                className="fav-share-btn"
              >
                <img
                  src={ favorite ? blackHeartIcon : whiteHeartIcon }
                  alt={ favorite ? 'Favorite' : 'Unfavorite' }
                  data-testid="favorite-btn"
                />
              </button>
              <button
                onClick={ shareMealOrDrink }
                data-testid="share-btn"
                type="button"
                className="fav-share-btn"
              >
                <img src={ shareIcon } alt="Share Button" />
              </button>
            </div>
            <h2 className="ingredients-header">Ingredients</h2>
            <ul className="ingredients-table">
              {handlerMeasure.map((measure: any, index: any) => (
                (measure && handlerIngredient[index]) && (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${measure} ${handlerIngredient[index]}`}
                  </li>
                )
              ))}
            </ul>
            <h2>Instructions</h2>
            <div>
              <p
                data-testid="instructions"
                className="drink-instructions"
              >
                {drinkDetails.strInstructions}
              </p>
            </div>
          </div>
          <h2 className="recommendations-title">recommendations</h2>
          <div className="recommendations-container">
            {recommendationMeals.map((meal: any, index: any) => (
              <div
                key={ index }
                className="recommendation-card"
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  src={ meal.strMealThumb }
                  alt={ `Foto do prato: ${meal.strMeal}` }
                  className="recipe-recomendation-img"
                />
                <p data-testid={ `${index}-recommendation-title` }>{meal.strMeal}</p>
              </div>
            ))}
          </div>
        </>)}
      <button
        data-testid="start-recipe-btn"
        onClick={ () => navigate(`/drinks/${id}/in-progress`) }
        className="start-recipe-btn"
      >
        { startRecipeOrContinueRecipe }
      </button>
    </div>
  );
}

export default DrinkDetails;
