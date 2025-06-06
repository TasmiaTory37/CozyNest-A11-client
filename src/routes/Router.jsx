import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Rooms from "../pages/Rooms";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import RoomDetails from "../pages/RoomDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import MyBookings from "../pages/MyBookings";

export const router=createBrowserRouter([
    {
      path: '/',
      Component: MainLayout,
       errorElement:<ErrorPage/>,

    
      children:[
        {
          path: '/',
          Component: Home,
        },
        {
            path:'/rooms',
            Component: Rooms,
        },
        {
            path:'/aboutus',
            Component: AboutUs,
        },
        {
            path:'/contact',
            Component: Contact,
        },
        {
            path:'/roomdetails/:id',
            Component:RoomDetails,
        },
         {
            path:'/login',
            Component: Login,
        },
        {
            path:'/register',
            Component: Register,
        },

    ]
},








        
         {
           path:'/auth',
          element:<AuthLayout></AuthLayout>,
          children:[
           {
               path:'/auth/register',
               element:<Register></Register>
             },
             {
              path:'/auth/login',
              element:<Login></Login>
            },
            {
                path:'/auth/my-bookings',
                element:<MyBookings></MyBookings>
            },
           
          ]
        },  
]);

