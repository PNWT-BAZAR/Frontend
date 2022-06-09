import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInputField from "../../../shared/controls/FormInput/FormInputField";
import FormSelect from "../../../shared/controls/FormSelect/FormSelectField";
import { Box, Card, Checkbox, FormLabel } from "@mui/material";
import { AddOutlined, SearchOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { COLORS } from "../../values/colors";
import API from "../../../api/API";

export default function CategoriesSearch(props) {
  const [categories, setCategories] = useState([]);
  const methods = useForm({
    defaultValues: {
      searchInput: "",
      categoryId: "",
    },
  });
  const { handleSubmit } = methods;

  const submitHandler = async (searchParams) => {
    props.fetchFilteredData(searchParams);
  };

  const openAddFormHandler = () => {
    props.toggleSearch();
  };

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
      <FormProvider {...methods}>
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
          <form
            onSubmit={handleSubmit((data) => submitHandler(data))}
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
          >
            <Box sx={{ display: "flex" }}>
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
                style={{
                  width: "300px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginTop: "20px",
                  color: "black",
                  backgroundColor: "transparent",
                }}
              />
            </Box>
          </form>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
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
              <SearchOutlined />
            </IconButton>
            <IconButton
              onClick={openAddFormHandler}
              type="submit"
              id="submit"
              style={{ backgroundColor: COLORS.primaryColor, color: "white" }}
              size="medium"
            >
              <AddOutlined />
            </IconButton>
          </Box>
        </Card>
      </FormProvider>
    </Box>
  );
}
