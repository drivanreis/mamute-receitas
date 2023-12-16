import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formInfo, setFormInfo] = useState({ email: '', password: '' });
  const validateFields = (login: string, password: string) => {
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(login);
    const PasswordValid = password.length > 6;
    const checkedFields = emailValid && PasswordValid;
    return checkedFields;
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInfo((prevFormInfo) => ({
      ...prevFormInfo,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email } = formInfo;
    const loginInfo = {
      email,
      password: formInfo.password,
    };
    localStorage.setItem('user', JSON.stringify({ email }));
    setFormInfo(loginInfo);
    navigate('/meals');
  };

  return (
    <div className="login-container">
      <h1 className="my-recipes-title">
        <p>
          My
          <br />
          Recipes
        </p>
      </h1>
      <h3 className="welcome-message">
        Seu melhor amigo na hora de preparar suas receitas favoritas.
      </h3>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={ onSubmit }>
          <div className="login-input">
            <input
              className="email-input"
              name="email"
              data-testid="email-input"
              onChange={ handleChange }
              value={ formInfo.email }
              placeholder="Email"
              title="E-mail"
            />
            <input
              className="password-input"
              name="password"
              data-testid="password-input"
              onChange={ handleChange }
              value={ formInfo.password }
              placeholder="Password"
              title="Senha"
            />
            <button
              className="login-button"
              title="clique para fazer o login"
              data-testid="login-submit-btn"
              disabled={ !validateFields(formInfo.email, formInfo.password) }
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
