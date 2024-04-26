/* eslint-disable react/prop-types */
import { MdTask } from "react-icons/md";
import { Link } from "react-router-dom";
const TaskCard = ({ task }) => {
    const { creator, deadline, description, priority, title, type, _id } = task;
    return (

        <div className="card w-full max-w-[390px] mx-auto bg-base-100 shadow-xl">
            <figure className="flex justify-start items-start pl-5">
                <h2 className="text-7xl w-full text-blue-700 flex justify-between items-center">
                    <span><MdTask /></span>
                    <span className={`${type==='completed' ? 'block' : 'hidden'}`}><div className="badge badge-accent badge-outline">Completed</div></span>
                    <span className={`${type==='ongoing' ? 'block' : 'hidden'}`}><div className="badge badge-primary badge-outline">On Going</div></span>
                    <span className={`${type==='todo' ? 'block' : 'hidden'}`}><div className="badge badge-secondary badge-outline">To Do</div></span>
                </h2>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <p>{description}</p>
                <p>Deadline: {deadline}</p>
                <div className="card-actions justify-start">
                    <Link to={`/dashboard/taskDetails/${_id}`}>
                        <button className="btn btn-sm text-sm border-blue-500 border-2 rounded-sm hover:rounded-lg hover:border-blue-500 hover:bg-transparent transition-all duration-300">Details</button>
                    </Link>

                </div>
            </div>
        </div>

    );
};

export default TaskCard;