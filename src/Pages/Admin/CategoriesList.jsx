import * as React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { AdminCategories } from "./AdminCategories/AdminCategories";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Category name", width: 200 },
];

const CategoriesList = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <AdminCategories />
    </Box>
  );
};

export default CategoriesList;
