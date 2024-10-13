import React, { useEffect, useRef, useState } from 'react'
import RootLayout from '../components/RootLayout';
import DashboardLayout from '../components/DashboardLayout';
import BranchMasterForm from '../components/branchmaster/BranchMasterForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';


const BranchMaster = () => {
    const [BranchMaster,setBranchMaster]=useState(0)
    const [AllExpand,setAllExpand]=useState(false)
    const [BulkCompanyExcel,setBulkCompanyExcel]=useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
     const navigate = useNavigate()
    const location = useLocation()
    const BASE_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token")
    const InputRef = useRef(null)
    console.warn(location?.state?.id)
  const { companyName ,companyId} = useSelector((state) => state.company);
  const [BranchData,setBranchData]=useState({
    Branch_No:"",
    Branch_Name:"",
    Branch_Starting_Date:"",
    Nature_of_Business:"",
    Owner_Name:"",
    Owner_Address:"",
    Address:"",
    City:"",
    Pin_Code:"",
    State:"",
    Country:"",
    Location_Name:"",
    Phone_f:"",
    Contact_Person_Name:"",
    Mobile_No:"",
    Professional_Tax_No:"",
    PF_Sub_Code_No:"",
    ESIC_Sub_Code_No:"",
    Start_Date:"",
    CompanyId:companyId

  })


  const handleViewBranch = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/branch/view/branch/${location.state.id}`);
        const res = await response.data;
        console.log(res);
        
        // Update the state with the fetched data
        setBranchData({
            Branch_No: res.Branch_No || "", // Assuming these keys exist in your response
            Branch_Name: res.Branch_Name || "",
            Branch_Starting_Date: res.Branch_Starting_Date || "",
            Nature_of_Business: res.Nature_of_Business || "",
            Owner_Name: res.Owner_Name || "",
            Owner_Address: res.Owner_Address || "",
            Address: res.Address || "",
            City: res.City || "",
            Pin_Code: res.Pin_Code || "",
            State: res.State || "",
            Country: res.Country || "",
            Location_Namen_Namen_Name: res.Location_Name || "",
            Phone_f: res.Phone_f || "",
            Contact_Person_Name: res.Contact_Person_Name || "",
            Mobile_No: res.Mobile_No || "",
            Professional_Tax_No: res.Professional_Tax_No || "",
            PF_Sub_Code_No: res.PF_Sub_Code_No || "",
            ESIC_Sub_Code_No: res.ESIC_Sub_Code_No || "",
            Start_Date: res.Start_Date || ""
        });

    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    if(location?.state?.id){
      handleViewBranch();
    }
}, [location?.state?.id]);


const handleUpdatebranch = async (e)=>{
  e.preventDefault()
  try{
    const response = await axios.put(`${BASE_URL}/branch/branch/${location.state.id}`,BranchData)
    const res = await response.data
    console.log(res)
    toast.success(res?.message)
    
  }catch(error){
    console.log(error)
  }
}
   

    const handleChangebranchData = (e) => {
      const { name, value } = e.target; 
      setBranchData((prevState) => ({
          ...prevState,      
          [name]: value     
      }));
  };



  const handleFileUpload = async (e) => {
    let file = e.target.files[0];
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post(`${BASE_URL}/branch/excel/branch`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
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


  const handleNextbranchNumber = async()=>{
    try{
      const response = await axios.get(`${BASE_URL}/branch/next-branch-no`)
      const res= await response.data
      console.log(res)
      setBranchData((prevData)=>({
        ...prevData,
        Branch_No:res?.nextBranchNo
      }))

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
if(location.state!=="normalVisit"){
  handleNextbranchNumber()
}
  },[])

  const handleSave = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post(`${BASE_URL}/branch/excel/upload/${companyId}`, BulkCompanyExcel);
        toast.success(response.data.message);
        setIsModalOpen(false); 
        navigate("/")
    } catch (error) {
        console.error('Error saving data:', error);
        toast.error('Failed to save data. Please try again.');
    }
};
  

    const normalbtn=`border-[4px] border-[#D4DAE1] rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color`;
    const active="border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color"
  return (
    <>
    <RootLayout>
    <DashboardLayout>
  <section className='px-[170px] my-4 pb-[150px] max-w-[1400px] font-lato'>
  <div className=' my-3'>


</div>
   <div className='w-[100%] flex items-center justify-between'>
   <div className='gap-3 flex items-center'>
     <button onClick={()=>setBranchMaster(0)} className={`${BranchMaster===0?active:normalbtn}`}>Branch Master</button>
  
     </div>
     {companyName&&
  <button className={active}>{companyName}</button>

}
<input type="file" onChange={handleFileUpload} className='hidden' ref={InputRef}/>

    <div className='flex items-center gap-4'>
    {location.state!=="normalVisit" &&
    <>
   <button className='px-3 py-2 rounded bg-brand_colors text-white font-[500]' onClick={()=>InputRef.current.click()}>Upload</button>
   <button className='px-3 py-2 rounded bg-brand_colors text-white font-[500]'>Print</button>
   </>
  }
    <button onClick={()=>setAllExpand(!AllExpand)} className='px-3 py-2 rounded bg-brand_colors text-white font-[500]'>{AllExpand?"Collapse All":"Expand All"}</button>
    </div>
   </div>
   <div className='w-[100%]'>
    {BranchMaster===0&&
      <BranchMasterForm AllExpand={AllExpand} notSave={location?.state} handleUpdatebranch={handleUpdatebranch} viewSave={location?.state?.viewmode} handleChangebranchData={handleChangebranchData} BranchData={BranchData}/>
    }
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
                        <th className="px-4 py-2 text-left font-medium border">Branch No</th>
                        <th className="px-4 py-2 text-left font-medium border">Branch Name</th>
                        <th className="px-4 py-2 text-left font-medium border">Branch Starting Date</th>
                        <th className="px-4 py-2 text-left font-medium border">Nature of Business</th>
                        <th className="px-4 py-2 text-left font-medium border">Owner Name</th>
                        <th className="px-4 py-2 text-left font-medium border">Owner Address</th>
                        <th className="px-4 py-2 text-left font-medium border">Address</th>
                        <th className="px-4 py-2 text-left font-medium border">City</th>
                        <th className="px-4 py-2 text-left font-medium border">Pin Code</th>
                        <th className="px-4 py-2 text-left font-medium border">State</th>
                        <th className="px-4 py-2 text-left font-medium border">Country</th>
                        <th className="px-4 py-2 text-left font-medium border">Phone O</th>
                        <th className="px-4 py-2 text-left font-medium border">Phone F</th>
                        <th className="px-4 py-2 text-left font-medium border">Contact Person Name</th>
                        <th className="px-4 py-2 text-left font-medium border">Mobile No</th>
                        <th className="px-4 py-2 text-left font-medium border">Professional Tax No</th>
                        <th className="px-4 py-2 text-left font-medium border">PF Sub Code No</th>
                        <th className="px-4 py-2 text-left font-medium border">ESIC Sub Code No</th>
                        <th className="px-4 py-2 text-left font-medium border">Start_Date</th>

                    </tr>
                </thead>
                <tbody>
                    {BulkCompanyExcel && 
                      BulkCompanyExcel.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border">{item?.Branch_No}</td>
                            <td className="px-4 py-2 border">{item?.Branch_Name}</td>
                            <td className="px-4 py-2 border">{item?.Branch_Starting_Date}</td>
                            <td className="px-4 py-2 border">{item?.Nature_of_Business}</td>
                            <td className="px-4 py-2 border">{item?.Owner_Name}</td>
                            <td className="px-4 py-2 border">{item?.Owner_Address}</td>
                            <td className="px-4 py-2 border">{item?.Address}</td>
                            <td className="px-4 py-2 border">{item?.City}</td>
                            <td className="px-4 py-2 border">{item?.Pin_Code}</td>
                            <td className="px-4 py-2 border">{item?.State}</td>
                            <td className="px-4 py-2 border">{item?.Country}</td>
                            <td className="px-4 py-2 border">{item?.Location_Name}</td>
                            <td className="px-4 py-2 border">{item?.Phone_f}</td>
                            <td className="px-4 py-2 border">{item?.Contact_Person_Name}</td>
                            <td className="px-4 py-2 border">{item?.Mobile_No}</td>
                            <td className="px-4 py-2 border">{item?.Professional_Tax_No}</td>
                            <td className="px-4 py-2 border">{item?.PF_Sub_Code_No}</td>
                            <td className="px-4 py-2 border">{item?.ESIC_Sub_Code_No}</td>
                            <td className="px-4 py-2 border">{item?.Start_Date}</td>
                            
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

export default BranchMaster