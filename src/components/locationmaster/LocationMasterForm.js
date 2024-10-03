import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const LocationMasterForm = ({AllExpand,notSave,LocationData,handleLocationData,handleLocationupdate,editView}) => {
    const [ContractorInformation,setContractorInformation]=useState(true)
    const [LocationAddressContactDetails,setLocationAddressContactDetails]=useState(false)
    const InformationBox="w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]"
    const ReactIcon = 'text-white text-[24px] cursor-pointer'
    const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap"
    const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]"

    const handleSubmit = async (e) => {
      e.preventDefault(); 
      const BASE_URL = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem("token");
  
      try {
          const response = await axios.post(`${BASE_URL}/location/create`, LocationData, {
              headers: {
                  Authorization: `Bearer ${token}`, 
              },
          });
          console.log(response.data); 
          toast.success(response.data.message)
      } catch (error) {
         console.log(error)
      }
  };
  
    useEffect(()=>{
        if(AllExpand===true){
          setContractorInformation(true)
          setLocationAddressContactDetails(true)
        }else{
          setContractorInformation(true)
          setLocationAddressContactDetails(false)
        }
          },[AllExpand])
  return (
    <section className='py-3'>
 
          <br/>
          <form>
          <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
        <h2 className='text-[26px] cursor-pointer'>1. Location Information</h2>
        {ContractorInformation?
            <FiChevronUp className={ReactIcon} onClick={()=>setContractorInformation(!ContractorInformation)}/>
            :      <FiChevronDown className={ReactIcon} onClick={()=>setContractorInformation(!ContractorInformation)}/>
        }
      </div>
      {ContractorInformation &&
        <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[40px]'>
                <div className='w-[100%] flex  gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Location No. </label>
            <input className={InputCss} type='text'
            name="Location_No"
            value={LocationData.Location_No}
            onChange={handleLocationData}


            />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Phone (O) </label>
            <input className={InputCss} type='number' 
               name="Phone_o"
            value={LocationData.Phone_o}
            onChange={handleLocationData}
            />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Phone (F) </label>
            <input className={InputCss} type='number'
             name="Phone_f"
            value={LocationData.Phone_f}
            onChange={handleLocationData}
             />
            </div>
                </div>
            </div>
        </div>
      }
      <br/>
      <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
        <h2 className='text-[26px] cursor-pointer'>2. Location Address & Contact Details</h2>
        {LocationAddressContactDetails?
            <FiChevronUp className={ReactIcon} onClick={()=>setLocationAddressContactDetails(!LocationAddressContactDetails)}/>
            :      <FiChevronDown className={ReactIcon} onClick={()=>setLocationAddressContactDetails(!LocationAddressContactDetails)}/>
        }
      </div>

      {LocationAddressContactDetails &&
        <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[40px]'>
                <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Address </label>
            <input className={InputCss} type='text' 
               name="Address"
            value={LocationData.Address}
            onChange={handleLocationData}
            />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>City </label>
            <input className={InputCss} type='text' 
                name="City"
            value={LocationData.City}
            onChange={handleLocationData}
            />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Pin Code </label>
            <input className={InputCss} type='number' 
                  name="Pin_Code"
            value={LocationData.Pin_Code}
            onChange={handleLocationData}
            />
            </div>

                </div>
               
            </div>
            <div className='w-[100%] flex gap-[40px] mt-3'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>State </label>
            <input className={InputCss} type='text' 
              name="State"
            value={LocationData.State}
            onChange={handleLocationData}
            />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Country </label>
            <input className={InputCss} type='text' 
                name="Country"
            value={LocationData.Country}
            onChange={handleLocationData}
            />
            </div>
            <div className='w-[100%]'/>
                </div>
        </div>
      }

      {notSave!=="normalVisit" &&
        <div className='w-[100%] flex justify-end mt-5'>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-2 text-brand_color border-[1px] rounded border-brand_b_color'>Cancel</button>
          <button className='px-3 py-2 bg-brand_colors text-white rounded border-none' onClick={editView==="view"?handleLocationupdate:handleSubmit}>Save</button>

        </div>
      </div>
      }
     
      </form>
        </section>
  )
}

export default LocationMasterForm