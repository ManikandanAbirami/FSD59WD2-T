const mongoose = require("mongoose");

// Define the schema for a mentor
const mentorSchema = new mongoose.Schema({
  name: {
    type: String, // The name of the mentor is string
    required: true, // The name is required
  },
});

// Create a model from schema and export it
const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;
