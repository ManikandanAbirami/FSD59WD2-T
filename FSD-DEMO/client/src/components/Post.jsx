import React, { useContext } from 'react';
import { Card, CardHeader, CardContent, CardMedia, Typography, IconButton, Avatar } from '@mui/material';
import { Favorite, Comment } from '@mui/icons-material';
import AuthContext from '../context/AuthContext';
import http from '../../utils/http';

function Post({ post }) {
    const { user } = useContext(AuthContext);

    const handleLike = async () => {
        try {
            await http.put(`/post/like/${post._id}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleComment = async () => {
        const comment = prompt('Enter your comment');
        debugger
        if (comment) {
            try {
                await http.post(`/post/comment/${post._id}`, { text: comment });
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <Card>
            <CardHeader
                avatar={<Avatar src={post.user.profilePicture} />}
                title={post.user.username}
                subheader={new Date(post.date).toLocaleString()}
            />
            <CardMedia component="img" image={"https://picsum.photos/200/300"} height="194" alt="Post image" />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.content}
                </Typography>
            </CardContent>
            <CardContent>
                <IconButton onClick={handleLike}>
                    <Favorite color={post.likes.includes(user._id) ? "error" : "default"} />
                </IconButton>
                <IconButton onClick={handleComment}>
                    <Comment />
                </IconButton>
            </CardContent>
        </Card>
    )
}

export default Post