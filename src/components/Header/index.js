import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { Logout } from "@mui/icons-material";
import { logout } from "../../redux/slices/loginSlice";

const Header = ({ componentName }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };
  return (
    <Box className="header-container">
      <Typography variant="h4" fontWeight="bold">
        {componentName}
      </Typography>
      <Box className="header-user-info">
        <Typography fontWeight="bold">{user?.username}</Typography>
        <Box className="header-avatar" />
        <IconButton onClick={handleLogout} size="small" className="logout">
          <Logout />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
