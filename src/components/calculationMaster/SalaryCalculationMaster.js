import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import RootLayout from '../RootLayout';

const SalaryCalculationMaster = () => {
    const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap";
    const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]";

    const [formData, setFormData] = useState({
        year: 0,
        month: '',
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
        glwf: 0,
        employeePF: 0,
        employerPF: 0,
        professionalTax: 200,
        tds: 0,
        glwfEmployer: 0,
        esic: 0,
        employerESIC: 0,
        advance: 0,
        ac1: 0,
        ac2: 0,
        ac10: 0,
        ac21: 0,
        ac22: 0,
        otherDeductions: 0,
        familyPensionFund: 0,
        grossDeductions: 0,
        grossEarnings: 0,
        netAmount: 0,
        remarks: '',
    });

    const navigate = useNavigate();
    const location = useLocation();

    // Fetch month and year from query params on component mount
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const month = params.get('month') || 'Oct'; // Default to 'Oct' if not found
        const year = params.get('year') || 0; // Default to 0 if not found

        setFormData(prevData => ({
            ...prevData,
            month,
            year: parseInt(year, 10), // Convert year to number
        }));
    }, [location.search]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate('/providentFund');
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
                    <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
                        <h2 className='text-[20px] font-bold'>Add Calculation Master</h2>
                    </div>

                    <form onSubmit={handleSubmit} className='w-full flex flex-wrap gap-4 mb-3'>

                        {/* Year/Month */}
                        <div className='flex flex-wrap gap-5 w-[100%] mt-3'>
                            <div>
                                <label className={LabelCss}>Year</label>
                                <input className={InputCss} type='text' name='year' value={formData.year} onChange={handleChange} readOnly />
                            </div>
                            <div>
                                <label className={LabelCss}>Month</label>
                                <input className={InputCss} type='text' name='month' value={formData.month} onChange={handleChange} readOnly />
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
                        <div className='w-[100%] flex gap-3'>
                            <div className='w-[50%]'>
                                {/* Title Section */}
                                <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
                                    <h2 className='text-[20px] font-bold'>Addition</h2>
                                </div>
                                {/* Main Content Section */}
                                <div className='w-[100%] flex gap-4 mt-4'>
                                    {/* Left Column - 50% */}
                                    <div className='w-[100%] flex flex-col gap-3'>
                                        {/* Payable Days */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Payable Days</label>
                                            <input className={InputCss} type='number' name='payableDays' value={formData.payableDays} onChange={handleChange} />
                                        </div>

                                        {/* Payable Amount */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Payable Amount</label>
                                            <input className={InputCss} type='number' name='payableAmount' value={formData.payableAmount} onChange={handleChange} />
                                        </div>

                                        {/* Daily Allowance */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Daily Allowance</label>
                                            <input className={InputCss} type='number' name='dailyAllowance' value={formData.dailyAllowance} onChange={handleChange} />
                                        </div>

                                        {/* HRA */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>HRA</label>
                                            <input className={InputCss} type='number' name='hra' value={formData.hra} onChange={handleChange} />
                                        </div>

                                        {/* Travel Allowance */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Traveling Allowance</label>
                                            <input className={InputCss} type='number' name='travelAllowance' value={formData.travelAllowance} onChange={handleChange} />
                                        </div>

                                        {/* Conveyance */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Conveyance</label>
                                            <input className={InputCss} type='number' name='conveyance' value={formData.conveyance} onChange={handleChange} />
                                        </div>

                                        {/* WALA */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>WALA</label>
                                            <input className={InputCss} type='number' name='wala' value={formData.wala} onChange={handleChange} />
                                        </div>

                                        {/* Other Amount */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Other Amount</label>
                                            <input className={InputCss} type='number' name='otherAmount' value={formData.otherAmount} onChange={handleChange} />
                                        </div>
                                    </div>

                                    {/* Right Column - 50% */}
                                    <div className='w-[100%] flex flex-col gap-3'>
                                        {/* Over Time */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Over Time</label>
                                            <input className={InputCss} type='number' name='overTime' value={formData.overTime} onChange={handleChange} />
                                        </div>

                                        {/* Special Allowance */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Special Allowance</label>
                                            <input className={InputCss} type='number' name='specialAllowance' value={formData.specialAllowance} onChange={handleChange} />
                                        </div>

                                        {/* Allowance 5 */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Allowance 5</label>
                                            <input className={InputCss} type='number' name='allowance5' value={formData.allowance5} onChange={handleChange} />
                                        </div>

                                        {/* Allowance 6 */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Allowance 6</label>
                                            <input className={InputCss} type='number' name='allowance6' value={formData.allowance6} onChange={handleChange} />
                                        </div>

                                        {/* Allowance 7 */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Allowance 7</label>
                                            <input className={InputCss} type='number' name='allowance7' value={formData.allowance7} onChange={handleChange} />
                                        </div>

                                        {/* Allowance 8 */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Allowance 8</label>
                                            <input className={InputCss} type='number' name='allowance8' value={formData.allowance8} onChange={handleChange} />
                                        </div>


                                        {/* Difference to Pay */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Diff. to Pay</label>
                                            <input className={InputCss} type='number' name='diffToPay' value={formData.diffToPay} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[50%]'>
                                {/* Title Section */}
                                <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
                                    <h2 className='text-[20px] font-bold'>Deductions</h2>
                                </div>

                                {/* Main Content Section */}
                                <div className='w-[100%] flex gap-4 mt-4'>
                                    {/* Left Column - 50% */}
                                    <div className='w-[100%] flex flex-col gap-3'>
                                        {/* Loan */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Loan</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='loan'
                                                value={formData.loan}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* GLWF */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>GLWF</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='glwf'
                                                value={formData.glwf}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {/* Employee PF */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Employee PF</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='employeePF'
                                                value={formData.employeePF}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Employer PF */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Employer PF</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='employerPF'
                                                value={formData.employerPF}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Professional Tax */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Professional Tax</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='professionalTax'
                                                value={formData.professionalTax}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>

                                        {/* TDS */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>TDS</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='tds'
                                                value={formData.tds}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* GLWF Employer */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>GLWF Employer</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='glwfEmployer'
                                                value={formData.glwfEmployer}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* ESIC */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>ESIC</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='esic'
                                                value={formData.esic}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Employer ESIC */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Employer ESIC</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='employerESIC'
                                                value={formData.employerESIC}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column - 50% */}
                                    <div className='w-[100%] flex flex-col gap-3'>

                                        {/* Advance */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Advance</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='advance'
                                                value={formData.advance}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* AC 1 */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>AC 1</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='ac1'
                                                value={formData.ac1}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* AC 2 */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>AC 2</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='ac2'
                                                value={formData.ac2}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* AC 10 */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>AC 10</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='ac10'
                                                value={formData.ac10}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* AC 21 */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>AC 21</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='ac21'
                                                value={formData.ac21}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* AC 22 */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>AC 22</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='ac22'
                                                value={formData.ac22}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Other Deductions */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Other Deductions</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='otherDeductions'
                                                value={formData.otherDeductions}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Family Pension Fund */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Family Pension Fund</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='familyPensionFund'
                                                value={formData.familyPensionFund}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Gross Deductions */}
                                        <div className='flex flex-col gap-1 w-[100%]'>
                                            <label className={LabelCss}>Gross Deductions</label>
                                            <input
                                                className={InputCss}
                                                type='number'
                                                name='Gross Deductions'
                                                value={formData.grossDeductions}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
                        <h2 className='text-[20px] font-bold'>Total Calculation</h2>
                    </div>
                    <div className='w-[100%] flex gap-3 mt-3'>
                        {/* Gross Salary */}
                        <div className='w-[50%]'>
                            <label className={LabelCss}>Gross Earning</label>
                            <input
                                className={`${InputCss} bg-gray-200`} // make it read-only
                                type='number'
                                name='grossEarnings'
                                value={formData.grossEarnings}
                                readOnly
                            />
                        </div>

                        {/* Net Amount */}
                        <div className='w-[50%]'>
                            <label className={LabelCss}>Net Amount</label>
                            <input
                                className={`${InputCss} bg-gray-200`} // make it read-only
                                type='number'
                                name='netAmount'
                                value={formData.netAmount}
                                readOnly
                            />
                        </div>
                    </div>
                    {/* Save and Clear buttons */}
                    <div className='flex gap-4 mt-3'>
                        <button className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80' type='submit'>Save</button>
                        <button className='bg-gray-500 text-white px-4 py-2 rounded' type='reset'>Clear</button>
                    </div>
                </section>
            </DashboardLayout>
        </RootLayout >
    );
};

export default SalaryCalculationMaster;
