import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { dummyProducts } from "../../sampleItems/dummyProducts.js";
import StyledLink from "../Layout/StyledLink";
import { COLORS } from "../values/colors";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "quantity", headerName: "In stock", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
  { field: "reviewScore", headerName: "Review score", width: 150 },
];

const ProductsList = () => {
  let navigate = useNavigate();

  const handleRowClick = (param, event) => {
    console.log(param.id);
    navigate(`/admin/products/${param.id}`);
  };

  return (
    <Box>
      <Box style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={dummyProducts}
          columns={columns}
          autoPageSize={true}
          rowSelection={"single"}
          // onRowClick={(rowInfo) => {
          //   console.log(rowInfo);
          // }}
          onRowClick={handleRowClick}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          width: "100%",
        }}
      >
        <StyledLink to={"/admin/products/addproduct"}>
          <Button
            sx={{
              display: "flex",
              minWidth: 70,
              margin: "10px 0 0 0",
              backgroundColor: COLORS.primaryColor,
              color: "black",
            }}
            type="submit"
            variant="text"
          >
            Add New Product
          </Button>
        </StyledLink>
      </Box>
    </Box>
  );
};

export default ProductsList;
