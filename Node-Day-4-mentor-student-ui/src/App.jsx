import React, { useState, useEffect } from 'react'
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import axios from 'axios'

function App() {
  const [mentorName, setMentorName] = useState('');
  const [mentors, setMentors] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);

  const fetchMentors = async () => {
    const response = await axios.get('http://localhost:3000/api/mentor')
    setMentors(response.data);
  }

  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:3000/api/student')
    setStudents(response.data);
  }

  useEffect(() => {
    fetchMentors();
    fetchStudents();
  }, []);

  const createMentor = async () => {
    const response = await axios.post('http://localhost:3000/api/mentor', { name: mentorName });
    setMentorName('');
    fetchMentors();
  }

  const createStudent = async () => {
    const response = await axios.post('http://localhost:3000/api/student', { name: studentName });
    setStudentName('');
    fetchStudents();
  }

  return (
    <Container>
      <h1>Mentor-Student Management</h1>
      <TextField label="Mentor Name" value={mentorName} onChange={(e) => setMentorName(e.target.value)} />
      <Button onClick={createMentor} variant='contained' color='primary'>Create Mentor</Button>
      <br></br>
      <TextField label="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
      <Button onClick={createStudent} variant='contained' color='primary'>Create Student</Button>
      <br></br>
      <h2>Mentors</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentors.map((mentor) => (
              <TableRow key={mentor.id}>
                <TableCell component="th" scope="row">
                  {mentor.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <h2>Students</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell component="th" scope="row">
                  {student.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default App
