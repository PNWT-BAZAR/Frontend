import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { dummyCategories } from "../../sampleItems/dummyCategories";
import { dummySubcategories } from "../../sampleItems/dummySubcategories";
import { dummyProducts } from "../../sampleItems/dummyProducts";

import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EuroIcon from "@mui/icons-material/Euro";

const AddProduct = (props) => {
  const navigate = useNavigate();

  const productId =
    window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    ) - 1;
  const product = dummyProducts[productId];

  const [name, setName] = useState(product?.name);
  const [category, setCategory] = useState(product?.category);
  const [subcategory, setSubcategory] = useState(product?.subcategory);
  const [quantity, setQuantity] = useState(product?.quantity);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log({ name, description, quantity, price, category, subcategory });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <FormControl
        sx={{
          m: 1,
          width: { xs: "50ch", sm: "102ch" },
          marginTop: 15,
        }}
      >
        <InputLabel>Product name</InputLabel>
        <OutlinedInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <ChairOutlinedIcon />
            </InputAdornment>
          }
          label="Product name"
        />
      </FormControl>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1, width: "50ch" }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            startAdornment={
              <InputAdornment position="start">
                <CategoryOutlinedIcon />
              </InputAdornment>
            }
          >
            {dummyCategories.map((category) => {
              return <MenuItem value={category.name}>{category.name}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: "50ch" }}>
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            label="Subategory"
            startAdornment={
              <InputAdornment position="start">
                <CategoryOutlinedIcon />
              </InputAdornment>
            }
          >
            {dummySubcategories.map((subcategory) => {
              return (
                <MenuItem value={subcategory.name}>{subcategory.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value < 0 ? 0 : e.target.value)}
          sx={{ m: 1, width: "50ch" }}
          label="In stock"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Inventory2OutlinedIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>

        <TextField
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value < 0 ? 0 : e.target.value)}
          sx={{ m: 1, width: "50ch" }}
          label="Price"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EuroIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Box>

      <label
        htmlFor="file-upload"
        style={{
          width: "200px",
          height: "57px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          justifyContent: "center",
          color: "gray",
          border: "1px solid lightgray",
          borderWidth: "thin",
          borderRadius: "5px",
        }}
      >
        Add Images
      </label>

      <input
        style={{ display: "none" }}
        type="file"
        name="productImages"
        id="file-upload"
        multiple
        onChange={(event) => {
          //   setImagesFiles((oldArray) => [...oldArray, ...event.target.files]);
          console.log("Uploaded image!", event.target.value);
        }}
      />

      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
          marginTop: 2,
          width: { xs: "50ch", sm: "102ch" },
        }}
        id="outlined-multiline-static"
        label="Product description"
        multiline
        rows={4}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Product review score"
        defaultValue={product?.reviewScore || "No reviews yet!"}
        InputProps={{
          readOnly: true,
        }}
        sx={{
          marginTop: 2,
          width: { xs: "25ch", sm: "25ch" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          width: { xs: "33ch", sm: "103ch" },
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            width: 70,
            margin: "10px 10px 0 0",
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleClickOpen}
          sx={{
            display: "flex",
            width: 70,
            margin: "10px 0 0 0",
          }}
          type="submit"
          variant="outlined"
        >
          Save
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Product successfully saved!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AddProduct;
