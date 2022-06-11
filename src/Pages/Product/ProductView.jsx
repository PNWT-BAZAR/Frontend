import { Box, Grid } from "@mui/material";
import { dummyProducts } from "../../sampleItems/dummyProducts";
import AddToCartCard from "./AddToCartCard";
import ProductDescription from "./ProductDescription";
import ProductImage from "./ProductImage";
import { useState, useEffect } from "react";
import API from "../../api/API";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProductView = () => {
  const [product, setProduct] = useState();
  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    const productId = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/")
    );
    const fetchProduct = async () => {
      const result = await API.get("/inventory/products" + productId);
      const prod = result?.data?.object;
      setProduct(prod);
    };

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
    };

    fetchProduct();
    fetchProductImages();
  }, []);

  const [imgIndex, setImgIndex] = useState(0);

  const handleClick = () => {
    if (imgIndex === productImages.length - 1) {
      setImgIndex(0);
    } else {
      setImgIndex(imgIndex + 1);
    }
  };

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
      {product && productImages && (
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Grid
            item
            sx={{
              height: "70vh",
              width: "600px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ProductImage
              key={productImages[imgIndex]?.id}
              image={productImages[imgIndex]?.url}
            />
            <ArrowForwardIosIcon
              sx={{ cursor: "pointer", height: "50px", width: "50px" }}
              onClick={handleClick}
            />
          </Grid>
          <Grid item sx={{ height: "70vh", width: "550px" }}>
            <ProductDescription key={product?.id} product={product} />
          </Grid>
          <Grid item sx={{ height: "50vh", width: "350px" }}>
            <AddToCartCard key={product?.id} product={product} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProductView;
