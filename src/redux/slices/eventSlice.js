import { createSlice } from "@reduxjs/toolkit";
import { events } from "../../mocks/events";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    data: events,
    filteredData: events,
  },
  reducers: {
    loadEvents: (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    updateEvent: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.data.findIndex((event) => event.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updates };
        state.filteredData[index] = { ...state.data[index], ...updates };
      }
    },
    deleteEvent: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter((event) => event.id !== id);
      state.filteredData = state.filteredData.filter(
        (event) => event.id !== id
      );
    },
    createEvent: (state, action) => {
      const newEvent = action.payload;
      state.data.unshift(newEvent);
      state.filteredData.unshift(newEvent);
    },
    searchEvents: (state, action) => {
      const searchTerm = action.payload;
      state.filteredData = state.data.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.minAttendees.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.status
            ? event.status.toLowerCase().includes(searchTerm.toLowerCase())
            : false) ||
          event.creator.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  },
});

export const {
  loadEvents,
  updateEvent,
  deleteEvent,
  createEvent,
  searchEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
