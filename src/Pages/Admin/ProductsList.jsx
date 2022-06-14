import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import StyledLink from "../Layout/StyledLink";
import { COLORS } from "../values/colors";
import { useState, useEffect } from "react";
import API from "../../api/API";

const ProductsList = () => {
  const [loading, setLoading] = useState();
  let navigate = useNavigate();

  function getCategory(products) {
    return `${products?.row?.category?.name}`;
  }

  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const result = await API.get("inventory/products", {});
      setProducts(result?.data?.objectsList);
      console.log("proiyvodi", products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 350 },
    { field: "quantity", headerName: "In stock", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      valueGetter: getCategory,
    },
  ];

  const handleRowClick = (param, event) => {
    navigate(`/admin/products/${param.id}`, {state: {id: param.id, product: param.row}});
  };

  return (
    <Box>
      <Box
        style={{
          height: "70vh",
          width: "100%",
        }}
      >
        <DataGrid
          rows={products}
          columns={columns}
          autoPageSize={true}
          rowSelection={"single"}
          onRowClick={handleRowClick}
          loading={loading}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          width: "100%",
        }}
      >
        <StyledLink to={"/admin/products/addproduct"}>
          <Button
            sx={{
              display: "flex",
              minWidth: 70,
              margin: "10px 0 0 0",
              backgroundColor: COLORS.primaryColor,
              color: "black",
            }}
            type="submit"
            variant="text"
          >
            Add New Product
          </Button>
        </StyledLink>
      </Box>
    </Box>
  );
};

export default ProductsList;
