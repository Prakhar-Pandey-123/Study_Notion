import React from "react"
import copy from "copy-to-clipboard"
import {toast} from "react-hot-toast"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constants"
import { FaShareSquare } from "react-icons/fa"
import { BsFillCaretRightFill } from "react-icons/bs"
import { useSelector } from "react-redux";
import { addToCart } from "../../../slices/cartSlice"

function CourseDetailsCard({course,setConfirmationalModal,handleBuyCourse}){
    const {user}=useSelector((state)=>state.profile)
    console.log("++++++INSIDE COURSE CARD====")
    console.log("PRINTING THE RESULT OF COURSE FROM COURSE CARD ==",course);
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {
        thumbnail:ThumbnailImage,
        price:CurrentPrice,
        _id:courseId
    }=course

    const handleShare=()=>{
        copy(window.location.href);
        toast.success("Link copied to clipboard")
    }
    const handleAddToCart=()=>{
        if(user && user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor.You can't buy a course.")
            return;
        }
        if(token){
            dispatch(addToCart(course))
            return
        }
        setConfirmationalModal({
            text1:"You are not logged in!",
            text2:"Please login to add in cart",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationalModal(null)
        })
    }
    return(
        <>
        <div className="flex flex-col gap-4 bg-richblack-700 text-richblack-5 p-4">
        {/* course image */}
        <img 
            src={ThumbnailImage}
            alt={course?.courseName}
            className="max-h-[600px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        >
        </img>
        <div className="px-4">
            <div className="space-x-3 pb-4 text-3xl font-semibold">
                Rs. {CurrentPrice}
            </div>
            <div className="flex flex-col gap-4">
{/* show "buy now" button for non buyed users otherwise if student already buyed the course then show him "go to course" button*/}
                <button className="bg-yellow-50 w-[100px] text-richblack-900 font-bold"
                    onClick={
                    user&& course?.studentsEnrolled.includes(user?._id)?()=>navigate("/dashboard/enrolled-courses"):handleBuyCourse
                    }>
                        {user&&course?.studentsEnrolled.includes(user?._id)?
                        "Go to Course"
                        :"Buy Now"    
                    }
                </button>
            {(!user|| !course?.studentsEnrolled.includes(user?._id)) &&(
                <button onClick={handleAddToCart} className="bg-yellow-50 w-[100px] text-richblack-900 font-bold">
                    Add to Cart
                </button>
            )}
            </div>
            <div>
                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30-Day Money-Back Gaurantee
                </p>
            </div>
            <div className="">
            {/* <p className="my-2 text-2xl font-semibold ">
                    This Course Includes:
            </p> */}
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                {
                    course?.instructions?.map((item,i)=>{
                        return(
                            <p className="flex gap-2" key={i}>
                     <BsFillCaretRightFill />
                     <span>{item}</span>
                            </p>
                        )
                    })
                }
            </div>
            </div>
            <div className="text-center">
                <button className="mx-auto flex flex-row items-center gap-2 py-2 text-yellow-100"
                onClick={handleShare}
                >
                    <FaShareSquare size={15} /> Share
                </button>
            </div>
        </div>
        </div>
        </>
    )
}
export default CourseDetailsCard