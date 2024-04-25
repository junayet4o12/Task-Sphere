// import React from 'react';

import useAuth from "../../hooks/useAuth";
import unknownUser from '../../assets/unknownUser.png'
import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Dashboard = () => {
    const { user } = useAuth()

    return (
        <div className="relative">
           <div className="sticky top-0 z-10">
                <Navbar></Navbar>
            </div>
            <div className="flex">

                <div className="w-[150px] sm:w-[210px] md:w-[220px] lg:w-[230px] min-h-screen  bg-[#3498db] pt-3 text-white">

                    <div className="flex gap-3 items-center ml-2">
                        <Link to='/profile'>
                            <div className="w-10 h-10  rounded-full overflow-hidden">
                                <img src={user?.photoURL ? user?.photoURL : unknownUser} />

                            </div>
                        </Link>
                        <p className="hidden sm:block text-sm font-bold">{user?.displayName}</p>
                    </div>
                    <hr className="mt-3 w-[95%] mx-auto" />
                    <ul className="mt-7 pl-2 pr-5 uppercase text-xs flex flex-col gap-5 navLinkParent">
                        <NavLink   to={'/dashboard/allTasks'}><li className="navLinkStyle">All Tasks</li></NavLink>

                        <NavLink   to={'/dashboard/createTask'}><li className="navLinkStyle">Create  Task</li></NavLink>

                        <NavLink   to={'/dashboard/handleTask'}><li className="navLinkStyle">Manage Task</li></NavLink>

                    </ul>
                </div>
                <div className="flex-grow p-5">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;