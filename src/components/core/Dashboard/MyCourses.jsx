import React, { useEffect, useState } from "react";
import CoursesTable from "./InstructorCourses/CoursesTable"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
         
import { VscAdd } from "react-icons/vsc"
import IconBtn from "../../common/IconBtn"
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"

export default function MyCourses(){
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const [courses,setCourses]=useState([])
// fetch all the courses made by a given instructor and store them in courses

    useEffect(()=>{
        const fetchCourses=async ()=>{
            let result=await fetchInstructorCourses(token)
            if(result)
                setCourses(result)
        }
        fetchCourses()
    },[])
 return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )


}