import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDetailMeals, fetchRecommendationDrinks } from '../fetchApis';
import { DetailsContext } from '../context/DetailsContext';
import '../components/Carousel.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './MealDetails.css';

function MealDetails() {
  const { id } = useParams<{ id: string }>();
  const { mealDetails,
    setMealDetails,
    recommendationDrinks,
    setRecommendationDrinks,
  } = useContext(DetailsContext);

  const [handlerMeasure, setHandlerMeasure] = useState<any>([]);
  const [handlerIngredient, setHandlerIngredient] = useState<any>([]);
  const [favorite, setFavorite] = useState(() => {
    const hasRecipes = localStorage.getItem('favoriteRecipes')
  || '[]';
    const stringFavoriteRecipes = JSON.parse(hasRecipes)
      .some((recipe: any) => recipe.id === id && recipe.type === 'meal');
    return stringFavoriteRecipes;
  });
  const [shareButton, setShareButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const mealDetailsResponse = await fetchDetailMeals(id as string);
      setMealDetails(mealDetailsResponse);

      const recommendationDrinksResponse = await fetchRecommendationDrinks();
      setRecommendationDrinks(recommendationDrinksResponse);
      handlerMeasureNIngredients(mealDetailsResponse);
    };

    fetchData();
  }, [id]);

  // Object.keys => pegaria as chaves do objeto
  // Object.values => pegaria os valores do objeto
  // Object.entries => pegaria as chaves e os valores do objeto

  const handlerMeasureNIngredients = (mealDetailsResponse: any) => {
    const mealDetailsArray = Object.entries(mealDetailsResponse);
    const strIngredient = mealDetailsArray
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map(([, value]) => value);
    const strMeasureArray = Object.entries(mealDetailsResponse);
    const strMeasure = strMeasureArray
      .filter(([key, value]) => key.includes('strMeasure') && value)
      .map(([, value]) => value);
    setHandlerMeasure(strMeasure);
    setHandlerIngredient(strIngredient);
  };

  // if (id === undefined) return <div>Receita não encontrada!</div>;

  const inProgressRecipes = localStorage
    .getItem('inProgressRecipes') || '{  "drinks": {}, "meals":  {}}';
  const stringInProgressRecipes = JSON.parse(inProgressRecipes);
  let startRecipeOrContinueRecipe;
  if (stringInProgressRecipes.meals[id as string]) {
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
      .some((recipe: any) => recipe.id === id && recipe.type === 'meal');
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
          type: 'meal',
          alcoholicOrNot: '',
          nationality: mealDetails.strArea,
          category: mealDetails.strCategory,
          name: mealDetails.strMeal,
          image: mealDetails.strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
  };

  console.log(mealDetails);
  return (
    <div className="meal-details-container">
      {mealDetails && mealDetails.strMeal && (
        <div className="meal-details-container">
          <img
            src={ mealDetails.strMealThumb }
            alt={ `Foto do prato: ${mealDetails.strMeal}` }
            data-testid="recipe-photo"
            className="meal-img"
          />

          <h1
            data-testid="recipe-title"
            className="meal-title"
          >
            {mealDetails.strMeal}
          </h1>

          <h3
            data-testid="recipe-category"
            className="meal-category"
          >
            <em>
              {mealDetails.strCategory}
            </em>
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
              className="meal-instructions"
            >
              {mealDetails.strInstructions}
            </p>
          </div>
          <h2>Video</h2>
          { mealDetails.strYoutube
        && <iframe
          width="auto"
          height="auto"
          src={ `https://www.youtube.com/embed/${mealDetails.strYoutube.split('v=')[1]}` }
          title="YouTube video player"
          allowFullScreen
          data-testid="video"
        />}
          <h2 className="recommendations-title">recommendations</h2>
          <div className="recommendations-container">
            {recommendationDrinks.map((drink: any, index: any) => (
              <div
                key={ index }
                className="recommendation-card"
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  src={ drink.strDrinkThumb }
                  alt={ `Foto do drink: ${drink.strDrink}` }
                  className="recipe-recomendation-img"
                />
                <p data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</p>
              </div>
            ))}
          </div>
        </div>)}
      <button
        data-testid="start-recipe-btn"
        onClick={ () => navigate(`/meals/${id}/in-progress`) }
        className="start-recipe-btn"
      >
        { startRecipeOrContinueRecipe }
      </button>
    </div>
  );
}

export default MealDetails;
