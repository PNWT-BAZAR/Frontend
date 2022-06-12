import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useNavigate, useLocation, UNSAFE_RouteContext } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/API";

const OrderView = (props) => {
  const navigate = useNavigate();
  
  const { state } = useLocation();
  const order = state?.order

  const user = order?.user;
  const createdAt = order?.createdAt;
  const totalPrice = order?.totalPrice;
  const [status, setStatus] = useState(order?.orderStatus);
  const [open, setOpen] = useState(false);
  const [orderPrice, setOrderPrice] = useState();

  useEffect(()=>{
    const fetchTotalPricesPerOrder = async () => {
      const result = await API.get("order/orders/price", {});
      setOrderPrice(result?.data);
      console.log(result?.data);
    }
    fetchTotalPricesPerOrder();
  });
  
  const handleSubmit = () => {
    let data = {
      id: order.id,
      user: order.user,
      createdAt: order.createdAt,
      orderStatus: status
    }

    API.put("/order/orders", data);
    handleClickOpen();
    console.log("UPDATING");
    console.log(data);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    orderPrice && (
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
          defaultValue={user?.firstName + " " + user?.lastName}
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
          value={orderPrice}
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
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Product successfully updated!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  );
};

export default OrderView;
