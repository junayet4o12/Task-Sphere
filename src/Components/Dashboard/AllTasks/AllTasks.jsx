import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../Loading/Loading";
import TaskCard from "./TaskCard";
import { IoFilterOutline } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { useState } from "react";
const AllTasks = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const [showingData, setShowingData] = useState('all');
    const [sortByDeadline, setSortByDeadline] = useState('random')
    const { data: tasks, isLoading: tasksLoading, refetch } = useQuery({
        queryKey: ['AllTasks', user],
        queryFn: async () => {

            const res = await axiosPublic.get(`/tasks/${user?.email}`)
            return res?.data
        }
    })
    if (tasksLoading) {
        return <Loading />
    }
    const priorities = [
        'All',
        'Low',
        'Medium',
        'High',

    ]
    const sorting = [
        'Random',
        'Ascending',
        'Descending'
    ]
    const handleFilter = (e) => {
        setShowingData(e?.target?.value)
    }
    const handleSort = (e) => {
        setSortByDeadline(e.target.value)
    }
    const HighTasks = tasks?.filter(task => task?.priority === 'High') || []
    const MediumTasks = tasks?.filter(task => task?.priority === 'Medium') || []
    const LowTasks = tasks?.filter(task => task?.priority === 'Low') || []
    const showingTask = showingData === 'all' ? tasks : showingData === 'All' ? tasks : showingData === 'High' ? HighTasks : showingData === 'Medium' ? MediumTasks : showingData === 'Low' ? LowTasks : []
    const newArray = [...showingTask]
    const sortedData = sortByDeadline === 'Ascending' ? newArray?.sort((data1, data2) => new Date(data1?.deadline).getTime() - new Date(data2?.deadline).getTime()) : sortByDeadline === 'Descending' ? newArray?.sort((data1, data2) => new Date(data2?.deadline).getTime() - new Date(data1?.deadline).getTime()) : showingTask;
    // const ascendingSortingData = showingTask?.sort((data1, data2)=>new Date(data1?.deadline).getTime() - new Date(data2?.deadline).getTime() )
    return (
        <div className="p-5">
            <h2 className="text-3xl font-bold text-center py-7 uppercase">All Tasks</h2>
            <div className="flex gap-5 flex-wrap justify-center items-center mt-5">
                <div className="flex gap-3 items-center p-5">
                    <label className="text-sm font-bold flex justify-center items-center gap-2">Filter by priority <IoFilterOutline /></label>
                    <select placeholder="Priority" className="border-[2px] border-blue-500 px-2 py-1.5 rounded-sm font-bold text-sm" value={showingData} onChange={handleFilter}>
                        <option value="all" disabled>Select </option>
                        {
                            priorities?.map((priority) => <option key={priority} value={priority}> {priority}</option>)
                        }
                    </select>
                </div>
                <div className="flex gap-3 items-center p-5">
                    <label className="text-sm font-bold flex justify-center items-center gap-2">Sort by deadline <FaSortAmountDown /></label>
                    <select placeholder="Priority" className="border-[2px] border-blue-500 px-2 py-1.5 rounded-sm font-bold text-sm" value={sortByDeadline} onChange={handleSort}>
                        <option value="random" disabled>Select</option>
                        {
                            sorting?.map((priority) => <option key={priority} value={priority}> {priority}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    sortedData?.map(task => <TaskCard key={task?._id} task={task} />)
                }
            </div>
        </div>
    );
};

export default AllTasks;