import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import http from '../../utils/http';

function NewPost() {
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }
        try {
            await http.post("/post", formData);
            navigate('/feed');
        } catch (err) {
            console.error('Failed to create post:', err);
        }
    }
    return (
        <Container maxWidth="sm">
            <Typography variant='h4' component='h1' gutterBottom>Create a Post</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Content"
                    margin='normal'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    variant='outlined'
                />
                <input type='file' onChange={(e) => setImage(e.target.files[0])}
                    accept='image/*' />
                <Button type='submit' variant='contained' color='primary' fullWidth>
                    Create Post
                </Button>
            </form>
        </Container>
    )
}

export default NewPost

