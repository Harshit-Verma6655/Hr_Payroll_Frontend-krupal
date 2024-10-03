import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import RootLayout from '../components/RootLayout';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import UserModal from '../components/UserModal';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyInfo } from '../redux/slices/companySlice';

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyName, companyId } = useSelector((state) => state.company);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [CompanyIds,setCompanyIds]=useState()
  const [modalOpen, setModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]); 
  const users = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const BASE_URL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    if (!users) {
      toast.error("Session Expired Or Please Login");
      navigate('/login');
    }
  }, [users, navigate]);

  useEffect(()=>{
  if(companyName===""){
return
  }

  if(companyName==="ALL"){
    setSelectedCompany("ALL")
  }else{
    setSelectedCompany("")
    setCompanyIds(companyId)
  }


  },[companyName])



  // Fetch company list from API
  const handleFetchCompanyList = async () => {
    try {
      const response = await fetch(`${BASE_URL}/v1/com/com/lits`, {
        headers: {
          "Authorization": `Bearer ${users}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error(error.message);
      if (error.message === "Token expired, please log in again") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    handleFetchCompanyList();
  }, [companyName]); 

  const handleSelectedCompany = (e) => {
    const companyID= e.target.value;
    if(companyID==="company"){
      setSelectedCompany(companyID);
    dispatch(setCompanyInfo({ companyName:"", companyID:null }));

      return
    }
    if(companyID==="ALL"){
      setSelectedCompany(companyID);
      toast(
        <span>
          <b>All Data</b> is Show And Edit,
        </span>, {
          duration: 6000,
        }
      );
    dispatch(setCompanyInfo({ companyName:"ALL", companyID:null }));

      return

    }
    setCompanyIds(companyID)
    const selectedCompany = companies?.find(company => company._id === companyID);
    const companyName = selectedCompany.company_name;
    setSelectedCompany(companyName);
    dispatch(setCompanyInfo({ companyName, companyId:companyID }));
    toast(
      <span>
        <b>{companyName}</b> is selected,
        <br />
        Now all the data is saved on <b>{companyName}</b>
      </span>, {
        duration: 6000,
      }
    );
  };

  const handleAddUser = async (userData) => {
    const apiEndpoint = `${BASE_URL}/users/register`;
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${users}`, 
        },
        body: JSON.stringify(userData),
      });

      const res = await response.json();
      if (!response.ok) throw new Error(res.message);

      toast.success('User added successfully!');
      setModalOpen(false);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      if (error.message === "Token expired, please log in again") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
    }
  };

  const InformationBox = "w-[100%] border-[3px] border-[#D4DAE1] rounded p-3 mt-[2px]";
  const LabelCss = "text-[#000000] font-[500] text-[18px] text-nowrap";
  const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]";

  return (
    <RootLayout>
      <DashboardLayout>
        <div className="w-full min-w-0 h-screen bg-white overflow-y-scroll custom_scroll">
          <main className='w-[100%] px-10 mt-10'>
            <div className={InformationBox}>
              <h1 className='text-[25px] font-[500]'>Dashboard</h1>
              <br />

              <div className='w-[100%]'>
              {/* {companyName?
              <div className='w-[100%]'>
                <div className='w-[100%] flex justify-between items-center px-3 py-2 rounded bg-gray-200 border-gray-300'>
                  <p>{companyName}</p>

                  <button onClick={()=>    dispatch(setCompanyInfo({ companyName:"", companyID:null }))} className='px-2 py-1 rounded bg-red-500 text-white'>Clear</button>
                </div>
              </div>
              : */}
              <div className='w-[100%] flex flex-col gap-2'>
                  <label className={LabelCss}>Select Company</label>
                  <select className={InputCss} value={selectedCompany==="company" ||selectedCompany==="ALL"?selectedCompany:CompanyIds } onChange={handleSelectedCompany}>
                    <option value="company">Select a company</option>
                    {/* <option value="ALL">All</option> */}
                    {companies &&
                      companies?.map((company) => (
                      <option key={company?._id} value={company?._id}>
                        {company?.company_name}
                      </option>
                    ))}
                  </select>
                </div>

              {/* } */}
                
              </div>

              {role === "super_admin" && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add User
                </button>
              )}
              <button onClick={()=>navigate("/companymaster")} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Create new company</button>

            </div>
          </main>
          <br />
        </div>

        {/* User Creation Modal */}
        <UserModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddUser={handleAddUser}
        />
      </DashboardLayout>
    </RootLayout>
  );
};

export default HomeScreen;
