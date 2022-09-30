import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from '@mui/material/Snackbar';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CssBaseline from "@mui/material/CssBaseline";
import Alert from '@mui/material/Alert';

export default function FormSesion({
  signUpLink,
  formData,
  inputStates,
  errors,
  handleClick,
  handleSnackBar
})
{
  const [showPassword, setshowPassword] = useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%"
          }}
        >
          <Typography variant="h4" component="div" textAlign="center">
            {formData.formTitle}
          </Typography>
          <TextField
            id="user-name"
            label={errors.userExists ? "Usuario ya existe" : "Nombre de usuario"}
            type="text"
            margin="normal"
            required
            fullWidth
            helperText={errors.userName ? errors.userName : ''}
            value={inputStates.userName}
            onChange={(event) => inputStates.setUserName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            helperText={errors.password ? errors.password : ''}
            value={inputStates.password}
            onChange={(event) => inputStates.setPassword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => setshowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Button
            style={{ Width: "100%", height: "7vh" }}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick}
          >
            {formData.buttonText}
          </Button>
        </Box>
        {signUpLink && 
          <Link href="/login/sign-up" variant="body2">
            Registrarse
          </Link>
        }
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={handleSnackBar.openSnackBar}
        onClose={() => handleSnackBar.setOpenSnackBar(false)}
      >
        <Alert severity="error">{handleSnackBar.message}</Alert>
      </Snackbar>
    </React.Fragment>
  );
}