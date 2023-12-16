import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from './Recipes';

function Drinks() {
  return (
    <>
      <Header route="Drinks" />
      <Recipes category="Drinks" />
      <Footer route="Drinks" />
    </>
  );
}

export default Drinks;
