import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecured from "../../hooks/useAxiosSecured";
import useCart from "../../hooks/useCart";

const FoodCard = ({item}) => {
    const {name, recipe, image, price, _id} = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecured = useAxiosSecured();
    const [, refetch] = useCart();
    


    const handleAddToCart =() => {
        if(user && user.email){
            // send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name, image, price
            }

            axiosSecured.post('/carts', cartItem)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      // refetch the cart to update the carts items count
                      refetch()
                }
            })
        }
        else{
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
              }).then((result) => {
                if (result.isConfirmed) {
                  //send the user to the login page
                  navigate('/login', {state: {from: location}})
                }
              });
        }
    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="absolute right-0 mt-4 mr-8 px-4 bg-slate-800 text-white">${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title text-center">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={ handleAddToCart} className="btn uppercase border-0 bg-slate-100 border-b-4 border-orange-500 text-current btn-outline"> 
                        Add To Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;