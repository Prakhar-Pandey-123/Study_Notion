import React, { useState } from "react";
import { TbCornerDownRightDouble } from "react-icons/tb"
import { BsLightningChargeFill } from "react-icons/bs"
import {login} from "../services/operations/authAPI"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Template from "../components/core/Auth/Template";
import loginImg from "../assets/images/login.webp"
function Login(){
const [showDemo,setShowDemo]=useState(true);
 // Controls demo box visibility
const dispatch=useDispatch();
const navigate=useNavigate();//Programmatic navigation
return(
    <div>
    <div className={`${showDemo?"":"hidden"} justify-center items-center absolute bg-richblack-400 top-52 md:top-32 md:right-[44%] right-[10%] p-6 -rotate-[20deg] z-20`}>
        {/* Only shows when showDemo is true ,z-20) to appear above other content else hidden*/}
        <div className="flex flex-col gap-2 relative">
            {/*  Clicking sets showDemo to false, hiding the panel */}
        <div onClick={()=>{setShowDemo(false)}}
            className="absolute top-[-30px] right-[-20px] text-5xl text-richblack-900 rounded-full w-[40px] flex justify-center items-center cursor-pointer"
            >
               
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
              <circle cx="50" cy="50" r="45" fill="#888888" stroke="#000000" strokeWidth="2" />
               <circle cx="50" cy="50" r="20" fill="#ffffff" /></svg>
                {/* SVG: Creates a circular X button with:Gray outer circle,White inner circle,r=radius,stroke=border,fill=color,cx=cy=50=center*/}
        </div>
        {/* Provides instant access to test accounts during development */}
        <div className="gap-y-2 flex flex-col">
            <p className="text-2xl font-extrabold text-richblack-5 flex items-center">
            Take a Demo  <BsLightningChargeFill size={20}/>
            </p>
        <div>
            {/* dispatch: Sends the login action to Redux and to login() of authAPI,if success navigate to login else error msg
            navigate: Programmatic routing after login */}
            <button onClick={
                ()=>{
                    dispatch(login("123@gmail.com","12345",navigate))
                }
            }
            className="bg-yellow-100 font-semibold mt-4 mb-1 text-richblack-900 px-4 py-2 rounded-md flex"
            >
{/*login()=returns an async function that needs dispatch to add token , user, loading chakra, setProgress if we dont send dispatch to it and call it noramlly fn call then it cant use dispatch and hence cant update state globally, we cant use useDispatch in authAPI as its not jsx its a js file 
.jsx: For React components (contains JSX).
.js: For non-UI logic (API calls, utilities).*/}
           <TbCornerDownRightDouble className="text-2xl text-richblack-900 block" />
            Click here for Instructor Demo
            </button>
        </div>
        <div>
            <button onClick={
                ()=>{
                    dispatch(login("prakharpandey9704@gmail.com","1234",navigate))
                }
            }
            className="bg-yellow-100 font-semibold text-richblack-900 px-4 py-2 rounded-md flex"
            >
            <TbCornerDownRightDouble className="text-2xl text-richblack-900 block"></TbCornerDownRightDouble>
            Click here for Student Demo
            </button>
        </div>
        </div>
        </div>
    </div>
    {/* same template as signup page */}
    <Template
        title="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond"
        description2="Education to future-proof your career"
        image={loginImg}
        formType="login"
    >
    </Template>
    </div>
)
}
export default Login