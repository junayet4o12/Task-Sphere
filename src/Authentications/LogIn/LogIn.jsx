// import React from 'react';
import { motion } from "framer-motion"
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GiArchiveRegister } from 'react-icons/gi';
import { MdLogin } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginphoto from '../../assets/login.jpg'
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import { AuthContext } from "../AuthProviders";
import { FcGoogle } from "react-icons/fc";
const LogIn = () => {
    const { loginUser } = useContext(AuthContext)
    const loginwithgoogle = useGoogleLogin()
    const [showpass, setshowpass] = useState(true);
    const [err, seterr] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    // data.email, data.password
    const inputStyle = 'w-full  sm:w-[450px]  bg-gray-50 p-3 px-10 rounded-lg input input-bordered input-info'
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const onSubmit = async (data) => {
        seterr('')
        const email = data?.email;
        const password = data?.password;
        loginUser(email, password)
            .then(res => {
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
                navigate('/', { replace: true })
            })
            .catch(err => {
                seterr(err?.message)
            })

    }
    const handlegooglelogin = () => {
        seterr('')
        loginwithgoogle()
    }
    return (
        <div >
            <Helmet>
                <title>Mediserve Mobilize | LogIn</title>
            </Helmet>
            <div className="py-7 px-7 flex flex-row-reverse  overflow-hidden">
                <motion.div
                    initial={{ y: 100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }} className='w-[50%]  justify-center hidden lg:block items-center'>
                    <div className='h-full flex justify-center items-center'>
                        <img className='w-[500px] h-[400px]  object-cover' src={loginphoto} alt="" />
                    </div>
                </motion.div>
                <motion.form onSubmit={handleSubmit(onSubmit)}
                    initial={{ y: -100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-[550px]  mx-auto ">

                    <div className="mx-auto w-[100%] p-5  pb-10 text-black  ">
                        <h2 className="text-3xl font-bold uppercase  text-center mb-6 text-gray-600 ">Log In</h2>
                        <div className="flex flex-col justify-center items-center gap-5 text-sm font-medium">



                            <div>
                                <p className="px-2 pb-1 text-sm">Write your email</p>
                                <div className="relative w-full sm:w-[450px]">
                                    <input required name="email" {...register("email", { required: true })} className={inputStyle} type="email" placeholder="email" />
                                    {errors.email && <span className='text-red-500 text-sm'>Email is required</span>}
                                    <p className='text-xl absolute top-3.5 left-3 '><HiOutlineMail></HiOutlineMail></p>
                                </div>
                            </div>

                            <div>
                                <p className="px-2 pb-1 text-sm">Write your given pass </p>
                                <div className="relative w-full sm:w-[450px]">
                                    <input
                                        type={showpass ? 'password' : 'text'} name="password" {...register("password", {
                                            required: true
                                        })} className={inputStyle} placeholder="password" />
                                    <p className='text-xl absolute top-3 left-3 '><RiLockPasswordLine></RiLockPasswordLine></p>
                                    <p onClick={() => (setshowpass(!showpass))} className={`absolute top-2.5 right-0 mr-2 cursor-pointer text-lg  p-1`}>{showpass ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>}</p>
                                    {errors?.password?.type === 'required' && <span className='text-red-500 text-sm'>Password invalid</span>}
                                    <span className='text-red-500 text-sm font-medium'>{err}</span>

                                    <div>

                                    </div>
                                    <div className='flex justify-between p-2 gap-3'>
                                        <p className='text-sm font-medium'>Don&apos;t have an account? <br /> <Link to='/register'><span className='font-bold Register text-gray-700 hover:text-gray-900 cursor-pointer flex gap-1 hover:underline items-center'><GiArchiveRegister></GiArchiveRegister>Register</span></Link></p>

                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col  justify-center items-center gap-2'>
                                <button type='submit' className='btn w-full transition-all duration-200  ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400'><MdLogin></MdLogin> Log In</button>
                                <p>Or</p>
                                <p
                                    onClick={handlegooglelogin}
                                    className='btn transition-all duration-200  ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400'>Log in with <span className="text-lg"><FcGoogle></FcGoogle></span></p>
                            </div>
                        </div>

                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default LogIn;