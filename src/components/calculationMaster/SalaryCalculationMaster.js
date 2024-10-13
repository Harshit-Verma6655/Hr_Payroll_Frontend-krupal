import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import RootLayout from '../RootLayout';

const SalaryCalculationMaster = () => {
    const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap";
    const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]";

    const [formData, setFormData] = useState({
        year: 0,
        month: 'Oct',
        workingDays: 0,
        employeeName: '',
        payableDays: 0,
        payableAmount: 0,
        dailyAllowance: 0,
        hra: 0,
        travelAllowance: 0,
        conveyance: 0,
        wala: 0,
        otherAmount: 0,
        overTime: 0,
        specialAllowance: 0,
        allowance5: 0,
        allowance6: 0,
        allowance7: 0,
        allowance8: 0,
        diffToPay: 0,
        loan: 0,
        advance: 0,
        glwf: 0,
        employeePF: 0,
        employerPF: 0,
        professionalTax: 0,
        esic: 0,
        employerESIC: 0,
        tds: 0,
        glwfEmployer: 0,
        otherDeductions: 0,
        familyPensionFund: 0,
        grossEarnings: 0,
        netAmount: 0,
        grossDeductions: 0,
        remarks: '',
        leftDate: ''
    });

    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate('/calculationMasterTable');
    };
    // Sample array of employee names
    const employeeNames = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
        // Add more employee names as needed
    ];

    return (
        <RootLayout>
            <DashboardLayout>
                <section className='w-full px-10 py-4'>
                    <div className='w-full flex justify-between mb-4'>
                        <h2 className='text-xl font-semibold text-brand_color'>Add Calculation Master</h2>
                    </div>

                    <form onSubmit={handleSubmit} className='w-full flex flex-wrap gap-4 mb-3'>

                        {/* Year/Month */}
                        <div className='flex flex-wrap gap-5 w-[100%]'>
                            <div>
                                <label className={LabelCss}>Year</label>
                                <input className={InputCss} type='text' name='year' value={formData.year} onChange={handleChange} />
                            </div>
                            <div>
                                <label className={LabelCss}>Month</label>
                                <input className={InputCss} type='text' name='month' value={formData.month} onChange={handleChange} />
                            </div>

                            {/* Working Days */}
                            <div>
                                <label className={LabelCss}>Working Days</label>
                                <input className={InputCss} type='number' name='workingDays' value={formData.workingDays} onChange={handleChange} />
                            </div>
                        </div>
                        {/* Employee Name */}
                        <div className='flex flex-wrap w-[100%]'>
                            <label className={LabelCss}>Employee Name</label>
                            <select
                                className={InputCss}
                                name='employeeName'
                                value={formData.employeeName}
                                onChange={handleChange}
                            >
                                <option value=''>Select Employee</option>
                                {employeeNames.map(employee => (
                                    <option key={employee.id} value={employee.name}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Payable Days */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Payable Days</label>
                            <input className={InputCss} type='number' name='payableDays' value={formData.payableDays} onChange={handleChange} />
                        </div>

                        {/* Payable Amount */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Payable Amount</label>
                            <input className={InputCss} type='number' name='payableAmount' value={formData.payableAmount} onChange={handleChange} />
                        </div>

                        {/* Daily Allowance */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Daily Allowance</label>
                            <input className={InputCss} type='number' name='dailyAllowance' value={formData.dailyAllowance} onChange={handleChange} />
                        </div>

                        {/* HRA */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>HRA</label>
                            <input className={InputCss} type='number' name='hra' value={formData.hra} onChange={handleChange} />
                        </div>

                        {/* Travel Allowance */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Traveling Allowance</label>
                            <input className={InputCss} type='number' name='travelAllowance' value={formData.travelAllowance} onChange={handleChange} />
                        </div>

                        {/* Conveyance */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Conveyance</label>
                            <input className={InputCss} type='number' name='conveyance' value={formData.conveyance} onChange={handleChange} />
                        </div>

                        {/* WALA */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>WALA</label>
                            <input className={InputCss} type='number' name='wala' value={formData.wala} onChange={handleChange} />
                        </div>

                        {/* Other Amount */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Other Amount</label>
                            <input className={InputCss} type='number' name='otherAmount' value={formData.otherAmount} onChange={handleChange} />
                        </div>
                        <div className='flex flex-wrap gap-5 w-[100%]'>
                            <h2>Addition</h2>
                        </div>
                        {/* Over Time */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Over Time</label>
                            <input className={InputCss} type='number' name='overTime' value={formData.overTime} onChange={handleChange} />
                        </div>

                        {/* Special Allowance */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Special Allowance</label>
                            <input className={InputCss} type='number' name='specialAllowance' value={formData.specialAllowance} onChange={handleChange} />
                        </div>

                        {/* Allowances 5-8 */}
                        {['allowance5', 'allowance6', 'allowance7', 'allowance8'].map((allowance, index) => (
                            <div key={index} className='flex flex-col gap-1 w-[24%]'>
                                <label className={LabelCss}>Allowance {index + 5}</label>
                                <input className={InputCss} type='number' name={allowance} value={formData[allowance]} onChange={handleChange} />
                            </div>
                        ))}

                        {/* Difference to Pay */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Diff. to Pay</label>
                            <input className={InputCss} type='number' name='diffToPay' value={formData.diffToPay} onChange={handleChange} />
                        </div>
                        <div className='flex flex-wrap gap-5 w-[100%]'>
                            <h2>Deductions</h2>
                        </div>
                        {/* Loan */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Loan</label>
                            <input
                                className={InputCss}
                                type='number'
                                name='loan'
                                value={formData.loan}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Advance */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Advance</label>
                            <input
                                className={InputCss}
                                type='number'
                                name='advance'
                                value={formData.advance}
                                onChange={handleChange}
                            />
                        </div>

                        {/* GLWF */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>GLWF</label>
                            <input
                                className={InputCss}
                                type='number'
                                name='glwf'
                                value={formData.glwf}
                                onChange={handleChange}
                            />
                        </div>


                        {/* ESIC, Employer ESIC */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>ESIC</label>
                            <input className={InputCss} type='number' name='esic' value={formData.esic} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Employer ESIC</label>
                            <input className={InputCss} type='number' name='employerESIC' value={formData.employerESIC} onChange={handleChange} />
                        </div>

                        {/* TDS, GLWF Employer, Other Deductions, Family Pension Fund */}
                        {['tds', 'glwfEmployer', 'otherDeductions', 'familyPensionFund'].map((deduction, index) => (
                            <div key={index} className='flex flex-col gap-1 w-[24%]'>
                                <label className={LabelCss}>{deduction.charAt(0).toUpperCase() + deduction.slice(1)}</label>
                                <input className={InputCss} type='number' name={deduction} value={formData[deduction]} onChange={handleChange} />
                            </div>
                        ))}

                        {/* Gross Salary */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Gross Salary</label>
                            <input
                                className={`${InputCss} bg-gray-200`} // make it read-only
                                type='number'
                                name='grossEarnings'
                                value={formData.grossEarnings}
                                readOnly
                            />
                        </div>

                        {/* Net Amount */}
                        <div className='flex flex-col gap-1 w-[24%]'>
                            <label className={LabelCss}>Net Amount</label>
                            <input
                                className={`${InputCss} bg-gray-200`} // make it read-only
                                type='number'
                                name='netAmount'
                                value={formData.netAmount}
                                readOnly
                            />
                        </div>


                    </form>
                    {/* Save and Clear buttons */}
                    <div className='flex gap-4'>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded' type='submit'>Save</button>
                        <button className='bg-gray-500 text-white px-4 py-2 rounded' type='reset'>Clear</button>
                    </div>
                </section>
            </DashboardLayout>
        </RootLayout>
    );
};

export default SalaryCalculationMaster;
