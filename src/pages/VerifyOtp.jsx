import React, { useEffect, useState } from "react";
import OTPInput from 'react-otp-input'
// 
import { useDispatch, useSelector } from "react-redux";
import { signUp } from '../services/operations/authAPI';
import { useNavigate } from "react-router-dom";

const VerifyOtp=()=>{
    
    const [otp,setOtp]=useState("");//Stores the 6-digit code user enters
    const {loading,signupData}=useSelector((state)=>state.auth);//signupData: Contains user registration details from Redux store
    //we took the data from the global store
    const dispatch= useDispatch();
    const navigate= useNavigate();
    //if no data is entered in form by the user then redirect to signup "page"
    useEffect(()=>{
        if(!signupData){
            navigate('/signup')
        }
    },[])

    const handleOnSubmit=(e)=>{
        e.preventDefault();

        const {email,accountType,confirmPassword,password,lastName,firstName}=signupData;
        //send this data to signUp fn which controls apis of auth related tasks
        // we are sending the data using dispatch to that signUp function then the state variables of store are also updated with it 
        
        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        ))
    }
return(
    loading?
    (<div className="h-[100vh] flex justify-center items-center">
    <div class="custom-loader"></div>
    </div>)
    :
    (
   
    <div>
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
        <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code has been sent to you. Enter the code below</p>
        
        {/* Pre-Built OTP UI */}
        


         {/* // Renders a series of input boxes (typically 4-6 digits)

// Auto-focuses between boxes as user types

// Clean, customizable design
////Current OTP value
////Updates otp state
//	6-digit OTP
//Adds hyphen between boxes
//Styles when a digit box is focused:
//Restricts input to numbers only (keyboard will show numeric pad on mobile)
//it is basically written to open the customizing features of this react-otp-input package and allow us to use onchange
//Automatically focuses the first input box on load */}

        <form onSubmit={handleOnSubmit}>     
        <OTPInput 
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            inputStyle="w-[20px] rounded-[8px] border-[1px] border-richblack-500 text-[3rem] text-center"
            focusStyle="border-[5px] border-red-500"
            
            isInputNum={true}
            shouldAutoFocus={true}
            containerStyle="flex justify-between gap-4"
            renderInput={(props)=> <input{...props}/>}
            
        >
        </OTPInput>
        <button type="submit" className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Verify Email</button>
        </form>
        </div>

    </div>
    </div>)
    )

}
export default VerifyOtp