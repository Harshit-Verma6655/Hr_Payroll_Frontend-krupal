import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const EmployeeMasterSalary = ({ AllExpand, setEmployeeTab, handleEmployeeSalary, EmployeeSalary }) => {
  const [BasicSalaryDetails, setBasicSalaryDetails] = useState(true)
  //   const [Allowances, setAllowances] = useState(false)
  //   const [TotalEarnings, setTotalEarnings] = useState(false)
  const InformationBox = "w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]"
  const ReactIcon = 'text-white text-[24px] cursor-pointer'
  const LabelCss = "text-[#000000] font-[500] text-[18px] w-[auto] text-nowrap"
  const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]"
  //   useEffect(() => {
  //     if (AllExpand === true) {
  //       setBasicSalaryDetails(true)
  //     } else {
  //       setBasicSalaryDetails(true)
  //     }
  //   }, [AllExpand])

  const [values, setValues] = useState({
    Consolidated_Salary: "",
    Consolidated_Pay_Rate: "",
    Pay_Rate: "",
    DA_Rate: "",
    Per_Hour_Calculation: "",
    Pice_Rate_Calculation: "",
    HRA: "",
    Conveyance: "",
    Travelling_Allowance: "",
    W_LA: "",
    Special_Allowance: "",
    Difference_Pay: "",
    Allowance_Name_5: "",
    Amount_Name_5: "",
    Allowance_Name_6: "",
    Amount_Name_6: "",
    Allowance_Name_7: "",
    Amount_Name_7: "",
    Allowance_Name_8: "",
    Amount_Name_8: "",
    Other_Name: "",
    Other_Amount: ""
  });
  const [total, setTotal] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };

      // Define the fields that should be part of the total calculation (numeric fields only)
      const allowanceFields = [
        'DA_Rate', 'Per_Hour_Calculation', 'Pice_Rate_Calculation', 'HRA',
        'Conveyance', 'Travelling_Allowance', 'W_LA', 'Special_Allowance',
        'Difference_Pay', 'Amount_Name_5', 'Amount_Name_6',
        'Amount_Name_7', 'Amount_Name_8', 'Other_Amount'
      ];

      let newTotal = 0;

      // Scenario 1: If Pay_Rate is provided, calculate Gross_Salary as Pay_Rate * 26
      if (updatedValues.Pay_Rate) {
        newTotal = Number(updatedValues.Pay_Rate) * 26;
      }

      // Scenario 2: If Consolidated_Salary is provided, it overrides Pay_Rate
      if (updatedValues.Consolidated_Salary) {
        newTotal = Number(updatedValues.Consolidated_Salary);
      }
      // Scenario 3: If Consolidated_Pay_Rate is provided, calculate Gross_Salary as pay rate / 26
      if (name === 'Consolidated_Salary') {
        updatedValues.Consolidated_Pay_Rate = value ? (Number(value) / 26).toFixed(2) : ""; // Update the pay rate accordingly
      }
      // Add allowances to the Gross_Salary
      const allowancesTotal = allowanceFields
        .map(field => updatedValues[field] || 0) // Default to 0 if the field is empty
        .reduce((acc, curr) => acc + Number(curr), 0);

      // Final Gross_Salary calculation with allowances
      newTotal += allowancesTotal;

      // Update the total state (Gross_Salary)
      setTotal(newTotal || ""); // Avoid displaying 0 when all fields are empty

      return updatedValues;
    });
  };

  return (
    <section className='py-3'>
      <br></br>
      <form>
        <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
          <h2 className='text-[26px] cursor-pointer'>1. Basic Salary Details</h2>
          {BasicSalaryDetails ?
            <FiChevronUp className={ReactIcon} onClick={() => setBasicSalaryDetails(!BasicSalaryDetails)} />
            : <FiChevronDown className={ReactIcon} onClick={() => setBasicSalaryDetails(!BasicSalaryDetails)} />
          }
        </div>
        {BasicSalaryDetails &&
          <div className={InformationBox}>
            <div className='w-[100%] flex gap-[40px] items-center'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Consolidated Salary </label>
                <input className={InputCss} type='number' min="0"
                  name="Consolidated_Salary"
                  onChange={handleChange}
                  value={values.Consolidated_Salary}
                  disabled={values.Pay_Rate > "0"}
                />
              </div>

              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}> Consolidated Pay Rate </label>
                <input className={InputCss} type='number' min="0"
                  name="Consolidated_Pay_Rate"
                  onChange={handleChange}
                  value={values.Consolidated_Pay_Rate}
                  disabled={values.Consolidated_Salary > "0"}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Pay Rate </label>
                <input className={InputCss} type='number' min="0"
                  name="Pay_Rate"
                  onChange={handleChange}
                  value={values.Pay_Rate}
                  disabled={values.Consolidated_Salary > "0"}
                />

              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>DA Rate </label>
                <input className={InputCss} type='number' min="0"
                  name="DA_Rate"
                  onChange={handleChange}
                  value={values.DA_Rate}
                  disabled={values.Consolidated_Salary > "0"}
                />
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Per Hour Calculation </label>
                <input className={InputCss} type='number' min="0"
                  name="Per_Hour_Calculation"
                  onChange={handleChange}
                  value={values.Per_Hour_Calculation}
                  disabled={values.Consolidated_Salary > "0"}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Pice Rate Calculation </label>
                <input className={InputCss} type='number' min="0"
                  name="Pice_Rate_Calculation"
                  onChange={handleChange}
                  value={values.Pice_Rate_Calculation}
                  disabled={values.Consolidated_Salary > "0"}
                />
              </div>
              <div className='w-[100%]' />
            </div>
            {/* Allowances */}
            <h2 className="text-[20px] cursor-pointer mt-10 mb-5 font-bold"> 2.  Allowances</h2>
            <div className='w-[100%] flex gap-[40px] items-center'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>HRA </label>
                <input className={InputCss} type='number' min="0"
                  name="HRA"
                  onChange={handleChange}
                  value={values.HRA}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Conveyance </label>
                <input className={InputCss} type='number' min="0"
                  name="Conveyance"
                  onChange={handleChange}
                  value={values.Conveyance}
                />

              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Travelling Allowance </label>
                <input className={InputCss} type='number' min="0"
                  name="Travelling_Allowance"
                  onChange={handleChange}
                  value={values.Travelling_Allowance}
                />
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>W&LA</label>
                <input className={InputCss} type='number' min="0"
                  name="W_LA"
                  onChange={handleChange}
                  value={values.W_LA}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={`text-[#000000] font-[500] text-[18px] w-[100%] `}>Special Allowance </label>
                <input className={InputCss} type='number' min="0"
                  name="Special_Allowance"
                  onChange={handleChange}
                  value={values.Special_Allowance}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Difference Of Pay</label>
                <input className={InputCss} type='number' min="0"
                  name="Difference_Pay"
                  onChange={handleChange}
                  value={values.Difference_Pay}
                />

              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Allowance Name 5 </label>
                <input className={InputCss} type='number' min="0"
                  name="Allowance_Name_5"
                  onChange={handleChange}
                  value={values.Allowance_Name_5}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Amount Name 5 </label>
                <input className={InputCss} type='number' min="0"
                  name="Amount_Name_5"
                  onChange={handleChange}
                  value={values.Amount_Name_5}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Handicapped Allowance </label>
                <div className='w-[100%] flex items-center gap-3'>
                  <div className='flex items-center gap-3'>
                    <input type='radio' className='w-[25px] h-[25px]' name="Handicapped_Allowance"
                      onChange={handleEmployeeSalary}
                      value={"yes"}
                      checked={EmployeeSalary?.Handicapped_Allowance === "yes"}
                    ></input>
                    <label className={LabelCss}>Yes</label>

                  </div>
                  <div className='flex items-center gap-3'>
                    <input type='radio' className='w-[25px] h-[25px]' name="Handicapped_Allowance"
                      onChange={handleEmployeeSalary}
                      value={"no"}
                      checked={EmployeeSalary?.Handicapped_Allowance === "no"}></input>
                    <label className={LabelCss}>No</label>

                  </div>
                </div>
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Allowance Name 6 </label>
                <input className={InputCss} type='number' min="0"
                  name="Allowance_Name_6"
                  onChange={handleChange}
                  value={values.Allowance_Name_6}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Amount Name 6 </label>
                <input className={InputCss} type='number' min="0"
                  name="Amount_Name_6"
                  onChange={handleChange}
                  value={values.Amount_Name_6}
                />
              </div>
              <div className='w-[100%]' />

            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Allowance Name 7 </label>
                <input className={InputCss} type='number' min="0"
                  name="Allowance_Name_7"
                  onChange={handleChange}
                  value={values.Allowance_Name_7}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Amount Name 7 </label>
                <input className={InputCss} type='number' min="0"
                  name="Amount_Name_7"
                  onChange={handleChange}
                  value={values.Amount_Name_7}
                />
              </div>
              <div className='w-[100%]' />

            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Allowance Name 8 </label>
                <input className={InputCss} type='number' min="0"
                  name="Allowance_Name_8"
                  onChange={handleChange}
                  value={values.Allowance_Name_8}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Amount Name 8 </label>
                <input className={InputCss} type='number' min="0"
                  name="Amount_Name_8"
                  onChange={handleChange}
                  value={values.Amount_Name_8}
                />
              </div>
              <div className='w-[100%]' />

            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Other Name</label>
                <input className={InputCss} type='number' min="0"
                  name="Other_Name"
                  onChange={handleChange}
                  value={values.Other_Name}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Other Amount</label>
                <input className={InputCss} type='number' min="0"
                  name="Other_Amount"
                  onChange={handleChange}
                  value={values.Other_Amount}
                />
              </div>
              <div className='w-[100%]' />

            </div>
            {/* Total Earnings */}
            <h2 className="text-[20px] cursor-pointer mt-10 mb-5 font-bold"> 3.  Total Earnings</h2>
            <div className='w-[100%] flex gap-[50px] items-center'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Gross Salary </label>
                <input className={InputCss} type='number' min="0"
                  name="Gross_Salary"
                  onChange={handleChange}
                  //   value={EmployeeSalary?.Gross_Salary}
                  value={total}
                  readOnly
                />
              </div>
              <div className='w-[100%]' />
              <div className='w-[100%]' />
            </div>
          </div>
        }
        <br />
        <div className='w-[100%] flex justify-end mt-5'>
          <div className='flex items-center gap-2'>
            {/* <button className='px-3 py-2 text-brand_color border-[1px] rounded border-brand_b_color'>Cancel</button> */}
            <button onClick={(e) => {
              e.preventDefault()
              setEmployeeTab(2)
            }} className='px-3 py-2 bg-brand_colors text-white rounded border-none'>Next</button>

          </div>
        </div>
      </form>
    </section>
  )
}

export default EmployeeMasterSalary;