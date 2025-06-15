import React, { useContext, useEffect, useState } from 'react';
import {FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {

   useEffect(() => {
         document.title = "CozyNest | Register"; 
       }, []);



    const [showPassword,setShowPassword]=useState(false)
    const {createNewUser,setUser,handleGoogle}=useContext(AuthContext)
    const [error,setError]=useState({});
    const navigate=useNavigate();

    const validatePassword = (password) => {
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) ||  password.length < 6) {
      return 'Password must contain at least one uppercase letter, one lowercase letter and be at least 6 characters long';
    }
    return null; 
  };
  const handleSubmit= (e)=>{
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("url");
    const password = form.get("pass");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError({ ...error, password: passwordError });


    Swal.fire({
        title: 'Oppps!',
        text: 'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long',
        icon: 'error',
        confirmButtonText: 'Okay'
        })
      
      return; 
    }

    createNewUser(email, password, name, photo)
       .then((result) => {
        const user = result.user;
        setUser(user);
    //    console.log(user)
        Swal.fire({
            title: 'Congratulations!',
            text: 'Registration Successful.',
            icon: 'success',
            confirmButtonText: 'Okay'
            })

       setTimeout(() => {
       navigate('/');
     }, 2000);
           })
      .catch((err) => {
      
       

        Swal.fire({
          title: 'Oppps!',
          text: `Registration failed: ${err.message}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }); 
  };

   const handleGoogleLogin=()=>{
    handleGoogle ()
    .then((res)=>{
      const user=res.user;
    //   console.log(user)
      setUser(user); 

       Swal.fire({
                title: 'WOW!',
                text: `Welcome, ${user.displayName}`,
                icon: 'success',
                confirmButtonText: 'Okay'
              })
      
      
      setTimeout(()=>{
         navigate('/');                     
      },2000)               
    })  
    .catch(err=>{


     alert(`Google Login failed: ${err.message}`)


    })                 
  }




    return (
        <div>
            <div className='flex justify-center items-center my-5'>  
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                            <h2 className='text-center font-bold text-blue-500 text-2xl'>Register Here!</h2>
                            <form onSubmit={handleSubmit} className="card-body ">
                                <fieldset className="fieldset">
                                    <label className="text-base">Name</label>
                                    <input type="text" name='name' className="input" placeholder="Your Name" required />
                                    <label className="text-base">Photo Url</label>
                                    <input type="text" name='url' className="input" placeholder="Photo Url" required />
                                    <label className="text-base">Email</label>
                                    <input type="email" name='email' className="input" placeholder="Email" required />  
                                    
                                    <label className="text-base fieldset">Password</label>
                                    <div className="relative w-full" style={{ overflow: 'visible' }}>
                                      <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="pass"
                                        placeholder="Password"
                                        className="input pr-10"
                                        required
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="btn btn-xs absolute right-6 top-2.5  z-50"
                                      >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                      </button>
                                    </div>


                                    <button className="btn bg-blue-500 text-white mt-4">Register</button>
                                    <button onClick={handleGoogleLogin}  className='btn  mt-4 '><FaGoogle className='text-blue-800'></FaGoogle> Register With Google</button>
                                    <p className=' text-base'>Already have an Account? <Link className='text-blue-500 link link-hover' to="/auth/login">Login</Link>  </p>
                                </fieldset>
                            </form>
                        </div>
            </div>
        </div>
    );
};

export default Register;