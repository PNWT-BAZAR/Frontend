import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { dummyOrders } from "../../sampleItems/dummyOrders";
import StyledLink from "../Layout/StyledLink";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "user", headerName: "User", width: 150 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "totalPrice", headerName: "Total price", width: 150 },
  { field: "orderStatus", headerName: "Status", width: 150 },
];

const ProductsList = () => {
  return (
    <Box>
      <Box style={{ height: "70vh", width: "100%" }}>
        <DataGrid rows={dummyOrders} columns={columns} autoPageSize={true} />
      </Box>
    </Box>
  );
};

export default ProductsList;
