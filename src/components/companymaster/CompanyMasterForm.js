import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CompanyMasterForm = ({ AllExpand, handleChange, companyData, viewMode, setCompanyTwoTab, setCompanyData }) => {
  const [CompanyInformation, setCompanyInformation] = useState(true);
  const [CompanyContract, setCompanyContract] = useState(false);
  const [CompanyAddress, setCompanyAddress] = useState(false);
  const [EmployeeDetails, setEmployeeDetails] = useState(false);
  const [BankingInformation, setBankingInformation] = useState(false);
  const [StatutoryDetails, setStatutoryDetails] = useState(false);
  const [WageInformation, setWageInformation] = useState(false);
  const [Miscellaneous, setMiscellaneous] = useState(false);
  const [EmployeeAddress, setEmployeeAddress] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const InformationBox =
    "w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]";
  const ReactIcon = "text-white text-[24px] cursor-pointer";
  const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap";
  const InputCss =
    "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]";

  useEffect(() => {
    if (AllExpand === true) {
      setCompanyInformation(true);
      setCompanyContract(true);
      setCompanyAddress(true);
      setEmployeeDetails(true);
      setBankingInformation(true);
      setStatutoryDetails(true);
      setWageInformation(true);
      setMiscellaneous(true);
      setEmployeeAddress(true);
    } else {
      setCompanyInformation(true);
      setCompanyContract(false);
      setCompanyAddress(false);
      setEmployeeDetails(false);
      setBankingInformation(false);
      setStatutoryDetails(false);
      setWageInformation(false);
      setMiscellaneous(false);
      setEmployeeAddress(false);
    }
  }, [AllExpand]);

  const handleCheckboxChange = (e) => {
    const { company_address, city, pincode, state, country } = companyData;

    if (e.target.checked) {
      if (company_address || city || pincode || state || country) {
        setCompanyData((prevData) => ({
          ...prevData,
          R_company_address: company_address,
          R_city: city,
          R_pincode: pincode,
          R_state: state,
          R_country: country,
        }));
        setIsChecked(true);
      }
    } else {
      setCompanyData((prevData) => ({
        ...prevData,
        R_company_address: '',
        R_city: '',
        R_pincode: '',
        R_state: '',
        R_country: '',
      }));
      setIsChecked(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault()
    setCompanyTwoTab(1)


  }
  return (
    <section className="py-3 ">
      {/* <h1 className='text-brand_color font-[600] text-[32px]'>Company Master</h1> */}
      <br></br>
      <br></br>
      <form>
        <div className="w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center">
          <h2 className="text-[26px] cursor-pointer">1. Company Information</h2>
          {CompanyInformation ? (
            <FiChevronUp
              className={ReactIcon}
              onClick={() => setCompanyInformation(!CompanyInformation)}
            />
          ) : (
            <FiChevronDown
              className={ReactIcon}
              onClick={() => setCompanyInformation(!CompanyInformation)}
            />
          )}
        </div>
        {CompanyInformation && (
          <div className={InformationBox}>
            <div className="w-[100%] flex gap-[40px]">
              <div className="flex gap-1 w-[20%] flex-col">
                <label className={LabelCss}>Company no.</label>
                <input
                  className={InputCss}
                  type="text"
                  name="company_no"
                  value={companyData.company_no}
                  onChange={handleChange}
                  readOnly

                />
              </div>
              <div className="flex gap-1 w-[55%]  flex-col pl-3">
                <label className={LabelCss}>Company Start Date </label>
                <input
                  className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`}
                  type="date"
                  name="company_start_date"
                  value={companyData.company_start_date}
                  onChange={handleChange}

                />
              </div>
              <div className="flex flex-col gap-1 w-[100%] pl-4">
                <label className={LabelCss}>Created For.</label>
                <div className="flex items-center gap-1 flex-wrap w-[100%]">
                  {['Company 1', 'Company 2', 'Company 3', 'Company 4'].map((company, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <input
                        type="radio"
                        name="company"
                        value={company}
                        className="w-[15px] h-[15px]"
                        onChange={handleChange}

                        checked={companyData?.created_for?.includes(company)}
                      />
                      <label className={LabelCss}>{company}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full flex gap-[40px] mt-2">
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>Comapany Name</label>
                <input
                  name="company_name"
                  value={companyData.company_name}
                  onChange={handleChange}

                  className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`}
                  type="text"
                />
              </div>
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>Company Type</label>
                <input
                  className="border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-full"
                  type="text"
                  name="company_type"
                  value={companyData.company_type}
                  onChange={handleChange}

                />
              </div>
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>Nature of industry</label>
                <input
                  className="border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-full"
                  type="text"
                  name="nature_of_industry"
                  value={companyData.nature_of_industry}
                  onChange={handleChange}

                />
              </div>
            </div>

            <div className="w-full flex gap-[40px] py-2">
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>Pan No.</label>
                <input
                  className="border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-full"
                  type="text"
                  name="pan_no"
                  value={companyData.pan_no}
                  onChange={handleChange}

                />
              </div>
              <div className="w-[100%]" />
              <div className="w-[100%]" />
            </div>

            {/* <div className='w-[100%] flex gap-[40px] items-center'>
         <div className='flex gap-1 w-[100%]  flex-col'>
            <label className={LabelCss}>File No </label>
            <input className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`} type='number' min="0" />
            </div>
            <div className='flex gap-1 w-[100%] flex-col'></div>
         </div> */}
          </div>
        )}
        <br />
        <div className="w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center">
          <h2 className="text-[26px] cursor-pointer">2. Company Address</h2>
          {CompanyAddress ? (
            <FiChevronUp
              className={ReactIcon}
              onClick={() => setCompanyAddress(!CompanyAddress)}
            />
          ) : (
            <FiChevronDown
              className={ReactIcon}
              onClick={() => setCompanyAddress(!CompanyAddress)}
            />
          )}
        </div>
        {CompanyAddress && (
          <div className={InformationBox}>
            <div className="w-[100%] flex gap-[40px] items-center">
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Company Address </label>
                <input className={InputCss} type="text"
                  name='company_address' value={companyData.company_address} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>City </label>
                <input className={InputCss} type="text"
                  name='city' value={companyData.city} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Pin Code </label>
                <input
                  className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`}
                  type="number" min="0"
                  name='pincode' value={companyData.pincode} onChange={handleChange}


                />
              </div>
            </div>
            <div className="w-[100%] flex gap-[40px] items-center mt-2">
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>State </label>
                <input className={InputCss} type="text"
                  name='state' value={companyData.state} onChange={handleChange}


                />
              </div>
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>Country </label>
                <input className={InputCss} type="text"
                  name='country' value={companyData.country} onChange={handleChange}


                />
              </div>
              <div className="w-[100%]" />
            </div>
            <br />
            <div className="w-[100%] flex gap-[40px] items-center"></div>
            <hr />

            <div className="w-[100%] flex gap-[40px] items-center">
              <div className="flex gap-1 w-[100%] flex-col mt-2">
                <label className={LabelCss}>Resi. Address</label>
                <input className={InputCss} type="text"
                  name='R_company_address' value={companyData.R_company_address} onChange={handleChange}


                />
                <div className="flex w-[100%] items-center">
                  <input type="checkbox" className="mr-3" onChange={handleCheckboxChange} />
                  <label className="text-nowrap">Same as company address</label>
                </div>
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>City</label>
                <input
                  className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`}
                  type="text"
                  name='R_city' value={companyData.R_city} onChange={handleChange}


                />
              </div>
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>Pin code</label>
                <input
                  className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`}
                  type="number" min="0"
                  name='R_pincode' value={companyData.R_pincode} onChange={handleChange}


                />
              </div>
            </div>
            <div className="w-[100%] flex gap-[40px] items-center mt-2">
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>State</label>
                <input
                  className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`}
                  type="text"
                  name='R_state' value={companyData.R_state} onChange={handleChange}


                />
              </div>
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>Country</label>
                <input className={InputCss} type="text"
                  name='R_country' value={companyData.R_country} onChange={handleChange}


                />
              </div>
              <div className="w-[100%]" />
            </div>
            <br />
            <div className="w-[100%] flex gap-[40px] items-center"></div>
          </div>
        )}
        <br />
        <div className="w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center">
          <h2 className="text-[26px] cursor-pointer">
            3. Company Contact Information
          </h2>
          {CompanyContract ? (
            <FiChevronUp
              className={ReactIcon}
              onClick={() => setCompanyContract(!CompanyContract)}
            />
          ) : (
            <FiChevronDown
              className={ReactIcon}
              onClick={() => setCompanyContract(!CompanyContract)}
            />
          )}
        </div>
        {CompanyContract && (
          <div className={InformationBox}>
            <div className="w-[100%] flex gap-[40px] items-center">
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Location Name </label>
                <input className={InputCss} type="text"
                  name='Location_Name' value={companyData.Location_Name} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Phone No.</label>
                <input className={InputCss} type="text"
                  name='phone_f' value={companyData.phone_f} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Email</label>
                <input className={InputCss} type="email"
                  name='email' value={companyData.email} onChange={handleChange}


                />
              </div>
            </div>

            <div className="w-[100%] flex gap-[40px] items-center mt-3">
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Cont.Person 1 </label>
                <input className={InputCss} type="text"
                  name='cont_person1' value={companyData.cont_person1} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Mobile No. 1 </label>
                <input className={InputCss} type="text"
                  name='mobile_1' value={companyData?.mobile_1} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Designation 1 </label>
                <input className={InputCss} type="text"
                  name='designation1' value={companyData.designation1} onChange={handleChange}


                />
              </div>
            </div>
            <div className="w-[100%] flex gap-[40px] items-center mt-3">
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Cont.Person 2 </label>
                <input className={InputCss} type="text"
                  name='cont_person2' value={companyData.cont_person2} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Mobile No. 2 </label>
                <input className={InputCss} type="text"
                  name='mobile_2' value={companyData.mobile_2} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Designation 2 </label>
                <input className={InputCss} type="text"
                  name='designation2' value={companyData.designation2} onChange={handleChange}


                />
              </div>
            </div>

            {/* <div className='w-[100%] flex gap-[40px] items-center'>
         <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Location Name </label>
            <input className={InputCss} type='number' min="0" />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Phone No. </label>
            <input className={InputCss} type='number' min="0" />
            </div>
         </div> */}

            <div className="w-[100%] flex gap-[40px] items-center"></div>
          </div>
        )}
        <br />
        <div className="w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center">
          <h2 className="text-[26px] cursor-pointer">4. Banking Information</h2>
          {BankingInformation ? (
            <FiChevronUp
              className={ReactIcon}
              onClick={() => setBankingInformation(!BankingInformation)}
            />
          ) : (
            <FiChevronDown
              className={ReactIcon}
              onClick={() => setBankingInformation(!BankingInformation)}
            />
          )}
        </div>
        {BankingInformation && (
          <div className={InformationBox}>
            <div className="w-[100%] flex gap-[40px] items-center">
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>Bank Name </label>
                <input className={InputCss} type="text"
                  name='band_name' value={companyData.band_name} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Bank A/C No. </label>
                <input
                  className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`}
                  type="number" min="0"
                  name='bank_account' value={companyData.bank_account} onChange={handleChange}


                />
              </div>
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>IFSC Code</label>
                <input className={InputCss} type="text"
                  name='ifsc_code' value={companyData.ifsc_code} onChange={handleChange}


                />
              </div>
            </div>
            <div className="w-[100%] flex gap-[40px] items-center">
              <div className="w-[100%]" />
            </div>
          </div>
        )}
        <br />
        <div className="w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center">
          <h2 className="text-[26px] cursor-pointer">
            5. Tax and Compliance Details
          </h2>
          {StatutoryDetails ? (
            <FiChevronUp
              className={ReactIcon}
              onClick={() => setStatutoryDetails(!StatutoryDetails)}
            />
          ) : (
            <FiChevronDown
              className={ReactIcon}
              onClick={() => setStatutoryDetails(!StatutoryDetails)}
            />
          )}
        </div>
        {StatutoryDetails && (
          <div className={InformationBox}>
            <div className="w-[100%] flex gap-[40px] items-center">
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>PF Code</label>
                <input className={InputCss} type="text"
                  name='pf_code' value={companyData.pf_code} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%] justify-center items-center">
                <label className={LabelCss}>PF Rate</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="rate"
                      value="10%"
                      onChange={handleChange}

                      checked={companyData.pf_rate.includes("10%")}
                    />
                    <label className={LabelCss}>10 %</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="rate"
                      value="12%"
                      onChange={handleChange}

                      checked={companyData.pf_rate.includes("12%")}

                    />
                    <label className={LabelCss}>12 %</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>ESIC No.</label>
                <input className={InputCss} type="text"
                  name='esic_no' value={companyData.esic_no} onChange={handleChange}


                />
              </div>
            </div>
            {/* <br/>
         <div className='w-[100%] flex gap-[40px] items-center'>
           
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Weekly PF</label>
            <input className={InputCss} type='text' />

            </div>
         </div> */}
          </div>
        )}
        <br />
        <div className="w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center">
          <h2 className="text-[26px] cursor-pointer">6. Wage's Information</h2>
          {WageInformation ? (
            <FiChevronUp
              className={ReactIcon}
              onClick={() => setWageInformation(!WageInformation)}
            />
          ) : (
            <FiChevronDown
              className={ReactIcon}
              onClick={() => setWageInformation(!WageInformation)}
            />
          )}
        </div>
        {WageInformation && (
          <div className={InformationBox}>
            <div className="w-[100%] flex gap-[40px] items-center">
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Minimum Wages</label>
                <input className={InputCss} type="text"
                  name='min_wages' value={companyData.min_wages} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Working Days</label>
                <input className={InputCss} type="text"
                  name='working_days' value={companyData.working_days} onChange={handleChange}


                />
              </div>
              <div className="flex gap-1 w-[100%] flex-col">
                <label className={LabelCss}>Weekly OFF</label>
                <input className={InputCss} type="text"
                  name='weekly_off' value={companyData.weekly_off} onChange={handleChange}


                />
              </div>
            </div>

            {/* <div className='w-[100%] flex gap-[40px] items-center'>
           
            <div className='w-[100%]' />
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Working Days</label>
            <input className={InputCss} type='text' />

            </div>
         </div> */}
          </div>
        )}
        <br />
        <div className="w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center">
          <h2 className="text-[26px] cursor-pointer">7. Miscellaneous</h2>
          {Miscellaneous ? (
            <FiChevronUp
              className={ReactIcon}
              onClick={() => setMiscellaneous(!Miscellaneous)}
            />
          ) : (
            <FiChevronDown
              className={ReactIcon}
              onClick={() => setMiscellaneous(!Miscellaneous)}
            />
          )}
        </div>
        {Miscellaneous && (
          <div className={InformationBox}>
            <div className="w-[100%] flex gap-[40px] items-center">
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>File No.</label>
                <input className={InputCss} type="text"
                  name='file_no' value={companyData.file_no} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Active</label>
                <input className={InputCss} type="text"
                  name='active' value={companyData.active} onChange={handleChange}


                />
              </div>
              <div className="flex flex-col gap-1 w-[100%]">
                <label className={LabelCss}>Remarks</label>
                <input className={InputCss} type="text"
                  name='remarks' value={companyData.remarks} onChange={handleChange}


                />
              </div>
            </div>
          </div>
        )}
        <br />
        {/* <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
        <h2 className='text-[26px] cursor-pointer'>4. Employee Details</h2>
        {EmployeeDetails?
            <FiChevronUp className={ReactIcon} onClick={()=>setEmployeeDetails(!EmployeeDetails)}/>
            :      <FiChevronDown className={ReactIcon} onClick={()=>setEmployeeDetails(!EmployeeDetails)}/>
        }
      </div>
      {EmployeeDetails &&
        <div className={InformationBox}>
         <div className='w-[100%] flex gap-[40px] items-center'>
         <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Active Status </label>
            <input className={InputCss} type='text' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Start Date</label>
            <input className={InputCss} type='date' />

            </div>
         </div>
         <br/>
         <div className='w-[100%] flex gap-[40px] items-center'>
            <div className='flex gap-4 w-[100%] flex-col'>
            <label className={LabelCss}>Pan No.</label>
            <input className={InputCss} type='text' />
            </div>
            <div className='w-[100%]'/>
         </div>
         <br/>

        </div>

      }
      <br/>
      <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
        <h2 className='text-[26px] cursor-pointer'>5. Employee Address</h2>
        {EmployeeAddress?
            <FiChevronUp className={ReactIcon} onClick={()=>setEmployeeAddress(!EmployeeAddress)}/>
            :      <FiChevronDown className={ReactIcon} onClick={()=>setEmployeeAddress(!EmployeeAddress)}/>
        }
      </div>
      {EmployeeAddress &&
        <div className={InformationBox}>
         <div className='w-[100%] flex gap-[40px] items-center'>
         <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Address </label>
            <input className={InputCss} type='text' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>City </label>
            <input className={InputCss} type='text' />

            </div>
         </div>
         <br/>
         <div className='w-[100%] flex gap-[40px] items-center'>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>State </label>
            <input className={InputCss} type='text' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Post Code </label>
            <input className={InputCss} type='text' />
            </div>
         </div>
         <br/>
         <div className='w-[100%] flex gap-[40px] items-center'>
         <div className='flex gap-1 w-[100%] flex-col'>
            <label className={LabelCss}>Country </label>
            <input className={InputCss} type='text' />
            </div>
            <div className='flex flex-col gap-1 w-[100%]'>
            <label className={LabelCss}>Resi. Address </label>
            <input className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`} type='text' />
            </div>
         </div>

        </div>

      }
      <br/>
     
     
      <br/>

      <br/> */}

        <div className="w-[100%] flex justify-end mt-5">
          <div className="flex items-center gap-2">
            <button onClick={handleNext} className="px-3 py-2 bg-brand_colors text-white rounded border-none">
              Next
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CompanyMasterForm;
