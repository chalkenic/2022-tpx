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

import axios from "axios";

function App() {
  // Three states to hold page data when uploading and changing conversion information.
  const [conversion, setConversion] = useState("encode");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  // Update convert choice whenever button group is changed.
  const handleConvertChange = (e) => {
    setConversion(e.target.value);
  };

  // Change url data whenever text field is changed.
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    //Prevent page from reloading after request.
    e.preventDefault();

    // Url field must contain data.
    if (url !== "") {
      // Switch statement for each type of conversion option. Error handling if none selected.
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
      {/* Mui components used to provide a clean form factor */}
      <Box sx={{ paddingTop: 5 }}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Paper elevation={6}>
              <Typography variant="h4">URL Shortening Service</Typography>
              <form onSubmit={handleSubmit}>
                <FormControl sx={{ paddingBottom: 4 }} variant="outlined">
                  {/* Text field handles entries made relating to the url of choice. */}
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
                  {/* Button group handles the conversion type that the user wants. */}
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
          {/* Results of any API calls made to server are pasted into below tags. */}
          <Grid item xs={1}></Grid>
          <Grid item xs={5} sx={{ marginTop: "10px" }}>
            <Typography variant="body1">Result</Typography>
            <Typography variant="body2">{result}</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
