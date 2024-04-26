// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import ToDoList from "./ToDoList";
import OnGoingList from "./OnGoingList";
import CompletedTaskList from "./CompletedTaskList";
import Loading from "../../Loading/Loading";
const HandleTask = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: tasks, isLoading: taskLoading, refetch } = useQuery({
        queryKey: ['task', user],
        queryFn: async () => {

            const res = await axiosPublic.get(`/tasks/${user?.email}`)
            return res?.data
        }
    })
    if (taskLoading) {
        return <Loading />
    }
    const todoTasks = tasks?.filter(task => task?.type === 'todo') || []
    const onGoingTasks = tasks?.filter(task => task?.type === 'ongoing') || []
    const completedTasks = tasks?.filter(task => task?.type === 'completed') || []
    return (
        <div>
            <div className="grid grid-cols-3 gap-y-7">

                <div className="max-h-[calc(100vh-92px)] overflow-y-auto scrollbar-custom">
                    <ToDoList todoTasks={todoTasks} refetch={refetch} />
                </div>

                <div className="max-h-[calc(100vh-92px)] overflow-y-auto scrollbar-custom">
                    <OnGoingList onGoingTasks={onGoingTasks} refetch={refetch} />
                </div>
                <div className="max-h-[calc(100vh-92px)] overflow-y-auto scrollbar-custom">
                    <CompletedTaskList completedTasks={completedTasks} refetch={refetch} />
                </div>
            </div>
        </div>
    );
};

export default HandleTask;