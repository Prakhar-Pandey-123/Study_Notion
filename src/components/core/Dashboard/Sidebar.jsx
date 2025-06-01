import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import {logout} from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

// export default function ConfirmationModal() then import it like this=> import ConfirmationModal from "../../common/ConfirmationModal";
// export const logout = () => { ... }; then import it like this=> import { logout } from "../../../services/operations/authAPI";

import { useNavigate } from "react-router-dom";

const Sidebar=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    //  {/* using map hence give id react uses id to determine which items changed, were added, or removed when the list updates. */}
const [confirmationModal,setConfirmationModal]=useState(null);
    const {user,loading:profileLoading}=useSelector((state)=>state.profile)
const {loading:authLoading}=useSelector((state)=>state.auth)
if(profileLoading || authLoading){
    return (
        <div className="mt-10">
            Loading...
        </div>
    )
}

return(
  
    <div>
        {/* 1 rem=16px , to change it= html {
  font-size: 20px; // Now 1rem = 20px */}
        <div className="flex min-w-[222px] flex-col border-r-[1px] text-white border-r-richblack-700 h-[calc(100vh-3.5rem)]
               bg-richblack-800 py-10 
               ">
                
            <div className="flex flex-col">
                {
                    sidebarLinks.map((link)=>{
                        if(link.type && user?.accountType !==link.type) return null;
                        return(
                            
                            <SidebarLink link={link} 
                            iconName={link.icon} key={link.id}
                            />
                        )
                    })
                }
            </div>
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>
          <div className="flex flex-col">
                <SidebarLink
                    link={{name:"Settings",path:"dashboard/settings"
                    }}
                    iconName="VscSettingsGear"
                    ></SidebarLink>
                    {/* clicking on log out btn */}
                    
                    <button onClick={
                        ()=>setConfirmationModal({
                            text1:"are your sure ?",
                            text2:"you will be logged out of ur account",
                            btn1Text:"Logout ",
                            btn2Text:"Cancel",
                            btn1Handler:()=> dispatch(logout(navigate)),
                            btn2Handler:()=>setConfirmationModal(null),
                        })
                    }
                    className="text-sm font-medium text-richblack-300 mx-4 my-4"
                    >
                        <div className="flex items-center gap-x-2 p-4">
                            <VscSignOut className="text-lg"></VscSignOut>
                            <span>Log out</span>
                        </div>
                    </button>
          </div>
          
        </div>
        {/* if the confirmationModal is null which is set by setConfirmationModal then the first cond will be false hence this componenet(ConfirmationModal) will not be show but if confirmationModal has some value then the compoenent will be rendered  */}
        
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}
    </div>
)
}
export default Sidebar