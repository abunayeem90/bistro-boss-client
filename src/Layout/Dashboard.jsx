import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaHome,  FaList,  FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { TbBrandBooking } from "react-icons/tb";
import { LuMenuSquare } from "react-icons/lu";
import { FaBagShopping } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";




const Dashboard = () => {
    const [cart] = useCart();
    //TODO: get isAdmin value form the databse
    const [isAdmin] = useAdmin();
    
    return (
        <div className="max-w-screen-xl mx-auto mt-10 flex">
            {/* Dashboard Side bar */}
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu p-4">

                    {
                        isAdmin ? <> 
                        <li>
                        <NavLink to={'/dashboard/adminhome'}>
                            <FaHome /> Admin Home </NavLink>
                    </li>
                        <li>
                        <NavLink to={'/dashboard/addItems'}>
                            <FaUtensils /> Add Items </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/manageItems'}>
                            <FaList /> Manage Items </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to={'/dashboard/manageBookings'}>
                            <FaBook /> Manage Bookings </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/allusers'}>
                        <FaUsers /> All Users </NavLink>
                    </li>

                        </>
                        : <>
                            <li>
                        <NavLink to={'/dashboard/userhome'}>
                            <FaHome /> User Home </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/reservation'}>
                            <FaCalendarAlt /> Reservation </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/paymenthistory'}>
                            <MdPayments />Payment History </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/cart'}>
                            <FaShoppingCart />My Cart ({cart.length}) </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/review'}>
                            <VscPreview /> Add Review </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/booking'}>
                        <TbBrandBooking /> My Booking </NavLink>
                    </li>
                        </>
                    }
                    

                    <div className="divider"></div>
                    {/* shared navliks */}
                    <li>
                        <NavLink to={'/'}>
                            <FaHome /> Home </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                        <LuMenuSquare /> Menu </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/'}>
                        <FaBagShopping /> Shop </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/contact'}>
                            <MdEmail /> Contact </NavLink>
                    </li>


                </ul>
            </div>
            {/* Dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;