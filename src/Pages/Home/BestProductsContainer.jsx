import { Box } from "@mui/material";
import React from "react";
import { dummyProducts } from "../../sampleItems/dummyProducts";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";

const BestProductsContainer = () => {
  const navigate = useNavigate();
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
      {dummyProducts?.map((prod) => {
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
