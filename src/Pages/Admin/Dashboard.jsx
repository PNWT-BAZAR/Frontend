import { Grid } from "@mui/material";
import { dummyDashboardCards } from "../../sampleItems/dummyDashboardCards";
import DashboardCard from "./DashboardCard";

const Dashboard = () => {
  return (
    <Grid
      container
      direction="row"
      alignItems={"center"}
      display={"flex"}
      justifyContent="space-evenly"
    >
      {dummyDashboardCards.map((cardInfo) => {
        return <DashboardCard key={cardInfo.id} card={cardInfo} />;
      })}
    </Grid>
  );
};

export default Dashboard;
