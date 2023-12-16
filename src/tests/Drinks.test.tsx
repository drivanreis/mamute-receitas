import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Drinks from '../Recipes/Drinks';

describe('Testando Drinks', () => {
  const searchInputId = 'search-input';
  test('testando rota drinks', async () => {
    render(<Drinks />, { wrapper: BrowserRouter });
    const searchBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();
    const Title = screen.getByRole('heading', { name: /drinks/i });
    expect(Title).toHaveTextContent('Drinks');
    await userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
