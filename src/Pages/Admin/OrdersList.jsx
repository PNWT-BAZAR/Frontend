import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/API";


import { dummyOrders } from "../../sampleItems/dummyOrders";



const OrdersList = () => {
  let navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderPrices, setOrderPrices] = useState([]);

  // const calculateTotalPrices = () => {
  //   console.log("unisao" +)
  //   let totalPricesForOrders = []
  //   for (let i = 0; i < orderItems.length; i++){
  //     let currentOrder = orderItems[i].order;
  //     console.log("Current order");
  //     console.log(currentOrder);
  //     if(orders.includes(currentOrder)){
  //       console.log("ima current order u orderima");
  //       totalPricesForOrders[orders.indexOf(currentOrder)] = totalPricesForOrders[orders.indexOf(currentOrder)] + (orderItems[i].product.price * orderItems[i].quantity);
  //     }
  //   }
  //   console.log(totalPricesForOrders);
  // }

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await API.get("order/orders", {});
      setOrders(result?.data?.objectsList);
      console.log("orderi", result?.data?.objectsList);
    };
    fetchOrders();

    const fetchOrderItems = async () => {
      const result = await API.get("order/orderItems", {});
      setOrderItems(result?.data?.objectsList);
      console.log("orderItemsi", result?.data?.objectsList);
    };
    fetchOrderItems();

    // calculateTotalPrices();
  }, []);

  function getUser(orders) {
    let { user } = orders?.row;
    return user?.firstName + " " + user?.lastName;
  }
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "user", headerName: "User", width: 150, valueGetter: getUser },
    { field: "createdAt", headerName: "Created At", width: 200 },
    { field: "orderStatus", headerName: "Status", width: 150 },
  ];

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
