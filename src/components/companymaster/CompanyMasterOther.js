import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompanyMasterOther = ({AllExpand,handleChange,companyData,viewMode,CompanyTwoTab}) => {
    const [FactoryLicenseDetails,setFactoryLicenseDetails]=useState(true)
    const [ContractLabourInformation,setContractLabourInformation]=useState(false)
    const [ESICDetails,setESICDetails]=useState(false)
    const [ShopLicenseInformation,setShopLicenseInformation]=useState(false)
    const [GLWF,setGLWF]=useState(false)
    const [ProvidentFundInformation,setProvidentFundInformation]=useState(false)
    const [CompanyFilingInformation,setCompanyFilingInformation]=useState(false)
    const [isLoading,setisLoading]=useState(false)
  const { companyName, companyId } = useSelector((state) => state.company);
  const token = localStorage.getItem("token")

  const BASE_URL = process.env.REACT_APP_API_URL

    // const [Miscellaneous,setMiscellaneous]=useState(false)
    const InformationBox="w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]"
    const ReactIcon = 'text-white text-[24px] cursor-pointer'
    const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap "
    const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]"
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault(); 
      setisLoading(true)
  
      try {
        const response = await fetch(`${BASE_URL}/v1/com/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(companyData),
        });
  
        if (response.ok) {
          const data = await response.json();
          toast.success('Company created successfully!'); 
          setisLoading(false)
          navigate("/")
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message || 'Something went wrong!'}`); 
          setisLoading(false)

        }
      } catch (error) {
        toast.error(`Network error: ${error.message}`);
        if(error?.response?.data?.message==="Token expired, please log in again"){
          localStorage.removeItem("token")
          localStorage.removeItem("role")
          navigate("/")
         }
        setisLoading(false)

      }
    };

    const handleUpdateCompany = async (e) => {
      e.preventDefault()
      setisLoading(true)

      try {
          const response = await axios.put(`${BASE_URL}/v1/com/company/update`, {
              company_id: companyId, 
              ...companyData, 
          }, {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
  
          toast.success("Company updated successfully");
      setisLoading(false)

      } catch (error) {
          console.error("Error updating company:", error);
          toast.error("Failed to update company");
      setisLoading(false)

      }
  };

  
  


    useEffect(()=>{
      if(AllExpand===true){
        setFactoryLicenseDetails(true)
        setContractLabourInformation(true)
        setESICDetails(true)
        setShopLicenseInformation(true)
        setGLWF(true)
        setProvidentFundInformation(true)
        setCompanyFilingInformation(true)
      }else{
        setFactoryLicenseDetails(true)
        setContractLabourInformation(false)
        setESICDetails(false)
        setShopLicenseInformation(false)
        setGLWF(false)
        setProvidentFundInformation(false)
        setCompanyFilingInformation(false)
      }
        },[AllExpand])


        useEffect(()=>{
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },[CompanyTwoTab])

  return (
    <section className='py-3'>
    {/* <h1 className='text-brand_color font-[600] text-[32px]'>Company Other Details</h1> */}
    <br></br>
    <br></br>
    <form>
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>1. License Details</h2>
    {FactoryLicenseDetails?
        <FiChevronUp className={ReactIcon} onClick={()=>setFactoryLicenseDetails(!FactoryLicenseDetails)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setFactoryLicenseDetails(!FactoryLicenseDetails)}/>
    }
  </div>
  {FactoryLicenseDetails &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Factory License No. </label>
        <input className={InputCss} type='text'
        onChange={handleChange}
        value={companyData.company_other_detail.factory_license_no}
        name='company_other_detail.factory_license_no'
         />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Renew Date </label>
        <input className={InputCss} type='date' 
          onChange={handleChange}
        value={companyData.company_other_detail.renew_date}
        name='company_other_detail.renew_date'
        />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Plan Passing No. </label>
        <input className={InputCss} type='text' 
          onChange={handleChange}
        value={companyData.company_other_detail.plan_passing_no}
        name='company_other_detail.plan_passing_no'
        />
        </div>
     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
     <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Plan Passing Date </label>
        <input className={InputCss} type='date' 
           onChange={handleChange}
        value={companyData.company_other_detail.plan_passing_date}
        name='company_other_detail.plan_passing_date'
        />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>HP </label>
        <input className={InputCss} type='text' 
           onChange={handleChange}
          value={companyData.company_other_detail.hp}
        name='company_other_detail.hp'
        />
        </div>
        <div className='w-[100%]' />
     </div>
     <br/>
     <hr/>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Shop License No. </label>
        <input className={InputCss} type='text' 
           onChange={handleChange}
          value={companyData.company_other_detail.shop_license_no}
        name='company_other_detail.shop_license_no'
        />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Shop License Renew
        Date </label>
        <input className={InputCss} type='date' 
             onChange={handleChange}
          value={companyData.company_other_detail.shop_license_date}
        name='company_other_detail.shop_license_date'
        />
        </div>
        <div className='w-[100%]' />
     </div>
    </div>

  }
  <br/>
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>2. Contract Labour Information</h2>
    {ContractLabourInformation?
        <FiChevronUp className={ReactIcon} onClick={()=>setContractLabourInformation(!ContractLabourInformation)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setContractLabourInformation(!ContractLabourInformation)}/>
    }
  </div>
  {ContractLabourInformation &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Contract Labour 
        Act Reg. Date </label>
        <input className={InputCss} type='date' 
          onChange={handleChange}
          value={companyData.company_other_detail.contract_labour_date}
        name='company_other_detail.contract_labour_date'
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={`text-[#000000] font-[500] text-[18px]`}>Contract Labour Act Register No. </label>
        <input className={InputCss} type='text' 
          onChange={handleChange}
          value={companyData.company_other_detail.contract_register_no}
        name='company_other_detail.contract_register_no'
        />

        </div>
        <div className='w-[100%] '/>
     </div>
    </div>

  }
  <br/>
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>3. Indicator</h2>
    {ESICDetails?
        <FiChevronUp className={ReactIcon} onClick={()=>setESICDetails(!ESICDetails)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setESICDetails(!ESICDetails)}/>
    }
  </div>
  {ESICDetails &&
    <div className={InformationBox}>
      <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
          <label className={LabelCss}>PF</label>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.pf_indicator'
                value='Yes'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.pf_indicator?.includes("Yes")}

              />
              <label className={LabelCss}>Yes</label>
            </div>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.pf_indicator'
                value='No'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.pf_indicator?.includes("No")}

              />
              <label className={LabelCss}>No</label>
            </div>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.pf_indicator'
                value='Above'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.pf_indicator?.includes("Above")}

              />
              <label className={LabelCss}>Above</label>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
          <label className={LabelCss}>ESIC</label>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.esic_indicator'
                value='Yes'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.esic_indicator?.includes("Yes")}

              />
              <label className={LabelCss}>Yes</label>
            </div>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.esic_indicator'
                value='No'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.esic_indicator?.includes("No")}

              />
              <label className={LabelCss}>No</label>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
          <label className={LabelCss}>GLWF</label>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.glwf_indicator'
                value='Yes'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.glwf_indicator?.includes("Yes")}

              />
              <label className={LabelCss}>Yes</label>
            </div>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.glwf_indicator'
                value='No'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.glwf_indicator?.includes("No")}

              />
              <label className={LabelCss}>No</label>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
          <label className={LabelCss}>PT</label>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.pt_indicator'
                value='Yes'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.pt_indicator?.includes("Yes")}

              />
              <label className={LabelCss}>Yes</label>
            </div>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.pt_indicator'
                value='No'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.pt_indicator?.includes("No")}

              />
              <label className={LabelCss}>No</label>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
          <label className={LabelCss}>EDLI</label>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.edli_indicator'
                value='Yes'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.edli_indicator?.includes("Yes")}

              />
              <label className={LabelCss}>Yes</label>
            </div>
            <div className='flex items-center gap-1'>
              <input
                type='radio'
                className='w-[25px] h-[25px]'
                name='company_other_detail.edli_indicator'
                value='No'
                onChange={handleChange}
              checked={companyData?.company_other_detail?.edli_indicator?.includes("No")}

              />
              <label className={LabelCss}>No</label>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>

  }
  <br/>
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>4. Tax and Compliance Details</h2>
    {ProvidentFundInformation?
        <FiChevronUp className={ReactIcon} onClick={()=>setProvidentFundInformation(!ProvidentFundInformation)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setProvidentFundInformation(!ProvidentFundInformation)}/>
    }
  </div>
  {ProvidentFundInformation &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
     <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>PF Application Date</label>
        <input className={InputCss} type='date' 
            onChange={handleChange}
          value={companyData.company_other_detail.pf_application_date}
        name='company_other_detail.pf_application_date'
        />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>ESIC Application Date</label>
        <input className={InputCss} type='date' 
            onChange={handleChange}
          value={companyData.company_other_detail.esic_application_date}
        name='company_other_detail.esic_application_date'
        />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>GLWF No.</label>
        <input className={InputCss} type='text' 
            onChange={handleChange}
          value={companyData.company_other_detail.glwf_application_no}
        name='company_other_detail.glwf_application_no'
        />
        </div>
     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>PT Employer</label>
        <input className={InputCss} type='text' 
              onChange={handleChange}
          value={companyData.company_other_detail.pt_employer}
        name='company_other_detail.pt_employer'
        />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>PT Employee</label>
        <input className={InputCss} type='text' 
           onChange={handleChange}
          value={companyData.company_other_detail.pt_employee}
        name='company_other_detail.pt_employee'
        />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>PT Applicable Date</label>
        <input className={InputCss} type='date'
         onChange={handleChange}
          value={companyData.company_other_detail.pt_applicable_date}
        name='company_other_detail.pt_applicable_date' 

        />
        </div>
     </div>
     {/* <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>PT No. (Employer) </label>
        <input className={InputCss} type='text' />
        </div>
        <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
        <label className={LabelCss}>Edli Indicator </label>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
          <input type='radio' className='w-[25px] h-[25px] ' name='indicator3'/>
          <label className={LabelCss}>Yes</label>
          </div>
          <div className='flex items-center gap-1'>
          <input type='radio' className='w-[25px] h-[25px] ' name='indicator3'/>
          <label className={LabelCss}>No</label>
          </div>
          <div className='flex items-center gap-1'>
          <input type='radio' className='w-[25px] h-[25px] ' name='indicator3'/>
          <label className={LabelCss}>Above</label>
          </div>

         </div>

        </div>
     </div>
     <br/>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex gap-4 w-[100%] flex-col'>
        <label className={LabelCss}>PT Indicator NO. </label>
        <input className={InputCss} type='text' />
        </div>
        <div className='w-[100%]' />
     </div> */}
    </div>

  }
  <br/>
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>5. Miscellaneous</h2>
    {CompanyFilingInformation?
        <FiChevronUp className={ReactIcon} onClick={()=>setCompanyFilingInformation(!CompanyFilingInformation)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setCompanyFilingInformation(!CompanyFilingInformation)}/>
    }
  </div>
  {CompanyFilingInformation &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={`text-[#000000] font-[500] text-[18px]`}>Company File Detail</label>
        <input className={InputCss} type='text' 
          onChange={handleChange}
          value={companyData.company_other_detail.company_file_detail}
        name='company_other_detail.company_file_detail' 
        />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>ACGR No. </label>
        <input className={InputCss} type='text' 
            onChange={handleChange}
          value={companyData.company_other_detail.acgr_no}
        name='company_other_detail.acgr_no' 
        />

        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Ext. Code </label>
        <input className={InputCss} type='text' 
           onChange={handleChange}
          value={companyData.company_other_detail.ext_code}
        name='company_other_detail.ext_code' 
        />
        </div>
     </div>
     {/* <div className='w-[100%] flex gap-[40px] items-center'>

        <div className='w-[100%]' />
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>ACGR No.</label>
        <input className={InputCss} type='text' />

        </div>
     </div> */}
    </div>

  }
  <br/>
  {/* <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>4. Shop License Information</h2>
    {ShopLicenseInformation?
        <FiChevronUp className={ReactIcon} onClick={()=>setShopLicenseInformation(!ShopLicenseInformation)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setShopLicenseInformation(!ShopLicenseInformation)}/>
    }
  </div>
  {ShopLicenseInformation &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Shop License No. </label>
        <input className={InputCss} type='text' />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>License Renew
        Date </label>
        <input className={InputCss} type='date' />

        </div>
     </div>
    </div>

  }
  <br/>
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>5. GLWF</h2>
    {GLWF?
        <FiChevronUp className={ReactIcon} onClick={()=>setGLWF(!GLWF)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setGLWF(!GLWF)}/>
    }
  </div>
  {GLWF &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
        <label className={LabelCss}>GLWF Indicator </label>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
          <input type='radio' className='w-[25px] h-[25px] ' name='indicator'/>
          <label className={LabelCss}>Yes</label>
          </div>
          <div className='flex items-center gap-1'>
          <input type='radio' className='w-[25px] h-[25px] ' name='indicator'/>
          <label className={LabelCss}>No</label>
          </div>
          <div className='flex items-center gap-1'>
          <input type='radio' className='w-[25px] h-[25px] ' name='indicator'/>
          <label className={LabelCss}>Above</label>
          </div>

         </div>
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>GLWF No. </label>
        <input className={InputCss} type='text' />

        </div>
     </div>
     <br/>
    </div>

  }
  <br/>

  <br/>

  <br/>

  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>8. Miscellaneous</h2>
    {Miscellaneous?
        <FiChevronUp className={ReactIcon} onClick={()=>setMiscellaneous(!Miscellaneous)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setMiscellaneous(!Miscellaneous)}/>
    }
  </div>
  {Miscellaneous &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Phone (R)</label>
        <input className={InputCss} type='text' />
        </div>
        <div className='flex gap-1 w-[100%] flex-col'>
        <label className={LabelCss}>Remarks</label>
        <input className={InputCss} type='text' />

        </div>
     </div>
     <br/>
    </div>

  } */}
  {viewMode==="view" ? 
    <div className='w-[100%] flex justify-end mt-5'>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-2 text-brand_color border-[1px] rounded border-brand_b_color'>Cancel</button>
          <button onClick={handleUpdateCompany} className='px-3 py-2 bg-brand_colors text-white rounded border-none'>{isLoading ? "Loading.....":"Save"}</button>

        </div>
      </div>
:<div className='w-[100%] flex justify-end mt-5'>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-2 text-brand_color border-[1px] rounded border-brand_b_color'>Cancel</button>
          <button onClick={handleSubmit} className='px-3 py-2 bg-brand_colors text-white rounded border-none'>{isLoading ? "Loading.....":"Save"}</button>

        </div>
      </div>
  }
  
  </form>
</section>
  )
}

export default CompanyMasterOther