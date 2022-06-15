import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import API from "../../api/API";
import jwt from 'jwt-decode'



const OrderSummaryCard = (props) => {
  const { cartProducts } = props;
  const [open, setOpen] = React.useState(false);

  var cartArrayJson = localStorage.getItem('cart');
  var cartArray;
  if (!cartArrayJson) {
      cartArray = [];
  } else {
      cartArray = JSON.parse(cartArrayJson);
  }

  const clearCartAndReroute = () => {
    localStorage.removeItem("cart");
    window.location.href = "/";
  }

  const handleOrderCreate = () => {
    var params = new URLSearchParams([
      ["username", jwt(localStorage.getItem("access_token"))?.sub]
    ]);
    API.get("/identity/users/username", {params}).then((result) => {
      console.log("Found user")
      console.log(result?.data?.object);
      let user = result?.data?.object;

      let newOrder = {
        user: {
          id: user.id
        },
        createdAt: new Date(),
        orderStatus: "PENDING"
      }
      API.post("/order/orders", newOrder).then((result2)=>{
        for (const cartProduct of cartProducts) {
          console.log("Creating new product");
          console.log(cartProduct);
          let cartProductIndex = cartArray.findIndex(cartElement => cartElement[0] === cartProduct.id);
          let newOrderItem = {
            product:{
              id: cartProduct.id
            },
            order:{
              id: result2?.data?.object?.id
            },
            reviewedOrder: false,
            quantity: cartArray[cartProductIndex][1]
          }
          API.post("/order/orderItems", newOrderItem);
        }

        handleClickOpen();
      });

    });


    
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearCartAndReroute();
    setOpen(false);
  };

  const shipping = props.price > 100 ? 0 : 20;

  const date = new Date();

  date.setDate(date.getDate() + 5);
  const dateStart =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  date.setDate(date.getDate() + 10);
  const dateEnd =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  return (
    <Card
      sx={{
        minWidth: "30vw",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <CardHeader title="Your order" />
      <CardContent sx={{ flex: "1 0 auto" }}>
        Order price: <b>EUR</b> {props?.price.toFixed(2)}
        <br />
        Shipping: <b>EUR</b> {shipping}
        <br /> <br />
        <b> Total price: EUR {(props?.price + shipping).toFixed(2)}</b>
        <br /> <br />
        Estimated delivery: {dateStart} - {dateEnd}
        <br />
      </CardContent>
      <Button
        onClick={handleOrderCreate}
        type="submit"
        sx={{ padding: 1, minWidth: "25%", margin: "10px auto" }}
        variant="outlined"
      >
        Confirm order
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have successfully ordered from BAZÁR!
            <br />
            Estimated delivery is from {dateStart} to {dateEnd}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default OrderSummaryCard;
