import { Box } from "@mui/material";
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
  const [productImages, setProductImages] = useState([]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      url: productImages?.url ?? "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitHandler = async (data) => {
    // const productImg = {
    //     url: data?.url,
    //     product:
    // }
    await API.post("/inventory/productImages", data);
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
          <AddCircleOutlineOutlinedIcon />
        </Box>
      </form>
    </FormProvider>
  );
};

export default AddImage;
