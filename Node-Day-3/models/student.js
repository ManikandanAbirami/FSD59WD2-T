const mongoose = require("mongoose");

// Define the schema for a student
const studentSchema = new mongoose.Schema({
  name: {
    type: String, // The name of the student is string
    required: true, // The name is required
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a mentor document
    ref: "Mentor", // The model to reference
  },
  previousMentors: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to a mentor document
      ref: "Mentor", // The model to reference
    },
  ],
});

// Create a model from schema and export it
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
