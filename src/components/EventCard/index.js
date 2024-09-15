import React from "react";
import { Box, IconButton, Badge, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { formatAttendees } from "../../utils/format";
import "./index.css";

const EventCard = ({
  event: { id, title, minAttendees: attendees, status, creator, imageUrl },
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <Box className="event-card">
        <Box
          className="image-container"
          sx={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <IconButton size="small" className="edit" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete} size="small" className="delete">
            <DeleteIcon />
          </IconButton>
        </Box>

        <Badge
          badgeContent={`${formatAttendees(attendees)} Attendees`}
          className="attendees-badge"
        />
        {status && (
          <Badge
            badgeContent={status}
            className={`status-badge status-badge--${status}`}
          />
        )}
      </Box>
      <Box className="info">
        <Box className="avatar" />
        <Box>
          <Typography fontWeight="bold">{title}</Typography>
          <Typography fontSize="13px">{creator}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default EventCard;
