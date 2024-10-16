import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import RootLayout from '../RootLayout';

const AddCalculationMaster = () => {
    const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap";
    const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]";
    const BASE_URL = process.env.REACT_APP_API_URL;

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

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the ID from the URL

    useEffect(() => {
        // Fetch data only if ID exists
        if (id) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`${BASE_URL}/calculation-master/${id}`);
                    if (response.ok) {
                        const result = await response.json();
                        const data = result.data; // Extract the 'data' object from the response
                        setFormData({
                            PF_Type: data.PF_Type || '',
                            Limit_Amount: data.Limit_Amount || '',
                            PF_Fund: data.PF_Fund || '',
                            Family_Pension_Fund: data.Family_Pension_Fund || '',
                            Employer_PF: data.Employer_PF || '',
                            AC_1_Percent: data.AC_1_Percent || '',
                            AC_2_Percent: data.AC_2_Percent || '',
                            AC_2_Min_Amount: data.AC_2_Min_Amount || '',
                            AC_10_FPP: data.AC_10_FPP || '',
                            AC_21_Percent: data.AC_21_Percent || '',
                            AC_21_Max_Amount: data.AC_21_Max_Amount || '',
                            AC_22_Percent: data.AC_22_Percent || '',
                            AC_22_Min_Amount: data.AC_22_Min_Amount || '',
                        });
                    } else {
                        console.error('Error fetching data');
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/calculation-master${id ? `/${id}` : ''}`, {
                method: id ? 'PUT' : 'POST', // Use PUT for editing
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/calculationMasterTable');
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RootLayout>
            <DashboardLayout>
                <section className='w-full px-10 py-4'>
                    <div className='w-full flex justify-between mb-4'>
                        <h2 className='text-xl font-semibold text-brand_color'>{id ? 'Edit Calculation Master' : 'Add Calculation Master'}</h2>
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
                            <button type='submit' className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80' disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button type='button' className='bg-gray-500 text-white py-2 px-4 rounded' onClick={() => navigate('/calculationMasterTable')}>Cancel</button>
                        </div>
                    </form>
                </section>
            </DashboardLayout>
        </RootLayout>
    );
};

export default AddCalculationMaster;
