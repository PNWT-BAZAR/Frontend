import {
  Card,
  Typography,
  Box,
  Rating,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import { useState } from "react";
import API from "../../api/API";

const RatingCard = (props) => {
  const { product, fetchProduct } = props;
  const [value, setValue] = useState(0);

  const reviewHandler = async (newValue) => {
    setValue(newValue);
    const data = {
      reviewValue: newValue,
    };
    await API.put("/inventory/products/reviewProduct/" + product?.id, data);
    fetchProduct();
    handleClickOpen();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      elevation={1}
      sx={{
        width: "100%",
        margin: "15px 0px 0px 0px",
        padding: "10px 0px 10px 0px",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Typography>Rate this product:</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Rating
          precision={1}
          value={value}
          onChange={(event, newValue) => {
            reviewHandler(newValue);
          }}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Thank you for taking the time to leave us a review for{" "}
              {product?.name}!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  );
};

export default RatingCard;
