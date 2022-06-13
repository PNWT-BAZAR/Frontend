import { Grid } from "@mui/material";
import OrderSummaryCard from "./OrderSummaryCard";
import CartProductCard from "./CartProductCard";
import { dummyCartProducts } from "../../sampleItems/dummyCartProducts";
import { useState, useEffect } from "react";
import API from "../../api/API";


const Cart = () => {
  var cartArrayJson = localStorage.getItem('cart');
  var cartArray;
  if (!cartArrayJson) {
      cartArray = [];
  } else {
      cartArray = JSON.parse(cartArrayJson);
  }

  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("here");
        try {
            let productArray = [];
            let price = 0;
            for (const element of cartArray) {
                let beProduct = (await API.get("inventory/products/" + element[0], {}))?.data?.object;
                beProduct.quantity = element[1];
                productArray.push(beProduct);
                price += element[1] * beProduct.price;
            }
            setCartProducts(productArray);
            setTotalPrice(price);
        } catch (error) {
            console.log("Greska: ", error);
        }
    }

    fetchProducts();
  }, [])

  const setQuantity = (quantity, productId) => {
    let productIndex = cartProducts.findIndex(p => p.id === productId);
    cartProducts[productIndex].quantity = quantity;
    setCartProducts([...cartProducts]);
    let price = 0;
    for (const cartProduct of cartProducts) {
        console.log(cartProduct);
        price += cartProduct.price * cartProduct.quantity;
    }
    setTotalPrice(price);

    var cartArrayJson = localStorage.getItem('cart');
    var cartArray;
    if (!cartArrayJson) {
        cartArray = [];
    } else {
        cartArray = JSON.parse(cartArrayJson);
    }

    let cartProductIndex = cartArray.findIndex(cartElement => cartElement[0] === productId);
    if (cartProductIndex !== -1) {
        cartArray[cartProductIndex] = [productId, quantity];
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
}

  const onDelete = (product)=>{
    console.log("onDelete");
    // let cartProductIndex = cartArray.findIndex(cartElement => cartElement[0] === product?.productId);
    // console.log(cartProductIndex);
    // console.log(cartArray);
    // cartArray.splice(cartProductIndex, 1);
    // let productIndexInCart = cartProducts.indexOf(product);
    // cartProducts.splice(productIndexInCart, 1);
  }


  return (
    cartProducts && (
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
          {cartProducts.map((cartProduct) => {
            // {
            //   totalPrice = totalPrice + cartProduct.price * cartProduct.quantity;
            // }
            return <CartProductCard key={cartProduct.id} product={cartProduct} onQuantityChanged={setQuantity} onDelete={onDelete}/>;
          })}
        </Grid>
        <Grid
          item
          sx={{
            margin: "20px",
          }}
        >
          <OrderSummaryCard price={totalPrice} cartProducts = {cartProducts}/>
        </Grid>
      </Grid>
    )
  );
};

export default Cart;
