import { Box, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../values/colors";
import BestProductsContainer from "./BestProductsContainer";
import CategoriesContainer from "./CategoriesContainer";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundImage: "linear-gradient(32deg, #f3f4f7 0%, #eeeeee 90%)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <CategoriesContainer />
      <hr style={{ color: "white", width: "99%" }}></hr>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          TOP PICKS
        </Typography>
      </Box>
      <BestProductsContainer />
    </Box>
  );
};

export default Home;
