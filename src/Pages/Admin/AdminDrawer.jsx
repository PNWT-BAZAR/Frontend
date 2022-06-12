import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  AppBar,
  Typography,
  CssBaseline,
  Button,
} from "@mui/material";

import * as React from "react";
import { COLORS } from "../values/colors";
import StyledLink from "../Layout/StyledLink";
import GridViewIcon from "@mui/icons-material/GridView";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

const AdminDrawer = (props) => {
  const drawerWidth = "20vw";
  const handleLogout = ()=>{
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: COLORS.primaryColor,
        }}
      >
        <Toolbar>
          <Typography variant="h4" noWrap component="div">
            Welcome Admin!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List component="nav">
            <StyledLink to={"/admin/dashboard"}>
              <ListItemButton>
                <ListItemIcon>
                  <GridViewIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  secondary="General information."
                />
              </ListItemButton>
            </StyledLink>

            <StyledLink to={"/admin/products"}>
              <ListItemButton>
                <ListItemIcon>
                  <ClassOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Products"
                  secondary="View and manage products."
                />
              </ListItemButton>
            </StyledLink>

            <StyledLink to={"/admin/orders"}>
              <ListItemButton>
                <ListItemIcon>
                  <LocalShippingOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Orders"
                  secondary="View and manage orders."
                />
              </ListItemButton>
            </StyledLink>

            <StyledLink to={"/admin/categories"}>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Categories"
                  secondary="View and manage categories"
                />
              </ListItemButton>
            </StyledLink>

            <StyledLink to={"/admin/subcategories"}>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Subcategories"
                  secondary="View and manage subcategories"
                />
              </ListItemButton>
            </StyledLink>

            <StyledLink to={"/admin/users"}>
              <ListItemButton>
                <ListItemIcon>
                  <GroupOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Users"
                  secondary="View all registered users."
                />
              </ListItemButton>
            </StyledLink>
          </List>
        </Box>
        <Button
          type="submit"
          variant="text"
          sx={{
            padding: 2,
            margin: "20px",
            backgroundColor: COLORS.primaryColor,
            color: "black",
            position: "absolute",
            bottom: 0,
          }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.content}
      </Box>
    </Box>
  );
};

export default AdminDrawer;
