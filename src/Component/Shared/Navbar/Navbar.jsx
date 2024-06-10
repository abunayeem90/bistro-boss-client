import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { TiShoppingCart } from "react-icons/ti";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => {
                console.error(error);
            })
    }


    const navLinks = <>
        <li><Link className="uppercase" to={'/'}>HOME</Link></li>
        <li><Link to={'/contact'} className="uppercase">CONTACT US</Link></li>
        {
            user && isAdmin &&  <li><Link className="uppercase" to={'/dashboard/adminhome'}>DASHBOARD</Link></li>
        }
        {
            user && !isAdmin &&  <li><Link className="uppercase" to={'/dashboard/userhome'}>DASHBOARD</Link></li>
        }
        <li><Link className="uppercase" to={'/menu'}>OUR MENU</Link></li>
        <li><Link className="uppercase" to={'/order/salad'}>OUR SHOP</Link></li>
       
        <li><Link to={'/dashboard/cart'}>
            <button className="btn btn-outline border-0 -mt-3 ">
            <TiShoppingCart  className="h-8 w-8" />
                <div className="badge badge-secondary">+{cart.length}</div>
            </button>
        </Link></li>

        {
            user
                ? <> <button onClick={handleLogOut} className="btn btn-ghost uppercase -mt-[6px]"> LOG OUT</button> </>
                : <>
                    <li><Link className="uppercase" to={'/login'}>Login</Link></li>
                </>
        }
    </>
    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-25 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">
                        <div className="text-white">
                            <span className="font-bold ">BISTRO BOSS</span><br />
                            <span className="font-semibold  -ml-6">Restaurant</span>
                        </div>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>

        </>

    );
};

export default Navbar;