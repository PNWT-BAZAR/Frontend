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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useLocation } from "react-router-dom";

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
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Positive number required")
    .required("Please provide a price.")
    .min(1, "Price must be greater than 0")
    .max(99999, "Too expensive!"),
  description: yup.string().required("Product description is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Positive number required")
    .required("Please provide a quantity.")
    .min(1, "Quantity must be greater than 0")
    .max(99999, "Too much!"),

  category: yup.string().required("Category is required!"),
  subcategory: yup.string().required("Subcategory is required!"),
});

const AddProduct = (props) => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const product = state?.product;

  const [filteredData, setFilteredData] = useState();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState();

  const [isUpdate, setIsUpdate] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
      description: product?.description ?? "",
      quantity: product?.quantity ?? 0,
      category: product?.category?.categoryId,
      subcategory: product?.subcategory?.subcategoryId,
      review:
        product?.totalReviews > 0
          ? (product?.reviewSum / product?.totalReviews).toFixed(1)
          : "",
      totalReviews: product?.totalReviews ?? 0,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitHandler = async (data) => {
    data.category = {
      id: data.category,
    };
    data.subcategory = {
      id: data.subcategory,
    };

    //update product
    if (product !== undefined) {
      setIsUpdate(true);
      data.id = product.id;
      await API.put("/inventory/products", data);
      handleClickOpen();
      console.log("UPDATING");
      console.log(data);
      return;
    }

    //create product
    data.totalReviews = 0;
    data.reviewSum = 0;
    const result = await API.post("/inventory/products", data)
      .then((result) => {
        console.log(result?.status);
        console.log(result);
        if (result?.status === 200) {
          console.log("test");
          // setIsProductCreated(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(isProductCreated);
    handleClickOpen();
  };

  const productId = window.location.pathname.split("/").at(-1);

  console.log("Product id is " + productId);

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

  useEffect(() => {
    const fetchSubcategoriesByCategory = async (searchParams) => {
      console.log(category);
      var params = new URLSearchParams([
        ["searchInput", searchParams?.name ?? ""],
        ["categoryId", searchParams?.categoryId],
      ]);
      const result = await API.get("inventory/subcategories/search", {
        params,
      });
      const array = [];
      result?.data?.objectsList?.forEach((element) => {
        array.push({ id: element.id, label: element.name });
      });
      console.log(" stae result", result);
      setSubcategories(array);
    };
    fetchSubcategoriesByCategory({ categoryId: category?.id });
  }, [category]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleDelete = () => {
    console.log("DELETING" + product.id);
    setIsUpdate(false);
    const result = API.delete("/inventory/products/" + product?.id).then(() => {
      handleClickOpen();
    });
    console.log(result);
    //handleClickOpen();
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
              marginTop: "30px",
              color: "black",
              backgroundColor: "transparent",
            }}
            InputProps={{
              startAdornment: (
                <ChairOutlinedIcon sx={{ margin: "0px 10px 0px 0px" }} />
              ),
            }}
          />
          <Box sx={{ display: "flex" }}>
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
              startAdornment={
                <InputAdornment position="start">
                  <CategoryOutlinedIcon />
                </InputAdornment>
              }
            />
          </Box>

          <Box sx={{ display: "flex" }}>
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
              }}
              startAdornment={
                <InputAdornment position="start">
                  <CategoryOutlinedIcon />
                </InputAdornment>
              }
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
                <Inventory2OutlinedIcon sx={{ margin: "0px 10px 0px 0px" }} />
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
              startAdornment: <EuroIcon sx={{ margin: "0px 10px 0px 0px" }} />,
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
                <DescriptionOutlinedIcon sx={{ margin: "0px 10px 0px 0px" }} />
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
                <ReviewsOutlined sx={{ margin: "0px 10px 0px 0px" }} />
              ),
              readOnly: true,
            }}
          />

          <FormInputField
            name="totalReviews"
            label="Total number of reviews"
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
                <ReviewsOutlined sx={{ margin: "0px 10px 0px 0px" }} />
              ),
              readOnly: true,
            }}
          />
          <Box sx={{ display: "flex" }}>
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

            {product && (
              <Button
                onClick={handleDelete}
                sx={{
                  display: "flex",
                  width: 70,
                  margin: "10px 10px 0 0",
                }}
                variant="outlined"
              >
                Delete
              </Button>
            )}

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
                {product?.id === undefined
                  ? "Product successfully added"
                  : isUpdate === true
                  ? "Product successfully updated"
                  : "Product successfully deleted"}
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
