import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInputField from "../../../shared/controls/FormInput/FormInputField";
import { Box, Card, Checkbox, FormLabel } from "@mui/material";
import { AddOutlined, ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import API from "../../../api/API";
import { COLORS } from "../../values/colors";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("name field is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets allowed"),
});

export default function SubcategoriesForm(props) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const submitHandler = async (data) => {
    await API.post("inventory/categories", data);

    props.fetchFilteredData(null);
    goBackHandler();
  };

  const goBackHandler = () => {
    props.toggleSearch();
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        padding: "0px 5px 0px 5px",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "25px 25px 25px 25px",
          width: "100%",
        }}
      >
        <FormProvider {...methods}>
          <Box>
            <IconButton onClick={goBackHandler}>
              <ArrowBack
                fontSize="small"
                sx={{ color: COLORS.primaryColor, margin: "0px 0px 10px 0px" }}
              />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit((data) => submitHandler(data))}>
            <FormInputField
              name="name"
              label="name"
              errorobj={errors}
              style={{
                width: "200px",
                marginRight: "20px",
                marginBottom: "20px",
                color: "black",
                backgroundColor: "transparent",
              }}
            />
          </form>
          <Box>
            <IconButton
              onClick={handleSubmit((data) => submitHandler(data))}
              type="submit"
              id="submit"
              style={{ backgroundColor: COLORS.primaryColor, color: "white" }}
              size="medium"
            >
              <AddOutlined />
            </IconButton>
          </Box>
        </FormProvider>
      </Card>
    </Box>
  );
}
