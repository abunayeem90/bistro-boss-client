import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Component/Shared/Footer/Footer";
import Navbar from "../Component/Shared/Navbar/Navbar";


const MainLayout = () => {
    const location = useLocation();
    const withOutHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div className="max-w-screen-xl mx-auto">
            {withOutHeaderFooter || <Navbar></Navbar>}
            <div className="min-h-[calc(100vh-265px)]">
            <Outlet></Outlet>
            </div>
           {withOutHeaderFooter ||  <Footer></Footer>}
        </div>
    );
};

export default MainLayout;