import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Testando App', () => {
  test('renderização de componentes na tela de login', () => {
    render(<App />, { wrapper: BrowserRouter });
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');
    expect(btn).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('testando validação da tela de login ', async () => {
    render(<App />, { wrapper: BrowserRouter });
    const validForm = {
      email: 'tryber123@gmail.com',
      password: 'password2022',
    } as const;
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');
    expect(btn).toBeDisabled();
    await userEvent.type(inputEmail, validForm.email);
    await userEvent.type(inputPassword, validForm.password);
    fireEvent.change(inputEmail, { target: { value: validForm.email } });
    fireEvent.change(inputPassword, { target: { value: validForm.password } });
    fireEvent.click(btn);
    expect(btn).not.toBeDisabled();
  });
});
