import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const storedUserEmail = localStorage.getItem('user');
  const userEmail = storedUserEmail ? JSON.parse(storedUserEmail).email : '';

  const handleDoneRecipes = () => {
    navigate('/done-recipes');
  };

  const handleFavoriteRecipes = () => {
    navigate('/favorite-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="profile-main-container">
      <Header route="Profile" />
      <div>
        <p data-testid="profile-email" className="greetings">
          <b>{ ` Olá ${userEmail} !` }</b>
        </p>
        <p className="profile-info">
          <em>
            Abaixo você pode ver suas receitas favoritas e já finalizadas.
            Além de também poder sair da sua conta.
          </em>
        </p>
        <div className="profile-buttons">
          <button
            data-testid="profile-done-btn"
            onClick={ handleDoneRecipes }
            className="profile-button"
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ handleFavoriteRecipes }
            className="profile-button"
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
            className="profile-button"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer route="Profile" />
    </div>
  );
}

export default Profile;
