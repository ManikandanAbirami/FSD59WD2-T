const mongoose = require("mongoose");

// Define the schema for a mentor
const UserSchema = new mongoose.Schema({
  username: {
    type: String, // The name of the mentor is string
    required: true, // The name is required
  },
  password: {
    type: String, // The name of the mentor is string
    required: true, // The name is required
  },
});

// Create a model from schema and export it
const User = mongoose.model("User", UserSchema);
module.exports = User;
