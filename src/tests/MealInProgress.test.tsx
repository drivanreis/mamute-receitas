import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MealInProgress from '../Recipes/MealInProgress';

describe('MealInProgress', () => {
  test('verifica se o componente é renderizado', () => {
    render(<MealInProgress />, { wrapper: BrowserRouter });
    const Title = screen.getByRole('heading', { name: /Meal in Progress/i });
    expect(Title).toHaveTextContent('Meal in Progress');
  });
});
