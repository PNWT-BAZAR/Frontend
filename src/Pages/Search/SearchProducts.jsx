import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import API from "../../api/API";
import { ProductCard } from "../Home/ProductCard";
import { useNavigate } from "react-router-dom";

const SearchProducts = (props) => {
  const navigate = useNavigate();
  //   const searchInput = props?.searchInput;
  const searchInput = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      const result = await API.get(
        `/inventory/products/search?searchInput=${searchInput}`
      );
      const array = [];
      result?.data?.objectsList?.forEach((element) => {
        array.push({
          id: element.id,
          name: element.name,
          description: element.description,
          quantity: element.quantity,
          price: element.price,
          category: element.category,
          subcategory: element.subcategory,
          reviewSum: element.reviewSum,
          totalReviews: element.totalReviews,
        });
      });
      setProducts(array);
    };
    fetchSearchedProducts();
  }, [searchInput]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: "linear-gradient(32deg, #f3f4f7 0%, #eeeeee 90%)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          padding: "40px 0px 20px 0px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {products?.length} results for: " <i>{searchInput}</i>"
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "space-evenly",
          margin: "50px 0px 0px 0px",
        }}
      >
        {products?.map((prod) => {
          return (
            <ProductCard
              key={prod?.id}
              product={prod}
              onClick={() => navigate(`/product/${prod.id}`)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default SearchProducts;
