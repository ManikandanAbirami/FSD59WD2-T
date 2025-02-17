import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (!user) {
        console.log("Private Route", user);
        return <Navigate to="/login" />
    }

    return children;
}

export default PrivateRoute