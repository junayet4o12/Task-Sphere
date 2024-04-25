import dragLogo from '../../assets/drag.png'
const DragAndDropBox = () => {
    return (
        <div
            className={`bg-white transition-all duration-200  p-2 text-sm font-bold ease-in-out sm:uppercase bg-transparent border-blue-400 border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400 flex flex-col justify-center items-center gap-0 sm:gap-2  min-w-[50px]`}>
            <img src={dragLogo} className="max-h-14 max-w-14 sm:max-w-20  sm:max-h-20" alt="" />
            <p className="text-xs sm:text-sm md:text-lg text-center">Drag And Drop Here</p>
        </div>
    );
};

export default DragAndDropBox;