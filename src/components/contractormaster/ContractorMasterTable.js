import React, { useEffect, useState } from 'react'
import RootLayout from '../RootLayout'
import DashboardLayout from '../DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ContractorMasterTable = () => {
  const navigate = useNavigate()
  const { companyName, companyId } = useSelector((state) => state.company);
  const [ContractAllData, setContractAllData] = useState()
  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleFetchContract = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/contract/all?CompanyId=${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = response.data;
      console.log(res);
      setContractAllData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchContract();
  }, []);

  const handleEditContract = async (conid) => {
    navigate("/contractormaster", { state: { id: conid, viewmode: "view" } })
  }

  const handleContractDelete = async (conid) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this contract?");
      if (isConfirmed) {
        const response = await axios.delete(`${BASE_URL}/contract/delete/${conid}`);
        const res = await response.data;
        handleFetchContract();
      }
    } catch (error) {
      console.log("Error deleting contract:", error);
    }
  };



  const active = "border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color"


  return (
    <RootLayout>
      <DashboardLayout>
        <section className='w-full px-10 py-4'>
          <div className='w-full flex justify-between mb-4'>
            <h2 className='text-xl font-semibold text-brand_color'>Contractor List</h2>
            {companyName &&
              <button className={active}>{companyName}</button>

            }
            {companyName !== "ALL" &&
              <button onClick={() => navigate("/contractormaster")} className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80'>
                Add Contractor +
              </button>
            }

          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Name</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>PAN Card No</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>No. of Labour Engaged</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Address</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Mobile No.</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Owner Name</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Owner Address</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {ContractAllData && ContractAllData.length > 0 ? (
                  ContractAllData.map((contract, index) => (
                    <tr key={index}>
                      <td className='border-b_color border px-2 py-[6px]'>{contract.Name}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{contract.PAN_Card_No}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{contract.No_of_labour_engaged}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{contract.Address}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{contract.Mobile_No}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{contract.Owner_Name}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{contract.Owner_Address}</td>
                      <td className='border-b_color border px-2 py-[6px]'>
                        <button className='text-blue-500 hover:underline' onClick={() => handleEditContract(contract._id)}>Edit</button>
                        <button className='text-red-500 hover:underline ml-2' onClick={() => handleContractDelete(contract._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className='text-center py-4'>No contracts found.</td>
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

export default ContractorMasterTable