import mongoose from "mongoose";

const reservedRoomsSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  checkin: {
    type: String,
  },
  checkout: {
    type: String,
  },
  adult: {
    type: String,
  },
  children: {
    type: String,
  },
  img: {
    type: String,
  },
  desc: {
    type: String,
  },
  price: {
    type: String,
  },
  rating: {
    type: String,
  },
  title: {
    type: String,
  },
});

mongoose.models = {};

export default mongoose.model("reserve_rooms", reservedRoomsSchema);
