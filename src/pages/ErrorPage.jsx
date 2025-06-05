import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
import error from '../assets/error.png'; // Ensure the path is correct based on your project structure


const ErrorPage = () => {
   useEffect(() => {
      document.title = "CozyNest | 404 Error"; 
    }, []);
  const navigate = useNavigate();

  return (
    <>
    
   
    <div className=" flex flex-col items-center justify-center mx-auto mt-10 text-center">
    
        <img className='w-[280px] h-[280px]' src={error} alt="" />
      <h1 className="text-3xl text-red-600 font-bold mt-3">404-Page Not Found</h1>
      
      <p className="text-gray-600 mt-4 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <button className="px-5 py-2 rounded-sm bg-blue-500 text-white mb-5" onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
    </>
  );
};

export default ErrorPage;