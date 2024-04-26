/* eslint-disable react/prop-types */
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { cardStyle,  handleDragOver,  handleRegister, taskHeaderStyle } from '../../../hooks/allListstyleAndEvents';
import NoTasksFound from '../../NoTasksFound/NoTasksFound';
import DragAndDropBox from '../../DragAndDropBox/DragAndDropBox';
import TaskCardForHandle from './TaskCardForHandle';
const CompletedTaskList = ({ completedTasks, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const handleDropInCompleted = (e) => {
        e.preventDefault()
        const draggedItem = e.dataTransfer.getData('todoId');

        axiosPublic.put(`/tasksCompleted/${draggedItem}`)
            .then(res => {
                refetch()
            })
    }
    return (
        <div className="flex-1 border-r border-black">
            <p className={taskHeaderStyle}>Completed</p>
            <hr className="border-black sticky top-7" />
            <div className="space-y-5 px-0.5 sm:px-2  py-2 relative">
            <div
            className='sticky top-[36.5px]'
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDropInCompleted(e)}
                >
                    <DragAndDropBox />
                </div>
                {
                    completedTasks?.map((task, idx) => <div key={task?._id} draggable
                        onDragStart={(e) => handleRegister(e, task?._id)} className={`${cardStyle}`}>
                        <TaskCardForHandle task={task} idx={idx} refetch={refetch} />
                    </div>)
                }
                {
                    !completedTasks?.length < 1 ? '' : <NoTasksFound/>
                }
            </div>
        </div>
    );
};

export default CompletedTaskList;