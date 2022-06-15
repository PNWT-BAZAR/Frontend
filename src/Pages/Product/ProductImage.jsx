import { Paper, CardMedia } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";

const ProductImage = (props) => {
  const productImg = props.image;

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
      elevation={5}
    >
      <CardMedia
        sx={{
          flex: 1,
          resizeMode: "contain",
        }}
        component="img"
        image={productImg}
        alt="Product image unavailable!"
      ></CardMedia>
    </Paper>
  );
};

export default ProductImage;
