import "./App.css";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import FullWidthTabs from "./components/TabBar";
import Item from "./components/Item";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <FullWidthTabs></FullWidthTabs>
            </Item>
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
