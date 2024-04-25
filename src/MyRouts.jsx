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
import Clients from "./Components/Clients/Clients";
import Profile from "./Components/Profile/Profile";
import AllTasks from "./Components/Dashboard/AllTasks/AllTasks";
import TaskDetails from "./Components/Dashboard/TaskDetails/TaskDetails";
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
                path: '/clients',
                element: <Clients></Clients>
            },
            {
                path: '/Profile',
                element: <PrivateRouts><Profile></Profile></PrivateRouts>
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
    {
        path: '/dashboard',
        element: <PrivateRouts><Dashboard></Dashboard></PrivateRouts>,
        children: [
            {
                path: 'allTasks',
                element: <AllTasks/>
            },
            {
                path: '/dashboard/taskDetails/:id',
                element: <TaskDetails/>
            },
            {
                path: 'createTask',
                element: <CreateTask></CreateTask>
            },
            {
                path: 'previousTask',
                element: <SeePreviousTask></SeePreviousTask>
            },
            {
                path: 'handleTask',
                element: <HandleTask></HandleTask>
            },
            {
                path: '/dashboard/edit/:id',
                element: <EditTask> </EditTask>
            }
        ]
    },
]);

export default MyRouts;