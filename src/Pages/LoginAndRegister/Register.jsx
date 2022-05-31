import { Grid, TextField, InputAdornment, Button } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

const Register = () => {
  return (
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
          <TextField
            label="First name"
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
          <TextField
            label="Phone"
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
          <TextField
            label="Last name"
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
          <TextField
            label="Shipping address"
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
          <TextField
            label="Username"
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
          <TextField
            label="Password"
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
          <TextField
            label="E-mail"
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
          <TextField
            label="Confirm"
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

      <Button
        sx={{ padding: 2, minWidth: "20%", margin: "20px auto" }}
        type="submit"
        variant="outlined"
      >
        Register
      </Button>
    </Grid>
  );
};

export default Register;
