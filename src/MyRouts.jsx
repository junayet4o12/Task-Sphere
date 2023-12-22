// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import MainLayout from './MainLayout/MainLayout'
import Register from "./Authentications/Register/Register";
import LogIn from "./Authentications/LogIn/Login";
import PrivateRouts from "./PrivateRouts/PrivateRouts";
import CreateTask from "./Components/Dashboard/CreateTask/CreateTask";
import SeePreviousTask from "./Components/Dashboard/SeePreviousTask/SeePreviousTask";
import HandleTask from "./Components/Dashboard/HandleTask/HandleTask";
import EditTask from "./Components/Dashboard/EditTask/EditTask";
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
                path: '/dashboard',
                element: <PrivateRouts><Dashboard></Dashboard></PrivateRouts>,
                children: [
                    {
                        path: 'createtask',
                        element: <CreateTask></CreateTask>
                    },
                    {
                        path: 'previoustask',
                        element: <SeePreviousTask></SeePreviousTask>
                    },
                    {
                        path: 'handletask',
                        element: <HandleTask></HandleTask>
                    },
                    {
                        path: '/dashboard/edit/:id',
                        element: <EditTask> </EditTask>
                    }
                ]
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
        ]
    },
]);

export default MyRouts;