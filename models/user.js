import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

mongoose.models = {};

export default mongoose.model("user", userSchema);
