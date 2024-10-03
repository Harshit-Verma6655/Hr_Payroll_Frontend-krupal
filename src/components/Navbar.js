import React, { useEffect, useState } from 'react';
import Logo from '../assets/payroll_hr_brand_logo.png';
import { CgProfile } from "react-icons/cg";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem("token");
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [showProfile, setShowProfile] = useState(false); 
  const [ProfileData,setProfileData]=useState()
  const navigate = useNavigate()

  const handleFetchUserProfile = async () => {
    try {
      const header = {
        "Authorization": `Bearer ${token}`
      };
      const response = await axios.get(`${BASE_URL}/users/userprofile`, { headers: header });
      const res = response.data;
      setProfileData(res.data)
      console.log("this is res", res);
    } catch (error) {
     if(error?.response?.data?.message==="Token expired, please log in again"){
      localStorage.removeItem("token")
      localStorage.removeItem("role")
      navigate("/")
     }
      console.log(error);
    }
  };

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/")
  }

  useEffect(() => {
    handleFetchUserProfile();
  }, []);

  return (
    <header className='w-screen py-5 bg-brand_colors flex px-7 relative items-center z-[49]'>
      <nav className='flex justify-between items-center w-[100%] '>
        <div className='logo w-[130px] h-[65px]'>
          <img src={Logo} alt='brand_logo' className='w-[100%] h-[100%]' />
        </div>
        <div className='profile_section relative'>
          {/* Toggle profile dropdown visibility on click */}
          <CgProfile
            className='text-[40px] cursor-pointer text-white font-[500]'
            onClick={() => setShowProfile(prev => !prev)}
          />
          {/* Conditionally render the profile dropdown */}
          {showProfile && (
  <div className='w-[auto] profile h-auto px-4 py-4 bg-white rounded-lg shadow-xl absolute top-[100%] right-0 z-50'>
    <div className='w-full flex justify-center mb-4'>
      <CgProfile className='text-[50px] cursor-pointer text-gray-700' />
    </div>
    <div className='w-full text-gray-800 flex flex-col gap-3 px-2'>
      <p className=' px-2 py-1 bg-gray-200 rounded border-gray-300 border-[1px] text-wrap'>
      {ProfileData?.email}
      </p>
      <p className='px-2 py-1 bg-gray-200 rounded border-gray-300 border-[1px] text-wrap'>

        {ProfileData?.username}
      </p>
    </div>
    <div className='w-full mt-4'>
      <button
        onClick={() => handleLogout()}
        className='w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300'>
        Logout
      </button>
    </div>
  </div>
)}

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
