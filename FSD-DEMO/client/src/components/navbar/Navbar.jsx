import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
// import { NavLink } from 'react-router-dom'

// import "./Navbar.css"

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Social Media Dashboard
                </Typography>
                {user ? (
                    <>
                        <Button color='inherit' component={Link} to='/profile'>{user.username}</Button>
                        <Button color='inherit' onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color='inherit' component={Link} to='/login'>Login</Button>
                        <Button color='inherit' component={Link} to='/register'>Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
        // <nav className='navbar'>
        //     <NavLink to='/'>Home</NavLink>
        //     {!user && (
        //         <>
        //             <NavLink to='/login'>Login</NavLink>
        //             <NavLink to='/register'>Register</NavLink>
        //         </>
        //     )}
        //     {user && (
        //         <>
        //             <NavLink to='/profile'>Dashboard</NavLink>
        //             <NavLink to='/logout'>Logout</NavLink>
        //         </>
        //     )}
        // </nav>
    )
}

export default Navbar