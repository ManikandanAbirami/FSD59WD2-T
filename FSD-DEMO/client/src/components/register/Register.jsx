import React, { useContext, useState } from 'react'
import { Button, TextField, Typography, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import http from '../../../utils/http';

function Register({ user }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await http.post("/user", { name, email, password });
            await login(email, password);
            navigate('/feed'); // Navigate to the feed page after successful registration and login
        } catch (err) {
            console.error('Registration failed', err);
            if (err.response && err.response.status === 400) {
                setError(err.response.data.error);
            }
        }
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </TextField>
                <TextField
                    label="Email"
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </TextField>
                <TextField
                    label="Password"
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </TextField>
                <Button type='submit' variant='contained' color='primary' fullWidth>Register</Button>
            </form>
        </Container>
    )
}

export default Register