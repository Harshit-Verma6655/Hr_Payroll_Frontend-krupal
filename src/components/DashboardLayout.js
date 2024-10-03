import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";





const DashboardLayout = ({ children }) => {
  const [sideBarInFocus, setSideBarInFocus] = useState(false);

  useEffect(() => {
    console.log(sideBarInFocus);
  }, [sideBarInFocus]);

  return (
    <div className="flex justify-between relative max-w-full h-screen">
      {/* Sidebar */}
      <div
        onMouseOver={() => setSideBarInFocus(true)}
        onMouseOut={() => setSideBarInFocus(false)}
        className={`relative transition-all duration-300 ease-in-out ${
          sideBarInFocus ? "w-64" : "w-20"
        } h-full bg-brand_colors`}
      >
       <Sidebar sideBarInFocus={sideBarInFocus}/>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out relative overflow-y-scroll overflow-x-hidden flex-grow custom_scroll`}
        style={{ height: "100%" }}
      >
        <div className="w-full h-auto relative overflow-hidden" style={{ minHeight: "100%" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
