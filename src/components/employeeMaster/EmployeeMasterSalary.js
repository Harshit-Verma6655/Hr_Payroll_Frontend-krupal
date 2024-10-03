import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { TbRuler3 } from 'react-icons/tb';

const EmployeeMasterSalary = ({AllExpand,setEmployeeTab,handleEmployeeSalary,EmployeeSalary}) => {
  const [BasicSalaryDetails,setBasicSalaryDetails]=useState(true)
  const [Allowances,setAllowances]=useState(false)
  const [SpecialConditionsAllowances,setSpecialConditionsAllowances]=useState(false)
  const [ExtraAllowances,setExtraAllowances]=useState(false)
  const [OtherEarnings,setOtherEarnings]=useState(false)
  const [TotalEarnings,setTotalEarnings]=useState(false)
  const InformationBox="w-[100%] border-[4px] border-[#D4DAE1] rounded p-3 mt-[2px]"
  const ReactIcon = 'text-white text-[24px] cursor-pointer'
  const LabelCss = "text-[#000000] font-[500] text-[18px] w-[auto] text-nowrap"
  const InputCss = "border-[#000000] border-[1px] outline-none rounded-[8px] py-1 px-2 w-[100%]"
  useEffect(()=>{
    if(AllExpand===true){
      setBasicSalaryDetails(true)
      setAllowances(true)
      setSpecialConditionsAllowances(true)
      setExtraAllowances(true)
      setOtherEarnings(true)
      setTotalEarnings(true)
    }else{
      setBasicSalaryDetails(true)
      setAllowances(false)
      setSpecialConditionsAllowances(false)
      setExtraAllowances(false)
      setOtherEarnings(false)
      setTotalEarnings(false)
    }
      },[AllExpand])
  return (
    <section className='py-3'>
    {/* <h1 className='text-brand_color font-[600] text-[32px]'>Employee Salary</h1>
    <br></br> */}
    <br></br>
    <form>
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>1. Basic Salary Details</h2>
    {BasicSalaryDetails?
        <FiChevronUp className={ReactIcon} onClick={()=>setBasicSalaryDetails(!BasicSalaryDetails)}/>
        :<FiChevronDown className={ReactIcon} onClick={()=>setBasicSalaryDetails(!BasicSalaryDetails)}/>
    }
  </div>
  {BasicSalaryDetails &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Consolidated Salary </label>
        <input className={InputCss} type='text' 
        name="Consolidated_Salary"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Consolidated_Salary}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Pay Rate </label>
        <input className={InputCss} type='text' 
            name="Pay_Rate"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Pay_Rate}
        />

        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>DA Rate </label>
        <input className={InputCss} type='text' 
           name="DA_Rate"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.DA_Rate}
        />
        </div>
     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Per Hour Calculation </label>
        <input className={InputCss} type='text' 
            name="Per_Hour_Calculation"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Per_Hour_Calculation}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Pice Rate Calculation </label>
        <input className={InputCss} type='text' 
            name="Pice_Rate_Calculation"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Pice_Rate_Calculation}
        />
        </div>
        <div className='w-[100%]' />
     </div>
     {/* <br/>
     <div className='w-[100%] flex gap-[40px] items-center'>
 
       
     </div> */}
    </div>

  }
  <br/>
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>2.  Allowances</h2>
    {Allowances?
        <FiChevronUp className={ReactIcon} onClick={()=>setAllowances(!Allowances)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setAllowances(!Allowances)}/>
    }
  </div>
  {Allowances &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>HRA </label>
        <input className={InputCss} type='text' 
          name="HRA"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.HRA}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Conveyance </label>
        <input className={InputCss} type='text' 
             name="Conveyance"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Conveyance}
        />

        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Travelling Allowance </label>
        <input className={InputCss} type='text' 
             name="Travelling_Allowance"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Travelling_Allowance}
        />
        </div>
     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>W&LA</label>
        <input className={InputCss} type='text' 
              name="W_LA"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.W_LA}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={`text-[#000000] font-[500] text-[18px] w-[100%] `}>Special Allowance </label>
        <input className={InputCss} type='text' 
            name="Special_Allowance"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Special_Allowance}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Difference Of Pay</label>
        <input className={InputCss} type='text' 
             name="Difference_Pay"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Difference_Pay}
        />

        </div>
     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Allowance Name 5 </label>
        <input className={InputCss} type='text' 
            name="Allowance_Name_5"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Allowance_Name_5}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Amount Name 5 </label>
        <input className={InputCss} type='text' 
           name="Amount_Name_5"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Amount_Name_5}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Handicapped Allowance </label>
        <div className='w-[100%] flex items-center gap-3'>
          <div className='flex items-center gap-3'>
          <input type='radio' className='w-[25px] h-[25px]'   name="Handicapped_Allowance"
          onChange={handleEmployeeSalary}
          value={"yes"}
          checked={EmployeeSalary?.Handicapped_Allowance==="yes"}
          ></input>
        <label className={LabelCss}>Yes</label>

          </div>
          <div className='flex items-center gap-3'>
          <input type='radio' className='w-[25px] h-[25px]' name="Handicapped_Allowance"
          onChange={handleEmployeeSalary}
          value={"no"}
          checked={EmployeeSalary?.Handicapped_Allowance==="no"}></input>
        <label className={LabelCss}>No</label>

          </div>
        </div>
        </div>
     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Allowance Name 6 </label>
        <input className={InputCss} type='text' 
            name="Allowance_Name_6"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Allowance_Name_6}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Amount Name 6 </label>
        <input className={InputCss} type='text' 
            name="Amount_Name_6"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Amount_Name_6}
        />
        </div>
        <div className='w-[100%]'/>

     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Allowance Name 7 </label>
        <input className={InputCss} type='text' 
              name="Allowance_Name_7"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Allowance_Name_7}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Amount Name 7 </label>
        <input className={InputCss} type='text' 
            name="Amount_Name_7"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Amount_Name_7}
        />
        </div>
        <div className='w-[100%]'/>

     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Allowance Name 8 </label>
        <input className={InputCss} type='text' 
            name="Allowance_Name_8"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Allowance_Name_8}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Amount Name 8 </label>
        <input className={InputCss} type='text' 
           name="Amount_Name_8"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Amount_Name_8}
        />
        </div>
        <div className='w-[100%]'/>

     </div>
     <div className='w-[100%] flex gap-[40px] items-center mt-3'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Other Name</label>
        <input className={InputCss} type='text' 
            name="Other_Name"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Other_Name}
        />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Other Amount</label>
        <input className={InputCss} type='text' 
           name="Other_Amount"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Other_Amount}
        />
        </div>
        <div className='w-[100%]'/>

     </div>
    </div>

  }
  <br/>
  {/* <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>3. Special Conditions Allowances</h2>
    {SpecialConditionsAllowances?
        <FiChevronUp className={ReactIcon} onClick={()=>setSpecialConditionsAllowances(!SpecialConditionsAllowances)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setSpecialConditionsAllowances(!SpecialConditionsAllowances)}/>
    }
  </div>
  {SpecialConditionsAllowances &&
    <div className={InformationBox}>
     <div className='w-[40%] flex gap-[50px] items-center'>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Handicapped Allowance :</label>
        <input className={InputCss} type='text' />
        </div>
 
     </div>
     <br/>
    </div>

  } */}

  {/* <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>4. Extra Allowances</h2>
    {ExtraAllowances?
        <FiChevronUp className={ReactIcon} onClick={()=>setExtraAllowances(!ExtraAllowances)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setExtraAllowances(!ExtraAllowances)}/>
    }
  </div>
  {ExtraAllowances &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[50px] items-center'>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Extra 5 Allowance</label>
        <input className={InputCss} type='text' />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Extra 5 Amount</label>
        <input className={InputCss} type='text' />

        </div>
     </div>
   
     <div className='w-[100%] flex gap-[40px] items-center px-5'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Extra 6 Allowance</label>
        <input className={InputCss} type='text' />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Extra 6 Amount</label>
        <input className={InputCss} type='text' />
        </div>
     </div>
     <br/>
     <div className='w-[100%] flex gap-[40px] items-center px-5'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Extra 7 Allowance</label>
        <input className={InputCss} type='text' />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Extra 7 Amount</label>
        <input className={InputCss} type='text' />
        </div>
     </div>
     <br/>
     <div className='w-[100%] flex gap-[40px] items-center px-5'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Extra 8 Allowance</label>
        <input className={InputCss} type='text' />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Extra 8 Amount</label>
        <input className={InputCss} type='text' />
        </div>
     </div>
    </div>

  } */}
  
  {/* <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>3. Other Earnings</h2>
    {OtherEarnings?
        <FiChevronUp className={ReactIcon} onClick={()=>setOtherEarnings(!OtherEarnings)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setOtherEarnings(!OtherEarnings)}/>
    }
  </div>
  {OtherEarnings &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[40px] items-center'>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Other Name</label>
        <input className={InputCss} type='text' />
        </div>
        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Other Amount</label>
        <input className={InputCss} type='text' />
        </div>

        <div className='w-[100%]'/>

        <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Bank A/C  No.</label>
        <input className={InputCss} type='text' />

        </div>
     </div>
    </div>

  } */}
 
  <div className='w-[100%] text-white bg-brand_colors py-2 px-3 rounded flex gap-3 items-center'>
    <h2 className='text-[26px] cursor-pointer'>3. Total Earnings</h2>
    {TotalEarnings?
        <FiChevronUp className={ReactIcon} onClick={()=>setTotalEarnings(!TotalEarnings)}/>
        :      <FiChevronDown className={ReactIcon} onClick={()=>setTotalEarnings(!TotalEarnings)}/>
    }
  </div>
  {TotalEarnings &&
    <div className={InformationBox}>
     <div className='w-[100%] flex gap-[50px] items-center'>
     <div className='flex flex-col gap-1 w-[100%]'>
        <label className={LabelCss}>Gross Salary </label>
        <input className={InputCss} type='text' 
           name="Gross_Salary"
          onChange={handleEmployeeSalary}
          value={EmployeeSalary?.Gross_Salary}
        />
        </div>
      
        <div className='w-[100%]'/>
        <div className='w-[100%]'/>



     </div>
    </div>
  }
  <div className='w-[100%] flex justify-end mt-5'>
        <div className='flex items-center gap-2'>
          {/* <button className='px-3 py-2 text-brand_color border-[1px] rounded border-brand_b_color'>Cancel</button> */}
          <button onClick={(e)=>{
            e.preventDefault()
            setEmployeeTab(2)
          }} className='px-3 py-2 bg-brand_colors text-white rounded border-none'>Next</button>

        </div>
      </div>
  </form>
</section>
  )
}

export default EmployeeMasterSalary