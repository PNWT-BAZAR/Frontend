import { Box, Grid } from "@mui/material";
import { dummyProducts } from "../../sampleItems/dummyProducts";
import AddToCartCard from "./AddToCartCard";
import ProductDescription from "./ProductDescription";
import ProductImage from "./ProductImage";

const ProductView = () => {
  const productId =
    window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    ) - 1;
  const product = dummyProducts[productId];

  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(32deg, #f3f4f7 0%, #eeeeee 90%)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <Grid xs={12} sm={4} md={4} sx={{ height: "70vh" }}>
          return <ProductImage key={product?.id} image={product?.url} />;
        </Grid>
        <Grid xs={12} sm={4} md={4} sx={{ height: "70vh" }}>
          return <ProductDescription key={product?.id} product={product} />;
        </Grid>
        <Grid xs={12} sm={2} md={2} sx={{ height: "50vh" }}>
          return <AddToCartCard key={product?.id} product={product} />;
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductView;
