import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const OrderSummaryCard = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const shipping = props.price > 100 ? 0 : 20;

  const date = new Date();

  date.setDate(date.getDate() + 5);
  const dateStart =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  date.setDate(date.getDate() + 10);
  const dateEnd =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  return (
    <Card
      sx={{
        minWidth: "30vw",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <CardHeader title="Your order" />
      <CardContent sx={{ flex: "1 0 auto" }}>
        Order price: <b>EUR</b> {props.price}
        <br />
        Shipping: <b>EUR</b> {shipping}
        <br /> <br />
        <b> Total price: EUR {props.price + shipping}</b>
        <br /> <br />
        Estimated delivery: {dateStart} - {dateEnd}
        <br />
      </CardContent>
      <Button
        onClick={handleClickOpen}
        type="submit"
        sx={{ padding: 1, minWidth: "25%", margin: "10px auto" }}
        variant="outlined"
      >
        Confirm order
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have successfully ordered from BAZÁR!
            <br />
            Estimated delivery is from {dateStart} to {dateEnd}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default OrderSummaryCard;
