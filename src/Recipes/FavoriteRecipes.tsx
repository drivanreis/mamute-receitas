import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecipeFavoriteType } from '../types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import './FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState<RecipeFavoriteType[]>([]);
  const [favoriteIcon] = useState(true);
  const [shareButton, setShareButton] = useState(false);

  useEffect(() => {
    const storedFavRecipes: RecipeFavoriteType[] = JSON
      .parse(localStorage.getItem('favoriteRecipes') as string);
    if (storedFavRecipes) {
      setFavRecipes(storedFavRecipes);
    }
  }, []);

  const handleUnfavorite = (id: string) => {
    const favoriteRecipes: RecipeFavoriteType[] = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavRecipes(newFavoriteRecipes);
  };

  const handleCLick = (type: string) => {
    const filtersRecipes: RecipeFavoriteType[] = JSON
      .parse(localStorage.getItem('favoriteRecipes') as string);
    if (filtersRecipes) {
      if (type === 'all') {
        setFavRecipes(filtersRecipes);
      }
      if (type === 'meal') {
        const filterMeal = filtersRecipes
          .filter((recipe) => recipe.type === 'meal');
        setFavRecipes(filterMeal);
      }
      if (type === 'drink') {
        const filterDrink = filtersRecipes
          .filter((recipe) => recipe.type === 'drink');
        setFavRecipes(filterDrink);
      }
    }
  };

  const toggleShare = () => {
    setTimeout(() => {
      setShareButton(false);
    }, 2000);
  };

  return (
    <>
      <Header route="Favorite Recipes" />
      <div className="favorite-recipes-buttons">
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleCLick('all') }
          className="filter-btn"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleCLick('meal') }
          className="filter-btn"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleCLick('drink') }
          className="filter-btn"
        >
          Drinks
        </button>
      </div>
      <div className="favorite-list">
        {favRecipes && favRecipes.map((favRecipe, index) => (
          <div
            key={ index }
            className="favorite-card-link"
          >
            <Link
              to={ `/${favRecipe.type === 'meal' ? 'meals' : 'drinks'}/${favRecipe.id}` }
              data-testid={ `${index}-recipe-card-link` }
            >
              <img
                src={ favRecipe.image }
                alt={ favRecipe.name }
                data-testid={ `${index}-horizontal-image` }
                className="favorite-list-img"
              />
              <h2
                data-testid={ `${index}-horizontal-name` }
                className="favorite-list-recipe-name"
              >
                {favRecipe.name}
              </h2>
            </Link>
            <div className="favorite-list-recipe-data">
              {favRecipe.type === 'meal' ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {favRecipe.nationality}
                  {' '}
                  -
                  {' '}
                  {favRecipe.category}
                </p>
              ) : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {favRecipe.alcoholicOrNot}
                </p>
              )}
            </div>
            { shareButton && <p>Link copied!</p> }
            <button
              onClick={ () => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/${favRecipe.type}s/${favRecipe.id}`,
                );
                setShareButton(true);
                toggleShare();
              } }
              className="favorite-recipe-share-btn"
            >
              <img
                src={ shareIcon }
                alt="Share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>

            <button
              onClick={ () => handleUnfavorite(favRecipe.id) }
              className="favorite-recipe-share-btn"
            >
              <img
                src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
                alt="Favorite"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
