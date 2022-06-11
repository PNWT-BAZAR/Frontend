import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/API";


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

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await API.get("order/orders", {});
      setOrders(result?.data?.objectsList);
      console.log("orderi", orders);
    };
    fetchOrders();
  }, []);

  const handleRowClick = (param, event) => {
    navigate(`/admin/orders/${param.id}`, {state: {id: param.id, order: param.row}});
  };

  return (
    <Box>
      <Box style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={orders}
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
