const express = require("express");
const Mentor = require("../models/mentor");
const Student = require("../models/student");

const router = express.Router();

// API to create Mentor
router.post("/mentor", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to create Student
router.post("/student", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to get mentors
router.get("/mentor", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.send(mentors);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to get students
router.get("/student", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
