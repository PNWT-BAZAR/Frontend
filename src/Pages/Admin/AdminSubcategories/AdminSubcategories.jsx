import { Box, Divider } from "@mui/material";
import { React, useState } from "react";
import SubcategoriesDetails from "./SubcategoriesDetails";
import SubcategoriesForm from "./SubcategoriesForm";
import SubcategoriesSearch from "./SubcategoriesSearch";
import SubcategoriesTable from "./SubcategoriesTable";
import CircularProgress from "@mui/material/CircularProgress";
import API from "../../../api/API";

export const AdminSubcategories = () => {
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
    if (searchParams !== null) {
      params = new URLSearchParams([
        ["searchInput", searchParams?.name ?? ""],
        ["categoryId", searchParams?.categoryId],
      ]);
    }
    setLoading(true);
    const result = await API.get("inventory/subcategories/search", { params });
    console.log(" stae result", result);
    setFilteredData(result?.data?.objectsList);
    setLoading(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {showDetails ? (
        <SubcategoriesDetails
          toggleDetails={toggleDetails}
          itemDetails={itemDetails}
          fetchFilteredData={fetchFilteredData}
          goToDetails={goToDetails}
        />
      ) : (
        <Box>
          {showSearch && (
            <SubcategoriesSearch
              toggleSearch={toggleSearch}
              fetchFilteredData={fetchFilteredData}
            />
          )}
          {!showSearch && (
            <SubcategoriesForm
              toggleSearch={toggleSearch}
              fetchFilteredData={fetchFilteredData}
            />
          )}
          <Divider style={{ margin: "20px" }} />
          <SubcategoriesTable
            filteredData={filteredData}
            goToDetails={goToDetails}
          />
          {loading && <CircularProgress style={{ margin: "20px" }} />}
        </Box>
      )}
    </Box>
  );
};
