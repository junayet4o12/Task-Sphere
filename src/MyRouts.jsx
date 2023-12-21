// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import MainLayout from './MainLayout/MainLayout'
import Register from "./Authentications/Register/Register";
import LogIn from "./Authentications/LogIn/Login";
import PrivateRouts from "./assets/PrivateRouts/PrivateRouts";
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
                element: <PrivateRouts><Dashboard></Dashboard></PrivateRouts>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            }
        ]
    },
]);

export default MyRouts;