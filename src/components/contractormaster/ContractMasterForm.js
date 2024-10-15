import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const ContractMasterForm = ({ AllExpand, notSave, handleContractData, ContractData, editview, handleUpdatebranch }) => {
  const [ContractorInformation, setContractorInformation] = useState(true)
  const [ContractorAddressDetails, setContractorAddressDetails] = useState(false)
  const [ContractDetails, setContractDetails] = useState(false)
  const [LabourEngagementDetails, setLabourEngagementDetails] = useState(false)
  const [OwnerContactPersonDetails, setOwnerContactPersonDetails] = useState(false)

  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL}/contract/create`, ContractData)
      const res = await response.data
      console.log(res)
      toast.success(res?.message)
      navigate('/contractor/table');
    } catch (error) {
      console.log(error)
    }
  }





  const InformationBox = "w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]"
  const ReactIcon = 'text-white text-[24px] cursor-pointer'
  const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap"
  const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]"
  useEffect(() => {
    if (AllExpand === true) {
      setContractorInformation(true)
      setContractorAddressDetails(true)
      setContractDetails(true)
      setLabourEngagementDetails(true)
      setOwnerContactPersonDetails(true)
    } else {
      setContractorInformation(true)
      setContractorAddressDetails(false)
      setContractDetails(false)
      setLabourEngagementDetails(false)
      setOwnerContactPersonDetails(false)
    }
  }, [AllExpand])
  return (
    <section className='py-3'>

      <br />
      <form>
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>1. Contractor Information</h2>
          {ContractorInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setContractorInformation(!ContractorInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setContractorInformation(!ContractorInformation)} />
          }
        </div>
        {ContractorInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[40px]'>
              <div className='w-[100%] flex  gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Contractor No. </label>
                  <input className={InputCss} type='number'
                    name="Contractor_No"
                    value={ContractData.Contractor_No}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Name </label>
                  <input className={InputCss} type='text'
                    name="Name"
                    value={ContractData.Name}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>PAN Card No </label>
                  <input className={InputCss} type='text'
                    name="PAN_Card_No"
                    value={ContractData.PAN_Card_No}
                    onChange={handleContractData}
                  />
                </div>
              </div>

            </div>
            <div className='w-[100%] flex gap-[40px] mt-3'>

              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>No. of labour engaged</label>
                <input className={InputCss} type='number'
                  name="No_of_labour_engaged"
                  value={ContractData.No_of_labour_engaged}
                  onChange={handleContractData}
                />
              </div>
              <div className='w-[100%]' />
              <div className='w-[100%]' />

            </div>
          </div>
        }
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>2. Contractor Address Details</h2>
          {ContractorAddressDetails ?
            <FiChevronUp className={ReactIcon} onClick={() => setContractorAddressDetails(!ContractorAddressDetails)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setContractorAddressDetails(!ContractorAddressDetails)} />
          }
        </div>
        {ContractorAddressDetails &&
          <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[40px]'>
              <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Address </label>
                  <input className={InputCss} type='text'
                    name="Address"
                    value={ContractData.Address}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>City </label>
                  <input className={InputCss} type='text'
                    name="City"
                    value={ContractData.City}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Pin Code </label>
                  <input className={InputCss} type='number'
                    name="Pin_Code"
                    value={ContractData.Pin_Code}
                    onChange={handleContractData}

                  />
                </div>
              </div>

            </div>
            <div className='w-[100%] flex gap-[40px] mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>State </label>
                <input className={InputCss} type='text'
                  name="State"
                  value={ContractData.State}
                  onChange={handleContractData}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Country </label>
                <input className={InputCss} type='text'

                  name="Country"
                  value={ContractData.Country}
                  onChange={handleContractData}
                />
              </div>
              <div className='w-[100%]' />
            </div>
          </div>
        }
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>3. Contract Details</h2>
          {ContractDetails ?
            <FiChevronUp className={ReactIcon} onClick={() => setContractDetails(!ContractDetails)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setContractDetails(!ContractDetails)} />
          }
        </div>
        {ContractDetails &&
          <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[40px]'>
              <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Location Name</label>
                  <input className={InputCss} type='number'
                    name="Location_Name"
                    value={ContractData.Location_Name}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Phone No.</label>
                  <input className={InputCss} type='number'
                    name="Phone_f"
                    value={ContractData.Phone_f}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Mobile No.</label>
                  <input className={InputCss} type='number'
                    name="Mobile_No"
                    value={ContractData.Mobile_No}
                    onChange={handleContractData}
                  />
                </div>
              </div>

            </div>
            <div className='w-[100%] flex justify-between gap-[40px] mt-3'>
              <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Contact Person Name</label>
                  <input className={InputCss} type='text'
                    name="Contact_Person_Name"
                    value={ContractData.Contact_Person_Name}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Owner Name </label>
                  <input className={InputCss} type='text'
                    name="Owner_Name"
                    value={ContractData.Owner_Name}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Owner Address </label>
                  <input className={InputCss} type='text'
                    name="Owner_Address"
                    value={ContractData.Owner_Address}
                    onChange={handleContractData}

                  />
                </div>
              </div>

            </div>
            {/* <div className='w-[100%] flex gap-[40px] mt-3'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>License Date of Renewal </label>
            <input className={InputCss} type='date' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Renewal Date of Contract </label>
            <input className={InputCss} type='date' />
            </div>

                </div> */}
          </div>
        }
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>4. Document Details</h2>
          {LabourEngagementDetails ?
            <FiChevronUp className={ReactIcon} onClick={() => setLabourEngagementDetails(!LabourEngagementDetails)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setLabourEngagementDetails(!LabourEngagementDetails)} />
          }
        </div>
        {LabourEngagementDetails &&
          <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[40px]'>
              <div className='w-[100%] flex gap-[40px]'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>PF code</label>
                  <input className={InputCss} type='text'
                    name="PF_code"
                    value={ContractData.PF_code}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>License No.</label>
                  <input className={InputCss} type='text'
                    name="License_No"
                    value={ContractData.License_No}
                    onChange={handleContractData}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>ESIC No </label>
                  <input className={InputCss} type='text'
                    name="ESIC_No"
                    value={ContractData.ESIC_No}
                    onChange={handleContractData}
                  />
                </div>
              </div>

            </div>
            <div className='w-[100%] flex gap-[40px] mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>License Date Of Issue</label>
                <input className={InputCss} type='date'
                  name="License_Date_Of_Issue"
                  value={ContractData.License_Date_Of_Issue}
                  onChange={handleContractData}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>License Date Of Renew</label>
                <input className={InputCss} type='date'
                  name="License_Date_Of_Renew"
                  value={ContractData.License_Date_Of_Renew}
                  onChange={handleContractData}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Starting Contract Date</label>
                <input className={InputCss} type='date'
                  name="Starting_Contract_Date"
                  value={ContractData.Starting_Contract_Date}
                  onChange={handleContractData}
                />
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Renew Date Of Contract</label>
                <input className={InputCss} type='date'
                  name="Renew_Date_Of_Contract"
                  value={ContractData.Renew_Date_Of_Contract}
                  onChange={handleContractData}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Pay Roll Start Date</label>
                <input className={InputCss} type='date'
                  name="Pay_Roll_Start_Date"
                  value={ContractData.Pay_Roll_Start_Date}
                  onChange={handleContractData}
                />
              </div>
              <div className='w-[100%]' />

            </div>
          </div>
        }
        <br />
        {/* <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
        <h2 className='text-[26px] cursor-pointer'>5. Owner and Contact Person Details</h2>
        {OwnerContactPersonDetails?
            <FiChevronUp className={ReactIcon} onClick={()=>setOwnerContactPersonDetails(!OwnerContactPersonDetails)}/>
            :      <FiChevronDown className={ReactIcon} onClick={()=>setOwnerContactPersonDetails(!OwnerContactPersonDetails)}/>
        }
      </div>
      {OwnerContactPersonDetails &&
        <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-[40px]'>
                <div className='w-[100%] flex flex-col gap-3'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Owner Name </label>
            <input className={InputCss} type='text' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Contact Person Name</label>
            <input className={InputCss} type='text' />
            </div>
                </div>
                <div className='w-[100%] flex flex-col gap-3'>
                <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Owner Address </label>
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
              <button className='px-3 py-2 bg-brand_colors text-white rounded border-none' onClick={editview === "view" ? handleUpdatebranch : handleSubmit}>Save</button>
            </div>
          </div>
        }

      </form>
    </section>
  )
}

export default ContractMasterForm