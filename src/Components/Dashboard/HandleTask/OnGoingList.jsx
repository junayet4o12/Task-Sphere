/* eslint-disable react/prop-types */
import Swal from 'sweetalert2';
import dragLogo from '../../../assets/drag.png'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { LuClipboardEdit } from 'react-icons/lu';
import { BiTask } from 'react-icons/bi';
import { TbMoodEmpty } from 'react-icons/tb';
import { cardStyle, handleDelete, handleDragOver, handleEdit, handleRegister, taskHeaderStyle } from '../../../hooks/allListstyleAndEvents';
import NoTasksFound from '../../NoTasksFound/NoTasksFound';
import DragAndDropBox from '../../DragAndDropBox/DragAndDropBox';
import TaskCardForHandle from './TaskCardForHandle';
const OnGoingList = ({ onGoingTasks, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
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

    return (
        <div className="flex-1 border-r border-black  ">
            <p className={taskHeaderStyle}>on going</p>
            <hr className="border-black" />
            <div className="space-y-5 px-0.5 py-2 relative">
                <div
                className='sticky top-[92px]'
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDropInOngoing(e)}
                >
                    <DragAndDropBox />
                </div>
                {
                    onGoingTasks?.map((task, idx) => <div key={task?._id} draggable
                        onDragStart={(e) => handleRegister(e, task?._id)} className={`${cardStyle}`}>
                        <TaskCardForHandle task={task} idx={idx} refetch={refetch} />
                    </div>)
                }
                {
                    !onGoingTasks?.length < 1 ? '' : <NoTasksFound />

                }
            </div>
        </div>
    );
};

export default OnGoingList;