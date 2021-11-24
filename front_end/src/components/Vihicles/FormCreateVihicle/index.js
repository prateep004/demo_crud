import * as React from "react";
import { Box, Grid, TextField, Button } from "@mui/material";

export default function FromCreateVihicle() {
  const [state, setState] = React.useState({
    vehicle_nm: "",
    vehicle_num: "",
    vehicle_engine_size: "",
    vehicle_engine_num: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function createVihicle() {
      console.log(state);
  }

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
        <Grid item xs={6}>
          <TextField
            required
            id="vehicle_nm"
            name="vehicle_nm"
            label="ชื่อ"
            placeholder="กรอกชื่อ"
            value={state.vehicle_nm}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="vehicle_num"
            name="vehicle_num"
            label="หมายเลขทะเบียน"
            placeholder="กรอกหมายเลขทะเบียน"
            value={state.vehicle_num}
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
            value={state.vehicle_engine_num}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={createVihicle} variant="contained">
            Create Vehicle
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
