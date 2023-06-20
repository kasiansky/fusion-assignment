import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

const theme = createTheme();

export default function Form() {
  // regexs for fields
  const domainRegex =
    /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;

  const serverPathRegex = /^[a-zA-Z0-9/]*$/;

  const portNumberRegex =
    /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;

  const emailRegex = /^[\w-\.()+-]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // port min and max number
  const minPortnumber = 0;
  const maxPortNumber = 65535;

  // validation function
  const validateWithRegex = (value, regex) => regex.test(value);

  const [actionType, setActionType] = React.useState("Advanced");
  const [userName, setUserName] = React.useState(null);
  const [password, setPassword] = useState(null);
  const [serverAddress, setServerAddress] = useState(null);
  const [serverPath, setServerPath] = useState(null);
  const [ssl, setSsl] = useState(false);

  const [port, setPort] = useState(null);

  const [errors, setErrors] = React.useState([]);

  const validate = (data) => {
    const errors = {};
    Object.entries(data).forEach(([name, value]) => {
      if (name === "userName") {
        if (!value) {
          errors.userName = "Required field.";
        } else if (!validateWithRegex(value, emailRegex)) {
          errors.userName = "Invalid user name";
        }
      }
      if (name === "password") {
        if (!value) {
          errors.password = "Required field.";
        }
      }
      if (name === "serverAddress") {
        if (value && !validateWithRegex(value, domainRegex)) {
          errors.serverAddress = "Server Address is invalid";
        }
      }
      if (name === "serverPath") {
        if (value && !validateWithRegex(value, serverPathRegex)) {
          errors.serverPath = "Server Path is invalid";
        }
      }
      if (name === "port") {
        if (value && !validateWithRegex(value, portNumberRegex)) {
          errors.port = "Port number is invalid";
        }
      }
    });
    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      setErrors({});
    }
    return Object.keys(errors).length;
  };

  const handleSubmit = () => {
    // event.preventDefault();
    const data = { userName, password, serverAddress };
    if (actionType === "Advanced") {
      data.port = port;
      data.serverPath = serverPath;
      data.ssl = ssl;
    }
    const isNotValid = validate(data);
    console.log("data", data);
    alert(
      `${
        isNotValid ? "Form is invalid." : "Form is valid"
      } Payload: ${JSON.stringify(data)}`
    );
  };

  const handleChangeAccountType = (e) => {
    setActionType(e.target.value);
  };

  const handlePortInput = (e) => {
    setPort(e.target.value);
  };
  const handleUserNameInput = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(e);
    setPassword(e.target.value);
  };

  const handleServerAddress = (e) => {
    setServerAddress(e.target.value);
  };

  const handleServerPath = (e) => {
    setServerPath(e.target.value);
  };

  const handleSSL = (e) => {
    setSsl(e.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" sx={{ mt: 1 }}>
            <Typography component="div" variant="body1">
              Account Type:
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={actionType}
              label="actionType"
              onChange={handleChangeAccountType}
            >
              <MenuItem value={"Advanced"}>Advanced</MenuItem>
              <MenuItem value={"Manual"}>Manual</MenuItem>
            </Select>
            <div>
              <hr />
            </div>
            User Name:{" "}
            <TextField
              error={!!errors?.userName}
              helperText={errors?.userName}
              margin="normal"
              fullWidth
              id="email"
              label="name@example.com"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleUserNameInput}
            />
            Password:
            <TextField
              error={!!errors?.password}
              helperText={errors?.password}
              fullWidth
              name="password"
              label="Required"
              onChange={handlePassword}
              type="password"
            />
            Server Address:
            <TextField
              error={!!errors?.serverAddress}
              helperText={errors?.serverAddress}
              margin="normal"
              fullWidth
              label="example.com"
              onChange={handleServerAddress}
            />
            {actionType === "Advanced" && (
              <>
                Server Path:
                <TextField
                  error={!!errors?.serverPath}
                  helperText={errors?.serverPath}
                  onChange={handleServerPath}
                  margin="normal"
                  fullWidth
                  label="/calendar/user"
                />
                <Grid container>
                  <Grid item xs>
                    Port:
                    <TextField
                      error={!!errors?.port}
                      helperText={errors?.port}
                      type="number"
                      margin="normal"
                      fullWidth
                      onChange={handlePortInput}
                      InputProps={{ inputProps: { min: 0, max: 10, step: 1 } }}
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      style={{ margin: "35px 0 0 10px" }}
                      control={
                        <Checkbox
                          color="primary"
                          onChange={handleSSL}
                          checked={ssl}
                        />
                      }
                      label="Use SSL"
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSubmit()}
          >
            SUBMIT{" "}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
