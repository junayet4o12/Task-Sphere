// import React from 'react';


import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Authentications/AuthProviders";

const useGoogleLogin = () => {
    const navigate = useNavigate()
    const { user, googleLogIn } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const handlegooglelogin = () => {

        googleLogIn()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    email: res?.user?.email,
                    name: res?.user?.displayName,
                    image: res?.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res?.data);
                        Swal.fire({
                            title: "Logged in Successfully..",
                            showClass: {
                                popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                            },
                            hideClass: {
                                popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                            }
                        });
                        navigate('/')
                    })


            })
            .catch(err => {
                console.log(err);
            })
    }
    return handlegooglelogin
};

export default useGoogleLogin;