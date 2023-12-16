import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchName, fetchIngredient, fetchLetter, searchIngredientDrink,
  searchLetterDrink, searchNameDrink } from '../fetchApis';
import './SearchBar.css';

const NoRecipesFoundMessage = "Sorry, we haven't found any recipes for these filters";

function SearchBar({ rota }: any) {
  const [searchInput, setSearchInput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  async function handleLetterClick() {
    if (searchInput.length !== 1) {
      return window.alert('Your search must have only 1 (one) character');
    }

    let data;

    if (rota === 'Drinks') {
      data = await searchLetterDrink(searchInput);
    } else {
      data = await fetchLetter(searchInput);
    }

    console.log('After API call:', data);

    if (Array.isArray(data) && data.length > 0) {
      console.log('Array Check:', Array.isArray(data));
    } else {
      console.log('No drinks found.');
      window.alert('Sorry, we don\'t have found any recipes.');
    }
  }

  async function handleNameClick() {
    let data;

    if (rota === 'Drinks') {
      data = await searchNameDrink(searchInput);
    } else {
      data = await fetchName(searchInput);
    }

    console.log('Data:', data);

    if (data && data.length > 0) {
      if (data.length === 1) {
        const recipeId = data[0].idDrink || data[0].idMeal;
        const recipeDetailsUrl = rota === 'Drinks' ? `/drinks/${recipeId}`
          : `/meals/${recipeId}`;
        navigate(recipeDetailsUrl);
      }
    } else {
      window.alert(NoRecipesFoundMessage);
    }
  }
  async function handleIngredientClick() {
    if (inputValue === 'ingredient') {
      const data = rota === 'Drinks' ? await searchIngredientDrink(searchInput)
        : await fetchIngredient(searchInput);

      console.log('Ingredient Data:', data);

      if (Array.isArray(data) && data.length > 0) {
        console.log('Array Check:', Array.isArray(data));
      } else {
        console.log('No drinks found.');
        window.alert('Sorry, we don\'t have found any recipes.');
      }
    }
  }

  function handleClick() {
    switch (inputValue) {
      case 'letter':
        handleLetterClick();
        break;
      case 'name':
        handleNameClick();
        break;
      case 'ingredient':
        handleIngredientClick();
        break;
      default:
        window.alert("Sorry, something's wrong. Try again!");
    }
  }
  return (
    <div className="search-bar">
      <label htmlFor="search">
        pesquisar
        <input
          id="search"
          name="search"
          data-testid="search-input"
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
          className="search-input"
        />
      </label>
      <div className="radio-inputs">
        <label>
          <input
            className="radio-input"
            data-testid="ingredient-search-radio"
            type="radio"
            value="Ingredient"
            checked={ inputValue === 'ingredient' }
            onChange={ () => setInputValue('ingredient') }
          />
          Ingredient
        </label>
        <label>
          <input
            className="radio-input"
            data-testid="name-search-radio"
            type="radio"
            value="name"
            checked={ inputValue === 'name' }
            onChange={ () => setInputValue('name') }
          />
          Name
        </label>
        <label>
          <input
            className="radio-input"
            data-testid="first-letter-search-radio"
            type="radio"
            value="letter"
            checked={ inputValue === 'letter' }
            onChange={ () => setInputValue('letter') }
          />
          Letter
        </label>
      </div>
      <button data-testid="exec-search-btn" onClick={ handleClick }>
        search
      </button>
    </div>
  );
}

export default SearchBar;
