import { Grid } from "@mui/material";
import { dummyDashboardCards } from "../../sampleItems/dummyDashboardCards";
import DashboardCard from "./DashboardCard";
import { useState, useEffect } from "react";
import API from "../../api/API";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalProfit, setTotalProfit] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const result = await API.get("identity/users", {});
      setUsers(result?.data?.objectsList);
    };
    fetchAllUsers();

    // const fetchTotalProfit = async () => {
    //   const result = await API.get("order", {});
    //   setTotalProfit(result?.data?.objectsList);
    // };
    // fetchTotalProfit();

    const fetchProducts = async () => {
      const result = await API.get("inventory/products", {});
      setProducts(result?.data?.objectsList);
    };
    fetchProducts();

    // const fetchOrders = async () => {
    //   const result = await API.get("order", {});
    //   setOrders(result?.data?.objectsList);
    // };
    // fetchOrders();
  }, []);

  return (
    <Grid
      container
      direction="row"
      alignItems={"center"}
      display={"flex"}
      justifyContent="space-evenly"
    >
      <DashboardCard
        card={{ title: "Total users", value: users.length }}
      ></DashboardCard>
      {/* <DashboardCard
        card={{ title: "Total profit", value: totalProfit }}
      ></DashboardCard> */}
      <DashboardCard
        card={{ title: "Total products", value: products.length }}
      ></DashboardCard>
      {/* <DashboardCard
        card={{ title: "Total orders", value: orders.length }}
      ></DashboardCard> */}
    </Grid>
  );
};

export default Dashboard;
