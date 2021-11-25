import * as React from "react";
import Swal from "sweetalert2";
import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Box, Grid, TextField, Button } from "@mui/material";
import { getVehicle, updateVehicle } from "../../../core/api/services";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
  "& .MuiTextField-root": { width: "100%" },
};

export default function FormUpdateVihcle(props) {
  const { vihcle_id, open, parentCallback } = props;
  const [state, setState] = React.useState({
    vehicle_nm: "",
    vehicle_num: "",
    vehicle_brand: "",
    vehicle_engine_size: "",
    vehicle_engine_num: "",
  });
  const [modalOpen, setModalOpen] = React.useState(open);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    initVehicle(vihcle_id);
    // return () => {
    //   cleanup
    // };
  }, []);

  const initVehicle = async (id) => {
    let res = await getVehicle(id);
    let data = res.data;
    setState({
      vehicle_nm: data.vehicle_nm,
      vehicle_num: data.vehicle_num,
      vehicle_brand: data.vehicle_brand,
      vehicle_engine_size: data.vehicle_engine_size,
      vehicle_engine_num: data.vehicle_engine_num,
    });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const validate = (fieldValues) => {
    let temp = { ...errors };
    let key = Object.keys(fieldValues)[0];
    temp[key] = fieldValues[key] === "" ? true : false;
    setErrors({
      ...temp,
    });
  };

  const formIsValid = () => {
    let valid = { ...errors };
    const isValid =
      !valid.vehicle_nm &&
      !valid.vehicle_num &&
      !valid.vehicle_brand &&
      !valid.vehicle_engine_size &&
      !valid.vehicle_engine_num &&
      Object.values(errors).every((x) => x === false);
    return isValid;
  };

  const onEdit = async () => {
    if (formIsValid()) {
      let res = await updateVehicle(vihcle_id, state);
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        handleClose();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const handleClose = () => {
    parentCallback({ model: false, vihcle_id: null });
    setModalOpen(false);
  };

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={modalOpen}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ m: 1 }}>Edit Vehicle</Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="vehicle_nm"
                name="vehicle_nm"
                label="ชื่อ"
                placeholder="กรอกชื่อรถ"
                {...(errors["vehicle_nm"] && {
                  error: true,
                  helperText: "กรุณากรอกชื่อรถ",
                })}
                value={state.vehicle_nm}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="vehicle_num"
                name="vehicle_num"
                label="หมายเลขทะเบียน"
                placeholder="กรอกหมายเลขทะเบียน"
                {...(errors["vehicle_num"] && {
                  error: true,
                  helperText: "กรุณากรอกหมายเลขทะเบียน",
                })}
                value={state.vehicle_num}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="vehicle_brand"
                name="vehicle_brand"
                label="ยื่อห้อรถ"
                placeholder="กรอกหมายยื่อห้อรถ"
                {...(errors["vehicle_brand"] && {
                  error: true,
                  helperText: "กรุณากรอกหมายยื่อห้อรถ",
                })}
                value={state.vehicle_brand}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="number"
                id="vehicle_engine_size"
                name="vehicle_engine_size"
                label="ขนาดเครื่องยนต์"
                placeholder="กรอกขนาดเครื่องยนต์"
                {...(errors["vehicle_brand"] && {
                  error: true,
                  helperText: "กรุณากรอกขนาดเครื่องยนต์",
                })}
                value={state.vehicle_engine_size}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="vehicle_engine_num"
                name="vehicle_engine_num"
                label="หมายเลขเครื่องยนต์"
                placeholder="กรอกหมายเลขเครื่องยนต์"
                {...(errors["vehicle_engine_num"] && {
                  error: true,
                  helperText: "กรุณากรอกหมายเลขเครื่องยนต์",
                })}
                value={state.vehicle_engine_num}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center" spacing={2}>
              <Button onClick={onEdit} variant="contained" sx={{ m: 1 }}>
                Update Vehicle
              </Button>
              <Button
                color="error"
                sx={{ m: 1 }}
                onClick={handleClose}
                variant="contained"
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </StyledModal>
    </div>
  );
}
