import { Box, Divider } from "@mui/material";
import { React, useState } from "react";
import CategoriesDetails from "./CategoriesDetails";
import CategoriesForm from "./CategoriesForm";
import CategoriesSearch from "./CategoriesSearch";
import CategoriesTable from "./CategoriesTable";
import CircularProgress from "@mui/material/CircularProgress";
import API from "../../../api/API";

export const AdminCategories = () => {
  const [showSearch, setshowSearch] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [itemDetails, setitemDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleSearch = () => {
    setshowSearch(!showSearch);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const goToDetails = (data) => {
    setShowDetails(true);
    setitemDetails(data);
  };

  var params = new URLSearchParams([["name", ""]]);

  const fetchFilteredData = async (searchParams) => {
    setLoading(true);
    let result;
    if (searchParams !== null) {
      params = new URLSearchParams([["searchInput", searchParams?.name]]);
      result = await API.get("inventory/categories/search", { params });
    } else {
      result = await API.get("inventory/categories", { params });
    }
    setFilteredData(result?.data?.objectsList);
    setLoading(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {showDetails ? (
        <CategoriesDetails
          toggleDetails={toggleDetails}
          itemDetails={itemDetails}
          fetchFilteredData={fetchFilteredData}
          goToDetails={goToDetails}
        />
      ) : (
        <Box>
          {showSearch && (
            <CategoriesSearch
              toggleSearch={toggleSearch}
              fetchFilteredData={fetchFilteredData}
            />
          )}
          {!showSearch && (
            <CategoriesForm
              toggleSearch={toggleSearch}
              fetchFilteredData={fetchFilteredData}
            />
          )}
          <Divider style={{ margin: "20px" }} />
          <CategoriesTable
            filteredData={filteredData}
            goToDetails={goToDetails}
            accessible={true}
          />
          {loading && <CircularProgress style={{ margin: "20px" }} />}
        </Box>
      )}
    </Box>
  );
};
