// import React from 'react';
import { motion } from "framer-motion"
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const EditTask = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [err, seterr] = useState('')
    const inputStyle = 'w-full    bg-gray-50 p-3 px-10 rounded-lg input input-bordered input-info'
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const { data: singleTask, isLoading: singletaskLoading, refetch } = useQuery({
        queryKey: [`task ${id}`, id],
        queryFn: async () => {

            const res = await axiosPublic.get(`/singletask/${id}`)
            return res?.data
        }
    })
    if (singletaskLoading) {
        return ''
    }
    const onSubmit = async (data) => {
        seterr('')
        const title = data?.title;
        const deadline = data?.deadline;
        const priority = data?.priority;
        const description = data?.description;
        const task = {
            title,
            deadline,
            priority,
            description
        }
        axiosPublic.put(`/singletaskupdate/${id}`, task)
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
            .catch(err => {
            })

    }
    const priorities = [
        'Low',
        'Medium',
        'High'
    ]
    return (
        <div>
            <motion.form onSubmit={handleSubmit(onSubmit)}
                initial={{ y: -100, }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="  mx-auto ">

                <div className="p-5   pb-10 text-black  ">
                    <h2 className="text-3xl font-bold uppercase  text-center mb-6 text-gray-600 ">Create Task</h2>
                    <div className="flex flex-col justify-center items-center gap-5 text-sm font-medium ">



                        <div className="w-full max-w-[550px] ">
                            <p className="px-2 pb-1 text-sm">Task Title</p>
                            <div className="relative  w-full ">
                                <input defaultValue={singleTask?.title} required name="title" {...register("title", { required: true })} className={inputStyle} type="text" placeholder="Title" />
                                {errors.title && <span className='text-red-500 text-sm'>Title is required</span>}

                            </div>
                        </div>
                        <div className="w-full max-w-[550px]">
                            <p className="px-2 pb-1 text-sm">Task deadline</p>
                            <div className="relative w-full">
                                <input defaultValue={singleTask?.deadline} required name="deadline" {...register("deadline", { required: true })} className={inputStyle} type="date" placeholder="Deadline" />
                                {errors.deadline && <span className='text-red-500 text-sm'>Deadline is required</span>}

                            </div>
                        </div>
                        <div className="w-full max-w-[550px]">
                            <p className="px-2 pb-1 text-sm">Task priority</p>
                            <div className="relative w-full">
                                <select defaultValue={singleTask?.priority} required name="priority" {...register("priority", { required: true })} className={`${inputStyle} select select-info`} type="text" placeholder="Priority" >
                                    <option disabled selected value='' >Select Priority</option>
                                    {
                                        priorities?.map((priority) => <option key={priority} value={priority}> {priority}</option>)
                                    }
                                </select>
                                {errors.priority && <span className='text-red-500 text-sm'>Priority is required</span>}

                            </div>
                        </div>
                        <div className="w-full max-w-[550px]">
                            <p className="px-2 pb-1 text-sm">Task Description</p>
                            <div className="relative w-full">
                                <textarea required
                                    defaultValue={singleTask?.description} name="description" {...register("description", { required: true })} className={`${inputStyle} h-40`} type="text" placeholder="Description"></textarea>
                                {errors.description && <span className='text-red-500 text-sm'>Description is required</span>}

                            </div>
                        </div>


                        <div className='w-full max-w-[550px] flex flex-col  justify-center items-center gap-2 '>
                            <button type='submit' className='btn w-full  transition-all duration-200  ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400'> Create</button>

                        </div>
                    </div>

                </div>
            </motion.form>
        </div>
    );
};

export default EditTask;