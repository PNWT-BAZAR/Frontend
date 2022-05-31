import { Login } from "@mui/icons-material";
import "./App.css";
import AddProduct from "./Pages/Admin/AddProduct";
import CartProductCard from "./Pages/Cart/CartProductCard";
import OrderSummaryCard from "./Pages/Cart/OrderSummaryCard";
import Cart from "./Pages/Cart/Cart";
import LoginRegister from "./Pages/LoginAndRegister/LoginRegisterContainer";
import Navbar from "./Pages/Layout/Navbar";
import Layout from "./Pages/Layout/Layout";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
