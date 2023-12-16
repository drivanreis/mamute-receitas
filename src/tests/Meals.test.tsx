import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { waitFor } from '@testing-library/dom';
import Meals from '../Recipes/Meals';
import { mealsData } from '../mockData';

describe('Testando Meals', () => {
  const searchInputId = 'search-input';
  const execSearchBtnID = 'exec-search-btn';

  test('testando Header/ meals', async () => {
    render(<Meals />, { wrapper: BrowserRouter });
    const searchBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(searchBtn);
    const routeTitle = screen.getByTestId('page-title');
    const searchInput = screen.getByTestId(searchInputId);
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(searchInput).toBeInTheDocument();
    expect(routeTitle).toHaveTextContent('Meals');
    await userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
    await userEvent.click(profileBtn);
  });
  test('Verifica se redireciona a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior', async () => {
    render(
      <BrowserRouter>
        <Meals />
      </BrowserRouter>,
    );

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    await userEvent.click(mealsBtn);

    await userEvent.click(drinksBtn);
    expect(window.location.pathname).toBe('/drinks');
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
  test('Verifica a função do componente SearchBar se obtiver apenas uma receita é redirecionado pra pagina daquela receita', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: mealsData }),
    } as Response);

    render(<Meals />, { wrapper: BrowserRouter });
    const toggleButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(toggleButton);

    const inputSearch = screen.getByTestId(searchInputId);
    await userEvent.type(inputSearch, 'Corba');

    const radioName = screen.getByRole('radio', { name: /name/i });
    await userEvent.click(radioName);

    const button = screen.getByTestId(execSearchBtnID);
    await userEvent.click(button);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Corba'));
    expect(screen.getByRole('heading', { name: /Meals/i })).toBeInTheDocument();
  });
  test('Verifica a função do componente SearschBar se obtiver aspenas uma receita é redirecionado pra pagina daquela receita', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: mealsData }),
    } as Response);

    render(<Meals />, { wrapper: BrowserRouter });
    const toggleButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(toggleButton);

    const inputSearch = screen.getByTestId(searchInputId);
    await userEvent.type(inputSearch, 'cumin');

    const radioName = screen.getByRole('radio', { name: /Ingredient/i });
    await userEvent.click(radioName);
    const button = screen.getByTestId(execSearchBtnID);
    await userEvent.click(button);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});
