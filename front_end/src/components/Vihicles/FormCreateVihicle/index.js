import * as React from "react";
import Swal from "sweetalert2";
import { Box, Grid, TextField, Button } from "@mui/material";
import { createVihicle } from "../../../core/api/services";

export default function FromCreateVihicle({ parentCallback }) {
  const [state, setState] = React.useState({
    vehicle_nm: "",
    vehicle_num: "",
    vehicle_brand: "",
    vehicle_engine_size: "",
    vehicle_engine_num: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const create = async () => {
    if (formIsValid()) {
      let res = await createVihicle(state);
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        parentCallback(1);
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

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
        <Grid item xs={12}>
          <Button onClick={create} variant="contained">
            Create Vehicle
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
