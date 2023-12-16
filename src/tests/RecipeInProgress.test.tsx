import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import RecipeInProgress from '../Recipes/RecipeInProgress';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { drinksData1, mealsData1 } from '../mockData';

describe('Testa o componente RecipeInProgress em MealsInProgress', async () => {
  afterEach(() => localStorage.clear());
  afterEach(() => vi.clearAllMocks());

  test('testa toda a aplicação', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => mealsData1,
    });

    global.fetch = fetchMock;
    render(
      <MemoryRouter initialEntries={ ['/meals/52775/in-progress'] }>
        <Routes>
          <Route path="/meals/:id/in-progress" element={ <RecipeInProgress type="Meals" /> } />
        </Routes>
      </MemoryRouter>,
    );
    await waitFor(() => expect(fetchMock).toBeCalledTimes(1));
    await waitFor(() => {
      const recipeName = screen.getByTestId('recipe-title');
      const recipeImage = screen.getByTestId('recipe-photo') as HTMLImageElement;
      const recipeCategory = screen.getByTestId('recipe-category');
      const recipeInstructions = screen.getByTestId('instructions');
      const recipeIngredient1 = screen.getAllByTestId(/0-ingredient-step/);
      const recipeIngredient2 = screen.getAllByTestId(/1-ingredient-step/);

      expect(recipeName).toBeInTheDocument();
      expect(recipeName.innerHTML).toBe('Vegan Lasagna');
      expect(recipeImage).toBeInTheDocument();
      expect(recipeImage.src).toBe('https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg');
      expect(recipeCategory).toBeInTheDocument();
      expect(recipeCategory.innerHTML).toBe('Vegan');
      expect(recipeInstructions).toBeInTheDocument();
      expect(recipeInstructions.innerHTML).toBe('1) Preheat oven to 180 degrees celcius.');
      expect(recipeIngredient1[0].textContent).toContain('green red lentils');
      expect(recipeIngredient2[0].textContent).toContain('carrot');

      const finishButton = screen.getByRole('button', { name: /Finalizar/i });
      expect(finishButton).toBeDisabled();
    });
  });
  test('Verifica se ao clicar no botão compartilhar, uma mensagem é exibida', async () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      writable: true,
    });

    render(<RecipeInProgress />, { wrapper: BrowserRouter });
    const recipeShareBtn = screen.getByTestId('share-btn');
    expect(recipeShareBtn).toBeInTheDocument();

    await userEvent.click(recipeShareBtn);

    waitFor(() => {
      const shareMessage = screen.getByText('Link copied!');
      expect(shareMessage).toBeInTheDocument();
    });
  });
  test('testa a função favoritar', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => drinksData1,
    });

    global.fetch = fetchMock;
    render(
      <MemoryRouter initialEntries={ ['/drinks/178365/in-progress'] }>
        <Routes>
          <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress type="Drinks" /> } />
        </Routes>
      </MemoryRouter>,
    );
    await waitFor(() => expect(fetchMock).toBeCalledTimes(1));
    await waitFor(() => {
      const favoriteButton = screen.getByTestId('favorite-btn');
      expect(favoriteButton).toBeInTheDocument();
      const initialHeartIcon = screen.getByAltText('Favorite Recipe');
      expect(initialHeartIcon).toHaveAttribute('src', whiteHeartIcon);
      fireEvent.click(favoriteButton);
      const finalHeartIcon = screen.getByAltText('Favorite Recipe');
      expect(finalHeartIcon).toHaveAttribute('src', blackHeartIcon);
    });
  });
  test('atualiza o localStorage ao clicar no botão favoritar', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => drinksData1,
    });

    global.fetch = fetchMock;
    render(
      <MemoryRouter initialEntries={ ['/drinks/178365/in-progress'] }>
        <Routes>
          <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress type="Drinks" /> } />
        </Routes>
      </MemoryRouter>,
    );
    await waitFor(() => expect(fetchMock).toBeCalledTimes(1));
    await waitFor(() => {
      const favoriteButton = screen.getByTestId('favorite-btn');
      expect(favoriteButton).toBeInTheDocument();
      expect(localStorage.getItem('favoriteRecipes')).toBeDefined();
      console.log(localStorage.getItem('favoriteRecipes'));
      fireEvent.click(favoriteButton);
      expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
    });
  });
  test('Verifica se ao clicar no botão de finalizar receita, o botão funciona corretamente', async () => {
    render(<RecipeInProgress type="Meals" />, { wrapper: BrowserRouter });

    const recipeFinishBtn = screen.getByTestId('finish-recipe-btn');
    expect(recipeFinishBtn).toBeInTheDocument();

    fireEvent.click(recipeFinishBtn);
    expect(localStorage.getItem('doneRecipes')).toBeDefined();

    const { pathname } = window.location;
    expect(pathname).toBe('/done-recipes');
  });
});
