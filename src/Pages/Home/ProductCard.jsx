import { Box, Card, Typography, CardMedia } from "@mui/material";
import React from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import styled from "styled-components";

const Wrapper = styled.div`
  &:hover {
    opacity: 0.8;
  }
`;

export const ProductCard = (props) => {
  const { product, onClick } = props;
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
            image={product?.url}
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
              <Typography>{product?.reviewScore}</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Wrapper>
  );
};
