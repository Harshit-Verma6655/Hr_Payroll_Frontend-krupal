import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";

const EmployeeMasterDetailsFam = ({ AllExpand, notSave, SonsDetails, DaughterData, setSonsDetails, setDaughterData, handleEmployeeFamily, EmployeeFamDetails, handleSubmitEmployee, setEmployeeFamDetails, handleUpdateEmployee, viewmode }) => {
  const [ParentInformation, setParentInformation] = useState(true)
  const [SpouseInformation, setSpouseInformation] = useState(false)
  const [ChildInformation, setChildInformation] = useState(false)

  console.log("this is SonsDetails ", SonsDetails)

  const handleAddMoreSons = () => {
    const newId = SonsDetails.length > 0 ? SonsDetails[SonsDetails.length - 1].id + 1 : 1;
    const newSon = { Son_Name: "", Son_Birthdate: "", Son_Address: "", Son_Aadhar_No: "", id: newId };

    setSonsDetails((prevData) => {
      const updatedSons = [...prevData, newSon];
      setEmployeeFamDetails((prev) => ({ ...prev, SonsDetails: updatedSons }));
      return updatedSons;
    });
  };

  const handleRemoveSons = (ids) => {
    setSonsDetails((prevData) => {
      const updatedData = [...prevData]
      const filterData = updatedData.filter((item) => item.id !== ids)
      return filterData
    })
  }


  // -----------------------------------------------------------------------------------------------------------------

  const handleAddMoreDaughter = () => {
    const newId = DaughterData.length > 0 ? DaughterData[DaughterData.length - 1].id + 1 : 1;
    const newDaughter = { Daughter_Name: "", Daughter_Birthdate: "", Daughter_Address: "", Daughter_Aadhar_No: "", id: newId };

    setDaughterData((prev) => {
      const updatedDaughters = [...prev, newDaughter];
      setEmployeeFamDetails((prev) => ({ ...prev, DaughterDetails: updatedDaughters })); // Update EmployeeFamDetails
      return updatedDaughters;
    });
  };


  const handleRemoveDaughterData = (ids) => {
    setDaughterData((prevData) => {
      const updated = [...prevData]
      const filterData = updated.filter((item) => item.id !== ids)
      return filterData
    })
  }

  const InformationBox = "w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]"
  const ReactIcon = 'text-white text-[24px] cursor-pointer'
  const LabelCss = "text-[#000000] font-[500] text-[18px] w-[auto] text-nowrap"
  const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]"
  useEffect(() => {
    if (AllExpand === true) {
      setParentInformation(true)
      setSpouseInformation(true)
      setChildInformation(true)
    } else {
      setParentInformation(true)
      setSpouseInformation(false)
      setChildInformation(false)
    }
  }, [AllExpand])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleSonChange = (index, field, value) => {
    const updatedSons = SonsDetails.map((son, i) =>
      i === index ? { ...son, [field]: value } : son
    );
    setSonsDetails(updatedSons);

    setEmployeeFamDetails((prev) => ({ ...prev, SonsDetails: updatedSons })); // Update EmployeeFamDetails
  };

  const handleDaughterChange = (index, field, value) => {
    const updatedDaughters = DaughterData.map((daughter, i) =>
      i === index ? { ...daughter, [field]: value } : daughter
    );
    setDaughterData(updatedDaughters);

    setEmployeeFamDetails((prev) => ({ ...prev, DaughterDetails: updatedDaughters })); // Update EmployeeFamDetails
  };
  return (
    <section className='py-3'>
      {/* <h1 className='text-brand_color font-[600] text-[32px]'>Employee Fam. Details</h1>
    <br></br> */}
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>1. Parent Information</h2>
          {ParentInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setParentInformation(!ParentInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setParentInformation(!ParentInformation)} />
          }
        </div>
        {ParentInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex gap-[40px] items-center'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Father’s Name </label>
                <input className={InputCss} type='text'
                  name="Father_Name"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Father_Name}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Father’s Address </label>
                <input className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`} type='text'
                  name="Father_Address"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Father_Address}
                />

              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Father’s Birthdate </label>
                <input className={InputCss} type='date'
                  name="Father_Birthdate"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Father_Birthdate}
                />
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>

              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={`text-[#000000] font-[500] text-[18px] w-[auto]`}>Father’s Aadhar No </label>
                <input className={`border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]`} type='text'
                  name="Father_Aadhar_No"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Father_Aadhar_No}
                />
              </div>
              <div className='w-[100%]' />
              <div className='w-[100%]' />

            </div>
          </div>

        }
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>2. Spouse Information</h2>
          {SpouseInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setSpouseInformation(!SpouseInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setSpouseInformation(!SpouseInformation)} />
          }
        </div>
        {SpouseInformation &&
          <div className={InformationBox}>
            <div className='w-[100%] flex gap-[40px] items-center'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Husband’s Name </label>
                <input className={InputCss} type='text'
                  name="Husband_Name"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Husband_Name}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Husband’s Birthdate </label>
                <input className={InputCss} type='date'
                  name="Husband_Birthdate"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Husband_Birthdate}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Husband’s Address </label>
                <input className={InputCss} type='text'
                  name="Husband_Address"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Husband_Address}
                />
              </div>

            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3 mb-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Husband’s Aadhar No. </label>
                <input className={InputCss} type='number' min="0"
                  name="Husband_Aadhar_No"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Husband_Aadhar_No}
                />
              </div>
              <div className='w-[100%]' />
              <div className='w-[100%]' />

            </div>
            <hr />
            <div className='w-[100%] flex gap-[40px] items-center mt-2'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Wife’s Name </label>
                <input className={InputCss} type='text'
                  name="Wife_Name"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Wife_Name}
                />

              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Wife’s Birthdate </label>
                <input className={InputCss} type='date'
                  name="Wife_Birthdate"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Wife_Birthdate}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Wife’s Address </label>
                <input className={InputCss} type='text'
                  name="Wife_Address"
                  onChange={handleEmployeeFamily}
                  value={EmployeeFamDetails?.Wife_Address}
                />
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>

              <div className='w-[100%] flex gap-[40px] items-center'>
                <div className='flex flex-col gap-1 w-[100%]'>
                  <label className={LabelCss}>Wife’s Aadhar No. </label>
                  <input className={InputCss} type='text'
                    name="Wife_Aadhar_No"
                    onChange={handleEmployeeFamily}
                    value={EmployeeFamDetails?.Wife_Aadhar_No}
                  />
                </div>
                <div className='w-[100%]' />
                <div className='w-[100%]' />

              </div>
            </div>

          </div>

        }
        <br />
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>3. Child Information</h2>
          {ChildInformation ?
            <FiChevronUp className={ReactIcon} onClick={() => setChildInformation(!ChildInformation)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setChildInformation(!ChildInformation)} />
          }
        </div>
        {ChildInformation &&
          <div className={InformationBox}>
            {SonsDetails?.map((item, index) => (
              <>
                <div className="w-[100%] flex gap-[50px] items-center" key={index}>
                  <div className="flex flex-col gap-1 w-[100%]">
                    <label className={LabelCss}>Son’s Name</label>
                    <input
                      className={InputCss}
                      type="text"
                      value={item.Son_Name}
                      onChange={(e) => handleSonChange(index, "Son_Name", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-[100%]">
                    <label className={LabelCss}>Son’s Birthdate</label>
                    <input
                      className={InputCss}
                      type="date"
                      value={item.Son_Birthdate}
                      onChange={(e) => handleSonChange(index, "Son_Birthdate", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-[100%]">
                    <label className={LabelCss}>Son’s Address</label>
                    <input
                      className={InputCss}
                      type="text"
                      value={item.Son_Address}
                      onChange={(e) => handleSonChange(index, "Son_Address", e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[100%] flex gap-[40px] items-center mt-3 mb-3" key={index}>
                  <div className="flex flex-col gap-1 w-[100%]">
                    <label className={LabelCss}>Son’s Aadhar No.</label>
                    <input
                      className={InputCss}
                      type="text"
                      value={item.Son_Aadhar_No}
                      onChange={(e) => handleSonChange(index, "Son_Aadhar_No", e.target.value)}
                    />
                  </div>

                  {SonsDetails.length === index + 1 ? (
                    <div className="w-[100%] mt-7">
                      <button
                        className="px-3 py-1 text-white rounded bg-brand_colors"
                        onClick={() => handleAddMoreSons(index)}
                      >
                        Add More
                      </button>
                    </div>
                  ) : (
                    <div className="w-[100%]">
                      <button
                        className="bg-red-500 text-white font-[500] px-3 py-1 rounded mt-8"
                        onClick={() => handleRemoveSons(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <div className="flex flex-col gap-1 w-[100%]"></div>
                </div>
              </>
            ))}


            <br />
            <hr />
            <br />


            {DaughterData?.map((item, index) => (
              <>
                <div className="w-[100%] flex gap-[40px] items-center mt-2" key={index}>
                  <div className="flex flex-col gap-1 w-[100%]">
                    <label className={LabelCss}>Daughter’s Name</label>
                    <input
                      className={InputCss}
                      type="text"
                      value={item.Daughter_Name}
                      onChange={(e) => handleDaughterChange(index, "Daughter_Name", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-[100%]">
                    <label className={LabelCss}>Daughter’s Birthdate</label>
                    <input
                      className={InputCss}
                      type="date"
                      value={item.Daughter_Birthdate}
                      onChange={(e) => handleDaughterChange(index, "Daughter_Birthdate", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-[100%]">
                    <label className={LabelCss}>Daughter’s Address</label>
                    <input
                      className={InputCss}
                      type="text"
                      value={item.Daughter_Address}
                      onChange={(e) => handleDaughterChange(index, "Daughter_Address", e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[100%] flex gap-[40px] items-center mt-3">
                  <div className="flex flex-col gap-1 w-[100%]">
                    <label className={LabelCss}>Daughter’s Aadhar No.</label>
                    <input
                      className={InputCss}
                      type="number" min="0"
                      value={item.Daughter_Aadhar_No}
                      onChange={(e) => handleDaughterChange(index, "Daughter_Aadhar_No", e.target.value)}
                    />
                  </div>
                  {DaughterData?.length === index + 1 ? (
                    <div className="w-[100%] mt-7">
                      <button
                        className="px-3 py-1 text-white rounded bg-brand_colors"
                        onClick={handleAddMoreDaughter}
                      >
                        Add More
                      </button>
                    </div>
                  ) : (
                    <div className="w-[100%]">
                      <button
                        className="bg-red-500 text-white font-[500] px-3 py-1 rounded mt-8"
                        onClick={() => handleRemoveDaughterData(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <div className="flex flex-col gap-1 w-[100%]"></div>

                </div>
              </>
            ))}


          </div>

        }
        {notSave !== "normalVisit" &&
          <div className='w-[100%] flex justify-end mt-5'>
            <div className='flex items-center gap-2'>
              <button className='px-3 py-2 text-brand_color border-[1px] rounded border-brand_b_color'>Cancel</button>
              <button className='px-3 py-2 bg-brand_colors text-white rounded border-none' onClick={viewmode === "view" ? handleUpdateEmployee : handleSubmitEmployee}>Save</button>

            </div>
          </div>
        }

      </form>
    </section>
  )
}

export default EmployeeMasterDetailsFam