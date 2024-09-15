import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  CircularProgress,
} from "@mui/material";
import EventCard from "../EventCard";
import { useDispatch, useSelector } from "react-redux";
import {
  searchEvents,
  deleteEvent,
  loadEvents,
  updateEvent,
} from "../../redux/slices/eventSlice";
import { checkExpiryStatus } from "../../utils/expiryStatus";
import EventFormModal from "../CreateEventForm";
import "./index.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const eventsData = useSelector((state) => state.events.data);
  const filteredEventsData = useSelector((state) => state.events.filteredData);
  const loading = useSelector((state) => state.events.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(
        loadEvents(
          eventsData?.map((item) => ({
            ...item,
            status: checkExpiryStatus(item),
          }))
        )
      );
    }, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch, eventsData]);

  useEffect(() => {
    dispatch(loadEvents(eventsData));
  }, [dispatch, eventsData]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchEvents(searchTerm));
    }
  }, [searchTerm, dispatch, eventsData]);

  const handleEdit = (event) => {
    setEventToEdit(event);
    setOpen(true);
  };

  const handleUpdateEvent = (updatedEventData) => {
    dispatch(updateEvent(updatedEventData));
    setOpen(false);
  };

  const handleSearch = () => {
    dispatch(searchEvents(searchTerm));
  };

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <Layout componentName={"Home"}>
      <Box className="dashboard-container">
        <Box className="dashboard-header">
          <Box className="header-search-container">
            <TextField
              variant="outlined"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events by name, players, genre or game"
              className="header-search-input"
            />
            <Button
              variant="contained"
              className="header-search-button"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>

          <Button
            variant="contained"
            className="add-event-button"
            onClick={() => {
              setEventToEdit(null);
              setOpen(true);
            }}
          >
            Add New Event
          </Button>
        </Box>

        <EventFormModal
          open={open}
          onClose={() => setOpen(false)}
          initialData={eventToEdit}
          onSubmit={handleUpdateEvent}
        />

        <Box className="dashboard-content">
          <Typography className="events-title" variant="h5" gutterBottom>
            My Events
          </Typography>
          {loading ? (
            <Box className="loading-container">
              <CircularProgress />
            </Box>
          ) : (
            <Grid container className="events-grid" spacing={3}>
              {(searchTerm ? filteredEventsData : eventsData).map((event) => (
                <Grid
                  item
                  className="events-grid-item"
                  xs={12}
                  sm={6}
                  md={3}
                  key={event.id}
                >
                  <EventCard
                    event={{ ...event, status: checkExpiryStatus(event) }}
                    onDelete={() => handleDelete(event.id)}
                    onEdit={() => handleEdit(event)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
