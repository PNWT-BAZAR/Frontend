import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState, useEffect } from "react";
import API from "../../api/API";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phoneNumber", headerName: "Phone number", width: 150 },
  { field: "shippingAddress", headerName: "Shipping address", width: 250 },
  { field: "role", headerName: "Role", width: 80 },
  {
    field: "delete",
    headerName: "",
    sortable: false,
    renderCell: () => {
      return (
        <DeleteOutlineOutlinedIcon
          style={{
            width: "100%",
            color: "gray",
            fontSize: 16,
            cursor: "pointer",
            alignSelf: "center",
          }}
        ></DeleteOutlineOutlinedIcon>
      );
    },
  },
];

const UsersList = () => {
  const [loading, setLoading] = useState();
  const [users, setUsers] = useState([]);

  const handleCellClick = async (param, event) => {
    if (param.field === "delete") {
      await API.delete("/identity/users/" + param.id);
      fetchUsers();
    }
    console.log("ON CLICK", param.field);
  };

  const fetchUsers = async () => {
    const result = await API.get("identity/users", {});
    setUsers(result?.data?.objectsList);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, []);
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <DataGrid
        rowSelection={"single"}
        rows={users}
        columns={columns}
        autoPageSize={true}
        onCellClick={handleCellClick}
        loading={loading}
      />
    </div>
  );
};

export default UsersList;
