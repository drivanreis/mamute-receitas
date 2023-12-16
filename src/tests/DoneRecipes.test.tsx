import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { mockDone } from '../mockdataRecipes';
import DoneRecipes from '../Recipes/DoneRecipes';

const orDrink = 'Ordinary Drink';
describe('Testando DoneRecipes', () => {
  test('testando comportamento dos botões na rota drinks', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => (mockDone),
    } as Response)
      .mockResolvedValue({
        json: async () => ({ ...mockDone, drinks: mockDone.filter((drink) => drink.category === orDrink) }),
      } as Response);
    render(<DoneRecipes />, { wrapper: BrowserRouter });
    const AllBtn = await screen.findByRole('button', { name: 'All' });

    const Drinkbtn = await screen.findByRole('button', { name: 'Drinks' });
    const Mealbtn = await screen.findByRole('button', { name: 'Meals' });

    await userEvent.click(Drinkbtn);

    await userEvent.click(Mealbtn);

    await userEvent.click(AllBtn);
  });
});
//  npm run cy -- --spec cypress/e2e/10-14.header_search_bar.cy.js
