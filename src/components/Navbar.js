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
  const [ProfileData, setProfileData] = useState()
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
      if (error?.response?.data?.message === "Token expired, please log in again") {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate("/")
      }
      console.log(error);
    }
  };

  const handleLogout = () => {
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
            <div className='w-[300px] h-auto px-6 py-6 bg-white rounded-lg shadow-lg absolute top-[100%] right-0 z-50 transition-transform duration-300 transform-gpu'>
              <div className='w-full flex justify-center mb-6'>
                <CgProfile className='text-[60px] cursor-pointer text-gray-800' />
              </div>
              <div className='w-full text-gray-800 flex flex-col gap-4 px-4'>
                <p className='px-3 py-2 bg-gray-200 rounded-lg border border-gray-300 text-sm font-medium text-center transition-colors duration-200 hover:bg-gray-300'>
                  {ProfileData?.email}
                </p>
                <p className='px-3 py-2 bg-gray-200 rounded-lg border border-gray-300 text-sm font-medium text-center transition-colors duration-200 hover:bg-gray-300'>
                  {ProfileData?.username}
                </p>
              </div>
              <div className='w-full mt-6'>
                <button
                  onClick={() => handleLogout()}
                  className='w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md transform hover:scale-105'>
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
