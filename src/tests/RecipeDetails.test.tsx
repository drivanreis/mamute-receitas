import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeDetails from '../Recipes/RecipeDetails';

describe('Testando RecipeDetails', () => {
  test('detailts componentes', async () => {
    render(<RecipeDetails />, { wrapper: BrowserRouter });
    const heading = screen.getByText('Recipe Details');
    expect(heading).toBeInTheDocument();
  });
});
