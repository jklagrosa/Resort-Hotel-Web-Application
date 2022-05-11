import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
  },
  reducers: {
    GET_ALL_ROOMS_REDUCER: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const { GET_ALL_ROOMS_REDUCER } = roomSlice.actions;

export default roomSlice.reducer;
