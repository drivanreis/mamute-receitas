import { useNavigate } from 'react-router-dom';
import Header from './Header';
import meal from '../images/mealIcon.svg';
import drink from '../images/drinkIcon.svg';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <Header route="Page not found" />
      <h1 className="ops">Ops!</h1>
      <p className="message">
        <em>Parece que o link que você digitou está incorreto.</em>
      </p>
      <div className="not-found-buttons">
        <button
          type="button"
          data-testid="explore-bottom-btn"
          onClick={ () => navigate('/drinks/') }
          className="not-found-button"
        >
          <img
            src={ drink }
            alt="drink"
            data-testid="drinks-bottom-btn"
          />
        </button>
        <button
          type="button"
          data-testid="explore-bottom-btn"
          onClick={ () => navigate('/meals/') }
          className="not-found-button"
        >
          <img
            src={ meal }
            alt="meal"
            data-testid="meals-bottom-btn"

          />
        </button>
      </div>
    </div>
  );
}
