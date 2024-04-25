// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { BiTask } from "react-icons/bi";
import { LuClipboardEdit } from "react-icons/lu";
import dragLogo from '../../../assets/drag.png'
import Swal from "sweetalert2";
import { TbMoodEmpty } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const HandleTask = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { data: tasks, isLoading: taskLoading, refetch } = useQuery({
        queryKey: ['task', user],
        queryFn: async () => {

            const res = await axiosPublic.get(`/tasks/${user?.email}`)
            return res?.data
        }
    })
    if (taskLoading) {
        return ''
    }
    const todotasks = tasks?.filter(task => task?.type === 'todo')
    const onGoingTasks = tasks?.filter(task => task?.type === 'ongoing')
    const completedtasks = tasks?.filter(task => task?.type === 'completed')
    const handleRegister = (e, id) => {
        e?.dataTransfer?.setData('todoId', id)
        console.log(id, e?.dataTransfer?.setData('todoId', id));
    }
    const handleDragOver = (e) => {
        e?.preventDefault()
        console.log('dragging');
    }
    const handleDropInOngoing = (e) => {
        e.preventDefault()
        const draggedItem = e.dataTransfer.getData('todoId');

        console.log(draggedItem);
        axiosPublic.put(`/tasksOngoing/${draggedItem}`)
            .then(res => {
                console.log(res?.data);
                refetch()
            })
    }
    const handleDropInCompleted = (e) => {
        e.preventDefault()
        const draggedItem = e.dataTransfer.getData('todoId');

        console.log(draggedItem);
        axiosPublic.put(`/tasksCompleted/${draggedItem}`)
            .then(res => {
                console.log(res?.data);
                refetch()
            })
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/tasks/${id}`)
                    .then(res => {
                        console.log(res?.data);
                        refetch()
                    })
            }
        });

    }
    const handleEdit = (id) => {
      navigate(`/dashboard/edit/${id}`)  
    }
    return (
        <div className="">
            <h2 className="text-3xl font-bold text-center py-7 uppercase">Manage Task</h2>
            <div className="flex flex-wrap gap-y-7">
                <div className="flex-1 border-r border-black  ">
                    <p className="bg-blue-100 text-lg font-bold text-center uppercase">to do</p>
                    <hr className="border-black" />
                    <div className="space-y-5 px-2 py-2 ">
                        {
                            todotasks?.map((task, idx) => <div key={task?._id} draggable
                                onDragStart={(e) => handleRegister(e, task?._id)} className="transition-all duration-200  p-2 text-sm font-bold ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400 ">
                                <div className="flex justify-between px-2  ">
                                    <button onClick={() => handleEdit(task?._id)} title="Edit Task" className="text-xl font-bold mb-1 hover:text-blue-500 btn btn-xs  bg-transparent hover:bg-transparent border-none hover:border-none"><LuClipboardEdit></LuClipboardEdit></button>
                                    <button onClick={() => handleDelete(task?._id)} title="Delete Task" className="text-base font-bold mb-1  border-[1.5px]  px-2 rounded-sm border-black hover:rounded-md hover:border-black  transition-all duration-200 btn btn-xs hover:bg-transparent" >X</button>
                                </div>
                                <hr className="border-black mb-1" />
                                <div

                                    className="flex gap-2 " >
                                    <span className="flex  gap-1"><span className="text-xl">
                                        <BiTask></BiTask>
                                    </span>{idx + 1}. </span>
                                    <div>
                                        <span>{task?.title}- </span>
                                        <span>{task?.deadline}- </span>
                                        <span>{task?.priority}</span>
                                    </div>
                                </div>
                            </div>)
                        }
                        {
                            !todotasks?.length < 1 ? '' : <div className="flex flex-col justify-center items-center gap-5  py-10">
                                <p className="text-8xl"><TbMoodEmpty></TbMoodEmpty></p>
                                <p className="text-4xl font-bold text-center">No Data Found</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="flex-1 border-r border-black ">
                    <p className="bg-blue-100 text-lg font-bold text-center uppercase">On going</p>
                    <hr className="border-black" />
                    <div
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDropInOngoing(e)}
                        className="transition-all duration-200  p-2 text-sm font-bold ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400 flex flex-col justify-center items-center gap-2 m-5 min-w-[150px]">
                        <img src={dragLogo} className="w-20  h-20" alt="" />
                        <p className="text-lg text-center">Drag And Drop Here</p>
                    </div>
                    <div
                        className="space-y-5 px-2 py-2 min-h-full">
                        {
                            onGoingTasks?.map((task, idx) => <div key={task?._id} draggable
                                onDragStart={(e) => handleRegister(e, task?._id)} className="transition-all duration-200  p-2 text-sm font-bold ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400 ">
                                <div className="flex justify-between px-2  ">
                                    <button onClick={() => handleEdit(task?._id)} title="Edit Task" className="text-xl font-bold mb-1 hover:text-blue-500 btn btn-xs  bg-transparent hover:bg-transparent border-none hover:border-none"><LuClipboardEdit></LuClipboardEdit></button>
                                    <button onClick={() => handleDelete(task?._id)} title="Delete Task" className="text-base font-bold mb-1  border-[1.5px]  px-2 rounded-sm border-black hover:rounded-md hover:border-black  transition-all duration-200 btn btn-xs hover:bg-transparent" >X</button>
                                </div>
                                <hr className="border-black mb-1" />
                                <div

                                    className="flex gap-2 " >
                                    <span className="flex  gap-1"><span className="text-xl">
                                        <BiTask></BiTask>
                                    </span>{idx + 1}. </span>
                                    <div>
                                        <span>{task?.title}- </span>
                                        <span>{task?.deadline}- </span>
                                        <span>{task?.priority}</span>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div className="flex-1 max-w-sm mx-auto">
                    <p className="bg-blue-100 text-lg font-bold text-center uppercase ">Completed</p>
                    <hr className="border-black" />
                    <div
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDropInCompleted(e)}
                        className="transition-all duration-200  p-2 text-sm font-bold ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400 flex flex-col justify-center items-center gap-2 m-5 min-w-[150px]">
                        <img src={dragLogo} className="w-20  h-20" alt="" />
                        <p className="text-lg text-center">Drag And Drop Here</p>
                    </div>
                    <div
                        className="space-y-5 px-2 py-2 min-h-full">
                        {
                            completedtasks?.map((task, idx) => <div className="transition-all duration-200  p-2 text-sm font-bold ease-in-out uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400 " key={task?._id}>
                                <div className="flex justify-between px-2  ">
                                    <button onClick={() => handleEdit(task?._id)} title="Edit Task" className="text-xl font-bold mb-1 hover:text-blue-500 btn btn-xs  bg-transparent hover:bg-transparent border-none hover:border-none"><LuClipboardEdit></LuClipboardEdit></button>
                                    <button onClick={() => handleDelete(task?._id)} title="Delete Task" className="text-base font-bold mb-1  border-[1.5px]  px-2 rounded-sm border-black hover:rounded-md hover:border-black  transition-all duration-200 btn btn-xs hover:bg-transparent" >X</button>
                                </div>
                                <hr className="border-black mb-1" />
                                <div

                                    className="flex gap-2 " >
                                    <span className="flex  gap-1"><span className="text-xl">
                                        <BiTask></BiTask>
                                    </span>{idx + 1}. </span>
                                    <div>
                                        <span>{task?.title}- </span>
                                        <span>{task?.deadline}- </span>
                                        <span>{task?.priority}</span>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HandleTask;