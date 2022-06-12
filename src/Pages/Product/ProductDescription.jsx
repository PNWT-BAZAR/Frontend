import { Paper, Typography, Box } from "@mui/material";
import { COLORS } from "../values/colors";

const ProductDescription = (props) => {
  const product = props.product;
  const review =
    product?.totalReviews === 0
      ? "No reviews yet!"
      : String(
          "Customer review: " +
            (product?.reviewSum / product?.totalReviews).toFixed(1) +
            "/5!"
        );

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
      <Box sx={{ width: "80%" }}>
        <Typography variant="h5">Product:</Typography>
        <Typography
          variant="h3"
          sx={{ backgroundColor: COLORS.secondaryColor }}
        >
          {product.name}
        </Typography>
        <Typography variant="caption">Product id: {product.id}</Typography>
      </Box>

      <Box sx={{ width: "80%" }}>
        <Typography variant="body">
          <i> {product.description} </i>
        </Typography>
      </Box>

      <Box sx={{ width: "80%" }}>
        <Typography variant="h5">
          Price: {product.price} <b>EUR</b>
        </Typography>
        <Typography variant="subtitle1">
          Available items: {product.quantity}
        </Typography>
      </Box>
      <Box sx={{ width: "80%" }}>
        <Typography variant="h6">{review}</Typography>
      </Box>
    </Paper>
  );
};

export default ProductDescription;
