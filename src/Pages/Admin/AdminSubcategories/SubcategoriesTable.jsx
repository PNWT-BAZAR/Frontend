import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function SubcategoriesTable(props) {
  const { filteredData } = props;
  console.log("sta je filterered data", filteredData);
  const openDetailsHandler = (data) => {
    props.goToDetails(data);
  };

  return (
    <TableContainer component={Paper} style={{ boxShadow: "0px 0.3px 1px" }}>
      {filteredData && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row) => {
              return (
                <TableRow
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    openDetailsHandler(row);
                  }}
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
