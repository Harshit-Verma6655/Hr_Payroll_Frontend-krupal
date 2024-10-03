import React, { useEffect, useRef, useState } from 'react'
import RootLayout from '../components/RootLayout';
import DashboardLayout from '../components/DashboardLayout';
import ContractMasterForm from '../components/contractormaster/ContractMasterForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';


const ContractorMaster = () => {
    const [BranchMaster,setBranchMaster]=useState(0)
    const [AllExpand,setAllExpand]=useState(false)
    const location = useLocation()
    const { companyName ,companyId} = useSelector((state) => state.company);
    const [BulkCompanyExcel,setBulkCompanyExcel]=useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const BASE_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    const InputRef = useRef(null)
    const navigate = useNavigate()


    const [ContractData,setContractData]=useState({
      Contractor_No:"",
      Name:"",
      PAN_Card_No:"",
      No_of_labour_engaged:"",
      Address:"",
      City:"",
      Pin_Code:"",
      State:"",
      Country:"",
      Phone_o:"",
      Phone_f:"",
      Mobile_No:"",
      Contact_Person_Name:"",
      Owner_Name:"",
      Owner_Address:"",
      PF_code:"",
      License_No:"",
      ESIC_No:"",
      License_Date_Of_Issue:"",
      License_Date_Of_Renew:"",
      Starting_Contract_Date:"",
      Renew_Date_Of_Contract:"",
      Pay_Roll_Start_Date:"",
      CompanyId:companyId
    })
    const handleFetchViewContract = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/contract/view/${location.state.id}`);
        const res = await response.data;
        console.log(res);
    
       
        setContractData({
          Contractor_No: res.Contractor_No || "",
          Name: res.Name || "",
          PAN_Card_No: res.PAN_Card_No || "",
          No_of_labour_engaged: res.No_of_labour_engaged || "",
          Address: res.Address || "",
          City: res.City || "",
          Pin_Code: res.Pin_Code || "",
          State: res.State || "",
          Country: res.Country || "",
          Phone_o: res.Phone_o || "",
          Phone_f: res.Phone_f || "",
          Mobile_No: res.Mobile_No || "",
          Contact_Person_Name: res.Contact_Person_Name || "",
          Owner_Name: res.Owner_Name || "",
          Owner_Address: res.Owner_Address || "",
          PF_code: res.PF_code || "",
          License_No: res.License_No || "",
          ESIC_No: res.ESIC_No || "",
          License_Date_Of_Issue: res.License_Date_Of_Issue || "",
          License_Date_Of_Renew: res.License_Date_Of_Renew || "",
          Starting_Contract_Date: res.Starting_Contract_Date || "",
          Renew_Date_Of_Contract: res.Renew_Date_Of_Contract || "",
          Pay_Roll_Start_Date: res.Pay_Roll_Start_Date || ""
        });
      } catch (error) {
        console.log(error);
      }
    };

    const handleUpdatebranch = async(e)=>{
      e.preventDefault()
      try{
        const response = await axios.put(`${BASE_URL}/contract/update/${location.state.id}`,ContractData)
        const res = await response.data
        toast.success(res.message)
        console.log(res)

      }catch(error){
        console.log(error)
      }

    }
    
  

    useEffect(() => {
      if(location?.state?.id){
        handleFetchViewContract();
      }
      
    }, [location?.state?.id]);

    const handleContractData = (e) => {
      const { name, value } = e.target; 
      setContractData(prevData => ({
          ...prevData, 
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
      const response = await axios.post(`${BASE_URL}/contract/parse-excel`, formData, {
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


  const handleSave = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post(`${BASE_URL}/contract/bulk-save/${companyId}`, BulkCompanyExcel);
        toast.success(response.data.message);
        setIsModalOpen(false); 
        navigate("/")
    } catch (error) {
        console.error('Error saving data:', error);
        toast.error('Failed to save data. Please try again.');
    }
};


const handleContractNext = async ()=>{
  try{
    const response = await axios.get(`${BASE_URL}/contract/next-contractor-no`)
    const res = await response.data
    console.log(res)
    setContractData((prevData)=>({
      ...prevData,
      Contractor_No:res?.nextContractorNo
    }))

  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
 if(location?.state!=="view"){
  handleContractNext()
 }
},[])
  

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
     <button onClick={()=>setBranchMaster(0)} className={`${BranchMaster===0?active:normalbtn}`}>Contractor Master</button>
  
     </div>
     {companyName&&
  <button className={active}>{companyName}</button>

}
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
   <br/>
   <div className='w-[100%]'>
    {BranchMaster===0&&
      <ContractMasterForm AllExpand={AllExpand} editview={location?.state?.viewmode}  notSave={location?.state} handleContractData={handleContractData} ContractData={ContractData} handleUpdatebranch={handleUpdatebranch}/>
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
                        <th className="px-4 py-2 text-left font-medium border">Contractor No.</th>
                        <th className="px-4 py-2 text-left font-medium border">Name</th>
                        <th className="px-4 py-2 text-left font-medium border">PAN Card No</th>
                        <th className="px-4 py-2 text-left font-medium border">No of labour engaged</th>
                        <th className="px-4 py-2 text-left font-medium border">Address</th>
                        <th className="px-4 py-2 text-left font-medium border">City</th>
                        <th className="px-4 py-2 text-left font-medium border">Pin Code</th>
                        <th className="px-4 py-2 text-left font-medium border">State</th>
                        <th className="px-4 py-2 text-left font-medium border">Country</th>
                        <th className="px-4 py-2 text-left font-medium border">Phone O</th>
                        <th className="px-4 py-2 text-left font-medium border">Phone F</th>
                        <th className="px-4 py-2 text-left font-medium border">Mobile No</th>
                        <th className="px-4 py-2 text-left font-medium border">Contact Person Name</th>
                        <th className="px-4 py-2 text-left font-medium border">Owner Name</th>
                        <th className="px-4 py-2 text-left font-medium border">Owner Address</th>
                        <th className="px-4 py-2 text-left font-medium border">PF code</th>
                        <th className="px-4 py-2 text-left font-medium border">License No</th>
                        <th className="px-4 py-2 text-left font-medium border">ESIC No</th>
                        <th className="px-4 py-2 text-left font-medium border">License Date Of Issue</th>
                        <th className="px-4 py-2 text-left font-medium border">License Date Of Renew</th>
                        <th className="px-4 py-2 text-left font-medium border">Starting Contract Date</th>
                        <th className="px-4 py-2 text-left font-medium border">Renew Date Of Contract</th>
                        <th className="px-4 py-2 text-left font-medium border">Pay Roll Start Date</th>

                    </tr>
                </thead>
                <tbody>
                    {BulkCompanyExcel && 
                      BulkCompanyExcel?.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border">{item?.Contractor_No}</td>
                            <td className="px-4 py-2 border">{item?.Name}</td>
                            <td className="px-4 py-2 border">{item?.PAN_Card_No}</td>
                            <td className="px-4 py-2 border">{item?.No_of_labour_engaged}</td>
                            <td className="px-4 py-2 border">{item?.Address}</td>
                            <td className="px-4 py-2 border">{item?.City}</td>
                            <td className="px-4 py-2 border">{item?.Pin_Code}</td>
                            <td className="px-4 py-2 border">{item?.State}</td>
                            <td className="px-4 py-2 border">{item?.Country}</td>
                            <td className="px-4 py-2 border">{item?.Phone_o}</td>
                            <td className="px-4 py-2 border">{item?.Phone_f}</td>
                            <td className="px-4 py-2 border">{item?.Mobile_No}</td>
                            <td className="px-4 py-2 border">{item?.Contact_Person_Name}</td>
                            <td className="px-4 py-2 border">{item?.Owner_Name}</td>
                            <td className="px-4 py-2 border">{item?.Owner_Address}</td>
                            <td className="px-4 py-2 border">{item?.PF_code}</td>
                            <td className="px-4 py-2 border">{item?.License_No}</td>
                            <td className="px-4 py-2 border">{item?.ESIC_No}</td>
                            <td className="px-4 py-2 border">{item?.License_Date_Of_Issue}</td>
                            <td className="px-4 py-2 border">{item?.License_Date_Of_Renew}</td>
                            <td className="px-4 py-2 border">{item?.Starting_Contract_Date}</td>
                            <td className="px-4 py-2 border">{item?.Renew_Date_Of_Contract}</td>
                            <td className="px-4 py-2 border">{item?.Pay_Roll_Start_Date}</td>
                          
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

export default ContractorMaster