import { Grid, Box, InputAdornment, Button } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { FormProvider, useForm } from "react-hook-form";
import FormInputField from "../../shared/controls/FormInput/FormInputField";
import API from "../../api/API";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { COLORS } from "../values/colors";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  shippingAddress: yup.string().required("Shipping address is required!"),
  email: yup
    .string()
    .required("Email is required!")
    .email("E-mail is not valid!"),
  username: yup
    .string()
    .required("Username is required")
    .min(8, "Username must contain at least 8 characters!")
    .max(15, "Username cannot be longer than 15 characters!"),
  password: yup.string().required("Password is required!"),
  confirmPassword: yup
    .string()
    .required("You must confirm your password!")
    .oneOf([yup.ref("password"), null], "Passwords do not match!"),
  phoneNumber: yup
    .string()
    .required("Phone number is required!")
    .matches(/^[+]?\d{9,15}$/, "Phone number has to contain 9 to 15 digits!"),
});

const Register = ({ handleChange }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
      shippingAddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitHandler = async (data) => {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      email: data.email,
      phoneNumber: data.phoneNumber,
      shippingAddress: data.shippingAddress,
      role: "USER",
    };
    console.log("USER", user);
    const result = await API.post("/identity/users/signup", user);
    console.log(result?.data?.object);
    if (result?.data?.object != null) {
      handleChange("event", 0);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        // style={{
        //   marginTop: "5px",
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   width: "100%",
        //   paddingLeft: "5px",
        //   paddingRight: "5px",
        //   flexDirection: "column",
        // }}
        onSubmit={handleSubmit((data) => submitHandler(data))}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h2>Create an account!</h2>
          <br />

          <Grid
            container
            direction={"rows"}
            spacing={5}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={5} md={5}>
              <FormInputField
                name="firstName"
                label="First name"
                errorobj={errors}
                placeholder="Enter first name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5} md={5}>
              <FormInputField
                name="phoneNumber"
                label="Phone"
                errorobj={errors}
                placeholder="Enter phone number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIphoneOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5} md={5}>
              <FormInputField
                name="lastName"
                label="Last name"
                errorobj={errors}
                placeholder="Enter last name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5} md={5}>
              <FormInputField
                name="shippingAddress"
                label="Shipping address"
                errorobj={errors}
                placeholder="Enter shipping address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalShippingOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5} md={5}>
              <FormInputField
                name="username"
                label="Username"
                errorobj={errors}
                placeholder="Enter username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5} md={5}>
              <FormInputField
                name="password"
                label="Password"
                errorobj={errors}
                placeholder="Enter password"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5} md={5}>
              <FormInputField
                name="email"
                label="E-mail"
                errorobj={errors}
                placeholder="Enter e-mail"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5} md={5}>
              <FormInputField
                name="confirmPassword"
                label="Confirm"
                errorobj={errors}
                placeholder="Re-enter password"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Button
          type="submit"
          sx={{
            padding: "8px",
            width: "200px",
            margin: "20px auto",
            color: "white",
            backgroundColor: COLORS.primaryColor + "!important",
          }}
          onClick={handleSubmit((data) => submitHandler(data))}
        >
          Register
        </Button>
      </Box>
    </FormProvider>
  );
};

export default Register;
