import React, { useState } from 'react'
import axios from 'axios'

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const response = await fetch('http://localhost:3000/api/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ username, password })
    //     });
    //     const data = await response.json();
    //     console.log(data);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/register', { username, password });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username'
                    value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder='Password'
                    value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register