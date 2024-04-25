import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../Loading/Loading";
import { MdTask } from "react-icons/md";
import Swal from "sweetalert2";

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    console.log(id);
    const { data: singleTask, isLoading: singleTaskLoading, refetch } = useQuery({
        queryKey: [`single task details ${id}`, id],
        queryFn: async () => {

            const res = await axiosPublic.get(`/singletask/${id}`)
            return res?.data
        }
    })
    if (singleTaskLoading) {
        return <Loading />
    }
    console.log(singleTask?.type);

    const handleDelete = () => {
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
                        navigate(`/dashboard/allTasks`)
                        refetch()
                    })
            }
        });

    }
    const handleEdit = () => {
        navigate(`/dashboard/edit/${id}`)
    }
    return (
        <div className="card w-full max-w-[390px] mx-auto bg-base-100 shadow-xl">
            <figure className="flex justify-start items-start pl-5">
                <h2 className="text-7xl w-full text-blue-700"><MdTask /></h2>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {singleTask?.title}
                </h2>
                <p>{singleTask?.description}</p>
                <p>Deadline: {singleTask?.deadline}</p>
                <p>Priority: {singleTask?.priority}</p>
                <p>Type: {singleTask?.type}</p>
                <div className="card-actions justify-start gap-7">

                    <button onClick={handleEdit} className="btn btn-sm text-sm border-blue-500 border-2 rounded-sm hover:rounded-lg hover:border-blue-500 hover:bg-transparent transition-all duration-300">Edit</button>


                    <button onClick={handleDelete} className="btn btn-sm text-sm border-blue-500 border-2 rounded-sm hover:rounded-lg hover:border-blue-500 hover:bg-transparent transition-all duration-300">Delete</button>


                </div>
            </div>
        </div>
    );
};

export default TaskDetails;