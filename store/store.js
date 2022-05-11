import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import roomSlice from "../store/rooms";

const store = configureStore({
  reducer: {
    roomSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
