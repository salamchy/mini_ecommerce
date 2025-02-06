import Carousel from "../components/Carousel";
import DisBanner from "../components/DisBanner";
import ProductCateg from "./products/ProductCateg";
import ProductsHome from "./products/ProductsHome";

const Home = () => {
  return (
    <div>
      <Carousel />
      <ProductsHome />
      <DisBanner />
      <ProductCateg />
    </div>
  )
}
export default Home