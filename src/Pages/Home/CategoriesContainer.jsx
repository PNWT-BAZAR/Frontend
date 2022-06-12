import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../api/API";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";
import StyledLink from "../Layout/StyledLink";

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
      {categories?.map((category) => {
        return (
          <StyledLink
            to={{
              pathname: `/category`,
              search: "?categoryId=" + category?.id,
            }}
          >
            <CategoryCard key={category?.id} category={category} />
          </StyledLink>
        );
      })}
    </Box>
  );
};

export default CategoriesContainer;
