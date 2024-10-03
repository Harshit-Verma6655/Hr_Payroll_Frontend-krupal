import React, { useEffect, useRef, useState } from 'react'
import RootLayout from '../components/RootLayout'
import DashboardLayout from '../components/DashboardLayout'
import EmployeeMasterForm from '../components/employeeMaster/EmployeeBasicForm'
import EmployeeMasterSalary from '../components/employeeMaster/EmployeeMasterSalary'
import EmployeeMasterDetailsFam from '../components/employeeMaster/EmployeeMasterDetailsFam'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modal from 'react-modal';
import toast from 'react-hot-toast'
import axios from 'axios'

const EmployeeMaster = () => {
    const [EmployeeTab,setEmployeeTab]=useState(0)
    const [AllExpand,setAllExpand]=useState(false)
    const [EmployeeProfileImage,setEmployeeProfileImage]=useState()
    const [EmployeeSign,setEmployeeSign]=useState()
    const [BulkCompanyExcel,setBulkCompanyExcel]=useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const InputRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    
  const { companyName,companyId } = useSelector((state) => state.company);
  const employeeId = location?.state?.empid
  const viewmode = location?.state?.viewmode

  const BASE_URL = process.env.REACT_APP_API_URL;

  const [SonsDetails,setSonsDetails]=useState([{
    Son_Name:"",
    Son_Birthdate:"",
    Son_Address:"",
    Son_Aadhar_No:"",
    id:1
  }])
  const [DaughterData,setDaughterData]=useState([{
    Daughter_Name:"",
    Daughter_Birthdate:"",
    Daughter_Address:"",
    Daughter_Aadhar_No:"",
    id:1
  }])
  const [EmployeeFamDetails,setEmployeeFamDetails]=useState({
    Father_Name:"",
    Father_Address:"",
    Father_Birthdate:"",
    Father_Aadhar_No:"",
    Husband_Name:"",
    Husband_Birthdate:"",
    Husband_Address:"",
    Husband_Aadhar_No:"",
    Wife_Name:"",
    Wife_Birthdate:"",
    Wife_Address:"",
    Wife_Aadhar_No:"",
    SonsDetails:SonsDetails,
    DaughterDetails:DaughterData

  })
  const [EmployeeSalary,setEmployeeSalary]=useState({
    Consolidated_Salary:"",
    Pay_Rate:"",
    DA_Rate:"",
    Per_Hour_Calculation:"",
    Pice_Rate_Calculation:"",
    HRA:"",
    Conveyance:"",
    Travelling_Allowance:"",
    W_LA:"",
    Special_Allowance:"",
    Difference_Pay:"",
    Allowance_Name_5:"",
    Amount_Name_5:"",
    Allowance_Name_6:"",
    Amount_Name_6:"",
    Allowance_Name_7:"",
    Amount_Name_7:"",
    Allowance_Name_8:"",
    Amount_Name_8:"",
    Handicapped_Allowance:"",
    Other_Name:"",
    Other_Amount:"",
    Gross_Salary:""
  })
  const [EmployeeData,setEmployeeData]=useState({
    Sr_emp:"",
    Employee_Image:"",
    Employee_Sign_Image:"",
    Employee_Code:"",
    Name_on_Aadhar:"",
    Name_First_Name:"",
    Father_Name:"",
    Surname_Last_Name:"",
    Gender:"",
    Birth_Date:"",
    Marital_Status:"",
    Age:"",
    Education:"",
    Joining_Date:"",
    Department_Name:"",
    Designation_Name:"",
    Branch_Name:"",
    Location_Name:"",
    Site_Name:"",
    Contractor_Name:"",
    PAN_No:"",
    UAN_No:"",
    Service_book_no:"",
    ESIC_No:"",
    Email:"",
    Aadhar_No:"",
    Address:"",
    City:"",
    Pin_Code:"",
    State:"",
    Country:"",
    Phone_R:"",
    Mobile_No:"",
    PF:"",
    ESIC:"",
    GLWF:"",
    PT:"",
    Deduction_F_Pension:"",
    PF_Account_No:"",
    PF_Eligibility_Date:"",
    ESIC_No:"",
    ESIC_Expected_End_Month1:"",
    ESIC_Expected_End_Year1:"",
    ESIC_Expected_End_Month2:"",
    ESIC_Expected_End_Year2:"",
    Bank_Name:"",
    Bank_AC_No:"",
    IFSC_Code:"",
    Remarks:"",
    Mark_of_Identification:"",
  })


  const handleEmployeeMasterChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmployeeSalary = (event) => {
    const { name, value } = event.target;
    setEmployeeSalary(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleEmployeeFamily = (event) => {
    const { name, value } = event.target;
    setEmployeeFamDetails(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmitEmployee = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    
  
    formData.append('Sr_emp', EmployeeData.Sr_emp);
    formData.append('Employee_Code', EmployeeData.Employee_Code);
    formData.append('Name_on_Aadhar', EmployeeData.Name_on_Aadhar);
    formData.append('Name_First_Name', EmployeeData.Name_First_Name);
    formData.append('Father_Name', EmployeeData.Father_Name);
    formData.append('Surname_Last_Name', EmployeeData.Surname_Last_Name);
    formData.append('Gender', EmployeeData.Gender);
    formData.append('Birth_Date', EmployeeData.Birth_Date);
    formData.append('Marital_Status', EmployeeData.Marital_Status);
    formData.append('Age', EmployeeData.Age);
    formData.append('Education', EmployeeData.Education);
    formData.append('Joining_Date', EmployeeData.Joining_Date);
    formData.append('Department_Name', EmployeeData.Department_Name);
    formData.append('Designation_Name', EmployeeData.Designation_Name);
    formData.append('Branch_Name', EmployeeData.Branch_Name);
    formData.append('Location_Name', EmployeeData.Location_Name);
    formData.append('Site_Name', EmployeeData.Site_Name);
    formData.append('Contractor_Name', EmployeeData.Contractor_Name);
    formData.append('PAN_No', EmployeeData.PAN_No);
    formData.append('UAN_No', EmployeeData.UAN_No);
    formData.append('Service_book_no', EmployeeData.Service_book_no);
    formData.append('ESIC_No', EmployeeData.ESIC_No);
    formData.append('Email', EmployeeData.Email);
    formData.append('Aadhar_No', EmployeeData.Aadhar_No);
    formData.append('Address', EmployeeData.Address);
    formData.append('City', EmployeeData.City);
    formData.append('Pin_Code', EmployeeData.Pin_Code);
    formData.append('State', EmployeeData.State);
    formData.append('Country', EmployeeData.Country);
    formData.append('Phone_R', EmployeeData.Phone_R);
    formData.append('Mobile_No', EmployeeData.Mobile_No);
    formData.append('PF', EmployeeData.PF);
    formData.append('ESIC', EmployeeData.ESIC);
    formData.append('GLWF', EmployeeData.GLWF);
    formData.append('PT', EmployeeData.PT);
    formData.append('Deduction_F_Pension', EmployeeData.Deduction_F_Pension);
    formData.append('PF_Account_No', EmployeeData.PF_Account_No);
    formData.append('PF_Eligibility_Date', EmployeeData.PF_Eligibility_Date);
    formData.append('ESIC_Expected_End_Month1', EmployeeData.ESIC_Expected_End_Month1);
    formData.append('ESIC_Expected_End_Year1', EmployeeData.ESIC_Expected_End_Year1);
    formData.append('ESIC_Expected_End_Month2', EmployeeData.ESIC_Expected_End_Month2);
    formData.append('ESIC_Expected_End_Year2', EmployeeData.ESIC_Expected_End_Year2);
    formData.append('Bank_Name', EmployeeData.Bank_Name);
    formData.append('Bank_AC_No', EmployeeData.Bank_AC_No);
    formData.append('IFSC_Code', EmployeeData.IFSC_Code);
    formData.append('Remarks', EmployeeData.Remarks);
    formData.append('CompanyId',companyId );

    formData.append('Mark_of_Identification', EmployeeData.Mark_of_Identification);
    formData.append('Employee_Family_Detail', JSON.stringify(EmployeeFamDetails)); 
    formData.append('Employee_Salary', JSON.stringify(EmployeeSalary)); 
    
    // Append files
    if (EmployeeProfileImage) formData.append('Employee_Image', EmployeeProfileImage);
    if (EmployeeSign) formData.append('Employee_Sign_Image', EmployeeSign);
  
    try {
      const response = await fetch(`${BASE_URL}/employee/create-employee`, {
        method: 'POST',
        body: formData
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Employee created successfully:', result);
        toast.success(result?.message)
        
      } else {
        console.error('Failed to create employee:', result.message);
        toast.error(result.message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };









  const handleUpdateEmployee = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    
  
    formData.append('Sr_emp', EmployeeData.Sr_emp);
    formData.append('Employee_Code', EmployeeData.Employee_Code);
    formData.append('Name_on_Aadhar', EmployeeData.Name_on_Aadhar);
    formData.append('Name_First_Name', EmployeeData.Name_First_Name);
    formData.append('Father_Name', EmployeeData.Father_Name);
    formData.append('Surname_Last_Name', EmployeeData.Surname_Last_Name);
    formData.append('Gender', EmployeeData.Gender);
    formData.append('Birth_Date', EmployeeData.Birth_Date);
    formData.append('Marital_Status', EmployeeData.Marital_Status);
    formData.append('Age', EmployeeData.Age);
    formData.append('Education', EmployeeData.Education);
    formData.append('Joining_Date', EmployeeData.Joining_Date);
    formData.append('Department_Name', EmployeeData.Department_Name);
    formData.append('Designation_Name', EmployeeData.Designation_Name);
    formData.append('Branch_Name', EmployeeData.Branch_Name);
    formData.append('Location_Name', EmployeeData.Location_Name);
    formData.append('Site_Name', EmployeeData.Site_Name);
    formData.append('Contractor_Name', EmployeeData.Contractor_Name);
    formData.append('PAN_No', EmployeeData.PAN_No);
    formData.append('UAN_No', EmployeeData.UAN_No);
    formData.append('Service_book_no', EmployeeData.Service_book_no);
    formData.append('ESIC_No', EmployeeData.ESIC_No);
    formData.append('Email', EmployeeData.Email);
    formData.append('Aadhar_No', EmployeeData.Aadhar_No);
    formData.append('Address', EmployeeData.Address);
    formData.append('City', EmployeeData.City);
    formData.append('Pin_Code', EmployeeData.Pin_Code);
    formData.append('State', EmployeeData.State);
    formData.append('Country', EmployeeData.Country);
    formData.append('Phone_R', EmployeeData.Phone_R);
    formData.append('Mobile_No', EmployeeData.Mobile_No);
    formData.append('PF', EmployeeData.PF);
    formData.append('ESIC', EmployeeData.ESIC);
    formData.append('GLWF', EmployeeData.GLWF);
    formData.append('PT', EmployeeData.PT);
    formData.append('Deduction_F_Pension', EmployeeData.Deduction_F_Pension);
    formData.append('PF_Account_No', EmployeeData.PF_Account_No);
    formData.append('PF_Eligibility_Date', EmployeeData.PF_Eligibility_Date);
    formData.append('ESIC_Expected_End_Month1', EmployeeData.ESIC_Expected_End_Month1);
    formData.append('ESIC_Expected_End_Year1', EmployeeData.ESIC_Expected_End_Year1);
    formData.append('ESIC_Expected_End_Month2', EmployeeData.ESIC_Expected_End_Month2);
    formData.append('ESIC_Expected_End_Year2', EmployeeData.ESIC_Expected_End_Year2);
    formData.append('Bank_Name', EmployeeData.Bank_Name);
    formData.append('Bank_AC_No', EmployeeData.Bank_AC_No);
    formData.append('IFSC_Code', EmployeeData.IFSC_Code);
    formData.append('Remarks', EmployeeData.Remarks);
    formData.append('CompanyId',companyId );

    formData.append('Mark_of_Identification', EmployeeData.Mark_of_Identification);
    formData.append('Employee_Family_Detail', JSON.stringify(EmployeeFamDetails)); 
    formData.append('Employee_Salary', JSON.stringify(EmployeeSalary)); 
    
    // Append files
    if (EmployeeProfileImage) formData.append('Employee_Image', EmployeeProfileImage);
    if (EmployeeSign) formData.append('Employee_Sign_Image', EmployeeSign);
  
    try {
      const response = await fetch(`${BASE_URL}/employee/${employeeId}`, {
        method: 'PUT',
        body: formData
      });

      console.log("this is formdata is going",SonsDetails)
  
      const result = await response.json();
      if (response.ok) {
        console.log('Employee created successfully:', result);
        toast.success(result?.message)
        
      } else {
        console.error('Failed to create employee:', result.message);
        toast.error(result.message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  //this below for the auto fetch 
  useEffect(() => {
    const fetchEmployeeData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/employee/${employeeId}`); 
            if (!response.ok) {
                throw new Error('Failed to fetch employee data');
            }
            const employee = await response.json();
            setEmployeeData(employee);
            setEmployeeFamDetails(employee?.Employee_Family_Detail || {});
            setEmployeeSalary(employee?.Employee_Salary || {});
            setSonsDetails(employee?.Employee_Family_Detail?.SonsDetails || []);
            setDaughterData(employee?.Employee_Family_Detail?.DaughterDetails || []);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    if(employeeId){

    
    fetchEmployeeData();}
}, [employeeId]);
  
const handleFileUpload = async (e) => {
  let file = e.target.files[0];
  if (!file) {
    toast.error('Please select a file first.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${BASE_URL}/employee/upload-excel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      
      },
    });
    console.log('this is response', response);
    setBulkCompanyExcel(response?.data?.data);
    setIsModalOpen(true);
  } catch (error) {
    console.error('Error uploading file:', error);
    if (error?.response?.data?.message === "Token expired, please log in again") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
    }
    toast.error('Failed to upload file. Please try again.');
    setIsModalOpen(false);
  } finally {
    e.target.value = ''; 
  }
};
  

const handleSave = async (e) => {
  e.preventDefault()
  try {
      const response = await axios.post(`${BASE_URL}/employee/create-employees/${companyId}`, BulkCompanyExcel);
      toast.success(response.data.message);
      setIsModalOpen(false); 
      navigate("/")
  } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save data. Please try again.');
  }
};


// const handleNextSrNumber = async()=>{
//   try{
//     const response = await axios.get(`${BASE_URL}/employee/next-employee-sr`)
//     const res = await response.data
//     console.log(res)

//   }catch(error){
//     console.log(error)
//   }
// }

// useEffect(()=>{
// if(viewmode!=="view"){
//   handleNextSrNumber()
// }
// },[viewmode])

    const normalbtn=`border-[4px] border-[#D4DAE1] rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color`;
    const active="border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color"
   

    function whichTabRender(tabname) {
        switch (tabname) {
          case 0:
            return <EmployeeMasterForm setEmployeeProfileImage={setEmployeeProfileImage} setEmployeeSign={setEmployeeSign} AllExpand={AllExpand} handleEmployeeMasterChange={handleEmployeeMasterChange} EmployeeData={EmployeeData}  setEmployeeTab={setEmployeeTab}/>;
          case 1:
            return <EmployeeMasterSalary AllExpand={AllExpand} handleEmployeeSalary={handleEmployeeSalary} EmployeeSalary={EmployeeSalary}   setEmployeeTab={setEmployeeTab}/>;
          case 2:
            return <EmployeeMasterDetailsFam AllExpand={AllExpand} SonsDetails={SonsDetails} setDaughterData={setDaughterData} setSonsDetails={setSonsDetails} DaughterData={DaughterData} notSave={location.state}  setEmployeeTab={setEmployeeTab} handleEmployeeFamily={handleEmployeeFamily} EmployeeFamDetails={EmployeeFamDetails} handleSubmitEmployee={handleSubmitEmployee} setEmployeeFamDetails={setEmployeeFamDetails} handleUpdateEmployee={handleUpdateEmployee} viewmode={viewmode}/>;
          default:
            return null;
        }
      }
      

  return (
    <>
    <RootLayout>
    <DashboardLayout>
  
  <section className='px-[120px] my-4 pb-[150px] max-w-[1400px] font-lato'>
  <div className=' my-3'>
{companyName&&
  <button className={active}>{companyName}</button>

}
</div>
   <div className='w-[100%] flex items-center justify-between'>
    <div className='flex items-center gap-4'>
    <button onClick={()=>setEmployeeTab(0)} className={`${EmployeeTab===0?active:normalbtn}`}>Employee Master </button>
     <button onClick={()=>setEmployeeTab(1)} className={`${EmployeeTab===1?active:normalbtn}`}>Employee Salary</button>
     <button onClick={()=>setEmployeeTab(2)} className={`${EmployeeTab===2?active:normalbtn}`}>Employee Fam. Details</button>
    </div>
   
  
    <div className='flex items-center gap-4'>
    {location.state!=="normalVisit" &&
    <>
    <input type="file" onChange={handleFileUpload} className='hidden' ref={InputRef}/>
    <button className='px-3 py-2 rounded bg-brand_colors text-white font-[500]' onClick={()=>InputRef.current.click()} >Upload</button>
   <button className='px-3 py-2 rounded bg-brand_colors text-white font-[500]'>Print</button>
   </>
  }
   <button onClick={()=>setAllExpand(!AllExpand)} className='px-3 py-2 rounded bg-brand_colors text-white font-[500]'>{AllExpand?"Collapse All":"Expand All"}</button>
   </div>

  
  

   </div>
   <div className='w-[100%]'>
     {whichTabRender(EmployeeTab)}
   </div>

  </section>
  </DashboardLayout>
  </RootLayout>
  <Modal
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    className="fixed inset-0 flex items-center justify-center z-[100]"
  
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[100]"
>
    <div className="bg-white rounded-lg p-6  w-[90%]">
        <h2 className="text-xl font-bold mb-4">Company Details</h2>
        <div className="max-h-96 overflow-y-auto overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-[12px]">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-medium border">Sr. Emp</th>
            <th className="px-4 py-2 text-left font-medium border">Employee Code</th>
            <th className="px-4 py-2 text-left font-medium border">Name on Aadhar</th>
            <th className="px-4 py-2 text-left font-medium border">First Name</th>
            <th className="px-4 py-2 text-left font-medium border">Last Name</th>
            <th className="px-4 py-2 text-left font-medium border">Gender</th>
            <th className="px-4 py-2 text-left font-medium border">Birth Date</th>
            <th className="px-4 py-2 text-left font-medium border">Marital Status</th>
            <th className="px-4 py-2 text-left font-medium border">Age</th>
            <th className="px-4 py-2 text-left font-medium border">Education</th>
            <th className="px-4 py-2 text-left font-medium border">Joining Date</th>
            <th className="px-4 py-2 text-left font-medium border">Department</th>
            <th className="px-4 py-2 text-left font-medium border">Designation</th>
            <th className="px-4 py-2 text-left font-medium border">Branch</th>
            <th className="px-4 py-2 text-left font-medium border">Location</th>
            <th className="px-4 py-2 text-left font-medium border">Site</th>
            <th className="px-4 py-2 text-left font-medium border">Contractor</th>
            <th className="px-4 py-2 text-left font-medium border">PAN No</th>
            <th className="px-4 py-2 text-left font-medium border">UAN No</th>
            <th className="px-4 py-2 text-left font-medium border">Service Book No</th>
            <th className="px-4 py-2 text-left font-medium border">ESIC No</th>
            <th className="px-4 py-2 text-left font-medium border">Email</th>
            <th className="px-4 py-2 text-left font-medium border">Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Address</th>
            <th className="px-4 py-2 text-left font-medium border">City</th>
            <th className="px-4 py-2 text-left font-medium border">Pin Code</th>
            <th className="px-4 py-2 text-left font-medium border">State</th>
            <th className="px-4 py-2 text-left font-medium border">Country</th>
            <th className="px-4 py-2 text-left font-medium border">Phone R</th>
            <th className="px-4 py-2 text-left font-medium border">Mobile No</th>
            <th className="px-4 py-2 text-left font-medium border">Bank Name</th>
            <th className="px-4 py-2 text-left font-medium border">Bank AC No</th>
            <th className="px-4 py-2 text-left font-medium border">IFSC Code</th>
            <th className="px-4 py-2 text-left font-medium border">Remarks</th>
            <th className="px-4 py-2 text-left font-medium border">Mark of Identification</th>

            {/* Employee Salary Details */}
            <th className="px-4 py-2 text-left font-medium border">Consolidated Salary</th>
            <th className="px-4 py-2 text-left font-medium border">Pay Rate</th>
            <th className="px-4 py-2 text-left font-medium border">DA Rate</th>
            <th className="px-4 py-2 text-left font-medium border">Per Hour Calculation</th>
            <th className="px-4 py-2 text-left font-medium border">Pice Rate Calculation</th>
            <th className="px-4 py-2 text-left font-medium border">HRA</th>
            <th className="px-4 py-2 text-left font-medium border">Conveyance</th>
            <th className="px-4 py-2 text-left font-medium border">Travelling Allowance</th>
            <th className="px-4 py-2 text-left font-medium border">W LA</th>
            <th className="px-4 py-2 text-left font-medium border">Special Allowance</th>
            <th className="px-4 py-2 text-left font-medium border">Difference Pay</th>
            <th className="px-4 py-2 text-left font-medium border">Allowance Name 5</th>
            <th className="px-4 py-2 text-left font-medium border">Amount Name 5</th>
            <th className="px-4 py-2 text-left font-medium border">Allowance Name 6</th>
            <th className="px-4 py-2 text-left font-medium border">Amount Name 6</th>
            <th className="px-4 py-2 text-left font-medium border">Allowance Name 7</th>
            <th className="px-4 py-2 text-left font-medium border">Amount Name 7</th>
            <th className="px-4 py-2 text-left font-medium border">Allowance Name 8</th>
            <th className="px-4 py-2 text-left font-medium border">Amount Name 8</th>
            <th className="px-4 py-2 text-left font-medium border">Handicapped Allowance</th>
            <th className="px-4 py-2 text-left font-medium border">Other Name</th>
            <th className="px-4 py-2 text-left font-medium border">Other Amount</th>
            <th className="px-4 py-2 text-left font-medium border">Gross Salary</th>

            {/* Family Details */}
            <th className="px-4 py-2 text-left font-medium border">Father Name</th>
            <th className="px-4 py-2 text-left font-medium border">Father Address</th>
            <th className="px-4 py-2 text-left font-medium border">Father Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Father Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Husband Name</th>
            <th className="px-4 py-2 text-left font-medium border">Husband Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Husband Address</th>
            <th className="px-4 py-2 text-left font-medium border">Husband Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Wife Name</th>
            <th className="px-4 py-2 text-left font-medium border">Wife Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Wife Address</th>
            <th className="px-4 py-2 text-left font-medium border">Wife Aadhar No</th>

            {/* Sons Details */}
            <th className="px-4 py-2 text-left font-medium border">Son 1 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Son 1 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Son 1 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Son 1 Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Son 2 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Son 2 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Son 2 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Son 2 Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Son 3 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Son 3 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Son 3 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Son 3 Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Son 4 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Son 4 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Son 4 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Son 4 Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Son 5 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Son 5 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Son 5 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Son 5 Aadhar No</th>

            {/* Daughters Details */}
            <th className="px-4 py-2 text-left font-medium border">Daughter 1 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 1 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 1 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 1 Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 2 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 2 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 2 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 2 Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 3 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 3 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 3 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 3 Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 4 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 4 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 4 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 4 Aadhar No</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 5 Name</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 5 Birthdate</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 5 Address</th>
            <th className="px-4 py-2 text-left font-medium border">Daughter 5 Aadhar No</th>
          </tr>
        </thead>
        <tbody>
          {BulkCompanyExcel &&
            BulkCompanyExcel.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{item?.Sr_emp}</td>
                <td className="px-4 py-2 border">{item?.Employee_Code}</td>
                <td className="px-4 py-2 border">{item?.Name_on_Aadhar}</td>
                <td className="px-4 py-2 border">{item?.Name_First_Name}</td>
                <td className="px-4 py-2 border">{item?.Surname_Last_Name}</td>
                <td className="px-4 py-2 border">{item?.Gender}</td>
                <td className="px-4 py-2 border">{item?.Birth_Date}</td>
                <td className="px-4 py-2 border">{item?.Marital_Status}</td>
                <td className="px-4 py-2 border">{item?.Age}</td>
                <td className="px-4 py-2 border">{item?.Education}</td>
                <td className="px-4 py-2 border">{item?.Joining_Date}</td>
                <td className="px-4 py-2 border">{item?.Department_Name}</td>
                <td className="px-4 py-2 border">{item?.Designation_Name}</td>
                <td className="px-4 py-2 border">{item?.Branch_Name}</td>
                <td className="px-4 py-2 border">{item?.Location_Name}</td>
                <td className="px-4 py-2 border">{item?.Site_Name}</td>
                <td className="px-4 py-2 border">{item?.Contractor_Name}</td>
                <td className="px-4 py-2 border">{item?.PAN_No}</td>
                <td className="px-4 py-2 border">{item?.UAN_No}</td>
                <td className="px-4 py-2 border">{item?.Service_book_no}</td>
                <td className="px-4 py-2 border">{item?.ESIC_No}</td>
                <td className="px-4 py-2 border">{item?.Email}</td>
                <td className="px-4 py-2 border">{item?.Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Address}</td>
                <td className="px-4 py-2 border">{item?.City}</td>
                <td className="px-4 py-2 border">{item?.Pin_Code}</td>
                <td className="px-4 py-2 border">{item?.State}</td>
                <td className="px-4 py-2 border">{item?.Country}</td>
                <td className="px-4 py-2 border">{item?.Phone_R}</td>
                <td className="px-4 py-2 border">{item?.Mobile_No}</td>
                <td className="px-4 py-2 border">{item?.Bank_Name}</td>
                <td className="px-4 py-2 border">{item?.Bank_AC_No}</td>
                <td className="px-4 py-2 border">{item?.IFSC_Code}</td>
                <td className="px-4 py-2 border">{item?.Remarks}</td>
                <td className="px-4 py-2 border">{item?.Mark_of_Identification}</td>

                {/* Employee Salary Details */}
                <td className="px-4 py-2 border">{item?.Consolidated_Salary}</td>
                <td className="px-4 py-2 border">{item?.Pay_Rate}</td>
                <td className="px-4 py-2 border">{item?.DA_Rate}</td>
                <td className="px-4 py-2 border">{item?.Per_Hour_Calculation}</td>
                <td className="px-4 py-2 border">{item?.Pice_Rate_Calculation}</td>
                <td className="px-4 py-2 border">{item?.HRA}</td>
                <td className="px-4 py-2 border">{item?.Conveyance}</td>
                <td className="px-4 py-2 border">{item?.Travelling_Allowance}</td>
                <td className="px-4 py-2 border">{item?.W_LA}</td>
                <td className="px-4 py-2 border">{item?.Special_Allowance}</td>
                <td className="px-4 py-2 border">{item?.Difference_Pay}</td>
                <td className="px-4 py-2 border">{item?.Allowance_Name_5}</td>
                <td className="px-4 py-2 border">{item?.Amount_Name_5}</td>
                <td className="px-4 py-2 border">{item?.Allowance_Name_6}</td>
                <td className="px-4 py-2 border">{item?.Amount_Name_6}</td>
                <td className="px-4 py-2 border">{item?.Allowance_Name_7}</td>
                <td className="px-4 py-2 border">{item?.Amount_Name_7}</td>
                <td className="px-4 py-2 border">{item?.Allowance_Name_8}</td>
                <td className="px-4 py-2 border">{item?.Amount_Name_8}</td>
                <td className="px-4 py-2 border">{item?.Handicapped_Allowance}</td>
                <td className="px-4 py-2 border">{item?.Other_Name}</td>
                <td className="px-4 py-2 border">{item?.Other_Amount}</td>
                <td className="px-4 py-2 border">{item?.Gross_Salary}</td>

                {/* Family Details */}
                <td className="px-4 py-2 border">{item?.Father_Name}</td>
                <td className="px-4 py-2 border">{item?.Father_Address}</td>
                <td className="px-4 py-2 border">{item?.Father_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Father_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Husband_Name}</td>
                <td className="px-4 py-2 border">{item?.Husband_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Husband_Address}</td>
                <td className="px-4 py-2 border">{item?.Husband_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Wife_Name}</td>
                <td className="px-4 py-2 border">{item?.Wife_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Wife_Address}</td>
                <td className="px-4 py-2 border">{item?.Wife_Aadhar_No}</td>

                {/* Sons Details */}
                <td className="px-4 py-2 border">{item?.Son_1_Name}</td>
                <td className="px-4 py-2 border">{item?.Son_1_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Son_1_Address}</td>
                <td className="px-4 py-2 border">{item?.Son_1_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Son_2_Name}</td>
                <td className="px-4 py-2 border">{item?.Son_2_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Son_2_Address}</td>
                <td className="px-4 py-2 border">{item?.Son_2_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Son_3_Name}</td>
                <td className="px-4 py-2 border">{item?.Son_3_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Son_3_Address}</td>
                <td className="px-4 py-2 border">{item?.Son_3_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Son_4_Name}</td>
                <td className="px-4 py-2 border">{item?.Son_4_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Son_4_Address}</td>
                <td className="px-4 py-2 border">{item?.Son_4_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Son_5_Name}</td>
                <td className="px-4 py-2 border">{item?.Son_5_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Son_5_Address}</td>
                <td className="px-4 py-2 border">{item?.Son_5_Aadhar_No}</td>

                {/* Daughters Details */}
                <td className="px-4 py-2 border">{item?.Daughter_1_Name}</td>
                <td className="px-4 py-2 border">{item?.Daughter_1_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Daughter_1_Address}</td>
                <td className="px-4 py-2 border">{item?.Daughter_1_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Daughter_2_Name}</td>
                <td className="px-4 py-2 border">{item?.Daughter_2_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Daughter_2_Address}</td>
                <td className="px-4 py-2 border">{item?.Daughter_2_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Daughter_3_Name}</td>
                <td className="px-4 py-2 border">{item?.Daughter_3_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Daughter_3_Address}</td>
                <td className="px-4 py-2 border">{item?.Daughter_3_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Daughter_4_Name}</td>
                <td className="px-4 py-2 border">{item?.Daughter_4_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Daughter_4_Address}</td>
                <td className="px-4 py-2 border">{item?.Daughter_4_Aadhar_No}</td>
                <td className="px-4 py-2 border">{item?.Daughter_5_Name}</td>
                <td className="px-4 py-2 border">{item?.Daughter_5_Birthdate}</td>
                <td className="px-4 py-2 border">{item?.Daughter_5_Address}</td>
                <td className="px-4 py-2 border">{item?.Daughter_5_Aadhar_No}</td>
              </tr>
            ))}
        </tbody>
      </table>
        </div>
        <div className="flex justify-end mt-4">

        
        <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded" onClick={() => {setIsModalOpen(false)}}>Cancel</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSave}>Save</button>
        </div>
    </div>
</Modal>
  </>
  )
}

export default EmployeeMaster