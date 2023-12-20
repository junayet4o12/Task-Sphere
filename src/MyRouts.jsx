// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./assets/MainLayout/MainLayout";
import Home from "./Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";

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
            }
        ]
    },
]);

export default MyRouts;