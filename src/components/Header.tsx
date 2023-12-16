import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header({ route }: any) {
  const [searchInput, setSearchInput] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header-main-container">
      <div className="header-container">
        <h1 className="header-name">My Recipes</h1>
        <div className="header-buttons">
          {(route === 'Meals' || route === 'Drinks')
    && (
      <button
        className="header-button"
        onClick={ () => setSearchInput(!searchInput) }
        title="Procurar Receita"
      >
        <img src={ search } alt="search" data-testid="search-top-btn" />
      </button>
    )}
          <button
            className="header-button"
            onClick={ () => navigate('/profile') }
            title="Perfil do Usuário"
          >
            <img src={ profile } alt="profile" data-testid="profile-top-btn" />
          </button>
        </div>
      </div>
      <h1 className="page-title" data-testid="page-title">{route}</h1>
      <div className="search">{ searchInput ? (<SearchBar rota={ route } />) : null}</div>
    </header>
  );
}

export default Header;
