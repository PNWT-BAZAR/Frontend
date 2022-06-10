import * as React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { dummyCategories } from "../../sampleItems/dummyCategories";
import { dummySubcategories } from "../../sampleItems/dummySubcategories";
import { dummyProducts } from "../../sampleItems/dummyProducts";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import API from "../../api/API";
import FormInputField from "../../shared/controls/FormInput/FormInputField";
import FormSelect from "../../shared/controls/FormSelect/FormSelectField";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

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
import { Category, ReviewsOutlined } from "@mui/icons-material";

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup .number().typeError("Price must be a number")
  .positive("Positive number required")
              .required("Please provide a price.")
              .min(1, "Price must be greater than 0")
              .max(99999, "Too expensive!"),
  description: yup.string().required("Product description is required"),
  quantity: yup.number().typeError("Quantity must be a number")
  .positive("Positive number required")
  .required("Please provide a quantity.")
  .min(1, "Quantity must be greater than 0")
  .max(99999, "Too much!"),
  review: yup.number("Review must be a number")
});

const AddProduct = (props) => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      quantity: 0
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitHandler = async (data) => {
    //create product
    data.totalReviews = 0;
    data.reviewSum = 0;
    const result = await API.post("/inventory/products", data);
    localStorage.setItem("access_token", result?.headers?.authorization);
    handleClickOpen();
  };

  const productId =
    window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    ) - 1;
  const product = dummyProducts[productId];

  const [filteredData, setFilteredData] = useState();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState(product?.category);


  //const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    console.log(category);
    const fetchCategories = async () => {
      const result = await API.get("/inventory/categories");
      const array = [];
      result?.data?.objectsList?.forEach((element) => {
        array.push({ id: element.id, label: element.name });
      });
      setCategories(array);
    };
    fetchCategories();
  }, []);

  useEffect(()=>{
    const fetchSubcategoriesByCategory = async (searchParams) => {
      console.log(category);
      var params = new URLSearchParams([
        ["searchInput", searchParams?.name ?? ""],
        ["categoryId", searchParams?.categoryId],
      ]);
      const result = await API.get("inventory/subcategories/search", { params });
      const array = [];
      result?.data?.objectsList?.forEach((element) => {
        array.push({ id: element.id, label: element.name });
      });
      console.log(" stae result", result);
      setSubcategories(array);
    };
    fetchSubcategoriesByCategory({"categoryId": category?.id})
  }, [category])

  
  const [name, setName] = useState(product?.name);
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => submitHandler(data))}>
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
          <FormInputField
            name="name"
            label="Name"
            errorobj={errors}
            style={{
              width: "300px",
              marginRight: "20px",
              marginBottom: "20px",
              color: "black",
              backgroundColor: "transparent",
            }}
            InputProps={{
              startAdornment: (
                <ChairOutlinedIcon
                  sx={{ margin: "0px 10px 0px 0px" }}
                />
              ),
            }}
          />
          <Box
            sx={{display: "flex"}}
          >
            <FormSelect
              name="category"
              label="Category"
              errorobj={errors}
              options={categories}
              style={{
                width: "300px",
                marginRight: "20px",
                marginBottom: "20px",
                color: "black",
                backgroundColor: "transparent",
              }}
              SelectProps={{
                startAdornment: (
                  <CategoryOutlinedIcon
                    sx={{ margin: "0px 10px 0px 0px" }}
                  />
                ),
              }}
            />
          </Box>

          <Box
            sx={{display: "flex"}}
          >
            <FormSelect
              name="subcategory"
              label="Subcategory"
              errorobj={errors}
              options={subcategories}
              style={{
                width: "300px",
                marginRight: "20px",
                marginBottom: "20px",
                color: "black",
                backgroundColor: "transparent",
                startAdornment: (
                  <CategoryOutlinedIcon
                    sx={{ margin: "0px 10px 0px 0px" }}
                  />
                ),
              }}
                
            />
          </Box>

          <FormInputField
            name="quantity"
            label="Quantity"
            errorobj={errors}
            style={{
              width: "300px",
              marginRight: "20px",
              marginBottom: "20px",
              color: "black",
              backgroundColor: "transparent",
            }}
            InputProps={{
              startAdornment: (
                <Inventory2OutlinedIcon
                  sx={{ margin: "0px 10px 0px 0px" }}
                />
              ),
            }}
          />

          <FormInputField
            name="price"
            label="Price"
            errorobj={errors}
            style={{
              width: "300px",
              marginRight: "20px",
              marginBottom: "20px",
              color: "black",
              backgroundColor: "transparent",
            }}
            InputProps={{
              startAdornment: (
                <EuroIcon
                  sx={{ margin: "0px 10px 0px 0px" }}
                />
              ),
            }}
          />

          {/* <label
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
          /> */}

          <FormInputField
            name="description"
            label="Description"
            errorobj={errors}
            style={{
              width: "300px",
              marginRight: "20px",
              marginBottom: "20px",
              color: "black",
              backgroundColor: "transparent",
            }}
            InputProps={{
              startAdornment: (
                <DescriptionOutlinedIcon
                  sx={{ margin: "0px 10px 0px 0px" }}
                />
              ),
            }}
          />

          <FormInputField
            name="review"
            label="Review"
            errorobj={errors}
            style={{
              width: "300px",
              marginRight: "20px",
              marginBottom: "20px",
              color: "black",
              backgroundColor: "transparent",
            }}
            InputProps={{
              startAdornment: (
                <ReviewsOutlined
                  sx={{ margin: "0px 10px 0px 0px" }}
                />
              ),
              readOnly: true
            }}
          />
          <Box
            sx={{display:"flex"}}
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
              onClick={handleSubmit((data) => submitHandler(data))}
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
          </Box>

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
      </form>
    </FormProvider>
  );
};

export default AddProduct;
