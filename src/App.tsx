import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Meals from './Recipes/Meals';
import Profile from './Recipes/Profile';
import Drinks from './Recipes/Drinks';
import FavoriteRecipes from './Recipes/FavoriteRecipes';
import DoneRecipes from './Recipes/DoneRecipes';
import DrinkDetails from './Recipes/DrinkDetails';
import MealDetails from './Recipes/MealDetails';
import DrinkInProgress from './Recipes/DrinkInProgress';
import MealInProgress from './Recipes/MealInProgress';
import NotFound from './components/NotFound';
import DetailsProvider from './context/DetailsProvider';

function App() {
  return (
    <DetailsProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals/" element={ <Meals /> } />
        <Route path="/meals/:id" element={ <MealDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <MealInProgress /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/drinks/" element={ <Drinks /> } />
        <Route path="/drinks/:id" element={ <DrinkDetails /> } />
        <Route path="/drinks/:id/in-progress" element={ <DrinkInProgress /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </DetailsProvider>
  );
}

export default App;
