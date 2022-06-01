import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { dummyOrders } from "../../sampleItems/dummyOrders";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "user", headerName: "User", width: 150 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "totalPrice", headerName: "Total price", width: 150 },
  { field: "orderStatus", headerName: "Status", width: 150 },
];

const OrdersList = () => {
  let navigate = useNavigate();

  const handleRowClick = (param, event) => {
    console.log(param.id);
    navigate(`/admin/orders/${param.id}`);
  };

  return (
    <Box>
      <Box style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={dummyOrders}
          columns={columns}
          autoPageSize={true}
          rowSelection={"single"}
          onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
};

export default OrdersList;
