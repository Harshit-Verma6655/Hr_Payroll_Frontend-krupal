import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RxListBullet } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { AiFillCalculator } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Sidebar = ({sideBarInFocus}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { companyName, companyId } = useSelector((state) => state.company);
  const navigate = useNavigate()




  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  


  useEffect(()=>{
 if(sideBarInFocus===false){
  setIsDropdownOpen(false)
 }
  },[sideBarInFocus])
  return (
    <div className="w-20 h-full group hover:w-72 transition-all duration-300 flex flex-col gap-24 p-6 bg-brand_colors text-white">
      <div className="w-full flex flex-col justify-center items-start gap-4">
      <Link to={"/"}>
      <div className="w-full flex items-center gap-3 group-hover:pl-3 transition-all duration-300">
          <RxDashboard className="text-white text-[25px]" />
          <p className="hidden group-hover:block text-white text-sm font-medium transition-all duration-300">
            Dashboard
          </p>
        </div>
      </Link>
        <div className="w-full">
          <div
            className="w-full flex items-center gap-3 group-hover:pl-3 transition-all duration-300 cursor-pointer"
            onClick={toggleDropdown}
          >
            <RxListBullet className="text-white text-[25px]" />
            <p className="hidden group-hover:block text-white text-sm font-medium transition-all duration-300">
              Master List
            </p>
            {isDropdownOpen ? (
              <FiChevronUp className="text-white hidden group-hover:block" />
            ) : (
              <FiChevronDown className="text-white hidden group-hover:block" />
            )}
          </div>
          {isDropdownOpen && (
            <div className="pl-6 mt-2 flex flex-col gap-3">
              <p onClick={()=>{
                if(companyName==="ALL" || companyName===""){
                  navigate("/companymaster")
                }else{
                  navigate({
      pathname: "/companymaster",
      search: `?companyid=${companyId}&viewmode=view`,
    });
                }
                
              }} className="text-white text-sm font-medium hover:text-gray-300 cursor-pointer">
              Company Master
              </p>
          
           <p onClick={()=>{
            if(companyName==="ALL" || companyName===""){
              navigate("/employeemaster" ,{state:"normalVisit"})
            }else{
              navigate("/employee/table")
            }
                
              }}
            className="text-white text-sm font-medium hover:text-gray-300 cursor-pointer">
              Employee Master
              </p> 
           
          
              <p onClick={()=>{
                 if(companyName==="ALL" || companyName===""){
              navigate("/branchmaster",{state:"normalVisit"})
            }else{
              navigate("/branch/table")
            }
                
              }} className="text-white text-sm font-medium hover:text-gray-300 cursor-pointer">
              Branch Master
              </p>
             
          

              <p onClick={()=>{
                  if(companyName==="ALL" || companyName===""){
              navigate("/contractormaster",{state:"normalVisit"})
            }else{
              navigate("/contractor/table")
            }
              
              }} className="text-white text-sm font-medium hover:text-gray-300 cursor-pointer">
              contractor Master
              </p>
         

              <p onClick={()=>{
                if(companyName==="ALL" || companyName===""){
              navigate("/locationsitemaster",{state:"normalVisit"})
            }else{
              navigate("/location/table")
            }
                
              }}
               className="text-white text-sm font-medium hover:text-gray-300 cursor-pointer">
              Location and Site Master
              </p>
            
            </div>
          )}
        </div>
        <Link to={""}>
      <div className="w-full flex items-center gap-3 group-hover:pl-3 transition-all duration-300">
          <AiFillCalculator className="text-white text-[25px]" />
          <p className="hidden group-hover:block text-white text-sm font-medium transition-all duration-300">
            Calculations
          </p>
        </div>
      </Link>
      <Link to={""}>
      <div className="w-full flex items-center gap-3 group-hover:pl-3 transition-all duration-300">
          <TbReport className="text-white text-[25px]" />
          <p className="hidden group-hover:block text-white text-sm font-medium transition-all duration-300">
            Reports
          </p>
        </div>
      </Link>
      </div>
    </div>
  );
};

export default Sidebar;