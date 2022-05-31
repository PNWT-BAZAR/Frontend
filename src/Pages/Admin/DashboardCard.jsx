import { Grid, Card, Avatar, Typography } from "@mui/material";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import { COLORS } from "../values/colors";

const DashboardCard = (props) => {
  const card = props.card;
  return (
    <Grid item>
      <Card
        sx={{
          minWidth: "30vw",
          minHeight: "30vh",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.secondaryColor,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "transparent",
            color: "black",
            height: "70px",
            width: "70px",
          }}
        >
          <AutoGraphOutlinedIcon sx={{ height: "50px", width: "50px" }} />
        </Avatar>
        <Typography>{card.title}</Typography>
        <Typography fontSize={30}>{card.value}</Typography>
      </Card>
    </Grid>
  );
};

export default DashboardCard;
