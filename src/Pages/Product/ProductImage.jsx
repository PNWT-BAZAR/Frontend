import { Paper, CardMedia, Card } from "@mui/material";

const ProductImage = (props) => {
  const productImg = props.image;
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
      elevation={1}
    >
      <img src={productImg}></img>
    </Paper>
  );
};

export default ProductImage;
