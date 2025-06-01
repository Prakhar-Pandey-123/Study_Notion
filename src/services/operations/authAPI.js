import { setProgress } from "../../slices/loadingBarSlice"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../slices/profileSlice"
import {endpoints} from "../apis"
// the only job of apis.js is to integrate the various last routes"/...."  with the base route and provide the routes together
import { setLoading, setToken } from "../../slices/authSlice"
import {toast} from "react-hot-toast";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
}=endpoints

export function sendOtp(email, navigate) {
return async (dispatch) => {
    dispatch(setLoading(true))
    try {
        //  SENDOTP_API: BASE_URL + "/auth/sendotp",
        const response=await apiConnector("POST",SENDOTP_API,{
            email,
            checkUserPresent:true,
        })
        dispatch(setProgress(100))
        console.log("send otp response ,,,,",response);
        console.log(response.data.success)
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("OTP SENT SUCCESSFULLY");
        navigate("/verify-email");
        //now navigate to the page present on this route written on App.js
    }
    catch (error) {
        console.log("send otp error",error);
        toast.error(error?.response?.data?.message);
        dispatch(setProgress(50));
    }
    dispatch(setLoading(false));
}
}
//getting all state from store after user fills the form and a otp is entered by user 
export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...")
         {/*toastId is used to track and update or dismiss a specific toast notification*/}
    {/* sets loading toast notificaion */}
        dispatch(setLoading(true))
        try{
            const response=await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })
            console.log("signup api response,,,,,",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setProgress(100));
            toast.success("signup successful")
            navigate("/login")
        }
        catch(error){
            dispatch(setProgress(60));
            console.log("signup api error",error);
            toast.error("signup failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}
export function login(email,password,navigate){
return async (dispatch)=>{
    const toastId=toast.loading("loading")
    //without id=Disappears after: Default duration (typically 3-5 seconds, depends on toast library config,toatid gives manual control
    dispatch(setLoading(true))
    try{
        const response=await apiConnector("POST",LOGIN_API,{
            email,password
            //connects to BE,Sends credentials to BE via apiConnector
        })
        console.log("login api response,,,,,",response);
        if(!response.data.success){
            throw new Error(response.data.message)
            //res.status(200).json({ success:true}) .Checks response success flag.Throws error if login failed  wrong credentials)
        }
        dispatch(setProgress(100));
        toast.success("login successful")

        dispatch(setToken(response.data.token));

        //Stores JWT token in Redux.Extracts the JWT (JSON Web Token) from the backend response.The token allows the user to stay authenticated across:
// Page reloads (when combined with localStorage)
// API calls (via Authorization: Bearer <token> headers
        const userImage=response.data?.user?.image ? response.data.user.image:`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        //Handles user avatar:Uses existing image if availableFalls back to generated initials avatar via DiceBear
        dispatch(setUser({...response.data.user,image:userImage}));

        localStorage.setItem("user",JSON.stringify(response.data.user));
        //user object has profile data like name,email and all

        localStorage.setItem("token",JSON.stringify(response.data.token));

        //redux store token(bearer space)gets deleted after page refresh while token in localstorage persists across session and survives page refreshes annd auto logins user 

        navigate("/dashboard/my-profile");
        //Redirects to profile page
    }
    catch(error){
        dispatch(setProgress(100))
        console.log("login api error...",error);//Shows error toast with backend message
        toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
//Hides loading state.Dismisses loading toast
}
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out")
        navigate("/")
    }
}
export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",RESETPASSTOKEN_API,{email})
            console.log("reset password token response...",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("reset email sent");
            setEmailSent(true)
        }
        catch(error){
            console.log("reset password token error")
        }
        dispatch(setLoading(false));
    }
}
export function resetPassword(password,confirmPassword,token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token})
            console.log("reset password ....",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("password has been reset successfully")
        }
        catch(error){
            console.log("reset password error",error)
            toast.error("unable to reset password")
        }
        dispatch(setLoading(false));
    }
}