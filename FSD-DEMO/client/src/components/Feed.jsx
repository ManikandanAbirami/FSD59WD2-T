import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, CardContent, CardActions, IconButton, TextField, Box, Typography, Icon } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../context/AuthContext';
import http from '../../utils/http';

function Feed() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        http.get('/post').then(response => setPosts(response.data));
    }, []);

    const handleLike = async (postId) => {
        const post = posts.find(post => post._id === postId);

        const response = await http.put(`/post/like/${postId}`);
        setPosts(posts.map(post =>
            post._id === postId
                ? { ...post, likes: response.data } : post));
    }

    const handleComment = async (postId) => {
        const response = await http.post(`/post/comment/${postId}`, { text: comment });
        setPosts(posts.map(post =>
            post._id === postId
                ? { ...post, comments: response.data }
                : post
        ));
        // Clear comment fiekd after submitting
        setComment('');
    }

    const handleDeleteComment = async (postId, commentId) => {
        try {
            const response = await http.delete(`/post/comment/${postId}/${commentId}`);
            setPosts(posts.map(post =>
                post._id === postId
                    ? { ...post, comments: response.data }
                    : post
            ));
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    }
    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>Feed</Typography>
            {posts.map(post => (
                <Card key={post._id} sx={{ mb: 2, bgcolor: 'lightgrey' }}>
                    <CardContent>
                        <Typography variant='h6'>{post.user.username}</Typography>
                        <Typography variant='body1'>{post.content}</Typography>
                        {post.image &&
                            <img src={`/${post.image}`} alt="Post" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                        }
                        <Box sx={{ mt: 2 }}>
                            <Typography variant='body2' color="textSecondary">
                                {post.likes.length} likes
                            </Typography>
                            <Typography variant='body2' color="textSecondary">
                                {post.comments.length} comments
                            </Typography>
                            {post.comments.map((comment, index) => (
                                <Box key={index} display="flex" alignItems="center" sx={{ mt: 1 }} >
                                    <Typography variant='body2' sx={{ flexGrow: 1 }}>
                                        <strong>{comment.user.username}:</strong> {comment.text}
                                    </Typography>
                                    {comment.user._id === user.id && (
                                        <IconButton size="small" onClick={() => handleDeleteComment(post._id, comment._id)} color='secondary'>
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={() => handleLike(post._id)} color='primary'>
                            {post.likes.includes(user.id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                        </IconButton>
                        <TextField
                            label="Add a comment"
                            variant='outlined'
                            size="small"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ ml: 1, flexGrow: 1 }}
                        />
                        <IconButton onClick={() => handleComment(post._id)} color='primary'>
                            <CommentIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))
            }
        </Container >
    )
}

export default Feed