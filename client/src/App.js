import "./App.css";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

function App() {
  const [value, setValue] = useState("encode");
  const [url, setUrl] = useState("");

  const handleConvertChange = (e) => {
    setValue(e.target.value);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // const submitHandler ()=> {}

  return (
    <div className="App">
      <Box sx={{ paddingTop: 5 }}>
        <Grid container>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={11}>
            <Paper elevation={6}>
              <Typography variant="h4">URL Shortening Service</Typography>
              <FormControl sx={{ paddingBottom: 4 }} variant="outlined">
                <TextField
                  id="standard-basic"
                  margin="dense"
                  label="URL"
                  value={url}
                  onChange={handleUrlChange}
                  variant="standard"
                  sx={{
                    paddingBottom: 2,
                    "& label": {
                      width: "100%",
                      textAlign: "center",
                      transformOrigin: "center",
                      "&.Mui-focused": {
                        transformOrigin: "center",
                      },
                    },
                  }}
                />

                <FormLabel>Conversion Type:</FormLabel>
                <ToggleButtonGroup
                  exclusive
                  color="primary"
                  value={value}
                  onChange={handleConvertChange}
                >
                  <ToggleButton value="encode">Encoder</ToggleButton>
                  <ToggleButton value="decode">Decoder</ToggleButton>
                </ToggleButtonGroup>
                <Button
                  sx={{
                    border: "1px solid #fff",
                    marginTop: "20px",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "green",
                      border: "1px solid green",
                    },
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <p>{value}</p>
      <p>{url}</p>
    </div>
  );
}

export default App;
