import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import Profile from '../Recipes/Profile';

describe('Testando Profile', () => {
  const email = 'teste@teste.com';
  test('renders user email', () => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    render(
      <Router>
        <Profile />
      </Router>,
    );
    const userEmailElement = screen.getByTestId('profile-email');
    expect(userEmailElement).toBeInTheDocument();
    expect(userEmailElement.textContent).toBe(email);
  });
  test('redirects to done recipes page', () => {
    const { getByTestId } = render(
      <Router>
        <Profile />
      </Router>,
    );
    const doneRecipesButton = getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesButton);
    expect(window.location.pathname).toBe('/done-recipes');
  });
  test('redirects to favorite recipes page', () => {
    const { getByTestId } = render(
      <Router>
        <Profile />
      </Router>,
    );
    const favoriteRecipesButton = getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesButton);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });
  test('logs out and redirects to login page', () => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    const { getByTestId } = render(
      <Router>
        <Profile />
      </Router>,
    );
    const logoutButton = getByTestId('profile-logout-btn');
    fireEvent.click(logoutButton);
    expect(localStorage.getItem('user')).toBe(null);
    expect(window.location.pathname).toBe('/');
  });
  test('testando rota profile', async () => {
    render(<Profile />, { wrapper: BrowserRouter });
    const profileImg = screen.getByAltText('profile');
    const routeTitle = screen.getByTestId('page-title');
    expect(profileImg).toBeInTheDocument();
    expect(routeTitle).toHaveTextContent('Profile');
  });
});
