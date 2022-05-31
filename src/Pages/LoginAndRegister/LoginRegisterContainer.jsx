import { Paper, Grid, Tabs, Tab, Typography, Box } from "@mui/material";
import { useState } from "react";

import Login from "./Login";
import Register from "./Register";

const LoginRegister = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Grid
      container
      spacing={0}
      direction={"row"}
      alignItems="center"
      justifyContent="center"
      height="90vh"
      sx={{
        backgroundColor: "#ffffff",
        backgroundImage: "linear-gradient(32deg, #f3f4f7 0%, #eeeeee 90%)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid item sx={{ zIndex: 2 }} xs={12} sm={12} md={5}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#feead2",
            height: "auto",
            minHeight: 600,
          }}
          elevation={1}
        >
          <img src="https://digitaledge.org/wp-content/uploads/2021/03/women-online-shopping-furniture-illustration_32854-291.jpg"></img>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={5}>
        <Paper
          sx={{
            padding: 0,
            height: "auto",
            minHeight: 600,
            margin: "100px auto",
            align: "center",
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Log in" style={{ minWidth: "50%" }} />
            <Tab label="Register" style={{ minWidth: "50%" }} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Login handleChange={handleChange} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginRegister;
