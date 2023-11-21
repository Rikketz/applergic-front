import React from 'react'
import {Navigate} from 'react-router-dom';

const AuthRoute = ({component}) => {
    const token = localStorage.getItem("token")
    if(token) return component
    if(!token) return (<Navigate to="/login"/>)
}

export default AuthRoute

