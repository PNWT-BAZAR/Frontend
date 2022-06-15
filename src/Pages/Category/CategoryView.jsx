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

import { ProductCard } from "../Home/ProductCard";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import StyledLink from "../Layout/StyledLink";

const drawerWidth = "15vw";

export default function CategoryView(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get("categoryId");
  const subcategoryId = searchParams.get("subcategoryId");
  const [category, setCategory] = useState();
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const result = await API.get("/inventory/categories/" + categoryId);
      const cat = result?.data?.object;
      setCategory(cat);
    };
    const fetchSubcategories = async () => {
      const params = new URLSearchParams([["categoryId", categoryId]]);
      const result1 = await API.get("inventory/subcategories/search", {
        params,
      });
      setSubcategories(result1?.data?.objectsList);
    };
    const fetchProducts = async () => {
      const params = new URLSearchParams([
        ["subcategoryId", subcategoryId],
        ["categoryId", categoryId],
      ]);
      const result2 = await API.get("inventory/products/search", {
        params,
      });
      setProducts(result2?.data?.objectsList);
      console.log("PRODUCTS", result2);
    };
    fetchCategory();
    fetchSubcategories();
    fetchProducts();
  }, [subcategoryId, categoryId, searchParams]);

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
        <Typography
          sx={{ cursor: "pointer" }}
          variant="h4"
          alignSelf="center"
          marginTop={5}
        >
          <StyledLink
            to={{
              pathname: `/category`,
              search: "?categoryId=" + categoryId,
            }}
          >
            {category?.name}
          </StyledLink>
        </Typography>
        <Divider />
        <List>
          {subcategories?.map((subcategory) => (
            <StyledLink
              to={{
                pathname: `/category`,
                search:
                  "?categoryId=" +
                  categoryId +
                  "&subcategoryId=" +
                  subcategory?.id,
              }}
            >
              <ListItem key={subcategory?.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary={subcategory?.name} />
                </ListItemButton>
              </ListItem>
            </StyledLink>
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
            width: "85vw",
            height: "100vh",
            justifyContent: "space-evenly",
            backgroundImage: "linear-gradient(32deg, #f3f4f7 0%, #eeeeee 90%)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {products?.map((prod) => {
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
