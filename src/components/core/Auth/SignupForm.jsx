import React, { useState } from "react";
import { ACCOUNT_TYPE } from "../../../utils/constants"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {useDispatch} from "react-redux"
// useDispatch is used to send actions to Redux, so the reducers can update the state.
import { setSignupData } from "../../../slices/authSlice"

import {useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
import { sendOtp } from "../../../services/operations/authAPI";
import Tab from "../../common/Tab"
import {setProgress} from "../../../slices/loadingBarSlice"

//send otp is a fn
const SignupForm =()=>{
    const dispatch=useDispatch();
    const navigate =useNavigate();
    //student or instructor,initally its a student
const [accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT);
// Creates a state variable formData initialized as an object with empty string values for each form field
const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
})
// that eye button to let see the user the text of password or the asterisks of it
const [showPassword,setShowPassword]=useState(false);
// Extracts individual properties from the formData object into separate variables eg.const firstName = formData.firstName.when destructuring the formData object, the variable names must exactly match the property names in the object
const {firstName,lastName,email,password,confirmPassword}=formData;
const [showConfirmPassword,setShowConfirmPassword]=useState(false);

const handleOnChange=(e)=>{
    setFormData((prevData)=>({
        ...prevData,
        [e.target.name]:e.target.value,
    }))
}
// [e.target.name]:which field to update.
// // <input  name="firstName"  // Must match formData property
//   onChange={handleOnChange}
// ...prevData: Preserves all other field values unchanged. we dont need to initialize prevData, react itself does it
const handleOnSubmit=(e)=>{
    e.preventDefault()
    //prevent default form submission action(page reload)
    if(password !== confirmPassword){
        toast.error("password do not match")
    return //toast=react messages box
    }
    const signupData={
        ...formData,//All form data (firstName, lastName, email, password)
        accountType,
    }
//setting signup data to state//setSignupData is a reducer to set state of store and we are sending the signupData to it
    //to be used after otp verification
    dispatch(setSignupData(signupData))
    //send otp to user for verification, it is a route which calls our backend api for sending otp
    dispatch(sendOtp(formData.email,navigate));
    //reset all fields of the form
//navigate("/verify-email")=used to naviagte to that link =go to verify-email page
//navigate(-1);Go back (like browser back button)
    setFormData({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT);
}
    // data to pass to Tab component
     const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]
    return(
        <div>
            {/* tab */}
            <Tab tabData={tabData} 
            field={accountType}
            setField={setAccountType}></Tab>
{/* its a component on the top of the signup form to show the role of the user either instructor or student and change ui accordingly(buttons styling) */}
{/* form */}
<form onSubmit={handleOnSubmit} className="flex w-full  flex-col gap-y-4">
    {/* first name last name */}
    <div className="flex gap-x-4">
    <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        First Name<sup className="text-pink-200">*</sup>
        </p>
        <input
        required
        type="text"
        name="firstName"
        value={firstName}
        onChange={handleOnChange}
        placeholder="Enter first name"
        style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        >
        </input>
    </label>
    <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name<sup className="text-pink-200">*</sup>
        </p>
        <input 
        required
        type="text"
        name="lastName"
        value={lastName}
        onChange={handleOnChange}
        placeholder="Enter last name"
        style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
       className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        >
        </input>
    </label>
    </div>
    {/*email address  */}
    <label className="w-full">
    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
        Email Address<sup className="text-pink-200">*</sup>
    </p>
    <input required
           type="email" 
           name="email"
           value={email}
           onChange={handleOnChange}
           placeholder="Enter email address"
           style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
           className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
    >
    </input>
    </label>
    <div className="flex gap-x-4">
    <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Create Password<sup className="text-pink-200">*</sup>
        </p>
        <input
            required
            type={showPassword?"text":"password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Passsword"
               style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
        ></input>
        <span
        onClick={()=>setShowPassword((prev)=>!prev)}
        className="absolute right-3 top-[38px] cursor-pointer"
        >
            {showPassword ? ( <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
        ):(
             <AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
        </span>
        
    </label>
    <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
    </div>
    <button
    //  setProgress state variable tracks the completion percentage of a multi-step process in your application, most likely the user registration/signup flow.Updates Redux store's progress to 60% Likely triggers a loading bar animation showing 60% completion
    type="submit" onClick={()=>dispatch(setProgress(60))}
    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
    >Create Account
    </button>
</form>
        </div>
    )
}

export default SignupForm