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
      <Box
        sx={{
          height: "80vh",
          width: "20vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DataGrid
          rows={dummyCategories}
          columns={columns}
          autoPageSize={true}
        />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ backgroundColor: COLORS.primaryColor }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Add new category
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              sx={{
                width: "100%",
              }}
            >
              <InputLabel>Category name</InputLabel>
              <OutlinedInput label="Subcategory name" />
            </FormControl>
            <Typography sx={{ marginTop: "20px" }}>
              Select subcategories:
            </Typography>
            {dummySubcategories.map((subcat) => {
              return (
                <FormControlLabel control={<Checkbox />} label={subcat?.name} />
              );
            })}
          </AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              width: "100%",
            }}
          >
            <Button
              sx={{
                display: "flex",
                minWidth: 70,
                margin: "10px 0 0 0",
                color: "black",
              }}
              type="submit"
              variant="text"
            >
              Save
            </Button>
          </Box>
        </Accordion>
      </Box>

      <Box
        sx={{
          height: "80vh",
          width: "20vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DataGrid
          rows={dummySubcategories}
          columns={columns}
          autoPageSize={true}
        />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ backgroundColor: COLORS.primaryColor }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Add new subcategory
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              sx={{
                width: "100%",
              }}
            >
              <InputLabel>Subcategory name</InputLabel>
              <OutlinedInput label="Subcategory name" />
            </FormControl>
          </AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              width: "100%",
            }}
          >
            <Button
              sx={{
                display: "flex",
                minWidth: 70,
                margin: "10px 0 0 0",
                color: "black",
              }}
              type="submit"
              variant="text"
            >
              Save
            </Button>
          </Box>
        </Accordion>
      </Box>
    </Box>
  );
};

export default CategoriesAndSubcategoriesList;
