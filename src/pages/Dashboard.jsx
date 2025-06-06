import React from "react";
import { useSelector } from "react-redux";
import {Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar";
const Dashboard=()=>{
const {loading:authLoading}  =useSelector((state)=>state.auth);//thats auth wali loading
const {loading:profileLoading}=useSelector((state)=>state.profile)//profile wali loading
//if any one of them is true then show spinner
if(profileLoading || authLoading){
    return(
        <div className="mt-10">
            Loading...
        </div>
    )
} 
    
return(
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar/>
        <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                <Outlet/>
                {/* to show various sub routes on a base route */}
            </div>
        </div>
    </div>
)
}
export default Dashboard