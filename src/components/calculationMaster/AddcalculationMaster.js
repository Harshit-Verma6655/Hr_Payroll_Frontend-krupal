import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import RootLayout from '../RootLayout';

const AddcalculationMaster = () => {
    const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap";
    const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]";

    // State to store form data
    const [formData, setFormData] = useState({
        PF_Type: '',
        Limit_Amount: '',
        PF_Fund: '',
        Family_Pension_Fund: '',
        Employer_PF: '',
        AC_1_Percent: '',
        AC_2_Percent: '',
        AC_2_Min_Amount: '',
        AC_10_FPP: '',
        AC_21_Percent: '',
        AC_21_Max_Amount: '',
        AC_22_Percent: '',
        AC_22_Min_Amount: ''
    });

    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form reload
        console.log(formData); // Print form data to console
        navigate('/calculationMasterTable'); // Redirect after saving
    };

    return (
        <RootLayout>
            <DashboardLayout>
                <section className='w-full px-10 py-4'>
                    <div className='w-full flex justify-between mb-4'>
                        <h2 className='text-xl font-semibold text-brand_color'>Add Calculation Master</h2>
                    </div>
                    <form onSubmit={handleSubmit} className='w-[100%] flex flex-wrap gap-[20px] mb-3'>
                        {/* PF Type */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>PF Type</label>
                            <select className={InputCss} name='PF_Type' value={formData.PF_Type} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Above">Above</option>
                                <option value="Below">Below</option>
                            </select>
                        </div>

                        {/* Limit Amount */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>Limit Amount</label>
                            <input className={InputCss} type='number' name='Limit_Amount' value={formData.Limit_Amount} onChange={handleChange} />
                        </div>

                        {/* PF Fund 12% */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>PF Fund 12%</label>
                            <input className={InputCss} type='number' name='PF_Fund' value={formData.PF_Fund} onChange={handleChange} />
                        </div>

                        {/* Family Pension Fund 8.33% */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>Family Pension Fund 8.33%</label>
                            <input className={InputCss} type='number' name='Family_Pension_Fund' value={formData.Family_Pension_Fund} onChange={handleChange} />
                        </div>

                        {/* Employer PF 3.67% */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>Employer PF 3.67%</label>
                            <input className={InputCss} type='number' name='Employer_PF' value={formData.Employer_PF} onChange={handleChange} />
                        </div>

                        {/* A/C 1% */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>A/C 1%</label>
                            <input className={InputCss} type='number' name='AC_1_Percent' value={formData.AC_1_Percent} onChange={handleChange} />
                        </div>

                        {/* A/C 2% */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>A/C 2%</label>
                            <input className={InputCss} type='number' name='AC_2_Percent' value={formData.AC_2_Percent} onChange={handleChange} />
                        </div>

                        {/* A/C 2 Minimum Amount */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>A/C 2 Minimum Amount</label>
                            <input className={InputCss} type='number' name='AC_2_Min_Amount' value={formData.AC_2_Min_Amount} onChange={handleChange} />
                        </div>

                        {/* A/C 10 (FPP) 8.33% */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>A/C 10 (FPP) 8.33%</label>
                            <input className={InputCss} type='number' name='AC_10_FPP' value={formData.AC_10_FPP} onChange={handleChange} />
                        </div>

                        {/* A/C 21% */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>A/C 21%</label>
                            <input className={InputCss} type='number' name='AC_21_Percent' value={formData.AC_21_Percent} onChange={handleChange} />
                        </div>

                        {/* A/C 21 Max Amount */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>A/C 21 Max Amount</label>
                            <input className={InputCss} type='number' name='AC_21_Max_Amount' value={formData.AC_21_Max_Amount} onChange={handleChange} />
                        </div>

                        {/* A/C 22% */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>A/C 22%</label>
                            <input className={InputCss} type='number' name='AC_22_Percent' value={formData.AC_22_Percent} onChange={handleChange} />
                        </div>

                        {/* A/C 22 Minimum Amount */}
                        <div className='flex flex-col gap-1 w-[30%]'>
                            <label className={LabelCss}>A/C 22 Minimum Amount</label>
                            <input className={InputCss} type='number' name='AC_22_Min_Amount' value={formData.AC_22_Min_Amount} onChange={handleChange} />
                        </div>

                        {/* Save and Cancel buttons */}
                        <div className='w-full flex justify-end gap-3'>
                            <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded'>Save</button>
                            <button type='button' className='bg-gray-500 text-white py-2 px-4 rounded' onClick={() => navigate('/calculationMasterTable')}>Cancel</button>
                        </div>
                    </form>
                </section>
            </DashboardLayout>
        </RootLayout>
    );
};

export default AddcalculationMaster;
