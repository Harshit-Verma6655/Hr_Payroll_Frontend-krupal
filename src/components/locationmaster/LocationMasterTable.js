import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../DashboardLayout'
import RootLayout from '../RootLayout'

const LocationMasterTable = () => {
  const navigate = useNavigate()
  const { companyName, companyId } = useSelector((state) => state.company);
  const [LocationAllData, setLocationAllData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page
  const active = "border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color"

  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleFetchLocation = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/location/all?CompanyId=${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = response.data;
      setLocationAllData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchLocation();
  }, []);

  const handleEdit = (locid) => {
    navigate("/locationsitemaster", { state: { id: locid, viewmode: "view" } })
  }

  const handleDelete = async (locid) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this location?");
      if (isConfirmed) {
        await axios.delete(`${BASE_URL}/location/delete/${locid}`);
        handleFetchLocation();
      }
    } catch (error) {
      console.log("Error deleting location:", error);
    }
  };

  // Filter locations based on search term
  const filteredLocations = LocationAllData.filter((location) =>
    location.Location_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <RootLayout>
      <DashboardLayout>
        <section className='w-full px-10 py-4'>
          <div className='w-full flex justify-between mb-4'>
            <h2 className='text-xl font-semibold text-brand_color'>Location And Site List</h2>
            {companyName &&
              <button className={active}>{companyName}</button>
            }
            {companyName !== "ALL" &&
              <button onClick={() => navigate("/locationsitemaster")} className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80'>
                Location And Site +
              </button>
            }
          </div>

          {/* Search Bar */}
          <div className='mb-4'>
            <input
              type="text"
              placeholder="Search by Location Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Location No.</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Location Name</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Phone No.</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Address</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>City</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Pin Code</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>State</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Country</th>
                  <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLocations.length > 0 ? (
                  currentLocations.map((location, index) => (
                    <tr key={index}>
                      <td className='border-b_color border px-2 py-[6px]'>{location.Location_No}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{location.Location_Name}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{location.Phone_f}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{location.Address}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{location.City}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{location.Pin_Code}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{location.State}</td>
                      <td className='border-b_color border px-2 py-[6px]'>{location.Country}</td>
                      <td className='border-b_color border px-2 py-[6px] flex item-center gap-3'>
                        <button className='text-blue-600 hover:underline' onClick={() => handleEdit(location._id)}>Edit</button>
                        <button className='text-red-600 hover:underline' onClick={() => handleDelete(location._id)}>Delete</button>
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

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(filteredLocations.length / itemsPerPage) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-brand_colors text-white' : 'bg-white text-black'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>
      </DashboardLayout>
    </RootLayout>
  )
}

export default LocationMasterTable