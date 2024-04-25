// import React from 'react';
import { MdOutlineTask } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineManageHistory } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import unknownUser from '../../assets/unknownUser.png'
import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
const Dashboard = () => {
    const { user } = useAuth()
    const screenWidth = window.innerWidth <= 640;
    const [longSideBar, setLongSideBar] = useState(!screenWidth)
    const NavStyle = 'navLinkStyle flex items-center gap-2 overflow-hidden whitespace-no-wrap'
    const NavTextStyle = `${longSideBar ? 'block' : 'hidden'} whitespace-no-wrap`

    return (
        <div className="relative">
            <div className="sticky top-0 z-10">
                <Navbar></Navbar>
            </div>
            <div className="flex relative">

                <div className={`${!longSideBar ? 'min-w-[70px] w-[70px]' : 'w-[150px] sm:w-[210px] md:w-[220px] lg:w-[230px]'} min-h-[calc(100vh-72px)]  max-h-[calc(100vh-72px)] overflow-y-auto  bg-[#3498db] text-white pt-14 transition-all duration-500 sticky top-[72px]`}>
                    <div>
                        <div className="">
                            <button className="btn text-2xl font-normal btn-sm absolute top-0 right-0 rounded-none rounded-bl-sm w-[70px] bg-transparent border-0 border-b-2 border-l-2 text-white flex justify-center items-center h-8 border-white hover:bg-transparent" onClick={() => setLongSideBar(!longSideBar)}>{longSideBar ? '<' : '>'}</button>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center ml-4">
                        <Link to='/profile'>
                            <div className="w-10 h-10  rounded-full overflow-hidden">
                                <img src={user?.photoURL ? user?.photoURL : unknownUser} />

                            </div>
                        </Link>
                        <p className={`text-sm font-bold ${!longSideBar ? 'hidden' : 'hidden sm:block'} whitespace-nowrap`}>{user?.displayName?.split(' ')[0]}</p>
                    </div>
                    <hr className="mt-3 w-[95%] mx-auto" />
                    <ul className="mt-7 pl-2 pr-5 uppercase text-xs flex flex-col gap-5 navLinkParent">
                        <NavLink to={'/dashboard/allTasks'}><li className={`${NavStyle}`}><span className="text-2xl"><MdOutlineTask /></span><span className={`${NavTextStyle} whitespace-nowrap`}>All Tasks</span></li></NavLink>

                        <NavLink to={'/dashboard/createTask'}><li className={`${NavStyle}`}><span className="text-2xl"><IoCreateOutline /></span><span className={`${NavTextStyle} whitespace-nowrap`}>Create  Task</span></li></NavLink>

                        <NavLink to={'/dashboard/handleTask'}><li className={`${NavStyle} `}><span className="text-2xl"><MdOutlineManageHistory /></span><span className={`${NavTextStyle} whitespace-nowrap`}>Manage Task</span></li></NavLink>

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