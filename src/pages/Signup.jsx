import React from "react";
import signupImg from "../assets/images/signup.webp"
import Template from "../components/core/Auth/Template"//: A reusable layout component for authentication pages (signup/login). Avoids duplicate code for login/signup layouts.
import { useSelector } from "react-redux";
// A Redux hook to access the global state(shared data b/w various components) (to check if authentication is in progress).
function Signup(){
    const {loading}=useSelector((state)=>state.auth);
    // loading(state from Redux) is true, it renders the spinner. CSS-based loading spinne in a css file,set true during API calls like token validation or signup submission, loading is false it renders the <Template /> component (signup form).
return(
   loading?(<div className="h-[100vh] flex justify-center items-center">
    <div className="custom-loader">
    </div>
   </div>):(
    <Template
    title="Join the millions learning to code with StudyNotion for free"
    description1="Build skills for today, tomorrow, and beyond."
    description2="Education to future-proof your career."
    image={signupImg}
    formType="signup"
    >
    </Template>
   )
)
}
export default Signup