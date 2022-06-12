import { Paper, Typography, Box, IconButton, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddToCartCard = (props) => {
  const product = props.product;
  const [quantity, setQuantity] = useState(0);
  const [shipping, setShipping] = useState(20);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (quantity > 0 && quantity * product.price > 100) {
      setShipping(0);
    } else {
      setShipping(20);
    }
    if (quantity > 0) {
      setTotalPrice((quantity * product.price + shipping).toFixed(2));
    } else if (quantity === 0) {
      setTotalPrice(0);
    }
  }, [quantity, shipping]);

  const date = new Date();

  date.setDate(date.getDate() + 5);
  const dateStart =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  date.setDate(date.getDate() + 10);
  const dateEnd =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  const handleSubmit = () => {};

  return (
    <Paper
      elevation={5}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Order now!</Typography>

      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body">Quantity:</Typography>
        <IconButton
          aria-label="minus"
          onClick={(e) => setQuantity(quantity === 0 ? 0 : quantity - 1)}
        >
          <RemoveCircleOutlineOutlinedIcon />
        </IconButton>
        {quantity}
        <IconButton
          aria-label="plus"
          onClick={(e) =>
            setQuantity(product.quantity === quantity ? quantity : quantity + 1)
          }
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </Box>
      <Typography variant="body">Shipping: {shipping} EUR</Typography>

      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body">Total price:</Typography>
        <Typography variant="h6">{totalPrice} EUR</Typography>
      </Box>

      <Box sx={{ width: "80%", textAlign: "center" }}>
        <Typography variant="subtitle1">Estimated delivery:</Typography>
        <Typography variant="h6">
          {dateStart} - {dateEnd}
        </Typography>
      </Box>
      <Box sx={{ width: "80%", textAlign: "center" }}>
        <Typography variant="subtitle2">
          Free shipping on orders over 100 EUR!
        </Typography>
      </Box>
      <Button
        type="submit"
        sx={{
          padding: 2,
          minWidth: "20%",
          color: "black",
        }}
        variant="text"
        onClick={handleSubmit}
      >
        Add To Cart
      </Button>
    </Paper>
  );
};

export default AddToCartCard;
