
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import IconBtn from "../../../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MdPlayArrow } from "react-icons/md";
import { setCourse, setEditCourse } from "../../../../../slices/courseSlice";
import { setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import NestedView from "./NestedView";
import { createSection } from "../../../../../services/operations/courseDetailsAPI";
import { updateSection } from "../../../../../services/operations/courseDetailsAPI";


const CourseBuilderForm=()=>{

const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();
const [editSectionName,setEditSectionName]=useState(null);
const {course}=useSelector((state)=>state.course)
const [loading,setLoading]=useState(false);
const {token}=useSelector((state)=>state.auth)
const dispatch=useDispatch();


const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","");
    // make that input box empty
}

const goBack=()=>{
    // if we going back to previous step then we editing the course 
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
}
const goToNext=()=>{
    //if no section formed
    if(course.courseContent.length===0)
    {
        toast.error("Please Add atleast one section")
    return 
    }
    // if in any section the subsection length is 0 means nothing is present
    if(course.courseContent.some((section)=>section.subSection.length===0)){
        toast.error("Please add atleast one lecture to eact section")
        return;
    }
    // if everything is okay then go to next step
    dispatch(setStep(3));
}

const onSubmit=async (data)=>{
    setLoading(true)
    let result=null;
    if(editSectionName){
        // if we editing seciton name
        result=await updateSection(
            {
                sectionName:data.sectionName,
                sectionId:editSectionName,
                courseId:course._id,
            },
            token
        )
    }
    // if we are not editing rather creating a new section
    else{
        //  result =response?.data?.updatedCourse// this is the result we are getting from the courseDetailsAPI.jsx which basically is giving the updated course
        result=await createSection({
            sectionName:data.sectionName,
            sectionId:editSectionName,
            courseId:course._id
        },token
    )
    }
    //update values ,course value has now changed ,empty the input box  
    if(result){
        dispatch(setCourse(result));
        setEditSectionName(null)
        setValue("sectionName","")
    }
    
    setLoading(false);
} 

const handleChangeEditSectionName=(sectionId,sectionName)=>{
//toggle the button and input tag based on edit is true or not
    if(editSectionName === sectionId){
        setEditSectionName(null);
      setValue("sectionName", "");
        return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)
}

return(
<div className="space-y-8 rounded-md bouder-[1px] border-richblack-700 bg-richblack-800 p-6">
    <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       
        <label htmlFor="sectionName"
            className="text-md text-richblack-5"
            >Section Name<sup className="text-pink-200">*</sup></label>
            <input
                id="sectionName"
                placeholder="Add section name"
                name="sectionName"
                {...register("sectionName",{required:true})}
                className="w-full form-style bg-richblack-600 p-1 rounded-md text-richblack-5"
                >
            </input>
            {errors.sectionName &&(<span className="ml-2 text-sm tracking-wide text-pink-200">This field is required</span>)}
     
        <div className="flex items-end gap-x-4 ">
            {/* either to show that create section button or edit section button */}
            <IconBtn 
            type="submit"
            text={
                editSectionName?"Edit Section Name":" Create Section"}
                >
                    <MdAddCircleOutline size={20}/>
            </IconBtn>
            {
                editSectionName && (
                    <button type="button" className="text-sm text-richblack-300 underline" onClick={cancelEdit}>
                        Cancel Edit
                    </button>
                )
            }
            
        </div>
    </form>
{/* onclicking on edit btn of nested view the button(state) of this component changes hence pass this in nested view */}
    {course.courseContent.length>0 &&(
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
    )}
    <div className="flex justify-end gap-x-3">
        <button onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >Back</button>
        <IconBtn text="Next" onclick={goToNext}>
            <MdPlayArrow />
        </IconBtn>
    </div>
</div>
)
}
export default CourseBuilderForm