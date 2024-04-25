/* eslint-disable react/prop-types */
import { MdTask } from "react-icons/md";
const TaskCard = ({ task }) => {
    const { creator, deadline, description, priority, title, type, _id } = task;
    return (

        <div className="card w-full max-w-[390px] mx-auto bg-base-100 shadow-xl">
            <figure className="flex justify-start items-start pl-5">
                <h2 className="text-7xl w-full text-blue-700"><MdTask /></h2>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <p>{description}</p>
                <p>Deadline: {deadline}</p>
                <div className="card-actions justify-start">
                    <button className="btn btn-sm text-sm border-blue-500 border-2 rounded-sm hover:rounded-lg hover:border-blue-500 hover:bg-transparent transition-all duration-300">Details</button>
                    
                </div>
            </div>
        </div>

    );
};

export default TaskCard;