import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='bg-blue-50 min-h-screen'>
             
            <div className='sticky top-0 z-50'> 
                 <Navbar/>
            </div>
            <div  className='min-h-screen
            max-w-7xl mx-auto p-8'>
               
               
                <Outlet />
            </div>
                                                                                                   
             
            
        </div>
    );
};

export default AuthLayout;