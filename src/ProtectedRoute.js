import React from "react"
import {Navigate, Outlet} from "react-router-dom"

const ProtectedRoute = () => {
    const user_token = sessionStorage.getItem("token");
    const loggedIn = localStorage.getItem("isLoggedIn");
    return (user_token !== undefined  && user_token !== null) || loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute;