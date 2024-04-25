import axios from "axios";

// import React from 'react';
const axiosPublic = axios.create({
    // baseURL: 'https://task-sphere-backend.vercel.app'
    baseURL: 'http://localhost:3000'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;