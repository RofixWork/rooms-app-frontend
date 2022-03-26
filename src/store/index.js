import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./slices/GeneralSlice";
import roomReducer from "./slices/RoomSlice";
export const store = configureStore({
  reducer: {
    general: generalReducer,
    room: roomReducer,
  },
});
