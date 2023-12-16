import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { waitFor } from '@testing-library/dom';
import { createMemoryHistory } from 'history';
import SearchBar from '../components/SearchBar';

describe('Testando SearchBar', () => {
  const nameSearchRadioID = 'name-search-radio';
  const execSearchBtnID = 'exec-search-btn';
  const alertMessage = "Sorry, we haven't found any recipes for these filters";
  const radioLetterId = 'first-letter-search-radio';
  const ingredientSearchRadioId = 'ingredient-search-radio';
  const recipeDetails = 'Recipe Details';
  test('testando alertas e correta renderização de elementos no componente searchBar', async () => {
    render(<SearchBar />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioIngredient = screen.getByTestId(ingredientSearchRadioId);
    const radioName = screen.getByTestId(nameSearchRadioID);
    const radioLetter = screen.getByTestId(radioLetterId);
    const searchBtn = screen.getByTestId(execSearchBtnID);
    const alertLetter = vi.spyOn(window, 'alert');
    expect(searchInput).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    await userEvent.type(searchInput, 'suco');
    await userEvent.click(radioLetter);
    expect(radioLetter).toBeChecked();
    await userEvent.click(searchBtn);
    expect(alertLetter).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  test('testando se ao pesquisar por nome de uma receita única em meals, a página de detalhes é renderizada', async () => {
    render(<SearchBar />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioName = screen.getByTestId(nameSearchRadioID);
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'Arrabiata');
    await userEvent.click(radioName);
    await userEvent.click(searchBtn);
    await waitFor(() => {
      expect(window.location.pathname).toMatch(/\/meals\/\d+/);
    });
  });
  test('testando se ao pesquisar por nome de uma receita única em drinks, a página de detalhes é renderizada', async () => {
    render(<SearchBar rota="Drinks" />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioName = screen.getByTestId(nameSearchRadioID);
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'Aquamarine');
    await userEvent.click(radioName);
    await userEvent.click(searchBtn);
    await waitFor(() => {
      expect(window.location.pathname).toMatch(/\/drinks\/\d+/);
    });
  });
  test('testando se ao procurar por nome de uma receita inexistente, um alerta é exibido', async () => {
    render(<SearchBar />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioName = screen.getByTestId(nameSearchRadioID);
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'luciana');
    await userEvent.click(radioName);
    await userEvent.click(searchBtn);
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(alertMessage);
    });
  });
  test('testando se ao buscar por um ingrediente inexistente, um alerta é exibido', async () => {
    render(<SearchBar />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioIngredient = screen.getByTestId(ingredientSearchRadioId);
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'luciana');
    await userEvent.click(radioIngredient);
    await userEvent.click(searchBtn);
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(alertMessage);
    });
  });

  test('handleClick para o case "name"', async () => {
    render(<SearchBar />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioName = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'Chicken Curry');
    await userEvent.click(radioName);
    await userEvent.click(searchBtn);
    expect(screen.queryByText(recipeDetails)).toBeNull();
  });
  test('handleClick para o case "ingredient"', async () => {
    render(<SearchBar />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'Chicken');
    await userEvent.click(radioIngredient);
    await userEvent.click(searchBtn);
    expect(screen.queryByText(recipeDetails)).toBeNull();
  });
  test('handleClick for default case', async () => {
    render(<SearchBar />, { wrapper: BrowserRouter });
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.click(searchBtn);
    expect(window.alert).toHaveBeenCalledWith('Sorry, something\'s wrong. Try again!');
  });
  test('handleLetterClick para resposta da API', async () => {
    render(<SearchBar rota="Drinks" />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioLetter = screen.getByTestId(radioLetterId);
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'A');
    await userEvent.click(radioLetter);
    await userEvent.click(searchBtn);
    expect(screen.queryByText(recipeDetails)).toBeNull();
  });
  test('handleNameClick para resposta da API', async () => {
    render(<SearchBar rota="Drinks" />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioName = screen.getByTestId(nameSearchRadioID);
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'Aquamarine');
    await userEvent.click(radioName);
    await userEvent.click(searchBtn);
    expect(screen.queryByText(recipeDetails)).toBeNull();
  });
  test('handleIngredientClick para resposta da API', async () => {
    render(<SearchBar rota="Drinks" />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioIngredient = screen.getByTestId(ingredientSearchRadioId);
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'lemon');
    await userEvent.click(radioIngredient);
    await userEvent.click(searchBtn);
    expect(screen.queryByText(recipeDetails)).toBeNull();
  });
  test('testando se ao pesquisar por uma letra inicial que não existe, um alerta é exibido', async () => {
    render(<SearchBar />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioLetter = screen.getByTestId(radioLetterId);
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'x');
    await userEvent.click(radioLetter);
    await userEvent.click(searchBtn);
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(alertMessage);
    });
  });
  test('handleClick para o caso "letter"', async () => {
    render(<SearchBar />, { wrapper: BrowserRouter });
    const searchInput = screen.getByLabelText('pesquisar');
    const radioLetter = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(execSearchBtnID);
    await userEvent.type(searchInput, 'A');
    await userEvent.click(radioLetter);
    await userEvent.click(searchBtn);
    expect(screen.queryByText(recipeDetails)).toBeNull();
  });
});
