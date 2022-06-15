import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import FormInputField from "../../shared/controls/FormInput/FormInputField";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import API from "../../api/API";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const schema = yup.object().shape({
  url: yup.string().required("Product url is required"),
});

const AddImage = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [product, setProduct] = useState();
  const productId = window.location.pathname.split("/").at(-1);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await API.get("inventory/products/" + productId);
      setProduct(result?.data?.object);
    };
    fetchProduct();
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitHandler = (data) => {
    const productImg = {
      url: data?.url,
      product: product,
    };
    API.post("/inventory/productImages", productImg);
    handleClickOpen();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => submitHandler(data))}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <FormInputField
            name="url"
            label="Image url"
            errorobj={errors}
            style={{
              width: "272px",
              marginRight: "20px",
              marginBottom: "20px",
              marginTop: "30px",
              color: "black",
              backgroundColor: "transparent",
            }}
            InputProps={{
              startAdornment: (
                <ImageOutlinedIcon sx={{ margin: "0px 10px 0px 0px" }} />
              ),
            }}
          />
          <AddCircleOutlineOutlinedIcon
            sx={{ cursor: "pointer" }}
            onClick={handleSubmit((data) => submitHandler(data))}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Product image successfully added!
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

export default AddImage;
