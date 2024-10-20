import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import RootLayout from '../RootLayout';
import ConfirmDeleteDialog from '../../pages/ConfirmDeleteDialog'; // Import the dialog component
import { useSelector } from 'react-redux';

const ProvidentFundMasterTable = () => {
    const [calculationData, setCalculationData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // For search results
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [selectedId, setSelectedId] = useState(null); // State to hold the selected item ID for deletion
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [itemsPerPage] = useState(10); // Number of items per page
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_URL;
    const { companyName, companyId } = useSelector((state) => state.company);
    const active = "border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color";

    // Fetch calculations function
    const fetchCalculations = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/calculation-master/get?CompanyId=${companyId}`);
            if (response.ok) {
                const result = await response.json();
                setCalculationData(result.data); // Accessing the 'data' field in the API response
                setFilteredData(result.data); // Initialize filtered data for search
            } else {
                console.error('Error fetching calculations');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCalculations(); // Call fetchCalculations on component mount
    }, []);

    // Function to open the delete dialog
    const openDeleteDialog = (id) => {
        setSelectedId(id);
        setIsDialogOpen(true); // Show the dialog
    };

    // Handle the delete action
    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/calculation-master/${selectedId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Fetch calculations again to update the list
                await fetchCalculations();
            } else {
                console.error('Error deleting calculation');
            }
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setIsDialogOpen(false); // Close the dialog
        }
    };

    // Handle search functionality
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = calculationData.filter((item) =>
            String(item.PF_Type).toLowerCase().includes(value) ||
            String(item.Limit_Amount).toLowerCase().includes(value)
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page after search
    };


    // Get current data for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <RootLayout>
            <DashboardLayout>
                <section className='w-full px-10 py-4'>
                    <div className='w-full flex justify-between mb-4'>
                        <h2 className='text-xl font-semibold text-brand_color'>Provident Fund List</h2>
                        {companyName && (
                            <button className={active}>{companyName}</button>
                        )}
                        <button
                            className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80'
                            onClick={() => navigate('/AddPFcalculationMaster')}
                        >
                            Add Provident Fund
                        </button>
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search by PF Type or Limit Amount..."
                        className="px-4 py-2 border rounded mb-3"
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <table className='min-w-full border-collapse border border-gray-300'>
                                <thead>
                                    <tr>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>PF Type</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Limit Amount</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>PF Fund 12%</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Family Pension Fund 8.33%</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Employer PF 3.67%</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/C 1%</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/C 2%</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/C 2 Min Amount</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/C 10 (FPP) 8.33%</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/C 21%</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/C 21 Max Amount</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/C 22%</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/C 22 Min Amount</th>
                                        <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.length > 0 ? (
                                        currentData.map((item) => (
                                            <tr key={item.id}>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.PF_Type}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.Limit_Amount}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.PF_Fund}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.Family_Pension_Fund}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.Employer_PF}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.AC_1_Percent}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.AC_2_Percent}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.AC_2_Min_Amount}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.AC_10_FPP}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.AC_21_Percent}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.AC_21_Max_Amount}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.AC_22_Percent}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>{item.AC_22_Min_Amount}</td>
                                                <td className='border-b_color border px-2 py-[6px]'>
                                                    <button
                                                        className='text-blue-500 hover:underline'
                                                        onClick={() => navigate(`/EditCalculationMaster/${item._id}`)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className='text-red-500 hover:underline ml-2'
                                                        onClick={() => openDeleteDialog(item._id)} // Open the dialog on click
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="14" className='text-center py-4'>
                                                No records found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex justify-center mt-4">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-brand_colors text-white' : 'bg-white text-brand_color'}`}
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </section>

                {/* Confirm Delete Dialog */}
                <ConfirmDeleteDialog
                    isOpen={isDialogOpen} // Pass dialog visibility state
                    onDelete={handleDelete} // Pass the delete function
                    onCancel={() => setIsDialogOpen(false)} // Pass the cancel function
                />
            </DashboardLayout>
        </RootLayout>
    );
};

export default ProvidentFundMasterTable;
