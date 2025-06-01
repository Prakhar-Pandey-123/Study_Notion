import React, {useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { AiOutlineCaretDown } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"
import {logout} from "../../../services/operations/authAPI"

const ProfileDropDown=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.profile);
    const [open,setOpen]=useState(false);
    // to handle whether to show that dropdown or not when its true then it will be shown else not
    const ref=useRef(null);
    // useRef is a ract hook that is used to refer to a value that persists across components rerender when u move from home to about us with profile drop down the useRef part dont change.unlike useState updating a ref dont trigger a re-render 
    // creating an object of useRef then attaching it to drop down 

//   useOnClickOutside(ref, () => setOpen(false))
//   this is a custom hook(created by us) it detects clicks outside the referenced element and makes setOpen as false hence hides it 

// if no user then delete token
    if(!user){
        console.log("no user found")
        return localStorage.setItem("token",null);
    }

return(
    // its a button to which b/w whether to show the dropdown or not on every click the value of open is changed
   <button className="relative"
        onClick={()=>setOpen(
            (prev)=>{
                return !prev
            }
        )}
   >
    {/* to show profile icon and downward pointing arrow side by side */}
    <div className="flex items-center gap-x-1">
    <img src={user?.image}
        alt=""
        className="aspect-square w-[30px] rounded-full object-cover"
    >
    </img>
    {/* downward pointing arrow */}
    <AiOutlineCaretDown className="text-sm text-richblack-100" />
    </div>
{/* <div onClick={() => console.log("Parent clicked")}>
  <button onClick={(e) //////Button clicked
Not Parent clicked (because of stopPropagation())*/}

{/* to show drop down menu only when open is true else dont show it */}
    {
        open && (
            <div
                onClick={(e)=>e.stopPropagation()}
                className="absolute top-[118%] -right-8 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded:md border-[1px] border-richblack-700 bg:richblack-800"
                ref={ref}
                >
{/*firstly show dashboard link  */}
            <Link to ="/dashboard/my-profile"
            onClick={()=>setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                <VscDashboard className="text-lg" />
                Dashboard
            </div>
            </Link>
            <div 
                onClick={()=>{
                    dispatch(logout(navigate))
                    setOpen(false);
                }}
                className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:text-richblack-200"
            >
                <VscSignOut className="text-lg"></VscSignOut>Logout 
            </div>
            </div>
        )
    }
   </button>
)
}
export default ProfileDropDown