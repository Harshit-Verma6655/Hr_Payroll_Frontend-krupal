import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MonthYearDialog = ({ isOpen, onCancel }) => {
    const navigate = useNavigate();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Create an array of years from 2000 to 2100
    const years = Array.from({ length: 101 }, (_, index) => 2000 + index); // 2000 to 2100

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    if (!isOpen) return null;

    const handleConfirm = () => {
        const month = months[selectedMonth];
        const year = selectedYear;
        // Navigate to SalaryCalculationMaster with month and year as query params
        navigate(`/SalaryCalculationMaster?month=${month}&year=${year}`);
        // Close the dialog
        onCancel(); // Call onCancel to close the dialog
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-xs w-full">
                <h2 className="text-lg mb-4 text-black">Select Month and Year</h2>

                <div className="mb-4">
                    <label htmlFor="month" className="block text-gray-700">Month:</label>
                    <select
                        id="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        className="border border-gray-300 rounded p-2 w-full text-black"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="year" className="block text-gray-700">Year:</label>
                    <select
                        id="year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="border border-gray-300 rounded p-2 w-full text-black"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={handleConfirm} // Call handleConfirm on click
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MonthYearDialog;
