import { Grid, Box, Typography } from "@mui/material";
import { dummyDashboardCards } from "../../sampleItems/dummyDashboardCards";
import DashboardCard from "./DashboardCard";
import { useState, useEffect } from "react";
import API from "../../api/API";
import CircularProgress from "@mui/material/CircularProgress";


const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  
  const [users, setUsers] = useState();
  const [totalProfit, setTotalProfit] = useState();
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();

  useEffect(() => {
    setLoading(true);

    const fetchAllUsers = async () => {
      const result = await API.get("identity/users", {});
      setUsers(result?.data?.objectsList);
      setLoading(false);
    };
    fetchAllUsers();

    const fetchTotalProfit = async () => {
      const result = await API.get("order/orders/price", {})
      console.log(result?.data);
      setTotalProfit(result?.data);
      setLoading(false);
    };
    fetchTotalProfit();

    const fetchProducts = async () => {
      const result = await API.get("inventory/products", {});
      setProducts(result?.data?.objectsList);
      setLoading(false);
    };
    fetchProducts();

    const fetchOrders = async () => {
      const result = await API.get("order/orders", {});
      console.log(result?.data?.objectsList)
      setOrders(result?.data?.objectsList);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    
      <Grid
        container
        direction="row"
        alignItems={"center"}
        display={"flex"}
        justifyContent="space-evenly"
      >
        {loading && (
          <Box>
          <CircularProgress style={{ margin: "20px" }} />
          <Typography sx={{ fontWeight: "bold", display:"flex", justifyContent:"center", }}>Fetching data, please wait!</Typography>
          </Box>
        )}

          <Box>
            {users && (
            <DashboardCard
              card={{ title: "Total users", value: users.length }}
            ></DashboardCard>
            )}
            
            {totalProfit && (
              <DashboardCard
                card={{ title: "Total profit", value: totalProfit }}
              ></DashboardCard>
            )}


            {products && (
              <DashboardCard
                card={{ title: "Total products", value: products.length }}
              ></DashboardCard>
            )}
            
            {orders && (
              <DashboardCard
                card={{ title: "Total orders", value: orders.length }}
              ></DashboardCard>
            )}
          </Box>
        
      </Grid>
  );
};

export default Dashboard;
