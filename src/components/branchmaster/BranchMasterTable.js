import React, { useEffect, useState } from 'react';
import RootLayout from '../RootLayout';
import DashboardLayout from '../DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BranchMasterTable = () => {
  const navigate = useNavigate();
  const { companyName, companyId } = useSelector((state) => state.company);
  const [AllBranchData, setAllBranchData] = useState([]);
  const active = "border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color";

  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleFetchBranch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/branch/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token if required
        },
      });
      const res = response.data;
      console.log(res);
      setAllBranchData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchBranch();
  }, []);

  const handleEditBranch = (branchId) => {
    navigate(`/branchmaster`,{state:{id:branchId,viewmode:"view"}}); 
  };

  const handleDeleteBranch = async (branchId) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this branch?");

    if (isConfirmed) {
        try {
            await axios.delete(`${BASE_URL}/branch/branch/${branchId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
      
            handleFetchBranch();
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("Deletion cancelled.");
    }
};

  return (
    <RootLayout>
      <DashboardLayout>
        <section className='w-full px-10 py-4'>
          <div className='w-full flex justify-between mb-4'>
            <h2 className='text-xl font-semibold text-brand_color'>Branch List</h2>
            {companyName && <button className={active}>{companyName}</button>}

            {companyName !== "ALL" && (
              <button onClick={() => navigate("/branchmaster")} className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80'>
                Add Branch +
              </button>
            )}
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Branch No.</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Branch Name</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Branch Starting Date</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Owner Name</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Owner Address</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Nature of Business</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Location Name</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Contact Person Name</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {AllBranchData && AllBranchData.map((item, index) => (
                  <tr key={index}>
                    <td className=' border-b_color border px-2 py-[6px]'>{item.Branch_No}</td>
                    <td className=' border-b_color border px-2 py-[6px]'>{item.Branch_Name}</td>
                    <td className=' border-b_color border px-2 py-[6px]'>{item.Branch_Starting_Date}</td>
                    <td className=' border-b_color border px-2 py-[6px]'>{item.Owner_Name}</td>
                    <td className=' border-b_color border px-2 py-[6px]'>{item.Owner_Address}</td>
                    <td className=' border-b_color border px-2 py-[6px]'>{item.Nature_of_Business}</td>
                    <td className=' border-b_color border px-2 py-[6px]'>{item.Location_Name}</td>
                    <td className=' border-b_color border px-2 py-[6px]'>{item.Contact_Person_Name}</td>
                    <td className=' border-b_color border px-2 py-[6px]'>
                      <button onClick={() => handleEditBranch(item._id)} className='text-blue-500 hover:underline'>Edit</button>
                      <button onClick={() => handleDeleteBranch(item._id)} className='text-red-500 hover:underline ml-2'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </DashboardLayout>
    </RootLayout>
  );
}

export default BranchMasterTable;
