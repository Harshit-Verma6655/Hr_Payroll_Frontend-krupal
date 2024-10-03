import React from 'react'
import RootLayout from '../RootLayout'
import DashboardLayout from '../DashboardLayout'
import { useNavigate } from 'react-router-dom'

const CompantTable = () => {
    const navigate  = useNavigate()
  return (
    <RootLayout>
    <DashboardLayout>
    <section className='w-full px-10 py-4'>
        <div className='w-full flex justify-between mb-4'>
          <h2 className='text-xl font-semibold text-brand_color'>Company List</h2>
         
            <button onClick={()=>navigate('/companymaster')} className='bg-brand_colors text-white px-4 py-2 rounded hover:bg-opacity-80'>
            Add Company +
          </button>
          
          
        </div>
  
        <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse'>
            <thead>
              <tr>
              
  
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Company no.</th>
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Company name</th>
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Company start date</th>
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Company type</th>
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Nature of industry</th>
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Pan no.</th>
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Contact person 1</th>
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Designation 1</th>
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Phone 1</th>
                <th className='border-b_color border px-2 py-[6px] text-left text-brand_color text-[14px]'>Action</th>


  
              </tr>
            </thead>
            <tbody>
              
                <tr></tr>
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
   </RootLayout>
  )
}

export default CompantTable