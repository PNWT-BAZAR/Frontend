import {
  Card,
  Typography,
  IconButton,
  CardHeader,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const CartProductCard = (props) => {
  const { product, onQuantityChanged } = props;
  //const [quantity, setQuantity] = useState(product.quantity);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (product.quantity > 0) {
      setTotalPrice((product.quantity * product.price).toFixed(2));
    } else if (product.quantity === 0) {
      setTotalPrice(0);
    }
  }, [product.quantity]);

  return (
    <Card
      sx={{
        maxWidth: "40vw",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="delete">
            <DeleteOutlinedIcon />
          </IconButton>
        }
        title={props.product.name}
      />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardMedia
          sx={{
            maxWidth: "10vw",
            flex: 1,
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
          component="img"
          image={product?.url}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            Price: <b>EUR</b> {totalPrice}
            <br />
            Quantity:
            <IconButton
              aria-label="minus"
              onClick={(e) => onQuantityChanged(product.quantity === 0 ? 0 : product.quantity - 1, product.id)}
            >
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
            {product.quantity}
            <IconButton
              aria-label="plus"
              onClick={(e) => onQuantityChanged(product.quantity + 1, product.id)}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
            <br />
            <Typography variant="caption">
              {product?.description.substring(
                0,
                (2 * product?.description.length) / 3
              ) + "..."}
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};

export default CartProductCard;
