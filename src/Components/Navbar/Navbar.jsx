// import React from 'react';

import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()
    const handleHome = () => {
        navigate('/')
    }
    const navli = <>
        <li><NavLink className='navstyle2' to={'/'}>Home</NavLink></li>
        {
            user ? <>
                <li><NavLink className='navstyle2' to={'/dashboard/allTasks'}>Dashboard</NavLink></li>
                <li><NavLink className='navstyle2' to={'/profile'}>Profile</NavLink></li>
            </> : ''
        }
        <li><NavLink className='navstyle2' to={'/clients'}>Our Clients</NavLink></li>


    </>
    return (
        <div>
            <div className="navbar bg-blue-200">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 px-5 gap-y-1 shadow  rounded-box w-max navstyle bg-blue-300">
                            {navli}
                        </ul>
                    </div>
                    <h2 onClick={handleHome} className="text-xl font-bold uppercase cursor-pointer">Task <br /> <span className="ml-5 text-[#2c3e50]">Sphere</span></h2>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1 navstyle">
                        {navli}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ? <button onClick={() => logOut()} className=" btn  hover:text-black transition-all duration-200 ease-in-out uppercase bg-transparent hover:bg-transparent border-blue-400 border-2 rounded-lg hover:rounded-3xl hover:border-blue-400 w-[100px]">LogOut</button> : <Link to={'/login'}>
                            <button className=" btn  hover:text-black transition-all duration-200 ease-in-out uppercase bg-transparent hover:bg-transparent border-blue-400 border-2 rounded-lg hover:rounded-3xl hover:border-blue-400 w-[100px]">Login</button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;