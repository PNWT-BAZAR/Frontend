import * as React from "react";
import { useState, useEffect } from "react";
import API from "../../api/API";

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { dummySubcategories } from "../../sampleItems/dummySubcategories";
import { dummyCategories } from "../../sampleItems/dummyCategories";
import { dummyProducts } from "../../sampleItems/dummyProducts";

import { ProductCard } from "../Home/ProductCard";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const drawerWidth = 240;

export default function CategoryView() {
  const navigate = useNavigate();
  const categoryId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  const [category, setCategory] = useState();
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await API.get("/inventory/categories/" + categoryId);
      const cat = result?.data?.object;
      setCategory(cat);
    };
    fetchCategories();
  }, []);

  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    const fetchSubcategories = async () => {
      const params = new URLSearchParams([["categoryId", categoryId]]);
      const result = await API.get("inventory/subcategories/search", {
        params,
      });
      setSubcategories(result?.data?.objectsList);
    };
    fetchSubcategories();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ width: "100%", zIndex: 2 }}>
        <Layout />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          zIndex: 1,
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ height: "130px" }} />
        <Typography variant="h4" alignSelf="center" marginTop={5}>
          {category?.name}
        </Typography>
        <Divider />
        <List>
          {subcategories?.map((subcategory) => (
            <ListItem key={subcategory?.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText primary={subcategory?.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div>
        <Toolbar sx={{ height: "130px" }} />
        <Box
          component="main"
          sx={{
            paddingTop: "40px",
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-evenly",
            backgroundImage: "linear-gradient(32deg, #f3f4f7 0%, #eeeeee 90%)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {dummyProducts?.map((prod) => {
            return (
              <ProductCard
                key={prod?.id}
                product={prod}
                onClick={() => navigate(`/product/${prod.id}`)}
              />
            );
          })}
        </Box>
      </div>
    </Box>
  );
}
