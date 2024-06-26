// import React from 'react';

import { useContext, useState } from "react";
import { AuthContext } from "../AuthProviders";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebaseconfig";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion'
import { MdDriveFileRenameOutline, MdOutlineInsertPhoto, MdMailOutline, MdLogin } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { GiArchiveRegister } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import registerImg from '../../assets/register.jpg'
import toast from "react-hot-toast";
// import React from 'react';

const Register = () => {
    const { createUser } = useContext(AuthContext)
    const loginwithgoogle = useGoogleLogin()
    const [showpass, setshowpass] = useState(true);
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [err, seterr] = useState('')
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const inputStyle = 'w-full max-w-[280px] sm:max-w-full  sm:w-[450px]  bg-gray-50 p-3 px-10 rounded-lg input input-bordered input-info'
    const onSubmit = async (data) => {
        seterr('')
        const image = { image: data?.image[0] }

        const res = await axios.post(imgHostingApi, image, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const imgurl = res?.data?.data?.display_url
        createUser(data.email, data.password)
            .then(res => {
                updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: imgurl

                })
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: imgurl


                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    toast.success("Registered in successfully")
                                    reset();
                                    navigate('/')
                                }
                            })

                    })
                    .catch(err => {
                    })
            })
            .catch(err => {
                seterr(err?.message)
            })
    }
    const handlegooglelogin = () => {
        seterr('')
        loginwithgoogle()
        navigate('/')
    }
    return (
        <div >
            <Helmet>
                <title>TASK SPHERE | REGISTER</title>
            </Helmet>
            <div className="py-7 px-7 flex  overflow-hidden">
                <motion.div
                    initial={{ y: -100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }} className='w-[50%]  justify-center hidden lg:block items-center'>
                    <div className='h-full flex justify-center items-center'>
                        <img className='w-[500px] h-[400px]  object-cover' src={registerImg} alt="" />
                    </div>
                </motion.div>
                <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ y: 100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-[550px]  mx-auto ">

                    <div className="mx-auto w-[100%] p-5  pb-10 text-black  ">
                        <h2 className="text-3xl font-bold uppercase  text-center mb-6 text-gray-600 ">Register</h2>
                        <div className="flex flex-col justify-center items-center gap-5 text-sm font-medium">

                            <div>
                                <p className="px-2 pb-1 text-sm">Write your name</p>
                                <div className="relative w-full sm:w-[450px]">

                                    <input name="name" {...register("name", { required: true })} className={inputStyle} type="text" placeholder="Name" />
                                    {errors.name && <span className='text-red-500'>Name is required</span>}
                                    <p className='text-xl absolute top-3.5 left-3 '><MdDriveFileRenameOutline></MdDriveFileRenameOutline></p>
                                </div>
                            </div>
                            <div>
                                <p className="px-2 pb-1 text-sm">Choose your profile pic</p>
                                <div className="relative w-full sm:w-[450px]">
                                    <input name="image" {...register("image", { required: true })} className={`w-full max-w-[280px] sm:max-w-full  sm:w-[450px]  bg-gray-50  p-2 px-10 rounded-lg input input-bordered input-info`} type="file" placeholder="Image" />
                                    {errors.image && <span className='text-red-500'>Image is required</span>}
                                    <p className='text-xl absolute top-3.5 left-3 '><MdOutlineInsertPhoto></MdOutlineInsertPhoto ></p>
                                </div>
                            </div>
                            <div>
                                <p className="px-2 pb-1 text-sm">Write your email</p>
                                <div className="relative w-full sm:w-[450px]">
                                    <input required name="email" {...register("email", { required: true })} className={inputStyle} type="email" placeholder="email" />
                                    {errors.email && <span className='text-red-500'>Email is required</span>}
                                    <p className='text-xl absolute top-3.5 left-3 '><MdMailOutline></MdMailOutline></p>
                                </div>
                            </div>

                            <div>
                                <p className="px-2 pb-1 text-sm">Give a unique pass</p>
                                <div className="relative w-full sm:w-[450px]">
                                    <input

                                        type={showpass ? 'password' : 'text'} name="password" {...register("password", {
                                            required: true,
                                            minLength: 8,
                                            maxLength: 20,
                                            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
                                        })} className={inputStyle} placeholder="password" />
                                    <p className='text-xl absolute top-3 left-3 '><RiLockPasswordLine></RiLockPasswordLine></p>
                                    <p onClick={() => (setshowpass(!showpass))} className={`absolute top-2.5 right-0 mr-2 cursor-pointer text-lg  p-1`}>{showpass ? <BsEye></BsEye> : <BsEyeSlash></BsEyeSlash>}</p>
                                    {errors?.password?.type === 'required' && <span className='text-red-500'>Password invalid</span>}
                                    {errors?.password?.type === 'minLength' && <span className='text-red-500'>Password must be minimum 8 charecters</span>}
                                    {errors?.password?.type === 'maxLength' && <span className='text-red-500'>Password must be maximum 20 charecters</span>}
                                    {errors?.password?.type === 'pattern' && <span className='text-red-500'>Password must contain at least one digit, one lowercase letter, and one uppercase letter.</span>}
                                    <p className='text-red-500 text-sm'>{err}</p>
                                    <div>

                                    </div>
                                    <div className='flex justify-between p-2 gap-3'>
                                        <p className='text-sm font-medium'>Already have an Account? <br /> <Link to='/login'><span className='font-bold Register text-gray-700 hover:text-gray-900 cursor-pointer flex gap-1 hover:underline items-center'><GiArchiveRegister></GiArchiveRegister>Log in</span></Link></p>

                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col  justify-center items-center gap-2'>
                                <button type='submit' className='btn w-full transition-all duration-200  ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400'><MdLogin></MdLogin> Register</button>
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

export default Register;