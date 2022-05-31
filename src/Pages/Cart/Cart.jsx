import { Grid } from "@mui/material";
import OrderSummaryCard from "./OrderSummaryCard";
import CartProductCard from "./CartProductCard";
import { dummyCartProducts } from "../../sampleItems/dummyCartProducts";

const Cart = () => {
  var totalPrice = 0;

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        backgroundImage: "linear-gradient(32deg, #f3f4f7 0%, #eeeeee 90%)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid
        item
        sx={{
          margin: "20px 0 0 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {dummyCartProducts.map((cartProduct) => {
          {
            totalPrice = totalPrice + cartProduct.price * cartProduct.quantity;
          }
          return <CartProductCard key={cartProduct.id} product={cartProduct} />;
        })}
      </Grid>
      <Grid
        item
        sx={{
          margin: "20px",
        }}
      >
        <OrderSummaryCard price={totalPrice} />
      </Grid>
    </Grid>
  );
};

export default Cart;
