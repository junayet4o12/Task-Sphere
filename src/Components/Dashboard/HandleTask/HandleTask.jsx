// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import ToDoList from "./ToDoList";
import OnGoingList from "./OnGoingList";
import CompletedTaskList from "./CompletedTaskList";
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
        return ''
    }
    const todoTasks = tasks?.filter(task => task?.type === 'todo') || []
    const onGoingTasks = tasks?.filter(task => task?.type === 'ongoing') || []
    const completedTasks = tasks?.filter(task => task?.type === 'completed') || []
    return (
        <div>
            <h2 className="text-3xl font-bold text-center py-7 uppercase">Manage Task</h2>
            <div className="grid grid-cols-3 gap-y-7">

                <ToDoList todoTasks={todoTasks} refetch={refetch} />


                <OnGoingList onGoingTasks={onGoingTasks} refetch={refetch} />

                <CompletedTaskList completedTasks={completedTasks} refetch={refetch} />
            </div>
        </div>
    );
};

export default HandleTask;