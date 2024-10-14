import React, { useState } from 'react';
import Sidebar from '../assets/login_side_design.png';
import LoginVector from '../assets/login_side_vector.png';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const LoginScreen = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL


  const handleLogin = async (e) => {
    e.preventDefault();
    
    const newFormData = {
      email: Email,
      password: Password,
    };

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); 
      localStorage.setItem("role",data.role)
      localStorage.setItem("userData", JSON.stringify(data)); 

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred while logging in.'); 
    }
  };

  return (
    <section className='w-screen h-screen flex bg-white'>
      <div className='w-[60%] relative'>
        <img src={Sidebar} alt='login_sidebar' className='w-[100%] h-[100%] absolute z-1' />
        <img src={LoginVector} alt='login_vector' className='absolute z-2 w-[74%] h-[80%] top-[3%] left-[3%]' />
        <h1 className='absolute z-2 text-2xl md:text-4xl lg:text-5xl text-white font-medium bottom-[15%] left-[23%]'>
          HR-Payroll System
        </h1>
      </div>
      <div className='w-[40%]'>
        <div className='w-[33vw] mt-[33%] h-[auto] bg-[#F0F4F7] py-4 px-4 login_dropshadow'>
          <h2 className='text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-brand_color'>
            Login
          </h2>
          <br />
          <form onSubmit={handleLogin}>
            <label className='text-lg md:text-xl'>Email</label><br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              type='email'
              placeholder='email'
              className='p-2 w-[100%] rounded text-black outline-none border-[1px] border-[#2f2f2f] bg-white'
              required
            /><br />
            <br />
            <label className='text-lg md:text-xl'>Password</label><br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              type='password'
              placeholder='password'
              className='p-2 w-[100%] text-black rounded outline-none border-[1px] border-[#2f2f2f] bg-white'
              required
            /><br />
            <br />
            <button type='submit' className='w-[100%] py-3 text-[20px] font-[500] rounded bg-brand_colors text-white'>Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginScreen;
