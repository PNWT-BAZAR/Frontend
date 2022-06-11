import { Box, Card, Typography, CardMedia } from "@mui/material";
import React from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import styled from "styled-components";
import { useState, useEffect } from "react";
import API from "../../api/API";

const Wrapper = styled.div`
  &:hover {
    opacity: 0.8;
  }
`;

export const ProductCard = (props) => {
  const { product, onClick } = props;

  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    const fetchProductImages = async () => {
      const result = await API.get(
        "/inventory/productImages/product/" + product?.id
      );
      const array = [];
      result?.data?.objectsList?.forEach((element) => {
        array.push({
          id: element.id,
          url: element.url,
        });
      });
      setProductImages(array);
    };
    fetchProductImages();
  }, []);

  return (
    <Wrapper>
      <Card
        onClick={onClick}
        sx={{
          width: "230px",
          height: "360px",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          margin: "0px 10px 30px 10px",
        }}
      >
        <Box>
          <CardMedia
            sx={{
              maxWidth: "230px",
              flex: 1,
              resizeMode: "contain",
            }}
            component="img"
            image={productImages[0]?.url}
          />
          <Box
            sx={{
              display: "flex",
              height: "40%",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{product?.name}</Typography>
            <Typography sx={{}}>EUR{" " + product?.price}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StarOutlinedIcon />
              <Typography>
                {product?.totalReviews === 0
                  ? "No reviews yet!"
                  : (product?.reviewSum / product?.totalReviews).toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Wrapper>
  );
};
