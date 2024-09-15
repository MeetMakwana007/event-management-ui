import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import eventsReducer from "./slices/eventSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    events: eventsReducer,
  },
});

export default store;
