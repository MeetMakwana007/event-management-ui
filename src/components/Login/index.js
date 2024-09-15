import React, { useState } from "react";
import { Grid, Box, TextField, Button, Typography, Link } from "@mui/material";
import remoteIcon from "../../assets/remote.png";
import { ReactComponent as GroupIcon } from "../../assets/group.svg";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/slices/loginSlice";
import "./index.css";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (username && password) {
      setError("");
      dispatch(loginSuccess({ username }));
      onLogin({ username, password });
    } else {
      setError("Invalid credentials.");
      dispatch(loginFailure("Invalid credentials."));
    }
  };

  return (
    <Grid container className="login-container">
      <Grid item xs={12} md={6} className="login-form-section">
        <Box component="form" className="login-form">
          <Typography variant="h4" className="login-title">
            Login
          </Typography>
          <Typography variant="body1" className="login-description">
            Lorem ipsum dolor sit amet consectetur. In viverra eget orci amet
            cras.
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {error && (
            <Typography variant="body2" className="login-error">
              {error}
            </Typography>
          )}
          <Link href="#" className="login-forgot-password">
            Forgot Password?
          </Link>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="login-button"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant="body2" className="login-register">
            Don't have an account?{" "}
            <Link href="#" className="login-register-link">
              Register
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} className="login-image-section">
        <Box className="login-image-container">
          <Box className="login-group-icon">
            <GroupIcon width="150px" height="150px" />
          </Box>
          <Box
            component="img"
            src={remoteIcon}
            alt="Controller"
            className="login-controller-image"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
