import { useNavigate } from 'react-router-dom';
import meal from '../images/mealIcon.svg';
import drink from '../images/drinkIcon.svg';
import './Footer.css';

function Footer({ route }: any) {
  const navigate = useNavigate();

  return (
    <footer data-testid="footer">
      {(route === 'Meals' || route === 'Drinks' || route === 'Profile')
      && (
        <div>
          <button
            className="footer-buttons"
            onClick={ () => navigate('/drinks') }
            title="Bebidas"
          >
            <img
              src={ drink }
              alt="drink"
              data-testid="drinks-bottom-btn"
            />
          </button>
          <button
            className="footer-buttons"
            onClick={ () => navigate('/meals') }
            title="Refeições"
          >
            <img
              src={ meal }
              alt="meal"
              data-testid="meals-bottom-btn"

            />
          </button>
        </div>
      )}
    </footer>
  );
}
export default Footer;
