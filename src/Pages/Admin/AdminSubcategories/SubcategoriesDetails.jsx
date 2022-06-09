import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInputField from "../../../shared/controls/FormInput/FormInputField";
import { Box, Card, Checkbox, FormLabel } from "@mui/material";
import { Check, ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import API from "../../../api/API";
import SubcategoriesTable from "./SubcategoriesTable";
import { COLORS } from "../../values/colors";

const schema = yup.object().shape({
  name: yup.string().required("name field is required"),
});

export default function SubcategoriesDetails(props) {
  const { itemDetails, goToDetails } = props;
  const subcategories = itemDetails?.firstLevelSubcategories
    ? itemDetails?.firstLevelSubcategories
    : itemDetails?.secondLevelSubcategories ?? [];

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: itemDetails.name,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = methods;

  useEffect(() => {
    reset(itemDetails);
  }, [itemDetails, reset]);

  const submitHandler = async (data) => {
    data.id = itemDetails.id;
    console.log("category to update", data);
    await API.put("/inventory/categories", data);

    props.fetchFilteredData(null);
    goBackHandler();
  };

  const goBackHandler = () => {
    props.toggleDetails();
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
          margin: "0px 0px 20px 0px",
        }}
      >
        <FormProvider {...methods}>
          <Box>
            <IconButton
              onClick={goBackHandler}
              sx={{ margin: "0px 0px 10px 0px" }}
            >
              <ArrowBack
                fontSize="small"
                style={{
                  color: COLORS.primaryColor,
                }}
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
              <Check />
            </IconButton>
          </Box>
        </FormProvider>
      </Card>
    </Box>
  );
}
