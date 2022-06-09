import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { dummyUserData } from "../../sampleItems/dummyUserData";
import { useState, useEffect } from "react";
import API from "../../api/API";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phoneNumber", headerName: "Phone number", width: 150 },
  { field: "shippingAddress", headerName: "Shipping address", width: 250 },
  { field: "role", headerName: "Role", width: 150 },
];

const UsersList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await API.get("identity/users", {});
      setUsers(result?.data?.objectsList);
    };
    fetchUsers();
  }, []);
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <DataGrid rows={users} columns={columns} autoPageSize={true} />
    </div>
  );
};

export default UsersList;
