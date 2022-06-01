import { Button, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 35px;
  margin-top: 20px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px 10px 0px;
`;

export const PaginationBar = (props) => {
    const {pageNumber, nextButtonHandler, backButtonHandler} = props;

  return (
    <Container>
      <Button
        sx={{
          backgroundColor: "white !important",
          width: "70px",
          color: "teal",
          fontWeight: "bold",
          marginLeft: "10px",
          marginRight: "10px",
          padding: "2px",
        }}
        onClick={backButtonHandler}
      >
        BACK
      </Button>
      <Typography fontSize={"0.9rem"} fontWeight={"bold"}>{pageNumber}</Typography>
      <Button
        sx={{
          backgroundColor: "white !important",
          width: "70px",
          color: "teal",
          fontWeight: "bold",
          marginLeft: "10px",
          marginRight: "10px",
          padding: "2px",
        }}
        onClick={nextButtonHandler}
      >
        NEXT
      </Button>
    </Container>
  );
};
