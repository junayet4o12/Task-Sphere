/* eslint-disable react/prop-types */
// import React from 'react';

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const PrivateRouts = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()
    if (loading) {
        return ''
    }
    if (user) {
        return <div>
            {children}
        </div>

    }
    return <Navigate to={'/login'} state={{from: location}}></Navigate>;
};

export default PrivateRouts;