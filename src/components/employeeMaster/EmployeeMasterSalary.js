import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const EmployeeMasterSalary = ({ AllExpand, setEmployeeTab, handleEmployeeSalary, EmployeeSalary, setEmployeeSalary }) => {
  const [BasicSalaryDetails, setBasicSalaryDetails] = useState(true);
  const InformationBox = "w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]"
  const ReactIcon = 'text-white text-[24px] cursor-pointer'
  const LabelCss = "text-[#000000] font-[500] text-[18px] w-[auto] text-nowrap"
  const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]"

  // Function to calculate Gross_Salary based on the provided values
  const calculateGrossSalary = (updatedValues) => {
    const salaryFields = [
      'Consolidated_Salary', 'Pay_Rate', 'DA_Rate', 'Per_Hour_Calculation',
      'Pice_Rate_Calculation', 'HRA', 'Conveyance', 'Travelling_Allowance',
      'W_LA', 'Special_Allowance', 'Difference_Pay', 'Amount_Name_5',
      'Amount_Name_6', 'Amount_Name_7', 'Amount_Name_8', 'Other_Amount'
    ];

    let grossSalary = 0;

    // Scenario 1: If Pay_Rate is provided, calculate Gross_Salary as Pay_Rate * 26
    if (updatedValues.Pay_Rate) {
      grossSalary = Number(updatedValues.Pay_Rate) * 26;
    }

    // Scenario 2: If Consolidated_Salary is provided, it overrides Pay_Rate
    if (updatedValues.Consolidated_Salary) {
      grossSalary = Number(updatedValues.Consolidated_Salary);
    }

    // Calculate the sum of allowances
    const allowancesTotal = salaryFields // Exclude 'Consolidated_Salary' and 'Pay_Rate'
      .map(field => parseFloat(updatedValues[field]) || 0)
      .reduce((acc, curr) => acc + curr, 0);

    // Add the allowance total to the gross salary
    return grossSalary + allowancesTotal;
  };

  // Initialize state with calculated Gross_Salary
  const [values, setValues] = useState(() => {
    const initialValues = {
      Consolidated_Salary: "" || EmployeeSalary?.Consolidated_Salary,
      Consolidated_Pay_Rate: "" || (EmployeeSalary?.Consolidated_Salary / 26),
      Pay_Rate: "" || EmployeeSalary?.Pay_Rate,
      DA_Rate: "" || EmployeeSalary?.DA_Rate,
      Per_Hour_Calculation: "" || EmployeeSalary?.Per_Hour_Calculation,
      Pice_Rate_Calculation: "" || EmployeeSalary?.Pice_Rate_Calculation,
      HRA: "" || EmployeeSalary?.HRA,
      Conveyance: "" || EmployeeSalary?.Conveyance,
      Travelling_Allowance: "" || EmployeeSalary?.Travelling_Allowance,
      W_LA: "" || EmployeeSalary?.W_LA,
      Special_Allowance: "" || EmployeeSalary?.Special_Allowance,
      Difference_Pay: "" || EmployeeSalary?.Difference_Pay,
      Allowance_Name_5: "" || EmployeeSalary?.Allowance_Name_5,
      Amount_Name_5: "" || EmployeeSalary?.Amount_Name_5,
      Allowance_Name_6: "" || EmployeeSalary?.Allowance_Name_6,
      Amount_Name_6: "" || EmployeeSalary?.Amount_Name_6,
      Allowance_Name_7: "" || EmployeeSalary?.Allowance_Name_7,
      Amount_Name_7: "" || EmployeeSalary?.Amount_Name_7,
      Allowance_Name_8: "" || EmployeeSalary?.Allowance_Name_8,
      Amount_Name_8: "" || EmployeeSalary?.Amount_Name_8,
      Other_Name: "" || EmployeeSalary?.Other_Name,
      Other_Amount: "" || EmployeeSalary?.Other_Amount,
    };

    // Calculate Gross_Salary for the initial state
    initialValues.Gross_Salary = calculateGrossSalary(initialValues);

    return initialValues;
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };

      // If the name is 'Consolidated_Salary', update 'Consolidated_Pay_Rate'
      // If the name is 'Consolidated_Salary', update 'Consolidated_Pay_Rate'
      if (name === 'Consolidated_Salary') {
        const newConsolidatedPayRate = value ? (Number(value) / 26) : "";

        updatedValues.Consolidated_Pay_Rate = newConsolidatedPayRate;

        // Update the EmployeeSalary state as well
        setEmployeeSalary((prevData) => ({
          ...prevData,
          Consolidated_Pay_Rate: newConsolidatedPayRate
        }));
      }

      // Recalculate Gross_Salary
      updatedValues.Gross_Salary = calculateGrossSalary(updatedValues);

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
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Consolidated_Salary}
                  disabled={values.Pay_Rate > "0"}
                />
              </div>

              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}> Consolidated Pay Rate </label>
                <input className={InputCss} type='number' min="0"
                  name="Consolidated_Pay_Rate"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Consolidated_Pay_Rate}
                  disabled={values.Consolidated_Salary > "0"}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Pay Rate </label>
                <input className={InputCss} type='number' min="0"
                  name="Pay_Rate"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Pay_Rate}
                  disabled={values.Consolidated_Salary > "0"}
                />

              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>DA Rate</label>
                <input className={InputCss} type='number' min="0"
                  name="DA_Rate"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.DA_Rate}
                  disabled={Number(values.Consolidated_Salary) > 0}
                />
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Per Hour Calculation </label>
                <input className={InputCss} type='number' min="0"
                  name="Per_Hour_Calculation"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Per_Hour_Calculation}
                  disabled={values.Consolidated_Salary > "0"}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Pice Rate Calculation </label>
                <input className={InputCss} type='number' min="0"
                  name="Pice_Rate_Calculation"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
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
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.HRA}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Conveyance </label>
                <input className={InputCss} type='number' min="0"
                  name="Conveyance"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Conveyance}
                />

              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Travelling Allowance </label>
                <input className={InputCss} type='number' min="0"
                  name="Travelling_Allowance"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Travelling_Allowance}
                />
              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>W&LA</label>
                <input className={InputCss} type='number' min="0"
                  name="W_LA"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.W_LA}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={`text-[#000000] font-[500] text-[18px] w-[100%] `}>Special Allowance </label>
                <input className={InputCss} type='number' min="0"
                  name="Special_Allowance"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Special_Allowance}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Difference Of Pay</label>
                <input className={InputCss} type='number' min="0"
                  name="Difference_Pay"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Difference_Pay}
                />

              </div>
            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Allowance Name 5 </label>
                <input className={InputCss} type='text' min="0"
                  name="Allowance_Name_5"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Allowance_Name_5}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Amount Name 5 </label>
                <input className={InputCss} type='number' min="0"
                  name="Amount_Name_5"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
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
                <input className={InputCss} type='text' min="0"
                  name="Allowance_Name_6"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Allowance_Name_6}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Amount Name 6 </label>
                <input className={InputCss} type='number' min="0"
                  name="Amount_Name_6"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Amount_Name_6}
                />
              </div>
              <div className='w-[100%]' />

            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Allowance Name 7 </label>
                <input className={InputCss} type='text' min="0"
                  name="Allowance_Name_7"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Allowance_Name_7}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Amount Name 7 </label>
                <input className={InputCss} type='number' min="0"
                  name="Amount_Name_7"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Amount_Name_7}
                />
              </div>
              <div className='w-[100%]' />

            </div>
            <div className='w-[100%] flex gap-[40px] items-center mt-3'>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Allowance Name 8 </label>
                <input className={InputCss} type='text' min="0"
                  name="Allowance_Name_8"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Allowance_Name_8}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Amount Name 8 </label>
                <input className={InputCss} type='number' min="0"
                  name="Amount_Name_8"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
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
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Other_Name}
                />
              </div>
              <div className='flex flex-col gap-1 w-[100%]'>
                <label className={LabelCss}>Other Amount</label>
                <input className={InputCss} type='number' min="0"
                  name="Other_Amount"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
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
                <input className={InputCss}
                  type='number'
                  min="0"
                  name="Gross_Salary"
                  onChange={(e) => {
                    handleChange(e);
                    handleEmployeeSalary(e);
                  }}
                  value={values.Gross_Salary} // Use values.Gross_Salary to show the calculated total
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