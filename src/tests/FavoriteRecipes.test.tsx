import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoriteRecipes from '../Recipes/FavoriteRecipes';

describe('Testando FavoriteRecipes', () => {
  test('testando rota favorite-recipes', () => {
    render(<FavoriteRecipes />, { wrapper: BrowserRouter });
  });
});
