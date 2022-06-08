import React from "react";

import { Button, Link, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box } from "@mui/material";

import FormInputField from "../../shared/controls/FormInput/FormInputField";
import { COLORS } from "../values/colors";
import API from "../../api/API";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = ({ handleChange }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitHandler = async (data) => {
    //encrypt and login method
    const result = await API.post("/identity/users/login", data);
    localStorage.setItem("access_token", result?.headers?.authorization);
  };

  return (
    <FormProvider {...methods}>
      <form
        style={{
          marginTop: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingLeft: "5px",
          paddingRight: "5px",
          flexDirection: "column"
        }}
        onSubmit={handleSubmit((data) => submitHandler(data))}
      >
        <h2>Log into your account!</h2>
          <FormInputField
            name="username"
            label="Username"
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
                <PersonOutlineOutlinedIcon
                  sx={{ margin: "0px 10px 0px 0px" }}
                />
              ),
            }}
          />
          <FormInputField
            name="password"
            label="Password"
            type="password"
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
                <LockOutlinedIcon sx={{ margin: "0px 10px 0px 0px" }} />
              ),
            }}
          />
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
          Login
        </Button>

        <Typography
          sx={{ margin: "80px 0px 0px 0px" }}
          position={"relative"}
          bottom={0}
        >
          Not a BAZÁR member?
          <Link
            onClick={() => handleChange("event", 1)}
            sx={{
              cursor: "pointer",
              margin: "0px 0px 0px 10px",
              color: COLORS.primaryColor,
              textDecorationColor: COLORS.primaryColor,
            }}
          >
            Register now!
          </Link>
        </Typography>
      </Box>
    </FormProvider>
  );
};

export default Login;
