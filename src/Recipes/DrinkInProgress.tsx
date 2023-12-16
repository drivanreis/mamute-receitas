import Header from '../components/Header';
import RecipeInProgress from './RecipeInProgress';

function DrinkInProgress() {
  return (
    <div>
      <Header route="Drink in Progress" />
      <RecipeInProgress type="Drinks" />
    </div>
  );
}
export default DrinkInProgress;
