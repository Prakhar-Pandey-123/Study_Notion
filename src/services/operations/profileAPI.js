import { setProgress } from "../../slices/loadingBarSlice";
import {toast} from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI.js";
const {GET_USER_ENROLLED_COURSES_API} =profileEndpoints


export async function getUserEnrolledCourses(token){
    console.log("inside the frontend fn")
    const toastId=toast.loading("Loading...")
    let result=[]
// ////////////////////////////////////////////////////////////////
    try{
        console.log("before calling get enrolled courses api ")
       const response = await apiConnector(
  "GET",
  GET_USER_ENROLLED_COURSES_API,
  null, // No body for GET requests
  {
    authorization: `Bearer ${token}`, 
  }
);
///////////////////////////////////////////////////////////
console.log("after calling get enrolled course api") 
console.log("response of get course api",response); 
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response.data.data.courses
    }
    catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API.....",error)
        toast.error("could not get enrolled courses")
    }

    toast.dismiss(toastId);
    return result
}

// update the profile pic
export async function updatePfp(token,pfp) {
    // FormData is a built-in JavaScript object that allows you to construct key-value pairs representing form fields and their values. used to send data via HTTP requests.formData.append('key', 'value'); 
    const toastId=toast.loading("uploading...")
    try{
        const formData=new FormData();
        console.log("pfp",pfp);
        formData.append('pfp',pfp);
        const response=await apiConnector("PUT",settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,formData,{
            authorization:`Bearer ${token}`,
        });
        console.log("update_display _picture_response",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Profile picture updated successfully");
        //update the pic url in localstorage
// response=  "data": {
//     "data": {
//       "image": "https://cloudinary.com/profile-pic-new.jpg"
        const imageUrl = response.data.data.image;
        const user = JSON.parse(localStorage.getItem("user")); //get the user and convert to object
      localStorage.setItem("user", JSON.stringify({ ...user, image: imageUrl }));
      console.log(JSON.parse(localStorage.getItem("user")));
    }
    catch(error){
        console.log("update_display_picture_api error",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}
export async function updateAdditionalDetails(token, additionalDetails) {
    const { firstName, lastName, dateOfBirth, gender, contactNumber, about } = additionalDetails;
    const toastId = toast.loading("Updating...");
    try {
        const response = await apiConnector(
            "PUT",
            settingsEndpoints.UPDATE_PROFILE_API,
            { firstName, lastName, dateOfBirth, gender, contactNumber, about },
            { authorization: `Bearer ${token}` }
        );

        console.log("updated additional details", response);
        
        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        // Safely update localStorage
        let user;
        try {
            user = JSON.parse(localStorage.getItem("user")) || {};
        } catch (e) {
            user = {};
        }

        // Initialize additionalDetails if it doesn't exist
        user.additionalDetails = user.additionalDetails || {};

        // Update user data - create new object instead of mutating
        const updatedUser = {
            ...user,
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            additionalDetails: {
                ...user.additionalDetails,
                dateOfBirth: dateOfBirth || user.additionalDetails.dateOfBirth,
                gender: gender || user.additionalDetails.gender,
                contactNumber: contactNumber || user.additionalDetails.contactNumber,
                about: about || user.additionalDetails.about
            }
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Additional details updated successfully");
        
        // Return the updated user data
        return updatedUser;
    } catch (error) {
        console.error("Failed to update additional details", error);
        toast.error(error.response?.data?.message || "Failed to update details");
    } finally {
        toast.dismiss(toastId);
    }
}

//update the password
export async function updatePassword(token,password) {
    
    const {oldPassword,newPassword,confirmNewPassword}=password;
    const toastId=toast.loading("Updating...")
    try{
        const response=await apiConnector("POST",settingsEndpoints.CHANGE_PASSWORD_API,{oldPassword,newPassword,confirmNewPassword,
        },{
            authorization:`Bearer ${token}`
        });
        console.log("updated password api response",response);
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("updated password successfully")
    }
    catch(error){
        console.log("updated password failed",error);
           toast.error(error.response?.data?.message)
    }
    finally{
        toast.dismiss(toastId);
    }
}

export async function deleteAccount(token,dispatch,navigate){
    const toastId=toast.loading("Deleting...")
    try{
        const response=await apiConnector(
            "DELETE",
                settingsEndpoints.DELETE_PROFILE_API,null,{
                authorization:`Bearer ${token}`,
                }    
        )
        console.log("delete_account_api ",response);
        if(!response.data.success){
            throw new Error(response.data?.message);
        }
        toast.success("account deleted successfully");
        dispatch(logout(navigate));
    }
    catch(error){
        console.log("deleted account failed",error);
        toast.error(error.response.data?.message);
    }
    finally{
        toast.dismiss(toastId);
    }
}