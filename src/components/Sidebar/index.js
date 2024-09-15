import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { ReactComponent as GroupIcon } from "../../assets/group.svg";
import {
  Home as HomeIcon,
  Event as EventIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" className="sidebar">
      <Box className="sidebar-top-section">
        <Box className="sidebar-logo">
          <GroupIcon width="130px" height="130px" />
        </Box>
        <List>
          <ListItem
            button
            className="sidebar-list-item"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
            <ListItemText primary="Home" className="sidebar-list-item-text" />
          </ListItem>
          <ListItem
            button
            className="sidebar-list-item"
            onClick={() => navigate("/")}
          >
            <EventIcon />
            <ListItemText
              primary="My Events"
              className="sidebar-list-item-text"
            />
          </ListItem>
        </List>
      </Box>

      <Divider />

      <Box className="sidebar-bottom-section">
        <List>
          <ListItem
            button
            className="sidebar-list-item"
            onClick={() => navigate("/account")}
          >
            <AccountCircleIcon />
            <ListItemText
              primary="Account"
              className="sidebar-list-item-text"
            />
          </ListItem>
          <ListItem
            button
            className="sidebar-list-item"
            onClick={() => navigate("/settings")}
          >
            <SettingsIcon />
            <ListItemText
              primary="Settings"
              className="sidebar-list-item-text"
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
