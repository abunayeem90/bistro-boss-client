import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Component/Pages/Home/Home";
import Menu from "../Component/Pages/Menu/Menu/Menu";
import Order from "../Component/Pages/Order/Order/Order";
import Login from "../Component/Pages/Login/Login";
import SignUp from "../Component/Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Component/Pages/Dashboard/Cart/Cart";
import Contact from "../Component/Pages/Contact/Contact";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Component/Pages/Dashboard/Admin/AllUsers";
import AddItems from "../Component/Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Component/Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Component/Pages/Dashboard/UpdateItem";
import Payment from "../Component/Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Component/Pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../Component/Pages/Dashboard/Admin/AdminHome";
import UserHome from "../Component/Pages/Dashboard/UserHome/UserHome";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
          path: '/menu',
          element: <Menu></Menu>
        },
        {path: '/contact',
        element: <Contact></Contact>
        },
        
        {
          path: '/order/:category',
          element: <Order></Order>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute>
              <Dashboard></Dashboard>
               </PrivateRoute>,
      children: [

      //users routes
        {
          path: '/dashboard/userhome',
          element: <UserHome></UserHome>
        },
        {
          path: '/dashboard/cart',
          element: <Cart></Cart>
        },
        {
          path: '/dashboard/payment',
          element: <Payment></Payment>
        },
        {
          path: '/dashboard/paymenthistory',
          element: <PaymentHistory></PaymentHistory>
        },
        
      // admin routes
      {
        path: '/dashboard/adminhome',
        element: <AdminRoute>
          <AdminHome></AdminHome>
        </AdminRoute>
      },
      {
        path: '/dashboard/addItems',
        element: <AdminRoute>
          <AddItems></AddItems>
        </AdminRoute>
      },
      {
        path: '/dashboard/allusers',
        element: <AdminRoute>
          <AllUsers></AllUsers>
        </AdminRoute>
      },
      {
        path:'/dashboard/manageItems',
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
        path: '/dashboard/updateItem/:id',
        element: <AdminRoute> 
          <UpdateItem></UpdateItem>
        </AdminRoute>,
        loader: ({params}) => fetch(`https://bistro-boss-server-sigma-lyart.vercel.app/menu/${params.id}`)
      }

      ]
    },
  ]);