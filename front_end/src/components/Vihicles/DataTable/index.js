import * as React from "react";
import Swal from "sweetalert2";
import { getVehicles, deleteVehicle } from "../../../core/api/services";
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
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  const [pageInformation, setPageInformation] = React.useState({
    page: 0,
    size: 10,
    total_number_of_entities: 0,
    total_number_of_pages: 1,
  });

  React.useEffect(() => {
    fetchData({ page: 1, size: 10 });
    // return () => {
    //   cleanup
    // };
  }, []);

  const fetchData = async (params) => {
    let res = await getVehicles(params);
    if(res.data.page_information.page > 1 && res.data.entities.length === 0){
      fetchData(fetchData({ page: pageInformation.page , size: pageInformation.size,}));
    }
    setEntities(res.data.entities);
    setPageInformation({
      page: res.data.page_information.page - 1,
      size: res.data.page_information.size,
      total_number_of_entities: res.data.page_information.total_number_of_entities,
      total_number_of_pages: res.data.page_information.total_number_of_pages,
    });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    pageInformation.page > 0
      ? Math.max(
          0,
          (1 + pageInformation.page) * pageInformation.size -
            pageInformation.total_number_of_entities
        )
      : 0;

  const handleChangePage = (event, newPage) => {
    setPageInformation({
      ...pageInformation,
      page: newPage,
    });
    fetchData({ page: newPage + 1, size: pageInformation.size });
  };

  const handleChangeRowsPerPage = (event) => {
    setPageInformation({
      ...pageInformation,
      size: parseInt(event.target.value, 10),
      page: 0,
    });
    fetchData({ page: 1, size: parseInt(event.target.value, 10) });
  };

  const onDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await deleteVehicle(id);
        fetchData({
          page: pageInformation.page + 1,
          size: pageInformation.size,
        });
        if (res.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell key="vehicle_nm">ชื่อ</TableCell>
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
            <TableCell
              key="action"
              align="right"
              style={{ width: "250px", maxWidth: "250px", minWidth: "250px" }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entities.map((row) => (
            <TableRow key={row.vehicle_nm}>
              <TableCell component="th" scope="row">
                {row.vehicle_nm}
              </TableCell>
              <TableCell align="right" style={{ minWidth: "15%" }}>
                {row.vehicle_num}
              </TableCell>
              <TableCell align="right" style={{ minWidth: "15%" }}>
                {row.vehicle_brand}
              </TableCell>
              <TableCell align="right" style={{ minWidth: "15%" }}>
                {row.vehicle_engine_size}
              </TableCell>
              <TableCell align="right" style={{ minWidth: "15%" }}>
                {row.vehicle_engine_num}
              </TableCell>
              <TableCell
                align="right"
                style={{ width: "250px", maxWidth: "250px", minWidth: "250px" }}
              >
                <Button
                  sx={{ m: 1 }}
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  sx={{ m: 1 }}
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(row.id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </TableCell>
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
              colSpan={7}
              count={parseInt(pageInformation.total_number_of_entities)}
              rowsPerPage={parseInt(pageInformation.size)}
              page={parseInt(pageInformation.page)}
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
