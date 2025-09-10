import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateAdditionalDetails, updatePassword, updatePfp, deleteAccount } from '../../../services/operations/profileAPI'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
const Settings = () => {
    const user = useSelector(state => state.profile.user);
    //to update the profile pic

    const pfp = useSelector(state => state.profile.user.image)
    const [profilePicture, setProfilePicture] = useState(pfp)
    const token = useSelector(state => state.auth.token)


    // to upload it on cloudinary from BE for future use 
    const handleUpload = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        updatePfp(token, file)
    }
    //just change the pic for now only
    const handleFileChange = (e) => {
        e.preventDefault();
        // When a user selects a file using <input type="file">, the browser stores the file(s) in an array-like File object.
        const file = e.target.files[0];

        setProfilePicture(URL.createObjectURL(file));// browser API that creates a temporary local URL (Blob URL) for the selected file. Creates a temporary local URL
    }

    //now form data change(additional info)

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
        gender: user?.additionalDetails?.gender || "Prefer Not to say",
        contactNumber: user?.additionalDetails?.contactNumber || "",
        about: user?.additionalDetails?.about || "",
    });

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleAdditionalDetails = (e) => {
        e.preventDefault()
        updateAdditionalDetails(token, formData);
    }
    // for update password
    const [showOldPassword,setShowOldPassword]=useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    })

    const handleOnChangePassword = (e) => {
        setPassword((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handlePassword = (e) => {
        e.preventDefault()
        const { newPassword, confirmNewPassword } = password;
        if (newPassword == confirmNewPassword)
            updatePassword(token, password);
        else {
            alert("Password does not match")
        }
    }

    // delete account
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const onDeleteAccount = () => {
        if(window.confirm
            ("Are you sure you want to delete your account")){
                deleteAccount(token,dispatch,navigate)
            }
    }

    return (

        <div>
            {/* <div class="flex w-full">
  <div class="w-20 bg-red-500">Box 1</div>
  <div class="flex-1 bg-green-500">Box 2</div>
</div>Box 1 is 80px wide (w-20).
Box 2 (with flex-1) will take the rest of the width. */}
            <div className="flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <h1 className="text-richblack-5 font-medium text-3xl mb-14">Edit Profile</h1>
                    {/* update profile pic */}
                    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 md:p-8 md:px-12 px-3 text-richblack-5">
                        <div className="flex items-center gap-x-4">
                            <img src={profilePicture} className="aspect-square w-[78px] rounded-full object-cover"></img>
                            <div className="space-y-2">
                                <p>Change Profile Picture</p>
                                {/* this will be short form to change pfp where the button on submit will upload img to cloudinary for future use while other button select helps to select file from the system and change the pic on the frontend for now */}
                                <form onSubmit={handleUpload}>
                                    <div className="flex flex-row gap-3 ">
                                        <label className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" htmlFor="upload">Select
                                            <input id='upload' type='file' onChange={handleFileChange} className="hidden" accept='image/png,image/gif,image/jpeg'></input>
                                        </label>
                                        <button type="submit" className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined ">Upload</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* update additional info */}
                    <form onSubmit={handleAdditionalDetails}>
                        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                            <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
                            {/* first and last name div */}
                            <div className="flex flex-col gap-5 lg:flex-row">
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="firstName" className="text-richblack-50">
                                        First Name    </label>
                                    <input value={user.firstName || null} type="text" name="firstName" id="firstName" placeholder="enter first name " className="form-style w-full rounded-[0.5rem] bg-richblack-600 pb-2 pt-2 pl-2 pr-1 text-richblack-5" onChange={handleOnChange}>
                                    </input>
                                </div>
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="lastName" className="text-richblack-50">Last Name</label>
                                    <input value={user.lastName || null} type="text" name="lastName" id="lastName" placeholder="enter last name "
                                        className="form-style w-full rounded-[0.5rem] bg-richblack-600 pb-2 pt-2 pl-2 pr-1 text-richblack-5" onChange={handleOnChange}></input>
                                </div>
                            </div>
                            {/* completed first and last name div */}
                            {/* started dob and gender */}
                            <div className="flex flex-col gap-5 lg:flex-row">
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="dateOfBirth" className="text-richblack-50">Date Of Birth
                                    </label>
                                    <input
                                        value={user?.additionalDetails.dateOfBirth || null}
                                        type="date"
                                        name="dateOfBirth" id="dateOfBirth" className="form-style w-full rounded-[0.5rem] bg-richblack-600 pb-2 pt-2 pl-2 pr-1 text-richblack-5" onChange={handleOnChange}>
                                    </input>
                                </div>

                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="gender" className="text-richblack-50">Gender
                                    </label>
                                    <select value={user?.additionalDetails.gender || null} type="text" name="gender" id="gender" className="form-style w-full rounded-[0.5rem] bg-richblack-600 pb-2 pt-2 pl-2 pr-1 text-richblack-5" onChange={handleOnChange}>
                                        <option value="Prefer Not to say">
                                            Prefer Not to say
                                        </option>
                                        <option value="Male">
                                            Male
                                        </option>
                                        <option value="Female">
                                            Female
                                        </option>
                                        <option value="Non-Binary">
                                            Non-Binary
                                        </option>
                                        <option value="Other">
                                            Other
                                        </option>
                                    </select>
                                </div>
                            </div>
                            {/* completed dob and gender */}
                            <div className="flex flex-col gap-5 lg:flex-row">
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="contactNumber" className="text-richblack-50">Contact Number</label>
                                    <input value={user?.additionalDetails.contactNumber || null} type="tel" name="contactNumber" id="contactNumber" placeholder="Enter contact number" className="form-style w-full rounded-[0.5rem] bg-richblack-600 p-2 pr-12 text-richblack-5" onChange={handleOnChange}>
                                    </input>
                                </div>
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="about" className="text-richblack-50">About</label>
                                    <input value={user?.additionalDetails?.about || null} type="text" name="about" id="about" placeholder="Enter Bio Details" className="form-style w-full rounded-[0.5rem] bg-richblack-600 p-2 pr-12 text-richblack-5" onChange={handleOnChange}></input>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined" type="submit">Save</button>
                        </div>
                    </form>

                    {/* update password ,,leading=line heigh*/}

                    <form onSubmit={handlePassword}>
                        <div >
                            <div className=' relative mt-4'>
                                <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Old Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                        required
                                        type={showOldPassword ? "text" : "password"}
                                        name="oldPassword"
                                        value={password.oldPassword}
                                        onChange={handleOnChangePassword}
                                        placeholder="Enter Password"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                    /></label>
                                <span
                                    onClick={() => setShowOldPassword((prev) => !prev)}
                                    className="absolute right-3 top-9 z-[10] cursor-pointer"
                                >
                                    {showOldPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                    )}
                                </span>
                            </div>
                            <div className=' relative mt-4'>
                                <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={password.newPassword}
                                        onChange={handleOnChangePassword}
                                        placeholder="Enter Password"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                    /></label>
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-9 z-[10] cursor-pointer"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                    )}
                                </span>
                            </div>
                            <div className=' relative mt-4'>
                                <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmNewPassword"
                                        value={password.confirmNewPassword}
                                        onChange={handleOnChangePassword}
                                        placeholder="Enter Password"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                    /></label>
                                <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-10 z-[10] cursor-pointer"
                                >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-3"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined" type="submit">Save</button></div>
                    </form>


                    {/* delete account */}
                    <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-300 p-3 md:p-8 md:px-12">
                        <div className="flex aspect-square h-14 items-center rounded-full justify-center bg-pink-700">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl text-pink-200" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </div>
                        <div className="flex flex-col space-y-2 w-full">
                            <h2 className="text-lg font-semibold text-richblack-5">Delete Account</h2>
                            <div className="md:w-3/5 text-pink-25 ">Would you like to delete account</div>
                            <p>This account may contain paid courses.Deleting your account  will remove all the courses associated  with it.</p>
                        </div>
                        <button type="button"
                            onClick={onDeleteAccount}
                            className="w-fit cursor-pointer italic text-pink-900 bg-richblack-50 h-[40px] pl-3 pr-3 mt-8 rounded-[0.5rem] font-semibold"
                        >
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Settings