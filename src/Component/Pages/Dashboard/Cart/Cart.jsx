import { FaTrash } from "react-icons/fa";
import useCart from "../../../../hooks/useCart";
import Swal from 'sweetalert2';
import useAxiosSecured from "../../../../hooks/useAxiosSecured";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCart();
    // reduce ...................
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    const axiosSecure = useAxiosSecured();

    const handleDelete = (_id) => {
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
                    axiosSecure.delete(`/carts/${_id}`)
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
    }

    return (
        <div>
            <div className="flex justify-evenly mb-8">
                <h2 className="tex-4xl">Items: {cart.length}</h2>
                <h2 className="tex-4xl">Total Price: {totalPrice}</h2>
                {
                    cart.length ? <Link to={'/dashboard/payment'}>
                    <button  className="btn btn-primary">Pay</button>
                    </Link> :
                    <button disabled className="btn btn-primary">Pay</button>

                }
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td><p>{item.name}</p></td>
                                <td>${item.price}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost">
                                        <FaTrash className="text-red-600"></FaTrash>
                                    </button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Cart;