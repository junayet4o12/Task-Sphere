// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import MainLayout from './MainLayout/MainLayout'
import Register from "./Authentications/Register/Register";
const MyRouts = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
]);

export default MyRouts;