import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../Loading/Loading";
import TaskCard from "./TaskCard";

const AllTasks = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const { data: tasks, isLoading: tasksLoading, refetch } = useQuery({
        queryKey: ['AllTasks', user],
        queryFn: async () => {

            const res = await axiosPublic.get(`/tasks/${user?.email}`)
            return res?.data
        }
    })
if(tasksLoading){
    return <Loading/>
}
    return (
        <div className="p-5">
            <h2 className="text-3xl font-bold text-center py-7 uppercase">All Tasks</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    tasks?.map(task=> <TaskCard key={task?._id} task={task} />)
                }
            </div>
        </div>
    );
};

export default AllTasks;