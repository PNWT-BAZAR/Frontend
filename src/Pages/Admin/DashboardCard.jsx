import { Grid, Card, Avatar, Typography } from "@mui/material";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import { COLORS } from "../values/colors";

const DashboardCard = (props) => {
  const card = props.card;
  return (
    <Grid item>
      <Card
        sx={{
          minWidth: "25vw",
          minHeight: "30vh",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(32deg, #f3f4f7 0%, #eeeeee 90%)",
          borderRadius: 15,
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
          <EqualizerOutlinedIcon sx={{ height: "50px", width: "50px" }} />
        </Avatar>
        <Typography fontSize={30}>{card.title}</Typography>
        <Typography fontSize={40}>{card.value}</Typography>
      </Card>
    </Grid>
  );
};

export default DashboardCard;
