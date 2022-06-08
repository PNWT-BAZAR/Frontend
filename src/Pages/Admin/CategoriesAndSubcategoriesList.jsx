import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { COLORS } from "../values/colors";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { dummyCategories } from "../../sampleItems/dummyCategories";
import { dummySubcategories } from "../../sampleItems/dummySubcategories";
import { AdminCategories } from "./AdminCategories/AdminCategories";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Category name", width: 200 },
];

const CategoriesAndSubcategoriesList = () => {
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

export default CategoriesAndSubcategoriesList;
