import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const BranchMasterForm = ({ AllExpand, notSave, handleChangebranchData, BranchData, viewSave, handleUpdatebranch }) => {
  const [BranchInformation, setBranchInformation] = useState(true)
  const [BranchAddressDetails, setBranchAddressDetails] = useState(false)
  const [BranchContactInformation, setBranchContactInformation] = useState(false)
  const [BusinessDetails, setBusinessDetails] = useState(false)
  const [TaxComplianceDetails, setTaxComplianceDetails] = useState(false)
  const [AdditionalInformation, setAdditionalInformation] = useState(false)
  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const createBranch = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL}/branch/branch`, BranchData);
      console.log("Branch created successfully:", response.data);
      toast.success(response.data.message);
      navigate('/branch/table');
    } catch (error) {
      if (error?.response?.data?.message === "Token expired, please log in again") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
      }
      // console.error("Error creating branch:", error.response ? error.response.data : error.message);

    }
  };


  const InformationBox = "w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]"
  const ReactIcon = 'text-white text-[24px] cursor-pointer'
  const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap"
  const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]"
  useEffect(() => {
    if (AllExpand === true) {
      setBranchInformation(true)
      setBranchAddressDetails(true)
      setBranchContactInformation(true)
      setBusinessDetails(true)
      setTaxComplianceDetails(true)
      setAdditionalInformation(true)
    } else {
      setBranchInformation(true)
      setBranchAddressDetails(false)
      setBranchContactInformation(false)
      setBusinessDetails(false)
      setTaxComplianceDetails(false)
      setAdditionalInformation(false)
    }
  }, [AllExpand])
  return (
    <section className='py-3'>

      <br />
      <form>
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>1. Branch Information</h2>
          {BranchInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setBranchInformation(!BranchInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setBranchInformation(!BranchInformation)} />
          }
        </div>
        {BranchInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[2px] mb-3'>
              <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Branch No. </label>
                  <input className={InputCss} type='number'
                    name='Branch_No'
                    onChange={handleChangebranchData}
                    value={BranchData.Branch_No}
                    readOnly

                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Branch Name </label>
                  <input className={InputCss} type='text'
                    name='Branch_Name'
                    onChange={handleChangebranchData}
                    value={BranchData.Branch_Name}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Branch Starting Date </label>
                  <input className={InputCss} type='date'
                    name='Branch_Starting_Date'
                    onChange={handleChangebranchData}
                    value={BranchData.Branch_Starting_Date}
                  />
                </div>
              </div>



            </div>
            <hr />
            <div className='w-[100%] flex justify-between gap-[40px] mt-2'>
              <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Nature of Business </label>
                  <input className={InputCss} type='text'
                    name='Nature_of_Business'
                    onChange={handleChangebranchData}
                    value={BranchData.Nature_of_Business}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Owner Name </label>
                  <input className={InputCss} type='text'
                    name='Owner_Name'
                    onChange={handleChangebranchData}
                    value={BranchData.Owner_Name}

                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Owner Address </label>
                  <input className={InputCss} type='text'
                    name='Owner_Address'
                    onChange={handleChangebranchData}
                    value={BranchData.Owner_Address}
                  />
                </div>
              </div>
              {/* <div className='w-[100%] flex flex-col gap-1'>
                
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Contact Person Name :</label>
            <input className={InputCss} type='text' />
            </div>
                </div> */}
            </div>
          </div>
        }
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>2. Branch Address Details</h2>
          {BranchAddressDetails ?
            <FiChevronUp className={ReactIcon} onClick={() => setBranchAddressDetails(!BranchAddressDetails)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setBranchAddressDetails(!BranchAddressDetails)} />
          }
        </div>
        {BranchAddressDetails &&
          <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[20px]'>
              <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Address </label>
                  <input className={InputCss} type='text'
                    name='Address'
                    onChange={handleChangebranchData}
                    value={BranchData.Address}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>City </label>
                  <input className={InputCss} type='text'
                    name='City'
                    onChange={handleChangebranchData}
                    value={BranchData.City}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Pin Code </label>
                  <input className={InputCss} type='number'
                    name='Pin_Code'
                    onChange={handleChangebranchData}
                    value={BranchData.Pin_Code}
                  />
                </div>

              </div>

            </div>
            <div className='w-[100%] flex gap-[40px] mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>State </label>
                <input className={InputCss} type='text'
                  name='State'
                  onChange={handleChangebranchData}
                  value={BranchData.State}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Country </label>
                <input className={InputCss} type='text'
                  name='Country'
                  onChange={handleChangebranchData}
                  value={BranchData.Country}
                />
              </div>
              <div className='w-[100%]' />
            </div>
          </div>
        }
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>3. Branch Contact Information</h2>
          {BranchContactInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setBranchContactInformation(!BranchContactInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setBranchContactInformation(!BranchContactInformation)} />
          }
        </div>
        {BranchContactInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[20px]'>
              <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Location Name </label>
                  <input className={InputCss} type='text'
                    name='Location_Name'
                    onChange={handleChangebranchData}
                    value={BranchData.Location_Name}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Phone No. </label>
                  <input className={InputCss} type='text'
                    name='Phone_f'
                    onChange={handleChangebranchData}
                    value={BranchData.Phone_f}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Contact Person Name </label>
                  <input className={InputCss} type='text'
                    name='Contact_Person_Name'
                    onChange={handleChangebranchData}
                    value={BranchData.Contact_Person_Name}
                  />
                </div>
              </div>

            </div>
            <div className='w-[100%] flex gap-[40px] mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Mobile No. </label>
                <input className={InputCss} type='text'
                  name='Mobile_No'
                  onChange={handleChangebranchData}
                  value={BranchData.Mobile_No}
                />
              </div>
              <div className='w-[100%]' />
              <div className='w-[100%]' />


            </div>
          </div>
        }
        <br />

        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>4. Tax and Compliance Details</h2>
          {TaxComplianceDetails ?
            <FiChevronUp className={ReactIcon} onClick={() => setTaxComplianceDetails(!TaxComplianceDetails)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setTaxComplianceDetails(!TaxComplianceDetails)} />
          }
        </div>
        {TaxComplianceDetails &&
          <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[20px]'>
              <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Professional Tax No. </label>
                  <input className={InputCss} type='text'
                    name='Professional_Tax_No'
                    onChange={handleChangebranchData}
                    value={BranchData.Professional_Tax_No}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>PF Sub Code No. </label>
                  <input className={InputCss} type='text'
                    name='PF_Sub_Code_No'
                    onChange={handleChangebranchData}
                    value={BranchData.PF_Sub_Code_No}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>ESIC Sub Code No. </label>
                  <input className={InputCss} type='text'
                    name='ESIC_Sub_Code_No'
                    onChange={handleChangebranchData}
                    value={BranchData.ESIC_Sub_Code_No}
                  />
                </div>
              </div>

            </div>
            <div className='w-[100%] flex gap-[40px] mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Start Date </label>
                <input className={InputCss} type='date'
                  name='Start_Date'
                  onChange={handleChangebranchData}
                  value={BranchData.Start_Date}
                />
              </div>
              <div className='w-[100%]' />
              <div className='w-[100%]' />

              {/* <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Contact Person Name :</label>
            <input className={InputCss} type='text' />
            </div> */}
            </div>
          </div>
        }
        {/* <br/>
      <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
        <h2 className='text-[26px] cursor-pointer'>4. Business Details</h2>
        {BusinessDetails?
            <FiChevronUp className={ReactIcon} onClick={()=>setBusinessDetails(!BusinessDetails)}/>
            :      <FiChevronDown className={ReactIcon} onClick={()=>setBusinessDetails(!BusinessDetails)}/>
        }
      </div>
      {BusinessDetails &&
        <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[20px]'>
                <div className='w-[100%] flex flex-col gap-1'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Nature of Business </label>
            <input className={InputCss} type='text' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Owner Address </label>
            <input className={InputCss} type='text' />
            </div>
                </div>
                <div className='w-[100%] flex flex-col gap-1'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Owner Name </label>
            <input className={InputCss} type='text' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Contact Person Name :</label>
            <input className={InputCss} type='text' />
            </div>
                </div>
            </div>
        </div>
      }
      <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
        <h2 className='text-[26px] cursor-pointer'>6. Additional Information</h2>
        {AdditionalInformation?
            <FiChevronUp className={ReactIcon} onClick={()=>setAdditionalInformation(!AdditionalInformation)}/>
            :      <FiChevronDown className={ReactIcon} onClick={()=>setAdditionalInformation(!AdditionalInformation)}/>
        }
      </div>
      {AdditionalInformation &&
        <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[20px]'>
                <div className='w-[100%] flex flex-col gap-1'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Start Date </label>
            <input className={InputCss} type='date' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>ESIC Sub Code No. :</label>
            <input className={InputCss} type='number' />
            </div>
                </div>
                <div className='w-[100%] flex flex-col gap-1'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>PF Sub Code No. :</label>
            <input className={InputCss} type='number' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Contact Person Name :</label>
            <input className={InputCss} type='text' />
            </div>
                </div>
            </div>
        </div>
      } */}

        {notSave !== "normalVisit" &&
          <div className='w-[100%] flex justify-end mt-5'>
            <div className='flex items-center gap-2'>
              <button className='px-3 py-2 text-brand_color border-[1px] rounded border-brand_b_color'>Cancel</button>
              <button className='px-3 py-2 bg-brand_colors text-white rounded border-none' onClick={viewSave === "view" ? handleUpdatebranch : createBranch}>Save</button>

            </div>
          </div>

        }

        {/* {viewSave==="view" &&
        <div className='w-[100%] flex justify-end mt-5'>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-2 text-brand_color border-[1px] rounded border-brand_b_color'>Cancel</button>
          <button className='px-3 py-2 bg-brand_colors text-white rounded border-none' onClick={handleUpdatebranch}>Save</button>

        </div>
      </div>
        
      } */}


      </form>
    </section>
  )
}

export default BranchMasterForm