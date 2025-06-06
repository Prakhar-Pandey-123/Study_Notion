import React from "react";
import { useSelector } from "react-redux";
import frameImg from "../../../assets/images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
function Template({title,description1,description2,image,formType}){
const {loading} =useSelector((state)=>state.auth)
return(
<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
    {loading?(
        <div className="spinner"></div>)
    :(
    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
        <h1 className="text-[1.875rem] font-semibold leading-[1.625rem] text-richblack-5">
            {title}
             </h1>
             <p className="mt-4 text-[1.25rem] leading-[1.625rem]">
        <span className="text-richblack-100">
            {description1} 
            </span> {" "}
        <span className="font-edu-sa font-bold italic text-blue-100">{description2}
        </span></p>
       {formType==="signup"?<SignupForm></SignupForm>:<LoginForm></LoginForm>}
            </div>
            <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
        <img src={frameImg}
        alt="Pattern"
        width={558}
        height={504}
        loading="lazy"
        >
        </img>
        <img src={image}
            alt="students"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-4 right-4 z-10"
        >
        </img>
        {/* abs= Takes the element out of the normal document flow and positions it relative to its nearest positioned ancestor (in this case, the relative parent div).
        z-index to 10, ensuring the image stays above the frame (which likely has a lower/default z-index) */}
        </div>
    </div>)}    

</div>
)
}
export default Template