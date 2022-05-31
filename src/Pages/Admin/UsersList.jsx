import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { dummyUserData } from "../../sampleItems/dummyUserData";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "role", headerName: "Role", width: 150 },
];

const UsersList = () => {
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <DataGrid rows={dummyUserData} columns={columns} autoPageSize={true} />
    </div>
  );
};

export default UsersList;
