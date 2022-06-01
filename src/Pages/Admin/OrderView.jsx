import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { dummyOrders } from "../../sampleItems/dummyOrders";

const OrderView = (props) => {
  const navigate = useNavigate();

  const orderId =
    window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    ) - 1;
  const order = dummyOrders[orderId];

  const user = order?.user;
  const createdAt = order?.createdAt;
  const totalPrice = order?.totalPrice;
  const [status, setStatus] = useState(order?.orderStatus);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <TextField
        label="User"
        defaultValue={user}
        InputProps={{
          readOnly: true,
        }}
        sx={{
          marginTop: 5,
          width: { xs: "50ch", sm: "70ch" },
        }}
      />
      <TextField
        label="Order created at"
        defaultValue={createdAt}
        InputProps={{
          readOnly: true,
        }}
        sx={{
          marginTop: 5,
          width: { xs: "50ch", sm: "70ch" },
        }}
      />
      <TextField
        label="Total price in EUR"
        defaultValue={totalPrice}
        InputProps={{
          readOnly: true,
        }}
        sx={{
          marginTop: 5,
          width: { xs: "50ch", sm: "70ch" },
        }}
      />
      <FormControl sx={{ m: 1, width: "70ch", margin: 5 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
          startAdornment={
            <InputAdornment position="start">
              {/* <CategoryOutlinedIcon /> */}
            </InputAdornment>
          }
        >
          {["PENDING", "APPROVED", "CANCELED", "DELIVERED"].map((st) => {
            return <MenuItem value={st}>{st}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          width: "70ch",
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            width: 70,
            margin: "10px 10px 0 0",
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          sx={{
            display: "flex",
            width: 70,
            margin: "10px 0 0 0",
          }}
          type="submit"
          variant="outlined"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default OrderView;
