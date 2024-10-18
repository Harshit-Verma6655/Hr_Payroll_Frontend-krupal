import React, { useEffect, useState } from 'react';
import RootLayout from '../RootLayout';
import DashboardLayout from '../DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PasswordVerifyDialog from './PasswordVerifyDialog'; // Import the PasswordVerifyDialog component

const EmployeeTable = () => {
  const navigate = useNavigate();
  const [EmployeeDetails, setEmployeeDetails] = useState([]); // Initialize as an empty array
  const { companyName, companyId } = useSelector((state) => state.company);
  const BASE_URL = process.env.REACT_APP_API_URL;

  const [showPasswordDialog, setShowPasswordDialog] = useState(false); // State to manage dialog visibility
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null); // Store the ID of the employee to be deleted
  const active = "border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color";

  const handleFetchCompanyEmployee = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/employee/employees/${companyId}`);
      const { employees } = response.data; // Destructure to get employees
      setEmployeeDetails(employees); // Set the employees to state
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (companyId) {
      handleFetchCompanyEmployee();
    }
  }, [companyId]);

  const handleDeleteEmployee = (employeeId) => {
    setCurrentEmployeeId(employeeId); // Set the current employee ID
    setShowPasswordDialog(true); // Show the password dialog
  };

  const verifyPassword = async (password) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve user data from localStorage
      const userId = userData?._id; // Extract user ID from userData

      // Ensure the password and userId are being sent correctly
      const response = await axios.post(`${BASE_URL}/users/verify-password`, {
        _id: userId,  // Sending the correct field '_id'
        password,     // Sending the password field
      });

      return response.status === 200; // Return true if password is valid
    } catch (error) {
      console.log("Error verifying password:", error);
      return false; // Return false if there was an error
    }
  };

  const handlePasswordVerifyClose = async (isVerified) => {
    if (isVerified) {
      // If verified, proceed to delete the employee
      try {
        const response = await axios.delete(`${BASE_URL}/employee/${currentEmployeeId}`);
        console.log("Employee deleted:", response.data);
        // After deletion, fetch the updated employee list
        await handleFetchCompanyEmployee(); // Refresh the employee list
      } catch (error) {
        console.log("Error deleting employee:", error);
      }
    }
    setShowPasswordDialog(false); // Close the dialog
    setCurrentEmployeeId(null); // Clear the employee ID
  };

  return (
    <RootLayout>
      <DashboardLayout>
        <section className='w-full px-10 py-4'>
          <div className='w-full flex justify-between mb-4'>
            <h2 className='text-xl font-semibold text-brand_color'>Employee List</h2>
            {companyName && (
              <button className={active}>{companyName}</button>
            )}
            {companyName !== "ALL" && (
              <button onClick={() => navigate('/employeemaster')} className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80'>
                Add Employee +
              </button>
            )}
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
                {Array.isArray(EmployeeDetails) && EmployeeDetails.length > 0 ? (
                  EmployeeDetails.map((emp, index) => (
                    <tr key={index}>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Sr_emp}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Code}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Name_on_Aadhar}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Designation_Name}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Birth_Date}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Joining_Date}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Gross_Salary}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.DA_Rate}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.HRA}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Conveyance}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Travelling_Allowance}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Other_Amount}</td>
                      <td className='border-b_color border px-2 py-[6px] '>
                        <button className='text-blue-500 hover:underline' onClick={() => {
                          navigate("/employeemaster", { state: { empid: emp?._id, viewmode: "view" } });
                        }}>Edit</button>
                        <button className='text-red-500 hover:underline ml-2' onClick={() => handleDeleteEmployee(emp?._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className='text-center py-4'>No employees available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {showPasswordDialog && (
            <PasswordVerifyDialog
              onClose={handlePasswordVerifyClose}
              onVerify={verifyPassword}
            />
          )}
        </section>
      </DashboardLayout>
    </RootLayout>
  );
};

export default EmployeeTable;
