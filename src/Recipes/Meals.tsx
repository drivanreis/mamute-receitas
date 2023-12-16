import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from './Recipes';

function Meals() {
  return (
    <>
      <Header route="Meals" />
      <Recipes category="Meals" />
      <Footer route="Meals" />
    </>
  );
}

export default Meals;
