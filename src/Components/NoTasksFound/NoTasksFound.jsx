import { TbMoodEmpty } from 'react-icons/tb';

const NoTasksFound = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-5  py-10">
            <p className="text-5xl md:text-8xl"><TbMoodEmpty></TbMoodEmpty></p>
            <p className="text-xl md:text-4xl font-bold text-center">No Task Found!</p>
        </div>
    );
};

export default NoTasksFound;