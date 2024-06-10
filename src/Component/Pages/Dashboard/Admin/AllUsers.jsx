import { useQuery } from "@tanstack/react-query";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";



const AllUsers = () => {
    const axiosSecured = useAxiosSecured();
    const { data: allusers = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecured.get('/users');
            return res.data;

        }   
    })

    const handleMakeAdmin = (user) => {
        axiosSecured.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${user.name} is an Admin now.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }



    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecured.delete(`/users/${user._id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                  refetch()
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                  });
                                  
                                  
                            }
                        })

                }
            });

    };

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h1 className="text-3xl">All Users: { }</h1>
                <h1 className="text-3xl">Total Users: {allusers.length}</h1>
            </div>
            {/* table list */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allusers.map((user, index) => <tr key={user._id}>
                            <th>
                                {index + 1}
                            </th>
                            <td>{user.name || 'Name Not Found'}</td>
                            <td>{user.email}</td>
                            <td>
                            { user.role === 'admin' ? 'Admin' :
                                <button onClick={() => handleMakeAdmin(user)}
                                className="btn btn-ghost bg-orange-400">
                                    <FaUsers className="text-white text-2xl" />
                                </button>}
                            </td>
                            <th>
                                <button onClick={() => handleDeleteUser(user)}
                                className="btn btn-ghost ">
                                    <FaTrashAlt className="text-red-600 text-2xl" />
                                </button>
                            </th>
                        </tr>)}
                        
                    </tbody>
                    

                </table>
            </div>
        </div>

    );
};

export default AllUsers;