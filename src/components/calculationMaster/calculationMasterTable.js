import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import RootLayout from '../RootLayout';
const CalculationMasterTable = () => {

    const navigate = useNavigate();
    const { companyName, companyId } = useSelector((state) => state.company);
    const active = "border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color";
    const calculationData = [
        {
            pfIndicator: "Yes",
            limitAmount: "50,000",
            pensionFund: "8.33%",
            familyPensionFund: "Family Pension",
            employeePension: "Employee Pension",
            ac1Percent: "1%",
            ac2Percent: "2%",
            ac2MinAmount: "500",
            ac10Percent: "10%",
            ac21Percent: "21%",
            ac21Max: "21,000",
            ac22Percent: "22%",
            ac22MinAmount: "1,000"
        },
        {
            pfIndicator: "No",
            limitAmount: "60,000",
            pensionFund: "12%",
            familyPensionFund: "Family Pension",
            employeePension: "Employee Pension",
            ac1Percent: "2%",
            ac2Percent: "3%",
            ac2MinAmount: "600",
            ac10Percent: "12%",
            ac21Percent: "20%",
            ac21Max: "20,000",
            ac22Percent: "22%",
            ac22MinAmount: "1,200"
        }
    ];

    return (
        <RootLayout>
            <DashboardLayout>
                <section className='w-full px-10 py-4'>
                    <div className='w-full flex justify-between mb-4'>
                        <h2 className='text-xl font-semibold text-brand_color'>Calculation Master List</h2>
                        {companyName && <button className={active}>{companyName}</button>}
                        {companyName !== "ALL" && (
                            <button onClick={() => navigate("/AddcalculationMaster")} className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80'>
                                Add Add PF
                            </button>
                        )}
                    </div>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full border-collapse'>
                            <thead>
                                <tr>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Pf indicator</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Limit Amount</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Pension Fund %</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Family Pension Fund</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Employee Pension</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/c 1%</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/c 2%</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/c 2 Min Amount</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/c 10%</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/c 21%</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/c 21% Maximum</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/c 22%</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>A/c 22% Min Amount</th>
                                    <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculationData.map((item, index) => (
                                    <tr key={index}>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.pfIndicator}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.limitAmount}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.pensionFund}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.familyPensionFund}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.employeePension}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.ac1Percent}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.ac2Percent}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.ac2MinAmount}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.ac10Percent}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.ac21Percent}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.ac21Max}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.ac22Percent}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>{item.ac22MinAmount}</td>
                                        <td className='border-b_color border px-2 py-[6px]'>
                                            <button className='text-blue-500 hover:underline'>Edit</button>
                                            <button className='text-red-500 hover:underline ml-2'>Delete</button>
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

export default CalculationMasterTable;
