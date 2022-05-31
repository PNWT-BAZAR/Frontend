import React, { useState } from "react";

import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  Link,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = ({ handleChange }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log({ username, password });
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h2>Log into your account!</h2>
      <br />

      <Grid
        container
        direction={"column"}
        spacing={5}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <TextField
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            placeholder="Enter username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item>
          <TextField
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <Typography fontSize={"70%"} align="left">
            <Link href="#">Forgot password?</Link>
          </Typography>
        </Grid>
      </Grid>

      <Button
        type="submit"
        sx={{ padding: 2, minWidth: "20%", margin: "20px auto" }}
        variant="outlined"
        onClick={handleSubmit}
      >
        Login
      </Button>

      <Typography
        sx={{ margin: "80px 0px 0px 0px" }}
        position={"relative"}
        bottom={0}
      >
        Not a BAZÁR member?
        <br />
        <Link onClick={() => handleChange("event", 1)}>Register now!</Link>
      </Typography>
    </Grid>
  );
};

export default Login;
