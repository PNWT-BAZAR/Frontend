import { Card } from "@mui/material";
import React from "react";
import { COLORS } from "../values/colors";
import styled from "styled-components";

const CategoryCard = (props) => {
  const { category, onClick } = props;

  const Category = styled.h6`
    text-weight: bold;
    display: inline;
    background-color: ${COLORS.secondaryColor};
    font-size: 35px;
    cursor: pointer;
    &:hover {
      background-color: ${COLORS.primaryColor};
      color: white;
    }
  `;

  return (
    <Category>
      <Card
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
          width: "250px",
          margin: "20px",
          backgroundSize: "contain",
          backgroundImage: `url(https://www.primermagazine.com/wp-content/uploads/2019/01/instagram-interior_3.jpg)`,
        }}
        elevation={5}
      >
        {category?.label}
      </Card>
    </Category>
  );
};

export default CategoryCard;
