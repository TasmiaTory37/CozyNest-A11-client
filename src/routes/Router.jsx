import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Rooms from "../pages/Rooms";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";

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

    ]
}
]);

