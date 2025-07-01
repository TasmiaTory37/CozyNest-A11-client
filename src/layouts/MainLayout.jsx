import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className='bg-blue-50 min-h-screen'>
             <nav className='sticky top-0 z-50'>
                <Navbar></Navbar>
                
            </nav>

            <section className='min-h-screen'>
               <Outlet></Outlet>
            </section>
            

            <footer>
                <Footer></Footer>


            </footer>
            
        </div>
    );
};

export default MainLayout;