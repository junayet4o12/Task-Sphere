/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { handleDelete, handleEdit } from "../../../hooks/allListstyleAndEvents";
import { LuClipboardEdit } from "react-icons/lu";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { BiTask } from "react-icons/bi";

const TaskCardForHandle = ({ task, refetch, idx }) => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    return (
        <div>
            <div className="flex items-center justify-between sm:px-2">
                <button onClick={() => handleEdit(task?._id, navigate)} title="Edit Task" className="text-xl font-bold mb-1 hover:text-blue-500 btn btn-xs  bg-transparent hover:bg-transparent p-0 hover:border-none"><LuClipboardEdit></LuClipboardEdit></button>
                <button onClick={() => handleDelete(task?._id, axiosPublic, refetch)} title="Delete Task" className="text-base font-bold mb-1  border-[1.5px]  px-2 rounded-sm border-black hover:rounded-md hover:border-black  transition-all duration-200 btn btn-xs hover:bg-transparent" >X</button>
            </div>
            <hr className="border-black mb-1" />
            <div

                className="flex flex-wrap gap-2" style={{textTransform: 'none'}} >
                <span className=" flex  gap-1"><span className="text-xl">
                    <BiTask></BiTask>
                </span>{idx + 1}. </span>
                <div className="text-xs sm:text-sm flex flex-col">
                    <span>{task?.title} </span>
                    <span className="flex flex-wrap gap-1"><span className="hidden sm:block">Deadline:</span>{task?.deadline} </span>
                    <span className="flex flex-wrap gap-1"><span className="hidden sm:block">Priority: </span>{task?.priority}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCardForHandle;