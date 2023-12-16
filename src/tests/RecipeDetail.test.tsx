import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { mockMealsDetails } from '../MockRecipeDetails';
import MealDetails from '../Recipes/MealDetails';
import DetailsProvider from '../context/DetailsProvider';
import { mockCarousel } from '../MockCarousel';

const mockFetch = {
  ok: true,
  json: async () => mockMealsDetails,
} as Response;
// henrique
const mockFetchCarousel = {
  ok: true,
  json: async () => mockCarousel,
} as Response;

describe('Teste da parte de detalhes das receitas e suas atribuições ', async () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockFetch)
      .mockResolvedValue(mockFetchCarousel);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Testa se na rota /meals há todas as comidas da API para serem acessadas', async () => {
    render(
      <DetailsProvider>
        <BrowserRouter>
          <MealDetails />
        </BrowserRouter>
      </DetailsProvider>,
    );
    const recipeMealTitle = await screen.findByText('Corba');
    expect(recipeMealTitle).toBeInTheDocument();
  });
});
