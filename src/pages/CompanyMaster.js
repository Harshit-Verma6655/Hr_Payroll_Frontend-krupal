import React, { useEffect, useRef, useState } from 'react'
import RootLayout from '../components/RootLayout';
import DashboardLayout from '../components/DashboardLayout';
import CompanyMasterForm from '../components/companymaster/CompanyMasterForm';
import CompanyMasterOther from '../components/companymaster/CompanyMasterOther';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { clearCompanyInfo } from "../redux/slices/companySlice";
import { useDispatch } from "react-redux";

const CompanyMaster = () => {
  const [CompanyTwoTab, setCompanyTwoTab] = useState(0)
  const [AllExpand, setAllExpand] = useState(false)
  const [CompanyFetchData, setCompanyFetchData] = useState(null)
  const [BulkCompanyExcel, setBulkCompanyExcel] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { companyName } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token")

  const location = useLocation();
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get("companyid");
  const viewMode = queryParams.get("viewmode");

  const newHeader = {
    "Authorization": `Bearer ${token}`
  }

  // const [file, setFile] = useState(null);
  const InputRef = useRef(null)

  console.log(CompanyFetchData)
  const [companyData, setCompanyData] = useState({
    company_no: '',
    company_start_date: '',
    created_for: '',
    company_name: '',
    company_type: '',
    nature_of_industry: '',
    pan_no: '',
    company_address: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    R_company_address: '',
    R_city: '',
    R_pincode: '',
    R_state: '',
    R_country: '',
    Location_Name: '',
    phone_f: '',
    email: '',
    cont_person1: '',
    mobile_1: '',
    designation1: '',
    cont_person2: '',
    mobile_2: '',
    designation2: '',
    band_name: '',
    bank_account: '',
    ifsc_code: '',
    pf_code: '',
    pf_rate: '',
    esic_no: '',
    min_wages: '',
    working_days: '',
    weekly_off: '',
    file_no: '',
    active: '',
    remarks: '',
    company_other_detail: {
      factory_license_no: '',
      renew_date: '',
      plan_passing_no: '',
      plan_passing_date: '',
      hp: '',
      shop_license_no: '',
      shop_license_date: '',
      contract_labour_date: '',
      contract_register_no: '',
      pf_indicator: '',
      esic_indicator: '',
      glwf_indicator: '',
      pt_indicator: '',
      edli_indicator: '',
      pf_application_date: '',
      esic_application_date: '',
      glwf_application_no: '',
      pt_employer: '',
      pt_employee: '',
      pt_applicable_date: '',
      company_file_detail: '',
      acgr_no: '',
      ext_code: '',
    },
  });



  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name.startsWith('company_other_detail.')) {
      const nestedField = name.split('.')[1];
      setCompanyData((prevState) => ({
        ...prevState,
        company_other_detail: {
          ...prevState.company_other_detail,
          [nestedField]: value,
        },
      }));
    } else if (name === 'company') {
      setCompanyData((prevState) => ({
        ...prevState,
        created_for: value,
      }));
    }
    else if (name === 'rate') {
      setCompanyData((prevState) => ({
        ...prevState,
        pf_rate: value,
      }));
    }
    else {
      setCompanyData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
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
      const response = await axios.post(`${BASE_URL}/v1/com/upload-companies`, formData, {
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
      const response = await axios.post(`${BASE_URL}/v1/com/confirm-upload`, BulkCompanyExcel, {
        headers: newHeader
      });
      toast.success(response.data.message);
      setIsModalOpen(false);
      navigate("/")
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save data. Please try again.');
    }
  };

  useEffect(() => {
    if (CompanyFetchData) {
      setCompanyData((prevData) => ({
        ...prevData,
        company_no: CompanyFetchData.company_no || '',
        company_start_date: CompanyFetchData.company_start_date || '',
        created_for: CompanyFetchData.created_for || '',
        company_name: CompanyFetchData.company_name || '',
        company_type: CompanyFetchData.company_type || '',
        nature_of_industry: CompanyFetchData.nature_of_industry || '',
        pan_no: CompanyFetchData.pan_no || '',
        company_address: CompanyFetchData.company_address || '',
        city: CompanyFetchData.city || '',
        pincode: CompanyFetchData.pincode || '',
        state: CompanyFetchData.state || '',
        country: CompanyFetchData.country || '',
        R_company_address: CompanyFetchData.R_company_address || '',
        R_city: CompanyFetchData.R_city || '',
        R_pincode: CompanyFetchData.R_pincode || '',
        R_state: CompanyFetchData.R_state || '',
        R_country: CompanyFetchData.R_country || '',
        Location_Name: CompanyFetchData.Location_Name || '',
        phone_f: CompanyFetchData.phone_f || '',
        email: CompanyFetchData.email || '',
        cont_person1: CompanyFetchData.cont_person1 || '',
        mobile_1: CompanyFetchData.mobile_1 || '',
        designation1: CompanyFetchData.designation1 || '',
        cont_person2: CompanyFetchData.cont_person2 || '',
        mobile_2: CompanyFetchData.mobile_2 || '',
        designation2: CompanyFetchData.designation2 || '',
        band_name: CompanyFetchData.band_name || '',
        bank_account: CompanyFetchData.bank_account || '',
        ifsc_code: CompanyFetchData.ifsc_code || '',
        pf_code: CompanyFetchData.pf_code || '',
        pf_rate: CompanyFetchData.pf_rate || '',
        esic_no: CompanyFetchData.esic_no || '',
        min_wages: CompanyFetchData.min_wages || '',
        working_days: CompanyFetchData.working_days || '',
        weekly_off: CompanyFetchData.weekly_off || '',
        file_no: CompanyFetchData.file_no || '',
        active: CompanyFetchData.active || '',
        remarks: CompanyFetchData.remarks || '',
        company_other_detail: {
          factory_license_no: CompanyFetchData.company_other_detail.factory_license_no || '',
          renew_date: CompanyFetchData.company_other_detail.renew_date || '',
          plan_passing_no: CompanyFetchData.company_other_detail.plan_passing_no || '',
          plan_passing_date: CompanyFetchData.company_other_detail.plan_passing_date || '',
          hp: CompanyFetchData.company_other_detail.hp || '',
          shop_license_no: CompanyFetchData.company_other_detail.shop_license_no || '',
          shop_license_date: CompanyFetchData.company_other_detail.shop_license_date || '',
          contract_labour_date: CompanyFetchData.company_other_detail.contract_labour_date || '',
          contract_register_no: CompanyFetchData.company_other_detail.contract_register_no || '',
          pf_indicator: CompanyFetchData.company_other_detail.pf_indicator || '',
          esic_indicator: CompanyFetchData.company_other_detail.esic_indicator || '',
          glwf_indicator: CompanyFetchData.company_other_detail.glwf_indicator || '',
          pt_indicator: CompanyFetchData.company_other_detail.pt_indicator || '',
          edli_indicator: CompanyFetchData.company_other_detail.edli_indicator || '',
          pf_application_date: CompanyFetchData.company_other_detail.pf_application_date || '',
          esic_application_date: CompanyFetchData.company_other_detail.esic_application_date || '',
          glwf_application_no: CompanyFetchData.company_other_detail.glwf_application_no || '',
          pt_employer: CompanyFetchData.company_other_detail.pt_employer || '',
          pt_employee: CompanyFetchData.company_other_detail.pt_employee || '',
          pt_applicable_date: CompanyFetchData.company_other_detail.pt_applicable_date || '',
          company_file_detail: CompanyFetchData.company_other_detail.company_file_detail || '',
          acgr_no: CompanyFetchData.company_other_detail.acgr_no || '',
          ext_code: CompanyFetchData.company_other_detail.ext_code || '',
        },
      }));
    }
  }, [CompanyFetchData]);



  useEffect(() => {
    const handleViewCompany = async () => {
      try {
        const newFormdata = {
          company_id: companyId
        }

        const response = await axios.post(
          `${BASE_URL}/v1/com/company/view`,
          newFormdata,
          { headers: newHeader }
        );
        console.log("this is company view Detail", response.data)
        console.log(response?.data?.CompanyDetails[0])
        setCompanyFetchData(response?.data?.CompanyDetails[0])

      } catch (error) {
        if (error.message === "Token expired, please log in again") {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
        }
      }
    }


    handleViewCompany()
  }, [companyId, viewMode])


  const handleFetchCompanyNumber = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/com/next-companyno`)
      const res = await response.data
      console.log(res)
      setCompanyData((prevData) => ({
        ...prevData,
        company_no: res?.nextCompanyNo
      }))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (viewMode !== "view") {
      handleFetchCompanyNumber()
    }
  }, [viewMode])

  console.log(companyName)
  const normalbtn = `border-[4px] border-[#D4DAE1] rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color`;
  const active = "border-[4px] border-brand_b_color rounded-[20px] bg-[#F0F4F7] text-[20px] px-2 py-1 text-brand_color"
  return (
    <>
      <RootLayout>
        <DashboardLayout>
          <section className='px-[120px] my-4 pb-[150px] max-w-[1400px] font-lato'>
            <div className=' my-3'>
              {companyName &&
                <button className={active}>{companyName}</button>

              }

            </div>


            <div className='w-[100%] flex items-center justify-between'>
              <div className='gap-3 flex items-center'>
                <button onClick={() => setCompanyTwoTab(0)} className={`${CompanyTwoTab === 0 ? active : normalbtn}`}>Company Master</button>
                <button onClick={() => setCompanyTwoTab(1)} className={`${CompanyTwoTab === 1 ? active : normalbtn}`}>Company Other Details</button>
              </div>
              <div className='flex items-center gap-4'>
                <input type="file" onChange={handleFileUpload} className='hidden' ref={InputRef} />
                <button className='px-3 py-2 rounded bg-brand_colors text-white font-[500]' onClick={() => InputRef.current.click()} >Upload</button>
                <button className='px-3 py-2 rounded bg-brand_colors text-white font-[500]'>Print</button>
                {viewMode === "view" &&
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      const isConfirmed = window.confirm("Are you sure you want to delete this company? This action cannot be undone.");

                      if (!isConfirmed) {
                        return;
                      }

                      try {
                        const newForm = {
                          company_delete: companyId,
                        };
                        const response = await axios.delete(`${BASE_URL}/v1/com/company/delete`, {
                          headers: newHeader,
                          data: newForm,
                        });
                        dispatch(clearCompanyInfo());
                        console.log(response.data.message);
                        toast.success(response.data.message);
                        navigate("/");
                      } catch (error) {
                        console.log(error);
                        toast.error(error.response?.data?.message || error.message);
                        if (error.response?.data?.message === "Token expired, please log in again") {
                          localStorage.removeItem("token");
                          localStorage.removeItem("role");
                          navigate("/login");
                        }
                      }
                    }}
                    className="px-3 py-2 rounded bg-red-500 text-white font-[500]"
                  >
                    Delete
                  </button>



                }
                <button onClick={() => setAllExpand(!AllExpand)} className='px-3 py-2 rounded bg-brand_colors text-white font-[500]'>{AllExpand ? "Collapse All" : "Expand All"}</button>
              </div>
            </div>
            <div className='w-[100%]'>
              {CompanyTwoTab === 0 ?
                <CompanyMasterForm AllExpand={AllExpand} setCompanyData={setCompanyData} setCompanyTwoTab={setCompanyTwoTab} handleChange={handleChange} companyData={companyData} viewMode={viewMode} /> :
                <CompanyMasterOther AllExpand={AllExpand} CompanyTwoTab={CompanyTwoTab} companyData={companyData} handleChange={handleChange} viewMode={viewMode} />
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
                  <th className="px-4 py-2 text-left font-medium border">Company no.</th>
                  <th className="px-4 py-2 text-left font-medium border">Company Start Date</th>
                  <th className="px-4 py-2 text-left font-medium border">Created For.</th>
                  <th className="px-4 py-2 text-left font-medium border">Comapany Name</th>
                  <th className="px-4 py-2 text-left font-medium border">Company Type</th>
                  <th className="px-4 py-2 text-left font-medium border">Nature of industry</th>
                  <th className="px-4 py-2 text-left font-medium border">Pan No.</th>
                  <th className="px-4 py-2 text-left font-medium border">Company Address</th>
                  <th className="px-4 py-2 text-left font-medium border">City</th>
                  <th className="px-4 py-2 text-left font-medium border">Pin Code</th>
                  <th className="px-4 py-2 text-left font-medium border">State</th>
                  <th className="px-4 py-2 text-left font-medium border">Country</th>
                  <th className="px-4 py-2 text-left font-medium border">Resi. Address</th>
                  <th className="px-4 py-2 text-left font-medium border">City</th>
                  <th className="px-4 py-2 text-left font-medium border">Pin code</th>
                  <th className="px-4 py-2 text-left font-medium border">State</th>
                  <th className="px-4 py-2 text-left font-medium border">Country</th>
                  <th className="px-4 py-2 text-left font-medium border">Phone(O)</th>
                  <th className="px-4 py-2 text-left font-medium border">Phone(F)</th>
                  <th className="px-4 py-2 text-left font-medium border">Email</th>
                  <th className="px-4 py-2 text-left font-medium border">Cont.Person 1</th>
                  <th className="px-4 py-2 text-left font-medium border">Mobile No. 1</th>
                  <th className="px-4 py-2 text-left font-medium border">Designation 1</th>
                  <th className="px-4 py-2 text-left font-medium border">Cont.Person 2</th>
                  <th className="px-4 py-2 text-left font-medium border">Mobile No. 2</th>
                  <th className="px-4 py-2 text-left font-medium border">Designation 2</th>
                  <th className="px-4 py-2 text-left font-medium border">Bank Name</th>
                  <th className="px-4 py-2 text-left font-medium border">Bank A/C No.</th>
                  <th className="px-4 py-2 text-left font-medium border">IFSC Code</th>
                  <th className="px-4 py-2 text-left font-medium border">PF Code</th>
                  <th className="px-4 py-2 text-left font-medium border">PF Rate</th>
                  <th className="px-4 py-2 text-left font-medium border">ESIC No.</th>
                  <th className="px-4 py-2 text-left font-medium border">Minimum Wages</th>
                  <th className="px-4 py-2 text-left font-medium border">Working Days</th>
                  <th className="px-4 py-2 text-left font-medium border">Weekly OFF</th>
                  <th className="px-4 py-2 text-left font-medium border">File No.</th>
                  <th className="px-4 py-2 text-left font-medium border">Active</th>
                  <th className="px-4 py-2 text-left font-medium border">Remarks</th>
                  <th className="px-4 py-2 text-left font-medium border">Factory License No.</th>
                  <th className="px-4 py-2 text-left font-medium border">Renew Date</th>
                  <th className="px-4 py-2 text-left font-medium border">Plan Passing No.</th>
                  <th className="px-4 py-2 text-left font-medium border">Plan Passing Date</th>
                  <th className="px-4 py-2 text-left font-medium border">HP</th>
                  <th className="px-4 py-2 text-left font-medium border">Shop License No.</th>
                  <th className="px-4 py-2 text-left font-medium border">Shop License Renew Date</th>
                  <th className="px-4 py-2 text-left font-medium border">Contract Labour Act Reg. Date</th>
                  <th className="px-4 py-2 text-left font-medium border">Contract Labour Act Register No.</th>
                  <th className="px-4 py-2 text-left font-medium border">PF</th>
                  <th className="px-4 py-2 text-left font-medium border">ESIC</th>
                  <th className="px-4 py-2 text-left font-medium border">GLWF</th>
                  <th className="px-4 py-2 text-left font-medium border">PT</th>
                  <th className="px-4 py-2 text-left font-medium border">EDLI</th>
                  <th className="px-4 py-2 text-left font-medium border">PF Application Date</th>
                  <th className="px-4 py-2 text-left font-medium border">ESIC Application Date</th>
                  <th className="px-4 py-2 text-left font-medium border">GLWF No.</th>
                  <th className="px-4 py-2 text-left font-medium border">PT Employer</th>
                  <th className="px-4 py-2 text-left font-medium border">PT Employee</th>
                  <th className="px-4 py-2 text-left font-medium border">PT Applicable Date</th>
                  <th className="px-4 py-2 text-left font-medium border">Company File Detail</th>
                  <th className="px-4 py-2 text-left font-medium border">ACGR No.</th>
                  <th className="px-4 py-2 text-left font-medium border">Ext. Code</th>

                </tr>
              </thead>
              <tbody>
                {BulkCompanyExcel &&
                  BulkCompanyExcel.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border">{item?.company_no}</td>
                      <td className="px-4 py-2 border">{item?.company_start_date}</td>
                      <td className="px-4 py-2 border">{item?.created_for}</td>
                      <td className="px-4 py-2 border">{item?.company_name}</td>
                      <td className="px-4 py-2 border">{item?.company_type}</td>
                      <td className="px-4 py-2 border">{item?.nature_of_industry}</td>
                      <td className="px-4 py-2 border">{item?.pan_no}</td>
                      <td className="px-4 py-2 border">{item?.company_address}</td>
                      <td className="px-4 py-2 border">{item?.city}</td>
                      <td className="px-4 py-2 border">{item?.pincode}</td>
                      <td className="px-4 py-2 border">{item?.state}</td>
                      <td className="px-4 py-2 border">{item?.country}</td>
                      <td className="px-4 py-2 border">{item?.R_company_address}</td>
                      <td className="px-4 py-2 border">{item?.R_city}</td>
                      <td className="px-4 py-2 border">{item?.R_pincode}</td>
                      <td className="px-4 py-2 border">{item?.R_state}</td>
                      <td className="px-4 py-2 border">{item?.R_country}</td>
                      <td className="px-4 py-2 border">{item?.Location_Name}</td>
                      <td className="px-4 py-2 border">{item?.phone_f}</td>
                      <td className="px-4 py-2 border">{item?.email}</td>
                      <td className="px-4 py-2 border">{item?.cont_person1}</td>
                      <td className="px-4 py-2 border">{item?.mobile_1}</td>
                      <td className="px-4 py-2 border">{item?.designation1}</td>
                      <td className="px-4 py-2 border">{item?.cont_person2}</td>
                      <td className="px-4 py-2 border">{item?.mobile_2}</td>
                      <td className="px-4 py-2 border">{item?.designation2}</td>
                      <td className="px-4 py-2 border">{item?.band_name}</td>
                      <td className="px-4 py-2 border">{item?.bank_account}</td>
                      <td className="px-4 py-2 border">{item?.ifsc_code}</td>
                      <td className="px-4 py-2 border">{item?.pf_code}</td>
                      <td className="px-4 py-2 border">{item?.pf_rate}</td>
                      <td className="px-4 py-2 border">{item?.esic_no}</td>
                      <td className="px-4 py-2 border">{item?.min_wages}</td>
                      <td className="px-4 py-2 border">{item?.working_days}</td>
                      <td className="px-4 py-2 border">{item?.weekly_off}</td>
                      <td className="px-4 py-2 border">{item?.file_no}</td>
                      <td className="px-4 py-2 border">{item?.active}</td>
                      <td className="px-4 py-2 border">{item?.remarks}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.factory_license_no}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.renew_date}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.plan_passing_no}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.plan_passing_date}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.hp}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.shop_license_no}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.contract_labour_date}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.contract_register_no}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.contract_register_no}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.pf_indicator}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.esic_indicator}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.glwf_indicator}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.pt_indicator}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.edli_indicator}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.pf_application_date}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.esic_application_date}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.glwf_application_no}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.pt_employer}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.pt_employee}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.pt_applicable_date}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.company_file_detail}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.acgr_no}</td>
                      <td className="px-4 py-2 border">{item?.company_other_detail?.ext_code}</td>
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

export default CompanyMaster