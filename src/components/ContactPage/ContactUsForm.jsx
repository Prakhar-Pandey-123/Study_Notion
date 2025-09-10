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
// You only set isSubmitSuccessful from formState as false, you never set it true
// But react-hook-form manages that state for you internally.RHF itself sets isSubmitSuccessful = true When a user submits the form
// User submits → handleSubmit intercepts → validates → if ok → calls your onSubmit → RHF sets isSubmitSuccessful=true → useEffect triggers → reset clears the form.
// RHF builds a data object with all the field values and passes it to your onSubmit function 
// {
//   firstName: "Prakhar",
//   lastName: "Pandey",
//   email: "prakhar@mail.com",
//   countryCode: "+91",
//   phoneNo: "9876543210",
//   message: "Hello!"
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

        <div className="flex flex-col gap-5 lg:flex-row"><div className="flex flex-col gap-2 lg:w-[48%]"><label htmlFor="firstname" className="lable-style">First Name</label><input type="text" name="firstname" id="firstname" placeholder="  Enter first name"
        {...register("firstName",{required:true})} className="form-style"/>
        {
            errors.firstName && <span className=" text-yellow-25">Enter Firstname *</span>
        }</div>

        <div className="flex flex-col gap-2 lg:w-[48%]"><label htmlFor="lastname" className="lable-style">Last Name</label><input type="text" name="lastname" id="lastname" placeholder="  Enter last name" className="form-style"  {...register("lastName")}/>
        {
            errors.lastName && <span className=" text-yellow-25">Enter Lastname</span>
        }</div></div>
        
        <div className="flex flex-col gap-2"><label htmlFor="email" className="lable-style">Email Address</label><input type="email" name="email" id="email" placeholder="  Enter email address" className="form-style"  {...register("email",{required:true})}/>
        {
            errors.email && <span className=" text-yellow-25">Enter Email *</span>
        }
        </div>
        
        <div className='flex flex-col gap-2'>
            <label htmlFor="phonenumber" className="lable-style">
                Phone Number
            </label>
            <div className='flex gap-5'>
                
                <select type="text" name="countrycode" id="countryCode" className="form-style w-[90px]"
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
                  placeholder="  12345  67890" className="form-style w-[calc(100%-90px)]"
                   {...register("phoneNo",{
                    required:{value:true,message:"Please enter phone Number *"}, 
                    maxLength:{value:10,message:"Enter a valid Phone Number *"},minLength:{value:8,message:"Enter a valid Phone Number *"}})} />
                {
                    errors.phoneNo && <span className=" text-yellow-25">{errors.phoneNo.message}</span>
                }
                
            </div>
        </div>

        <div className="flex flex-col gap-2"><label htmlFor="message" className="lable-style">Message</label><textarea name="message" id="message" cols="30" rows="6" placeholder="Enter your message here" className="form-style"  {...register("message",{required:true})}/>
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
// `useForm()` sets up the whole form and gives you helper functions + state

// register()=
// Connects your `<input>`, `<select>`, or `<textarea>` to react-hook-form and adds validation.
// <input {...register("firstName", { required: true })} />
// <select {...register("countryCode", { required: true })} />
// <input {...register("phoneNo", {
//   required: { value: true, message: "Please enter phone Number *" },
//   maxLength: { value: 10, message: "Enter a valid Phone Number *" },
//   minLength: { value: 8,  message: "Enter a valid Phone Number *" },

// * Wires `value`, `onChange`, `onBlur`, and `ref` so RHF can track the field.
// * Applies the **rules** you pass:
//   * `required: true` or `required: "message text"`
//   * `minLength`, `maxLength`
//   * `validate: (val) => true || "error message"`
// Without `register`, RHF won’t know about the field, can’t validate it, and won’t include it in `data` on submit.

// # handleSubmit()
// A wrapper that runs validation and then calls your submit function(s).
// <form onSubmit={handleSubmit(onSubmit)}>

// 1. Prevents the browser’s default submit.
// 2. Validates all registered fields using their rules.
// 3. If all good → calls `onSubmit(data)` with an object like:
//    {
//      firstName, lastName, email, message,
//      countryCode, phoneNo
// 4. If any field fails → (optionally) calls a second callback `onInvalid(errors)` if you pass it

// # reset(values?, options?)

// Programmatically sets form values and resets form state.

// useEffect(() => {
//   if (isSubmitSuccessful) {
//     reset({ firstName:"", lastName:"", email:"", message:"", phoneNo:"" });
//   }
// }, [reset, isSubmitSuccessful]);
// ```

// **What it does:**

// * Sets the provided fields to the given values (here, empty strings).
// * Clears validation errors, dirty/touched state, and sets the form back to a “fresh” state by default.

// **Useful variants:**

// ```js
// reset();                           // reset to defaultValues (if you provided them)
// reset({ email: "a@b.com" });       // partial reset (only given fields)
// reset(values, { keepErrors: true }) // keep certain pieces of state
// ```

// ---

// # formState

// You’re reading two things from it: `errors` and `isSubmitSuccessful`.

// ### errors

// **What it is:**
// An object with one key per field that failed validation.

// **How you use it:**

// ```jsx
// {errors.firstName && <span>Enter Firstname *</span>}
// {errors.email && <span>Enter Email *</span>}
// {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
// ```

// **What it contains:**

// ```js
// errors.phoneNo = {
//   type: "minLength" | "maxLength" | "required" | "pattern" | ...,
//   message: "Enter a valid Phone Number *" // only if you provided one
// }
// ```

// **Why your messages behave differently:**

// * For `firstName` you used `required: true`, so there’s **no built-in message**; you’re showing a fixed string.
// * For `phoneNo` you passed `message` inside each rule, so you can show `errors.phoneNo.message`.

// **Common reads:**

// * `errors[field]?.type` → which rule failed.
// * `errors[field]?.message` → friendly message if you provided one.

// ### isSubmitSuccessful

// **What it is:**
// A boolean that becomes **true after a successful submit** (i.e., no validation errors).

// **How you use it:**

// * You watch it in `useEffect` to clear the form with `reset(...)` after a success.

// **Notes:**

// * It’s `false` initially.
// * After `reset()`, it goes back to the initial (not-submitted) state unless you ask to keep it:

//   ```js
//   reset(values, { keepIsSubmitted: true, keepSubmitCount: true })
//   ```

// ---

// # How these work together in *your* flow

// 1. `register(...)` ties each field to RHF + adds validation rules.
// 2. On submit, `handleSubmit(onSubmit)` validates; if valid, calls `onSubmit(data)`.
// 3. If valid, `isSubmitSuccessful` flips to `true`.
// 4. Your `useEffect` sees that and calls `reset(...)` to clear inputs.
// 5. `errors` is used to show per-field messages when a rule fails.

// ---

// ## Optional (nice-to-have) tweaks for your current rules

// * For `email`, add a `pattern` so typos are caught:

//   ```js
//   {...register("email", {
//     required: "Email is required *",
//     pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email *" }
//   })}
//   ```
// * For `phoneNo`, length alone won’t stop letters or spaces. Add a pattern:

//   ```js
//   {...register("phoneNo", {
//     required: "Please enter phone Number *",
//     minLength: { value: 8,  message: "Enter a valid Phone Number *" },
//     maxLength: { value: 10, message: "Enter a valid Phone Number *" },
//     pattern:   { value: /^[0-9]+$/, message: "Digits only *" }
//   })}
//   ```
// * For `firstName/lastName`, give `required` a message like you did for phone.

// That’s everything your code uses from **react-hook-form**, in plain words and with the exact effects they have in your component.
