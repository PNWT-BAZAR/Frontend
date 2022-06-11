import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../api/API";
import { dummyCategories } from "../../sampleItems/dummyCategories";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";

const CategoriesContainer = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await API.get("/inventory/categories");
      const array = [];
      result?.data?.objectsList?.forEach((element) => {
        array.push({ id: element.id, label: element.name });
      });
      setCategories(array);
    };
    fetchCategories();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      {categories?.map((cat) => {
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
