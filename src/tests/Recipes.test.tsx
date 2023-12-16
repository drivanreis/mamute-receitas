import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import { drinksMocks } from '../mocks/drinksMocks';

const orDrink = 'Ordinary Drink';

const CategoriesDrink = {
  drinks: [
    { strCategory: orDrink }, { strCategory: 'Cocktail' }, { strCategory: 'Shake' }, { strCategory: 'Other / Unknown' }, { strCategory: 'Cocoa' },
  ],
};

const Id = '0-recipe-card';

describe('Testando Recipes', () => {
  test('testando comportamento dos botões na rota drinks', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => (drinksMocks),
    } as Response)
      .mockResolvedValueOnce({
        json: async () => (CategoriesDrink),
      } as Response)
      .mockResolvedValue({
        json: async () => ({ ...drinksMocks, drinks: drinksMocks.drinks.filter((drink) => drink.strCategory === orDrink) }),
      } as Response);
    renderWithRouter(<App />, { route: '/drinks' });
    const heading = await screen.findAllByRole('heading', { name: 'Drinks' });
    expect(heading).toHaveLength(1);

    const AllBtn = screen.getByText('All');
    const Card0 = await screen.findByTestId(Id);
    const btnCategory = await screen.findByRole('button', { name: orDrink });
    expect(Card0).toHaveTextContent('A1');

    await userEvent.click(btnCategory);
    const Card1 = await screen.findByTestId(Id);
    expect(Card1).toHaveTextContent('GG');

    await userEvent.click(btnCategory);
    const Card2 = await screen.findByTestId(Id);
    expect(Card2).toHaveTextContent('A1');
    await userEvent.click(AllBtn);
  });
});
