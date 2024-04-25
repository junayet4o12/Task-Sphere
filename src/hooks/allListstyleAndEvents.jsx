import Swal from "sweetalert2";
export const taskHeaderStyle = 'bg-blue-100 text-xs sm:text-sm md:text-lg font-bold text-center uppercase sticky top-[72px]'
export const cardStyle = 'transition-all duration-200 p-1 sm:p-2 text-sm font-bold ease-in-out uppercase bg-transparent border-blue-400 border sm:border-2 rounded-lg  hover:bg-transparent hover:rounded-3xl hover:border-blue-400 overflow-hidden'

export const handleRegister = (e, id) => {
    e?.dataTransfer?.setData('todoId', id)
    console.log(id, e?.dataTransfer?.setData('todoId', id));
}
export const handleDragOver = (e) => {
    e?.preventDefault()
}
export const handleDelete = (id, axiosPublic, refetch) => {
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
                    refetch()
                })
        }
    });

}
export const handleEdit = (id, navigate) => {
    navigate(`/dashboard/edit/${id}`)
}
