import React, { useEffect, useState } from 'react';
import RootLayout from '../RootLayout';
import DashboardLayout from '../DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PasswordVerifyDialog from './PasswordVerifyDialog';

const EmployeeTable = () => {
  const navigate = useNavigate();
  const [EmployeeDetails, setEmployeeDetails] = useState([]);
  const { companyName, companyId } = useSelector((state) => state.company);
  const BASE_URL = process.env.REACT_APP_API_URL;

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10); // Show 10 employees per page

  const active = "border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color";

  const handleFetchCompanyEmployee = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/employee/employees/${companyId}`);
      const { employees } = response.data;
      console.log("response.data", response.data);
      setEmployeeDetails(response.data);
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
    setCurrentEmployeeId(employeeId);
    setShowPasswordDialog(true);
  };

  const verifyPassword = async (password) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userId = userData?._id;

      const response = await axios.post(`${BASE_URL}/users/verify-password`, {
        _id: userId,
        password,
      });

      return response.status === 200;
    } catch (error) {
      console.log("Error verifying password:", error);
      return false;
    }
  };

  const handlePasswordVerifyClose = async (isVerified) => {
    if (isVerified) {
      try {
        const response = await axios.delete(`${BASE_URL}/employee/${currentEmployeeId}`);
        console.log("Employee deleted:", response.data);
        await handleFetchCompanyEmployee();
      } catch (error) {
        console.log("Error deleting employee:", error);
      }
    }
    setShowPasswordDialog(false);
    setCurrentEmployeeId(null);
  };

  // Search handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Pagination handlers
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = EmployeeDetails?.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter employees based on the search term
  const filteredEmployees = currentEmployees?.filter((employee) =>
    employee?.Name_on_Aadhar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee?.Employee_Code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          {/* Search input */}
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Search by name or emp code'
              className="px-4 py-2 border rounded"
              value={searchTerm}
              onChange={handleSearch}
            />
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
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Pay_Rate</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Rate DA</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Rate HRA</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Conveyance</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Travelling allowance</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Special allowance all total</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees?.length > 0 ? (
                  filteredEmployees?.map((emp, index) => (
                    <tr key={index}>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Sr_emp}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Code}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Name_on_Aadhar}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Designation_Name}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Birth_Date}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Joining_Date}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Consolidated_Salary}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Pay_Rate}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.DA_Rate}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.HRA}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Conveyance}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Travelling_Allowance}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{emp?.Employee_Salary?.Special_Allowance}</td>
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

          {/* Pagination */}
          <div className='flex justify-center mt-4'>
            <nav>
              <ul className='flex space-x-2'>
                {Array.from({ length: Math.ceil(EmployeeDetails?.length / employeesPerPage) }, (_, index) => (
                  <li key={index} className={`px-3 py-2 cursor-pointer ${index + 1 === currentPage ? 'bg-brand_colors text-white' : 'bg-gray-200'}`} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </li>
                ))}
              </ul>
            </nav>
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