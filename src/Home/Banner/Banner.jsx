// import React from 'react';
import { Link } from 'react-router-dom';
import bannerimg from '../../assets/calendar-with-checklist-date-schedule-3d-icon.jpg'
const Banner = () => {
    return (
        <div>
            <div className="hero min-h-[497px]  bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bannerimg})` }}>
                <div className="hero-overlay bg-opacity-85"></div>
                <div className="hero-content text-center text-white">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-4xl font-bold">Master Your Productivity</h1>
                        <p className="mb-5 font-medium">Elevate your productivity with TaskSphere – Your Ultimate Task Management Solution. Seamlessly organize, prioritize, and accomplish your tasks with intuitive features designed to streamline your workflow.</p>
                        <Link to={'/dashboard'}>
                            <button className="btn transition-all duration-200 text-white ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400">Let&apos;s Explore</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;