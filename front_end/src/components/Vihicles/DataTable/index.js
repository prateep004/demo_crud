import * as React from "react";
import { getVehicles } from "../../../core/api/services";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function DataTable() {
  const [entities, setEntities] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    fetchData({ page: page + 1, size: rowsPerPage });
    // return () => {
    //   cleanup
    // };
  }, []);

  const fetchData = async (params) => {
    let res = await getVehicles(params);
    setEntities(res.data.entities);
    setPage(res.data.page_information.page - 1);
    setRowsPerPage(res.data.page_information.size);
    console.log(res);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - entities.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchData({ page: newPage + 1, size: rowsPerPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchData({ page: 1, size: parseInt(event.target.value, 10) });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell key="vehicle_nm">
              ชื่อ
            </TableCell>
            <TableCell key="vehicle_num" align="right">
              หมายเลขทะเบียน
            </TableCell>
            <TableCell key="vehicle_brand" align="right">
              ยื่อห้อรถ
            </TableCell>
            <TableCell key="vehicle_engine_size" align="right">
              ขนาดเครื่องยนต์
            </TableCell>
            <TableCell key="vehicle_engine_num" align="right">
              หมายเลขเครื่องยนต์
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entities.map((row) => (
            <TableRow key={row.vehicle_nm}>
              <TableCell component="th" scope="row">
                {row.vehicle_nm}
              </TableCell>
              <TableCell align="right">{row.vehicle_num}</TableCell>
              <TableCell align="right">{row.vehicle_brand}</TableCell>
              <TableCell align="right">{row.vehicle_engine_size}</TableCell>
              <TableCell align="right">{row.vehicle_engine_num}</TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 15, 20, 25]}
              colSpan={5}
              count={entities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
