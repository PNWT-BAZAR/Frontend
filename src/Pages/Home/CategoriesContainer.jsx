import { Box } from "@mui/material";
import React from "react";
import { dummyCategories } from "../../sampleItems/dummyCategories";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";

const CategoriesContainer = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      {dummyCategories?.map((cat) => {
        return (
          <CategoryCard
            key={cat?.id}
            category={cat}
            onClick={() => navigate(`/category/${cat.id}`)}
          />
        );
      })}
    </Box>
  );
};

export default CategoriesContainer;
