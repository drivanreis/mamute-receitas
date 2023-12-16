import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../types';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import './DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const Recipes
    : DoneRecipeType[] = JSON.parse(localStorage.getItem('doneRecipes') as string);
    if (Recipes) {
      setDoneRecipes(Recipes);
    }
  }, []);

  const filterRecipeType = (type: string) => {
    const allRecipes: DoneRecipeType[] = JSON
      .parse(localStorage.getItem('doneRecipes') as string) || [];
    if (allRecipes) {
      if (type === 'all') {
        setDoneRecipes(allRecipes);
      }
      if (type === 'meal') {
        const filteredRecipes = allRecipes.filter((recipe) => recipe.type === 'meal');
        setDoneRecipes(filteredRecipes);
      }
      if (type === 'drink') {
        const filteredRecipes = allRecipes.filter((recipe) => recipe.type === 'drink');
        setDoneRecipes(filteredRecipes);
      }
    }
  };

  return (
    <>
      <Header route="Done Recipes" />
      <div>
        <div className="done-recipes-buttons">
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => filterRecipeType('all') }
            className="filter-btn"
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => filterRecipeType('meal') }
            className="filter-btn"
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => filterRecipeType('drink') }
            className="filter-btn"
          >
            Drinks
          </button>
        </div>
        <div className="done-list">
          {doneRecipes.map((recipe, index) => (
            <div
              key={ recipe.id }
              className="done-card-link"
            >
              <Link key={ recipe.id } to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  className="done-list-img"
                />
                <h2
                  data-testid={ `${index}-horizontal-name` }
                  className="done-list-recipe-name"
                >
                  {recipe.name}

                </h2>
              </Link>
              <div className="done-list-recipe-data">
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="done-data"
                >
                  {recipe.type === 'drink' ? recipe.alcoholicOrNot
                    : `${recipe.nationality} - ${recipe.category}`}
                </p>
                {recipe.tags.slice(0, 2).map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    className="done-data"
                  >
                    {tag}
                  </p>
                ))}
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className="done-data"
                >
                  {recipe.doneDate}
                </p>
                {copy && <p>Link copied!</p>}
              </div>
              <button
                data-testid="clipboard-btn"
                onClick={ () => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/${recipe.type}s/${recipe.id}`,
                  );
                  setCopy(true);
                } }
                className="done-recipe-share-btn"
              >
                Share
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
// npm run cy -- --spec cypress/e2e/43-48.done_recipes.cy.js
export default DoneRecipes;
