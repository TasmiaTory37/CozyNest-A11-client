import React from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router';


const Navbar = () => {
   
  
  return (
< div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
         <li>
                    <NavLink className={({isActive})=>isActive? 'text-sky-500' : ''}  to='/'>Home</NavLink>
                    </li>
   
                    <li>
                    <NavLink className={({isActive})=>isActive? 'text-sky-500' : ''}  to='/rooms'>Rooms</NavLink>
                    </li>
                    <li>
                    <NavLink className={({isActive})=>isActive? 'text-sky-500' : ''}  to='/aboutus'>About Us</NavLink>
                    </li>
                    <li>
                    <NavLink className={({isActive})=>isActive? 'text-sky-500' : ''}  to='/contact'>Contact</NavLink>
                    </li>
                    
                   

       
        </ul>
                
                

                
          
    </div>
               
            <div className='flex text-center gap-2'> 
                <img className='h-[40px] w-[40px]' src={logo} alt="" />
                <h1 className="text-blue-500 text-xl">CozyNest</h1>    
            </div>
        </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink className={({isActive})=>isActive? 'text-blue-500' : ''}  to='/'>Home</NavLink>
                        </li>
    
                        <li>
                
                        <NavLink className={({isActive})=>isActive? 'text-blue-500' : ''}  to='/rooms'>Rooms</NavLink>
                
                        </li>
                        <li>
                        <NavLink className={({isActive})=>isActive? 'text-blue-500' : ''}  to='/aboutus'>About Us</NavLink>
                        </li>
                        <li>
                        <NavLink className={({isActive})=>isActive? 'text-blue-500' : ''}  to='/contact'>Contact</NavLink>
                        </li>


                            
               
                    </ul>


              
            </div>



  


      {/* Navbar End */}
<div className="navbar-end relative">
    <button className='btn bg-blue-500 hover:bg-blue-600 text-white'>Login</button>
     
    </div>

    </div>
    );
};

export default Navbar;