import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

import API from "../../api/API";
import FormInputField from "../../shared/controls/FormInput/FormInputField";
import FormSelect from "../../shared/controls/FormSelect/FormSelectField";
import { COLORS } from "../values/colors";

const categories = [
  { id: 0, label: "living room" },
  { id: 1, label: "dining room" },
  { id: 2, label: "bahtroom" },
];

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  // length: yup
  //   .number()
  //   .typeError("Length must be a number")
  //   .positive("Positive number required")
  //   .required("Please provide a lenght.")
  //   .min(0, "Lenght must be greater than 0")
  //   .max(99999, "Too big!"),
  categoryId: yup.string().required("Category is required"),
  firstLevelSubcategoryId: yup
    .string()
    .required("First subcategory is required"),
});

export default function NewLogin(props) {
  const { product, fetchProduct } = props;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: product?.title,
      categoryId: product?.categoryId,
      firstLevelSubcategoryId: product?.firstLevelSubcategoryId,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitHandler = async (data) => {
    console.log("submited data", data);
    API.post("/categories", data);
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
        }}
      >
        <form
          style={{
            marginTop: "15px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
          onSubmit={handleSubmit((data) => submitHandler(data))}
        >
          <FormInputField
            name="title"
            label="Title"
            errorobj={errors}
            style={{
              width: "300px",
              marginRight: "20px",
              marginBottom: "20px",
              color: "black",
              backgroundColor: "transparent",
            }}
            InputProps={{
                startAdornment:
                <AirportShuttleIcon sx={{margin: "0px 10px 0px 0px"}}/>
                }}
          />

          <Box style={{ display: "flex" }}>
            <FormSelect
              name="categoryId"
              label="Product Category"
              options={categories}
              errorobj={errors}
              style={{
                width: "300px",
                marginRight: "20px",
                marginBottom: "20px",
                color: "black",
                backgroundColor: "transparent",
              }}
            />
          </Box>

          <Box style={{ display: "flex" }}>
            <FormSelect
              name="firstLevelSubcategoryId"
              label="First Subcategory"
              options={categories}
              errorobj={errors}
              style={{
                width: "300px",
                marginRight: "20px",
                marginBottom: "20px",
                color: "black",
                backgroundColor: "transparent",
              }}
            />
          </Box>
        </form>

        <Box>
          <IconButton
            onClick={handleSubmit((data) => submitHandler(data))}
            type="submit"
            id="submit"
            style={{
              backgroundColor: COLORS.primaryColor,
              color: "white",
              marginRight: "5px",
            }}
            size="medium"
          >
            <Check />
          </IconButton>
        </Box>
      </Box>
    </FormProvider>
  );
}
