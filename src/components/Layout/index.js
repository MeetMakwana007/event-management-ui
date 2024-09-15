import React from "react";
import Sidebar from "../Sidebar";
import { Box } from "@mui/material";
import Header from "../Header";
import "./index.css";

const Layout = ({ children, componentName }) => {
  return (
    <Box className="layout-container">
      <Sidebar />
      <Box component="main" className="layout-main">
        <Header componentName={componentName} />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
