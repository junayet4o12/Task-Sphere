// import React from 'react';

import useAuth from "../../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth()
    return (
        <div className="py-14 px-3">
            <div className="flex flex-col justify-center items-center border-2 w-full max-w-[500px] mx-auto p-6 rounded-lg border-blue-400">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src={user?.photoURL} alt="" />


                </div>
                <p className="text-2xl font-bold text-black p-3 text-center">{user.displayName}</p>
                <p className="text-sm font-bold text-black p-3 text-center">Email: <span>{user.email}</span></p>
            </div>
        </div>
    );
};

export default Profile;