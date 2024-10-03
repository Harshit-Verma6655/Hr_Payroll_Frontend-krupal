import React, { useEffect, useState } from 'react';
import RootLayout from '../RootLayout';
import DashboardLayout from '../DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EmployeeTable = () => {
  const navigate = useNavigate()
  const [EmployeeDetails,setEmployeeDetails]=useState()
  const { companyName, companyId } = useSelector((state) => state.company);
  const BASE_URL = process.env.REACT_APP_API_URL;


  const employees = [
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Smith', position: 'Designer' },
    { id: 3, name: 'Mark Johnson', position: 'Product Manager' },
  ];
  const active="border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color"

  const handleFetchCompanyEmployee = async()=>{
    try{
      const response = await axios.get(`${BASE_URL}/employee/employees/${companyId}`)
      const res = await response.data
      setEmployeeDetails(res)

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
if(companyId){
  handleFetchCompanyEmployee()
}
  },[companyId])


  const handleDeleteEmployee = async (companyIds) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
      if (isConfirmed) {
        const response = await axios.delete(`${BASE_URL}/employee/${companyIds}`);
        handleFetchCompanyEmployee();
      }
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };
  


  return (
 <RootLayout>
  <DashboardLayout>
  <section className='w-full px-10 py-4'>
      <div className='w-full flex justify-between mb-4'>
        <h2 className='text-xl font-semibold text-brand_color'>Employee List</h2>
        {companyName&&
  <button className={active}>{companyName}</button>

}
        {companyName !=="ALL" &&
          <button onClick={()=>navigate('/employeemaster')} className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80'>
          Add Employee +
        </button>
        }
        
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse'>
          <thead>
            <tr>
            

              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Sr. no</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Emp no.</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Name</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Designation</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Birth date</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Joining date</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Basic pay</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Rate DA</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Rate HRA</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Conveyance</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Travelling allowance</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Special allowance all total</th>
              <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Action</th>

            </tr>
          </thead>
          <tbody>
          {EmployeeDetails &&
            EmployeeDetails?.map((emp,index)=>(
              <tr key={index}>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Sr_emp}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Employee_Code}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Name_on_Aadhar}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Designation_Name}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Birth_Date}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Joining_Date}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Gross_Salary}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.DA_Rate}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.HRA}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Conveyance}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Travelling_Allowance}</td>
              <td className=' border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Other_Amount}</td>
              <td className=' border-b_color border px-2 py-[6px] '>
                      <button className='text-blue-500 hover:underline' onClick={()=>{
                        navigate("/employeemaster",{state:{empid:emp?._id,viewmode:"view"}})
                      }}>Edit</button>
                      <button className='text-red-500 hover:underline ml-2' onClick={()=>handleDeleteEmployee(emp?._id)}>Delete</button>
                    </td>

              </tr>
            ))

          }
            
            
          </tbody>
        </table>
      </div>
    </section>
  </DashboardLayout>
 </RootLayout>
  );
};

export default EmployeeTable;
