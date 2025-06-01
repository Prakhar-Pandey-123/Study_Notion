import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
// import { apiConnector } from '../../services/apiConnector';
// import { contactusEndpoint } from '../../services/apis';
import toast from 'react-hot-toast';
import countryCode from "../../data/countrycode.json"

const ContactUsForm = () => {
    const [loading, setloading] = useState(false);
    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}}=useForm();
    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                firstName:"",
                lastName:"",
                email:"",
                message:"",
                phoneNo:""
            })
        }
    }, [reset,isSubmitSuccessful])

    const onSubmit = async (data) => {
        console.log(data);
        try{
        setloading(true);
        const phoneNo = data.countryCode+"  "+data.phoneNo;
        const {firstName,lastName,email,message}=data;

        // const res = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,{firstName,lastName,email,message,phoneNo});
        // if(res.data.success===true){
            
        //     toast.success("Message sent successfully");
        // }
        // else{
        //     toast.error("Something went wrong");
        // }
        // console.log("contact response",res);
        setloading(false);
        }catch(error){
            console.log(error);
        }

    }
    
  return (
    loading?(<div className=".custom-loader w-[100%] pt-[30%] pb-[30%]"><div className="custom-loader"></div></div>):(
    <div className='w-full max-w-[880px] mx-auto flex justify-center text-richblack-600'>
        <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-7"}>

        <div className="flex flex-col gap-5 lg:flex-row"><div className="flex flex-col gap-2 lg:w-[48%]"><label htmlFor="firstname" className="lable-style">First Name</label><input type="text" name="firstname" id="firstname" placeholder="Enter first name"
        {...register("firstName",{required:true})} className="form-style"/>
        {
            errors.firstName && <span className=" text-yellow-25">Enter Firstname *</span>
        }</div>

        <div className="flex flex-col gap-2 lg:w-[48%]"><label htmlFor="lastname" className="lable-style">Last Name</label><input type="text" name="lastname" id="lastname" placeholder="Enter last name" className="form-style"  {...register("lastName")}/>
        {
            errors.lastName && <span className=" text-yellow-25">Enter Lastname</span>
        }</div></div>
        
        <div className="flex flex-col gap-2"><label htmlFor="email" className="lable-style">Email Address</label><input type="email" name="email" id="email" placeholder="Enter email address" className="form-style"  {...register("email",{required:true})}/>
        {
            errors.email && <span className=" text-yellow-25">Enter Email *</span>
        }
        </div>
        
        <div className='flex flex-col gap-2'>
            <label htmlFor="phoneNo" className="lable-style">
                Phone Number
            </label>
            <div className='flex gap-5'>
                
                <select type="text" name="countrycode" id="countryCode" className="form-style w-[81px]"
                 {...register("countryCode",{required:true})}>
                    {
                        countryCode.map((item,index)=>{
                            return(
                                <option key={index} value={item.code}>
                                    {item.code} - {item.country}
                                </option>
                            )
                        })
                    }
                </select>
               
              
                <input 
                type="tel"  
                name="phoneNo"
                 id="phonenumber"
                  placeholder="12345 67890" className="form-style w-[calc(100%-90px)]"
                   {...register("phoneNo",{required:{value:true,message:"Please enter phone Number *"}, maxLength:{value:10,message:"Enter a valid Phone Number *"},minLength:{value:8,message:"Enter a valid Phone Number *"}})} />
                {
                    errors.phoneNo && <span className=" text-yellow-25">{errors.phoneNo.message}</span>
                }
                
            </div>
        </div>

        <div className="flex flex-col gap-2"><label htmlFor="message" className="lable-style">Message</label><textarea name="message" id="message" cols="30" rows="7" placeholder="Enter your message here" className="form-style"  {...register("message",{required:true})}/>
        {
            errors.message && <span className=" text-yellow-25">Enter your message *</span>
        }</div>

        <button type="submit" className="rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] ">Send Message</button>

        </form>
    </div>
    )
  )
}

export default ContactUsForm
// import React, { useEffect, useState } from "react";
// import apiConnector from "../../services/apiconnector"
// import {useForm} from "react-hook-form"
// import countryCode from "../../data/countrycode.json"
// const ContactUsForm=()=>{
//     const [loading,setLoading]=useState();
//     const {
//         register,

      

//         handleSubmit,
       

//         reset,
//         formState:{errors,isSubmitSuccessful}

//     }=useForm();

//     useEffect(()=>{
//         if(isSubmitSuccessful){
//             reset({
//                 email:"",
//                 firstname:"",
//                 lastname:"",
//                 message:"",
//                 phoneNo:"",
//             })
//         }
//     },[reset,isSubmitSuccessful])
   
// const submitContactForm=async(data)=>{
//     console.log("logging data",data)
//     try {
//         setLoading(true);
        
//         const response={status:"oK"};
//         console.log("logging response",response)
//         setLoading(false);
//     } catch (error) {
//         console.log("error",error.message)
//         setLoading(false)
//     }    
// }

// return (
//     <div className="max-w-[800px] mx-auto  w-full  justify-center text-richblack-700">
//     <form onSubmit={handleSubmit(submitContactForm)}>
//         <div className="flex flex-col gap-5">
// {/* first name */}
//         <div className="flex flex-row gap-5">
//     <div className="flex flex-col">
//         <label htmlFor="firstname">First Name
//         </label>
//         <input
//             type="text"
//             name="firstname"
//             id="firstname"
//             placeholder="Enter first Name"
//             {...register("firstname",{required:true})}
//             />
//         {
//             errors.firstname &&(<span>
//                 Please enter your name
//             </span>)
//         }
//     </div>
// {/* last name */}
//       <div className="flex flex-col">
//         <label htmlFor="lastname">Last Name
//         </label>
//         <input
//             type="text"
//             name="lastname"
//             id="lastname"
//             placeholder="Enter last Name"
//             {...register("lastname")}
//             />
//     </div>
//     </div>
//         {/* email */}
//         <div className="flex flex-col">
//             <label htmlFor="email">
//                 Email Address</label>
//             <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="Enter email Address"
//                 {
//                     ...register("email",{
//                         required:true
//                     })
//                 }
//             />
//             {
//                 errors.email && (
//                     <span>
//                         Please enter your email address
//                     </span>
//                 )
//             }
//         </div>
//     {/*PHONE NO  */}
// <div className="flex flex-col">
    
//     <label htmlFor="phonenumber">Phone Number</label>
//     <div className="flex flex-row gap-1">
//         {/* dropdown */}
       
           
//             <select
//                 name="dropdown"
//                 id="dropdown"
//                 className="bg-yellow-5  w-[90px]"
//                 {...register("country-code",{required:true})}
//             >

//             {
//                 countryCode.map((element,index)=>{
//                     return(
//                         <option key={index} value={element.code}>
//                             {element.code} - {element.country}
//                         </option>
//                     )
//                 })
//             }
//             </select>
//                 <input
//                     type="number"
//                     name="phonenumber"
//                     id="phonenumber"
//                     placeholder="12345 67890"
//                     className="text-black w-[calc(100%-90px)]"
//                     {
//                         ...register("phoneNo",
//                             {
//                                 required:{value:true,message:"please enter the phone number"},
//                                 maxLength:{value:true,message:"invalid phone number"},
//                                 minLength:{value:true,
//                                 message:"invalid phone number"}
//                             }
//                         )
//                     }
//                 />
            
//     </div>
// </div>


// {/* message box */}
//         <div className="flex flex-col">
//             <label htmlFor="message">Message</label>
//         <textarea
//             name="message"
//             id="message"
//             cols="30"
//             rows="7"
//             placeholder="enter your message here"
//             {
//                 ...register("message",{required:true})
//             }
//         >
//         </textarea>
//             {
//                 errors.message && <span>
//                     please enter your message
//                 </span>
//             }
//         </div>
//         {/* button */}
//         <div>
//             <button type='submit' className="bg-yellow-50 p-3 text-richblack-900 rounded-md w-11/12 text-xl text-bold font-bold">
//                     Send message
//             </button>
//         </div>
//     </div>
//     </form>
//     </div>
// )
// }
// export default ContactUsForm



  //Purpose: Connects input fields to form validation
    //      {...register("fieldName", { 
    // required: "This is required",
    // minLength: { value: 3, message: "Min 3 chars" }
     //call some fn when submit button is pressed after validations
//Clears form after submission

// Contains form metadata:
// errors=	Field-specific validation errors
// isSubmitSuccessful(Boolean)=True after successful submission
// <input {...register("email", { required: true })} />
// {errors.email && <span>This field is required</span>}
 //clears the form data when dependency changes means when isSubmiSuccessful changes to true ,reset is hook of it
//data will be given to this fn by form hook
// const response =await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data)
 {/* <select> tag is used in HTML to create a dropdown menu in a form. It lets users choose one (or multiple) options from a list.//id: Associates the <select> with a <label> through htmlfor clicking on that label will focus on the id */}
 {/* option is used to tell the options to be shown after drop down is clicked */}