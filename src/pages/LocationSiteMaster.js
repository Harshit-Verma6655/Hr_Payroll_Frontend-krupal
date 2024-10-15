import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import LocationMasterForm from '../components/locationmaster/LocationMasterForm';
import RootLayout from '../components/RootLayout';


const LocationSiteMaster = () => {
  const [LocationMaster, setLocationMaster] = useState(0)
  const [AllExpand, setAllExpand] = useState(false)
  const [BulkCompanyExcel, setBulkCompanyExcel] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation()
  const { companyName, companyId } = useSelector((state) => state.company);
  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const InputRef = useRef(null)
  const navigate = useNavigate()

  const [LocationData, setLocationData] = useState({
    Location_No: "",
    Location_Name: "",
    Phone_f: "",
    Address: "",
    City: "",
    Pin_Code: "",
    State: "",
    Country: "",
    CompanyId: companyId
  })

  const handleViewLocation = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/location/view/${location.state.id}`);
      const res = await response.data;

      setLocationData({
        Location_No: res.Location_No || "",
        Location_Name: res.Location_Name || "",
        Phone_f: res.Phone_f || "",
        Address: res.Address || "",
        City: res.City || "",
        Pin_Code: res.Pin_Code || "",
        State: res.State || "",
        Country: res.Country || ""
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location?.state?.id) {
      handleViewLocation();
    }
  }, [location?.state?.id]);
  const handleLocationData = (e) => {
    const { name, value } = e.target;
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleLocationupdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/location/update/${location.state.id}`, LocationData);
      const res = await response.data;
      toast.success(res.message);
      navigate('/location/table');  // Navigate to the location table after update
    } catch (error) {
      console.log(error);
    }
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
      const response = await axios.post(`${BASE_URL}/location/parse-excel`, formData, {
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
      const response = await axios.post(`${BASE_URL}/location/bulk-save/${companyId}`, BulkCompanyExcel);
      toast.success(response.data.message);
      setIsModalOpen(false);
      navigate("/")
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save data. Please try again.');
    }
  };

  const handleNextLocationNumber = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/location/next-location-no`)
      const res = await response.data
      console.log(res)
      setLocationData((preData) => ({ ...preData, }))

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (location.state !== "view") {
      handleNextLocationNumber()
    }
  }, [])

  const normalbtn = `border-[4px] border-[#D4DAE1] rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color`;
  const active = "border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color"
  return (
    <>
      <RootLayout>
        <DashboardLayout>
          <section className='px-[170px] my-4 pb-[150px] font-lato'>

            <div className='w-[100%] flex items-center justify-between'>
              <div className='gap-3 flex items-center'>
                <button onClick={() => setLocationMaster(0)} className={`${LocationMaster === 0 ? active : normalbtn}`}>LOCATION OR SITE MASTER</button>

              </div>
              {companyName &&
                <button className={active}>{companyName}</button>

              }
              <div className='flex items-center gap-4'>
                {location.state !== "normalVisit" &&
                  <>
                    <input type="file" onChange={handleFileUpload} className='hidden' ref={InputRef} />
                    <button className='px-3 py-2 rounded bg-brand_colors text-white font-[500]' onClick={() => InputRef.current.click()} >Upload</button>
                    <button className='px-3 py-2 rounded bg-brand_colors text-white font-[500]'>Print</button>
                  </>}
                <button onClick={() => setAllExpand(!AllExpand)} className='px-3 py-2 rounded bg-brand_colors text-white font-[500]'>{AllExpand ? "Collapse All" : "Expand All"}</button>
              </div>
            </div>
            <br />
            <div className='w-[100%]'>
              {LocationMaster === 0 &&
                <LocationMasterForm handleLocationupdate={handleLocationupdate} editView={location?.state?.viewmode} AllExpand={AllExpand} notSave={location.state} LocationData={LocationData} handleLocationData={handleLocationData} />
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
                  <th className="px-4 py-2 text-left font-medium border">Location No</th>
                  <th className="px-4 py-2 text-left font-medium border">Phone O</th>
                  <th className="px-4 py-2 text-left font-medium border">Phone F</th>
                  <th className="px-4 py-2 text-left font-medium border">Address</th>
                  <th className="px-4 py-2 text-left font-medium border">City</th>
                  <th className="px-4 py-2 text-left font-medium border">Pin Code</th>
                  <th className="px-4 py-2 text-left font-medium border">State</th>
                  <th className="px-4 py-2 text-left font-medium border">Country</th>
                </tr>
              </thead>
              <tbody>
                {BulkCompanyExcel &&
                  BulkCompanyExcel.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border">{item?.Location_No}</td>
                      <td className="px-4 py-2 border">{item?.Location_Name}</td>
                      <td className="px-4 py-2 border">{item?.Phone_f}</td>
                      <td className="px-4 py-2 border">{item?.Address}</td>
                      <td className="px-4 py-2 border">{item?.City}</td>
                      <td className="px-4 py-2 border">{item?.Pin_Code}</td>
                      <td className="px-4 py-2 border">{item?.State}</td>
                      <td className="px-4 py-2 border">{item?.Country}</td>

                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded" onClick={() => { setIsModalOpen(false) }}>Cancel</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSave}>Save</button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default LocationSiteMaster