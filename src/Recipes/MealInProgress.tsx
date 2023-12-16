import Header from '../components/Header';
import RecipeInProgress from './RecipeInProgress';

function MealInProgress() {
  return (
    <div>
      <Header route="Meal in Progress" />
      <RecipeInProgress type="Meals" />
    </div>
  );
}
export default MealInProgress;
