import React, { useEffect, useState } from 'react'
import RootLayout from '../RootLayout'
import DashboardLayout from '../DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const LocationMasterTable = () => {
    const navigate = useNavigate()
  const { companyName, companyId } = useSelector((state) => state.company);
  const [LocationAllData,setLocationAllData]=useState()
  const active="border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color"

  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleFetchLocation = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/location/all`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      const res = response.data;
      console.log(res);
      setLocationAllData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchLocation();
  }, []);


  const handleEdit = (locid)=>{
    navigate("/locationsitemaster",{state:{id:locid,viewmode:"view"}})
  }

  const handleDelete = async (locid) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this location?");

      if (isConfirmed) {
        const response = await axios.delete(`${BASE_URL}/location/delete/${locid}`);
        const res = await response.data;
        handleFetchLocation();
      }
    } catch (error) {
      console.log("Error deleting location:", error);
    }
  };
  


    return (
      <RootLayout>
    <DashboardLayout>
    <section className='w-full px-10 py-4'>
        <div className='w-full flex justify-between mb-4'>
          <h2 className='text-xl font-semibold text-brand_color'>Location And Site List</h2>
          {companyName&&
  <button className={active}>{companyName}</button>

}
          {companyName!=="ALL" &&
            <button onClick={()=>navigate("/locationsitemaster")} className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80'>
          Location And Site +
          </button>

          }
         
        </div>
  
        <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse'>
  <thead>
    <tr>
      <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Location No.</th>
      <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Phone (O)</th>
      <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Phone (F)</th>
      <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Address</th>
      <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>City</th>
      <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Pin Code</th>
      <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>State</th>
      <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Country</th>
      <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Action</th>
    </tr>
  </thead>
  <tbody>
    {LocationAllData && LocationAllData.length > 0 ? (
      LocationAllData.map((location, index) => (
        <tr key={index}>
          <td className='border-b_color border px-2 py-[6px]'>{location.Location_No}</td>
          <td className='border-b_color border px-2 py-[6px]'>{location.Phone_o}</td>
          <td className='border-b_color border px-2 py-[6px]'>{location.Phone_f}</td>
          <td className='border-b_color border px-2 py-[6px]'>{location.Address}</td>
          <td className='border-b_color border px-2 py-[6px]'>{location.City}</td>
          <td className='border-b_color border px-2 py-[6px]'>{location.Pin_Code}</td>
          <td className='border-b_color border px-2 py-[6px]'>{location.State}</td>
          <td className='border-b_color border px-2 py-[6px]'>{location.Country}</td>
          <td className='border-b_color border px-2 py-[6px] flex item-center gap-3'>
            {/* Action buttons can go here */}
            <button className='text-blue-600 hover:underline' onClick={()=>handleEdit(location._id)}>Edit</button>
            <button className='text-red-600 hover:underline' onClick={()=>handleDelete(location._id)}>Delete</button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="9" className='border-b_color border px-2 py-[6px] text-center text-gray-500'>No locations found</td>
      </tr>
    )}
  </tbody>
</table>

        </div>
      </section>
    </DashboardLayout>
   </RootLayout>
  )
}

export default LocationMasterTable