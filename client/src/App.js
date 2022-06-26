import "./App.css";
import { useEffect, useState } from "react";
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

import axios from "axios";

function App() {
  const [conversion, setConversion] = useState("encode");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const handleConvertChange = (e) => {
    setConversion(e.target.value);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (url !== "") {
      switch (conversion) {
        case "encode":
          return axios.post("/encode", { url: url }).then((response) => {
            setResult(response.data);
          });

        case "decode":
          return axios.post("/decode", { url: url }).then((response) => {
            setResult(response.data);
          });

        default:
          setResult("PLEASE CHOOSE A CONVERSION TYPE");
      }
    } else {
      setResult("PLEASE ENTER VALUE INTO URL FIELD");
    }
  };
  return (
    <div className="App">
      <Box sx={{ paddingTop: 5 }}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Paper elevation={6}>
              <Typography variant="h4">URL Shortening Service</Typography>
              <form onSubmit={handleSubmit}>
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
                    value={conversion}
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
              </form>
            </Paper>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5} sx={{ marginTop: "10px" }}>
            <Paper elevation={5}>
              <Typography variant="body1">Result</Typography>
              <Typography variant="body2">{result}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
