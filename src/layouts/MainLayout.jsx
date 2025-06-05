import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
             <nav>
                <Navbar></Navbar>
                
            </nav>

            <section>
               <Outlet></Outlet>
            </section>
            

            <footer>
                <Footer></Footer>


            </footer>
            
        </div>
    );
};

export default MainLayout;