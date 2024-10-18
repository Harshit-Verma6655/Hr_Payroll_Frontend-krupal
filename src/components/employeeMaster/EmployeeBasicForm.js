import React, { useEffect, useRef, useState } from 'react'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';


const EmployeeMasterForm = ({ AllExpand, setEmployeeTab, handleEmployeeMasterChange, EmployeeData, setEmployeeProfileImage, setEmployeeSign }) => {
  const [EmployeeBasicInformation, setEmployeeBasicInformation] = useState(true)
  const [ContactInformation, setContactInformation] = useState(false)
  const [EmploymentJobDetails, setEmploymentJobDetails] = useState(false)
  const [StatutoryInformation, setStatutoryInformation] = useState(false)
  const [BankingDetails, setBankingDetails] = useState(false)
  const [PayrollInformation, setPayrollInformation] = useState(false)
  const [WageInformation, setWageInformation] = useState(false)
  const [MiscellaneousInformation, setMiscellaneousInformation] = useState(false)
  const [InputFile1, setInputFile1] = useState(null)
  const [InputFile2, setInputFile2] = useState(null)
  const [EmployeeAge, setEmployeeAge] = useState()
  const [EmployeeDOB, setEmployeeDOB] = useState("")
  const [BranchData, setBranchData] = useState()
  const [ContractorData, setContractorData] = useState()
  const [LocationData, setLocationData] = useState()
  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token")
  const { companyName, companyId } = useSelector((state) => state.company);

  useEffect(() => {
    if (EmployeeData.Employee_Image || EmployeeData.Employee_Sign_Image) {
      setInputFile1(EmployeeData.Employee_Image ? `https://hrbackend-theta.vercel.app/uploads/${EmployeeData?.Employee_Image}` : null)
      setInputFile2(EmployeeData.Employee_Sign_Image ? `https://hrbackend-theta.vercel.app/uploads/${EmployeeData?.Employee_Sign_Image}` : null)
    }

  }, [EmployeeData?.Employee_Image, EmployeeData.Employee_Sign_Image])

  const handleFetchAllBranch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/branch/all?CompanyId=${companyId}`)
      const res = await response.data
      setBranchData(res)

    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchAllContractor = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/contract/all?CompanyId=${companyId}`)
      const res = await response.data
      setContractorData(res)

    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchAllLocation = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/location/all?CompanyId=${companyId}`)
      const res = await response.data
      setLocationData(res)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    handleFetchAllContractor()
    handleFetchAllBranch()
    handleFetchAllLocation()
  }, [])

  const InputRef1 = useRef(null)
  const InputRef2 = useRef(null)

  const handleInput1 = (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      console.warn("No file selected");
      return;
    }
    if (files.length === 1) {
      console.log(e.target.files);
      setEmployeeProfileImage(files[0])
      setInputFile1(URL.createObjectURL(e.target.files[0]));
    } else {
      console.log("Multiple files selected:", files);
    }
    e.target.value = "";
  };

  const handleInput2 = (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      console.warn("No file selected");
      return;
    }
    if (files.length === 1) {
      setEmployeeSign(files[0])
      setInputFile2(URL.createObjectURL(e.target.files[0]));
    } else {
      console.log("Multiple files selected:", files);
    }
    e.target.value = "";

  }


  const handleEmployeeAge = (e) => {
    const date = e.target.value;
    setEmployeeDOB(date)
    const EmpDate = new Date(date);
    const Empyear = EmpDate.getFullYear();
    if (isNaN(Empyear)) {
      const notify = () =>
        toast(
          <span className='text-red-500'>
            Please enter a valid date.
          </span>,
          {
            duration: 6000,
          }
        );
      notify();
      return;
    }

    const CurrentYear = new Date().getFullYear();
    const CurrentMonth = new Date().getMonth();
    const CurrentDay = new Date().getDate();
    let Ages = CurrentYear - Empyear;

    if (new Date(CurrentYear, CurrentMonth, CurrentDay) < new Date(CurrentYear, EmpDate.getMonth(), EmpDate.getDate())) {
      Ages--;
    }
    if (Ages < 18) {
      const notify = () =>
        toast(
          <span className='text-red-500'>
            Employee must be at least 18 years old.
          </span>,
          {
            duration: 6000,
          }
        );

      notify();
      setEmployeeDOB("")
      setEmployeeAge("")
      return;
    }

    setEmployeeAge(Ages);
  };


  const InformationBox = "w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]"
  const ReactIcon = 'text-white text-[24px] cursor-pointer'
  const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap w-[100%]"
  const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]"

  useEffect(() => {
    if (AllExpand === true) {
      setEmployeeBasicInformation(true)
      setContactInformation(true)
      setEmploymentJobDetails(true)
      setStatutoryInformation(true)
      setBankingDetails(true)
      setPayrollInformation(true)
      setMiscellaneousInformation(true)
    } else {
      setEmployeeBasicInformation(true)
      setContactInformation(false)
      setEmploymentJobDetails(false)
      setStatutoryInformation(false)
      setBankingDetails(false)
      setPayrollInformation(false)
      setMiscellaneousInformation(false)
    }
  }, [AllExpand])
  return (
    <section className='py-3'>
      {/* <h1 className='text-brand_color font-[600] text-[32px]'>Employee Master</h1> */}
      <br></br>
      <br></br>
      <form>
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>1. Employee Basic Information</h2>
          {EmployeeBasicInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setEmployeeBasicInformation(!EmployeeBasicInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setEmployeeBasicInformation(!EmployeeBasicInformation)} />
          }
        </div>
        {EmployeeBasicInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex justify-between gap-5'>
              <div className='w-[70%] flex justify-between'>
                <div className='w-[50%] flex flex-col justify-between pr-10'>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Employee Sr. No. </label>
                    <input className={InputCss} type='text'
                      name='Sr_emp'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Sr_emp}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Name on Aadhar. </label>
                    <input className={InputCss} type='text'
                      name='Name_on_Aadhar'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Name_on_Aadhar}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Father's Name </label>
                    <input className={InputCss} type='text'
                      name='Father_Name'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Father_Name}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Gender </label>
                    {/* <input className={InputCss} type='text' /> */}
                    <select
                      name='Gender'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Gender}
                      className={InputCss}
                    >
                      <option></option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Marital Status </label>
                    {/* <input className={InputCss} type='text' /> */}
                    <select
                      name='Marital_Status'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Marital_Status}

                      className={InputCss}>
                      <option></option>
                      <option value={"married"}>Married</option>
                      <option value={"unmarried"}>UnMarried</option>
                    </select>
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Education </label>
                    <input className={InputCss} type='text'
                      name='Education'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Education}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Department Name </label>
                    <input className={InputCss} type='text'
                      name='Department_Name'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Department_Name}
                    />
                  </div>
                  <div className='flex flex-col gap-1 w-[100%]'>
                    <label htmlFor="branch-name" className={LabelCss}>Branch Name</label>
                    <select
                      id="branch-name" // Added id for accessibility
                      name='Branch_Name'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Branch_Name}
                      className={InputCss}
                    >
                      <option value="" disabled>Select Branch</option> {/* Placeholder option */}
                      {BranchData &&
                        BranchData.map((bran, index) => (
                          <option key={index} value={bran?.Branch_Name}>{bran.Branch_Name}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className='flex flex-col gap-1 w-[100%]'>
                    <label htmlFor="site-name" className={LabelCss}>Location / Site Name</label>
                    <select
                      id="site-name" // Added id for accessibility
                      name='Site_Name'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Site_Name}
                      className={InputCss}
                    >
                      <option value="" disabled>Select Location</option> {/* Placeholder option */}
                      {LocationData &&
                        LocationData.map((loc, index) => (
                          <option key={index} value={loc?.Location_Name}>{loc?.Location_Name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>PAN No </label>
                    <input className={InputCss} type='text'
                      name='PAN_No'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.PAN_No}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Service book no. </label>
                    <input className={InputCss} type='text'
                      name='Service_book_no'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Service_book_no} />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Email</label>
                    <input className={InputCss} type='email'
                      name='Email'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Email}
                    />
                  </div>

                </div>
                <div className='w-[50%] flex flex-col gap-3 justify-between'>
                  <div className='flex gap-1 flex-col'>
                    <label className={LabelCss}>Employee Code </label>
                    <input className={InputCss} type='text'
                      name='Employee_Code'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Employee_Code}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Name (First Name) </label>
                    <input className={InputCss} type='text'
                      name='Name_First_Name'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Name_First_Name}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Surname (Last Name) </label>
                    <input className={InputCss} type='text'
                      name='Surname_Last_Name'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Surname_Last_Name}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss} >Birth Date </label>
                    <input className={InputCss} type='date'
                      name='Birth_Date'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Birth_Date}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Age </label>
                    <input className={InputCss}
                      name='Age'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Age}
                    />
                  </div>
                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Joining Date</label>
                    <input className={InputCss} type='date'
                      name='Joining_Date'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Joining_Date}
                    />
                  </div>

                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Designation Name</label>
                    <input className={InputCss} type='text'
                      name='Designation_Name'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Designation_Name}
                    />
                  </div>

                  <div className='flex flex-col gap-1 w-[100%]'>
                    <label htmlFor="contractor-name" className={LabelCss}>Contractor Name</label>
                    <select
                      id="contractor-name" // Added id for accessibility
                      name='Contractor_Name'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Contractor_Name}
                      className={InputCss}
                    >
                      <option value="" disabled>Select Contractor</option> {/* Placeholder option */}
                      {ContractorData &&
                        ContractorData.map((con, index) => (
                          <option key={index} value={con.Name}>{con.Name}</option>
                        ))
                      }
                    </select>
                  </div>



                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>UAN No. </label>
                    <input className={InputCss} type='text'
                      name='UAN_No'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.UAN_No}
                    />
                  </div>

                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>ESIC No. </label>
                    <input className={InputCss} type='text'
                      name='ESIC_No'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.ESIC_No}
                    />
                  </div>

                  <div className='flex gap-1 flex-col w-[100%]'>
                    <label className={LabelCss}>Aadhar No. </label>
                    <input className={InputCss} type='text'
                      name='Aadhar_No'
                      onChange={handleEmployeeMasterChange}
                      value={EmployeeData.Aadhar_No}
                    />
                  </div>
                  <div className='w-[100%] h-[70px]' />





                </div>


              </div>

              <div className='w-[20%] flex flex-col gap-4'>
                <div className='flex flex-col justify-center items-center'>
                  <input type='file' onChange={handleInput1} ref={InputRef1} className='hidden' />
                  <div className='w-[100%] h-[200px] relative  cursor-pointer flex justify-center items-center border-[1px] border-brand_b_color bg-[#D9D9D9]' onClick={() => InputRef1.current.click()}>
                    {InputFile1 === null ?
                      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s' className='w-[100%] h-[100%]' />
                      : (
                        <>
                          <img src={InputFile1} className='w-[100%] h-[100%] object-contain' />
                          <MdDelete className='text-[20px] absolute top-1 right-2 text-red-500 cursor-pointer' onClick={(e) => {
                            e.stopPropagation();
                            setInputFile1(null);
                            setEmployeeProfileImage(null)
                          }} />
                        </>
                      )

                    }

                  </div>
                  <p className='text-[18px] font-[500] text-black'>Photo Upload</p>
                </div>
                <input type='file' onChange={handleInput2} ref={InputRef2} className='hidden' />
                <div className='flex flex-col justify-center items-center mt-8'>
                  <div className='w-[100%] cursor-pointer relative flex justify-center items-center h-[100px] border-[1px] border-brand_b_color bg-[#D9D9D9]' onClick={() => InputRef2.current.click()}>
                    {InputFile2 === null ?
                      <FaPlus className='text-brand_color text-[25px]' />
                      : (
                        <>
                          <img src={InputFile2} className='w-[100%] h-[100%] object-contain' />
                          <MdDelete className='text-[20px] absolute top-1 right-2 text-red-500 cursor-pointer' onClick={(e) => {
                            e.stopPropagation();
                            setInputFile2(null);
                            setEmployeeSign(null)

                          }} />

                        </>
                      )

                    }

                  </div>
                  <p className='text-[18px] font-[500] text-black'>Sign Upload</p>
                </div>
              </div>
            </div>
          </div>

        }
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>2. Contact Information</h2>
          {ContactInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setContactInformation(!ContactInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setContactInformation(!ContactInformation)} />
          }
        </div>
        {ContactInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex gap-[40px] items-center'>
              <div className='flex gap-1 flex-col w-[100%]'>
                <label className={LabelCss}>Address </label>
                <input className={InputCss} type='text'
                  name='Address'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.Address}
                />
              </div>
              <div className='flex gap-1 flex-col w-[100%]'>
                <label className={LabelCss}>City </label>
                <input className={InputCss} type='text'
                  name='City'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.City}
                />
              </div>
              <div className='flex gap-1 flex-col w-[100%]'>
                <label className={LabelCss}>Pin Code </label>
                <input className={InputCss} type='text'
                  name='Pin_Code'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.Pin_Code}
                />
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex gap-1 flex-col w-[100%]'>
                <label className={LabelCss}>State </label>
                <input className={InputCss} type='text'
                  name='State'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.State}
                />
              </div>
              <div className='flex gap-1 flex-col w-[100%] '>
                <label className={LabelCss}>Country </label>
                <input className={InputCss} type='text'
                  name='Country'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.Country}
                />
              </div>
              <div className='flex gap-1 flex-col w-[100%]'>
                <label className={LabelCss}>Phone (R) </label>
                <input className={InputCss} type='text'
                  name='Phone_R'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.Phone_R}
                />
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex gap-1 flex-col w-[100%]'>
                <label className={LabelCss}>Mobile No. </label>
                <input className={InputCss} type='text'
                  name='Mobile_No'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.Mobile_No}
                />
              </div>
              {/* <div className='flex gap-1 flex-col w-[100%]'>
        <label className={LabelCss}>Email Address </label>
        <input className={InputCss} type='email' />
        </div> */}
              <div className='w-[100%]' />
              <div className='w-[100%]' />

            </div>
          </div>

        }
        {/* <br/>
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>3. Employment & Job Details</h2>
    {EmploymentJobDetails?
        <FiChevronUp className={ReactIcon} onClick={()=>setEmploymentJobDetails(!EmploymentJobDetails)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setEmploymentJobDetails(!EmploymentJobDetails)}/>
    }
  </div>
  {EmploymentJobDetails &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Joining Date </label>
        <input className={InputCss} type='date' />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Branch Name </label>
        <select className={InputCss}>
          <option></option>
        </select>
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Location Name </label>
        <select className={InputCss}>
          <option></option>
        </select>

        </div>
     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Contractor Name </label>
        <select className={InputCss}>
          <option></option>
        </select>
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Site Name </label>
        <select className={InputCss}>
          <option></option>
        </select>
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Department Name </label>
        <input className={InputCss} type='text' />
        </div>
     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Designation Name </label>
        <input className={InputCss} type='text' />
        </div>
        <div className='w-[100%]' />
        <div className='w-[100%]' />

     </div>


    </div>

  } */}
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>3. Indicator</h2>
          {PayrollInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setPayrollInformation(!PayrollInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setPayrollInformation(!PayrollInformation)} />
          }
        </div>
        {PayrollInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex gap-[40px] items-center'>
              <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
                <label className={LabelCss} style={{ textAlign: "center" }}>PF </label>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='PF'
                      onChange={handleEmployeeMasterChange}
                      value={"yes"}
                      checked={EmployeeData.PF === "yes"}
                    />
                    <label className={LabelCss}>Yes</label>
                  </div>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='PF'
                      onChange={handleEmployeeMasterChange}
                      value={"no"}
                      checked={EmployeeData.PF === "no"} />
                    <label className={LabelCss}>No</label>
                  </div>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='PF'
                      onChange={handleEmployeeMasterChange}
                      value={"above"}
                      checked={EmployeeData.PF === "above"} />
                    <label className={LabelCss}>Above</label>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
                <label className={LabelCss} style={{ textAlign: "center" }}>ESIC</label>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='ESIC'
                      onChange={handleEmployeeMasterChange}
                      value={"yes"}
                      checked={EmployeeData.ESIC === "yes"} />
                    <label className={LabelCss}>Yes</label>
                  </div>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='ESIC'
                      onChange={handleEmployeeMasterChange}
                      value={"no"}
                      checked={EmployeeData.ESIC === "no"}

                    />
                    <label className={LabelCss}>No</label>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
                <label className={LabelCss} style={{ textAlign: "center" }}>GLWF</label>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='GLWF'
                      onChange={handleEmployeeMasterChange}
                      value={"yes"}
                      checked={EmployeeData.GLWF === "yes"} />
                    <label className={LabelCss}>Yes</label>
                  </div>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='GLWF'
                      onChange={handleEmployeeMasterChange}
                      value={"no"}
                      checked={EmployeeData.GLWF === "no"} />
                    <label className={LabelCss}>No</label>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
                <label className={LabelCss} style={{ textAlign: "center" }}>PT</label>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='PT'
                      onChange={handleEmployeeMasterChange}
                      value={"yes"}
                      checked={EmployeeData.PT === "yes"} />
                    <label className={LabelCss}>Yes</label>
                  </div>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='PT'
                      onChange={handleEmployeeMasterChange}
                      value={"no"}
                      checked={EmployeeData.PT === "no"} />
                    <label className={LabelCss}>No</label>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-1 w-[100%] justify-center items-center'>
                <label className={LabelCss}>Deduction F.Pension</label>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='Deduction_F_Pension'
                      onChange={handleEmployeeMasterChange}
                      value={"yes"}
                      checked={EmployeeData.Deduction_F_Pension === "yes"} />
                    <label className={LabelCss}>Yes</label>
                  </div>
                  <div className='flex items-center gap-1'>
                    <input type='radio' className='w-[25px] h-[25px] ' name='Deduction_F_Pension'
                      onChange={handleEmployeeMasterChange}
                      value={"no"}
                      checked={EmployeeData.Deduction_F_Pension === "no"} />
                    <label className={LabelCss}>No</label>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>

        }<br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>4. Tax and Compliance Details</h2>
          {StatutoryInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setStatutoryInformation(!StatutoryInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setStatutoryInformation(!StatutoryInformation)} />
          }
        </div>
        {StatutoryInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex gap-[40px] items-center mb-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>PF Account No.</label>
                <input className={InputCss} type='text'
                  name='PF_Account_No'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.PF_Account_No}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>PF Eligibility Date </label>
                <input className={InputCss} type='date'
                  name='PF_Eligibility_Date'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.PF_Eligibility_Date}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>ESIC No.</label>
                <input className={InputCss} type='text'
                  name='ESIC_No'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.ESIC_No}
                />
              </div>
            </div>
            <hr />
            <div className='mt-3'>
              <label className={LabelCss}>ESIC Expected End Month</label>
              <br />
              <div className='w-[100%] flex gap-[40px] items-center'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Pay Month</label>
                  <input className={InputCss} type='text'
                    name='ESIC_Expected_End_Month1'
                    onChange={handleEmployeeMasterChange}
                    value={EmployeeData.ESIC_Expected_End_Month1}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Pay year</label>
                  <input className={InputCss} type='text'
                    name='ESIC_Expected_End_Year1'
                    onChange={handleEmployeeMasterChange}
                    value={EmployeeData.ESIC_Expected_End_Year1}
                  />
                </div>
                <div className='w-[100%]' />


              </div>
            </div>
            <div className='mt-3'>
              <label className={LabelCss}>ESIC Expected End Month</label>
              <br />
              <div className='w-[100%] flex gap-[40px] items-center'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Pay Month</label>
                  <input className={InputCss} type='text'
                    name='ESIC_Expected_End_Month2'
                    onChange={handleEmployeeMasterChange}
                    value={EmployeeData.ESIC_Expected_End_Month2}
                  />
                </div>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Pay year</label>
                  <input className={InputCss} type='text'
                    name='ESIC_Expected_End_Year2'
                    onChange={handleEmployeeMasterChange}
                    value={EmployeeData.ESIC_Expected_End_Year2}
                  />
                </div>
                <div className='w-[100%]' />


              </div>
            </div>
            {/* <div className='w-[100%] flex gap-[40px] items-center'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>PF Account No. </label>
        <input className={InputCss} type='number' min="0" />
        </div>
        <div className='w-[100%]' />
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>GLWF</label>
        <input className={InputCss} type='text' />
        </div>
     </div> */}
          </div>

        }
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>5. Banking Details</h2>
          {BankingDetails ?
            <FiChevronUp className={ReactIcon} onClick={() => setBankingDetails(!BankingDetails)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setBankingDetails(!BankingDetails)} />
          }
        </div>
        {BankingDetails &&
          <div className={InformationBox}>
            <div className='w-[100%] flex gap-[40px] items-center'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Bank Name</label>
                <input className={InputCss} type='text'
                  name='Bank_Name'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.Bank_Name}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Bank A/C No </label>
                <input className={InputCss} type='number' min="0"
                  name='Bank_AC_No'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.Bank_AC_No}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>IFSC Code </label>
                <input className={InputCss} type='text'
                  name='IFSC_Code'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.IFSC_Code}
                />
              </div>
              {/* <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Bank A/C  No.</label>
        <input className={InputCss} type='text' />

        </div> */}
            </div>
          </div>

        }
        <br />

        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>6. Miscellaneous Information</h2>
          {MiscellaneousInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setMiscellaneousInformation(!MiscellaneousInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setMiscellaneousInformation(!MiscellaneousInformation)} />
          }
        </div>
        {MiscellaneousInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex gap-[40px] items-center'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Remarks </label>
                <input className={InputCss} type='text'
                  name='Remarks'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.Remarks}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Mark of Identification </label>
                <input className={InputCss} type='text'
                  name='Mark_of_Identification'
                  onChange={handleEmployeeMasterChange}
                  value={EmployeeData.Mark_of_Identification}
                />
              </div>
              <div className='w-[100%]' />
              {/* <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Remarks</label>
        <input className={InputCss} type='text' />

        </div> */}
            </div>

          </div>

        }
        <div className='w-[100%] flex justify-end mt-5'>
          <div className='flex items-center gap-2'>
            {/* <button className='px-3 py-2 text-brand_color border-[1px] rounded border-brand_b_color'>Cancel</button> */}
            <button onClick={(e) => {
              e.preventDefault()
              setEmployeeTab(1)
            }} className='px-3 py-2 bg-brand_colors text-white rounded border-none'>Next</button>

          </div>
        </div>
      </form>
      <Toaster />
    </section>
  )
}

export default EmployeeMasterForm