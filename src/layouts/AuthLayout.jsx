import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
             
             <Navbar />
            <div  className='my-5'>
               
                <Outlet />
            </div>
                                                                                                   
             
            
        </div>
    );
};

export default AuthLayout;