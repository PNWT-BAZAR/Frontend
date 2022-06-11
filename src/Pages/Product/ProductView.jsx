import { Box, Grid } from "@mui/material";
import { dummyProducts } from "../../sampleItems/dummyProducts";
import AddToCartCard from "./AddToCartCard";
import ProductDescription from "./ProductDescription";
import ProductImage from "./ProductImage";
import { useState, useEffect } from "react";
import API from "../../api/API";

const ProductView = () => {
  const [product, setProduct] = useState();
  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    const productId = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/")
    );
    const fetchProduct = async () => {
      console.log("PRODUCT ID", productId);
      const result = await API.get("/inventory/products" + productId);
      console.log("RESULT", result);
      const prod = result?.data?.object;
      console.log("PORD", prod);
      setProduct(prod);
    };
    fetchProduct();

    const fetchProductImages = async () => {
      const result1 = await API.get(
        "/inventory/productImages/product" + productId
      );
      const array = [];
      result1?.data?.objectsList?.forEach((element) => {
        array.push({
          id: element.id,
          url: element.url,
        });
      });
      setProductImages(array);
      console.log("PRODUCT IMAGES", productImages);
    };
    fetchProductImages();

    // API.get("/inventory/products" + productId).then((result) => {
    //   setProduct(result?.data?.object);
    //   const result1 = API.get("/inventory/productImages/product" + productId);
    //   const array = [];
    //   result1?.data?.objectsList?.forEach((element) => {
    //     array.push({
    //       id: element.id,
    //       url: element.url,
    //     });
    //   });
    //   setProductImages(array);
    // });
  }, []);

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
      {/* <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <Grid xs={12} sm={4} md={4} sx={{ height: "70vh" }}>
          <ProductImage key={product?.id} image={productImages[0]?.url} />
        </Grid>
        <Grid xs={12} sm={4} md={4} sx={{ height: "70vh" }}>
          <ProductDescription key={product?.id} product={product} />
        </Grid>
        <Grid xs={12} sm={2} md={2} sx={{ height: "50vh" }}>
          <AddToCartCard key={product?.id} product={product} />
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default ProductView;
