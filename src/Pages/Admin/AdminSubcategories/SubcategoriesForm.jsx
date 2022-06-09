import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInputField from "../../../shared/controls/FormInput/FormInputField";
import { Box, Card, Checkbox, FormLabel } from "@mui/material";
import FormSelect from "../../../shared/controls/FormSelect/FormSelectField";
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
  const [categories, setCategories] = useState([]);
  useEffect(() => {
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
    const requestBody = {
      name: data?.name,
      category: {
        id: data?.categoryId,
      },
    };

    await API.post("inventory/subcategories", requestBody);

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
          <form
            style={{
              marginTop: "5px",
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
            <FormSelect
              name="categoryId"
              label="category"
              options={categories}
              style={{
                width: "300px",
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "20px",
                color: "black",
                backgroundColor: "transparent",
              }}
            />
            <FormInputField
              name="name"
              label="name"
              errorobj={errors}
              style={{
                width: "300px",
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
