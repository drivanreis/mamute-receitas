import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DrinkInProgress from '../Recipes/DrinkInProgress';

describe('DrinInProgress', () => {
  test('verifica se o componente é renderizado', () => {
    render(<DrinkInProgress />, { wrapper: BrowserRouter });
    const Title = screen.getByRole('heading', { name: /Drink in Progress/i });
    expect(Title).toHaveTextContent('Drink in Progress');
  });
});
