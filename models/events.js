import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  name: {
    type: String,
  },
  event: {
    type: String,
  },
  event_desc: {
    type: String,
  },
  event_date: {
    type: String,
  },
  startat: {
    type: String,
  },
  endat: {
    type: String,
  },
});

mongoose.models = {};

export default mongoose.model("events", eventSchema);
