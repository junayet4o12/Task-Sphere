// import React from 'react';

import useAuth from "../../hooks/useAuth";
import unknownUser from '../../assets/unknownUser.png'
import { NavLink, Outlet } from "react-router-dom";
const Dashboard = () => {
    const { user } = useAuth()
    
    return (
        <div>
            <div className="flex">

                <div className="w-[190px] sm:w-[210px] md:w-[220px] lg:w-[230px] min-h-screen  bg-[#3498db] pt-3 text-white">

                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10  rounded-full overflow-hidden">
                            <img src={user?.photoURL ? user?.photoURL : unknownUser} />

                        </div>
                        <p className="text-lg font-bold">{user?.displayName}</p>
                    </div>
                    <hr className="mt-3 w-[95%] mx-auto" />
                    <ul className="dashboardRouts mt-7 pl-2 pr-5 uppercase text-xs flex flex-col gap-5">
                        <li><NavLink className={'dashboardNavlinkStyle'} to={'/dashboard/createtask'}>Create  Task</NavLink></li>

                        <li><NavLink className={'dashboardNavlinkStyle'} to={'/dashboard/previoustask'}>See Previous Tasks</NavLink></li>

                        <li><NavLink className={'dashboardNavlinkStyle'} to={'/dashboard/handletask'}>Manage Task</NavLink></li>

                    </ul>
                </div>
                <div className="flex-grow ">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;