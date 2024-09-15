import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { CloudUpload, KeyboardArrowDown } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../../redux/slices/eventSlice";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  dateTime: Yup.date().required("Date and time is required"),
  ticketPrice: Yup.number().positive("Price must be positive"),
  minAttendees: Yup.number()
    .positive("Number must be positive")
    .integer("Must be an integer")
    .required("Minimum number of attendees is required"),
  genres: Yup.string(),
  expiryTime: Yup.string(),
});

const EventDetailsForm = ({ open, onClose, initialData }) => {
  const user = useSelector((state) => state.login.user);
  const [thumbnail, setThumbnail] = useState(null);
  useEffect(() => {
    if (initialData) setThumbnail(initialData.imageUrl);
  }, [initialData]);
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    const eventData = {
      ...values,
      imageUrl: thumbnail,
    };

    if (initialData) {
      dispatch(
        updateEvent({
          updates: eventData,
          id: initialData.id,
        })
      );
    } else {
      dispatch(
        createEvent({
          id: Date.now(),
          ...eventData,
          status: "Pending",
          creator: user?.username,
        })
      );
    }

    setSubmitting(false);
    setThumbnail(null);
    onClose();
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnail(url);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setThumbnail(null);
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle className="dialog-title">Event details</DialogTitle>
      <DialogContent className="dialog-content">
        <Formik
          initialValues={
            initialData
              ? initialData
              : {
                  title: "",
                  description: "",
                  dateTime: "",
                  ticketPrice: "",
                  minAttendees: "",
                  genres: "",
                  expiryTime: "",
                }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="event-form">
              <Box display="flex" gap={2}>
                <Box
                  className="thumbnail-upload"
                  sx={{
                    width: "50%",
                    height: "212px",
                    backgroundColor: "#333333",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1,
                  }}
                >
                  {thumbnail ? (
                    <Typography>Uploaded successfully</Typography>
                  ) : (
                    <>
                      <Typography variant="body2">Thumbnail</Typography>
                      <input
                        accept="image/*"
                        id="thumbnail-upload"
                        type="file"
                        hidden
                        onChange={handleThumbnailChange}
                      />
                      <label htmlFor="thumbnail-upload">
                        <IconButton
                          disabled={thumbnail}
                          component="span"
                          className="upload-button"
                          sx={{ color: "white" }}
                        >
                          <CloudUpload />
                        </IconButton>
                      </label>
                    </>
                  )}
                </Box>
                <Box
                  mt={1}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  flex="1"
                >
                  <Field name="dateTime">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Date and time"
                        type="datetime-local"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={touched.dateTime && Boolean(errors.dateTime)}
                        helperText={touched.dateTime && errors.dateTime}
                        className="form-field"
                      />
                    )}
                  </Field>
                  <Field name="ticketPrice">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Ticket price"
                        variant="outlined"
                        fullWidth
                        error={
                          touched.ticketPrice && Boolean(errors.ticketPrice)
                        }
                        helperText={touched.ticketPrice && errors.ticketPrice}
                        className="form-field"
                      />
                    )}
                  </Field>
                  <Field name="minAttendees">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Minimum number of attendees"
                        variant="outlined"
                        fullWidth
                        error={
                          touched.minAttendees && Boolean(errors.minAttendees)
                        }
                        helperText={touched.minAttendees && errors.minAttendees}
                        className="form-field"
                      />
                    )}
                  </Field>
                </Box>
              </Box>
              <Field name="title">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    className="form-field"
                  />
                )}
              </Field>
              <Field name="description">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    className="form-field"
                  />
                )}
              </Field>
              <Box display="flex" gap={2}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className="form-field"
                >
                  <InputLabel id="genres-label">Genres</InputLabel>
                  <Field name="genres">
                    {({ field }) => (
                      <Select
                        {...field}
                        labelId="genres-label"
                        label="Genres"
                        IconComponent={KeyboardArrowDown}
                      >
                        <MenuItem value="Popular">Popular</MenuItem>
                        <MenuItem value="Rock">Rock</MenuItem>
                        <MenuItem value="Jazz">Jazz</MenuItem>
                      </Select>
                    )}
                  </Field>
                </FormControl>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className="form-field"
                >
                  <InputLabel id="expiry-time-label">Expiry time</InputLabel>
                  <Field name="expiryTime">
                    {({ field }) => (
                      <Select
                        {...field}
                        labelId="expiry-time-label"
                        label="Expiry time"
                        IconComponent={KeyboardArrowDown}
                      >
                        <MenuItem value="5">5 Min</MenuItem>
                        <MenuItem value="10">10 Min</MenuItem>
                        <MenuItem value="15">15 Min</MenuItem>
                      </Select>
                    )}
                  </Field>
                </FormControl>
              </Box>
              <DialogActions className="dialog-actions">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="next-btn"
                >
                  {initialData ? "Update" : "Next"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsForm;
