import { Box } from "@mui/material";
import React from "react";
import { dummyProducts } from "../../sampleItems/dummyProducts";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/API";

const BestProductsContainer = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await API.get("/inventory/products");
      const array = [];
      result?.data?.objectsList?.forEach((element) => {
        if (element.totalReviews != 0) {
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
        }
      });
      setProducts(array);
    };
    fetchProducts();
  }, []);

  const prodDescending = [...products].sort(
    (a, b) => b.reviewSum / b.totalReviews - a.reviewSum / a.totalReviews
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-evenly",
        margin: "50px 0px 0px 0px",
      }}
    >
      {prodDescending?.slice(0, 7).map((prod) => {
        return (
          <ProductCard
            key={prod?.id}
            product={prod}
            onClick={() => navigate(`/product/${prod.id}`)}
          />
        );
      })}
    </Box>
  );
};

export default BestProductsContainer;
