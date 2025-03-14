import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    Password: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    freinds: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfiles: Number,
    impressions: Number,
  },
  { timestamp: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
