import {apiConnector} from "../apiconnector"
import {toast} from "react-hot-toast"
import {courseEndpoints} from "../apis"
//to get all the categories

const {
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API

}=courseEndpoints;

export const fetchCourseCategories=async()=>{
    let result=[]
    try{
        const response=await apiConnector("GET",COURSE_CATEGORIES_API);
        console.log("course_categories_api response",response);
        if(!response?.data?.success)
            throw new Error("could new fetch categories");
        result=response?.data?.data;
        return result
    }
    catch(error){
        console.log("course_categories_api ",error);
        toast.error(error?.response?.data?.message);
    }
    finally{
        console.log("ended course_categories_api");
    }
}


export const addCourseDetails=async(data,token)=>{
    let result=null;
    const toastId=toast.loading("Loading...")
    try{
        const response=await apiConnector("POST",CREATE_COURSE_API,data,{
            "Content-Type":"multipart/form-data",
                authorization:`Bearer ${token}`
        });
        console.log("create course api response....",response);
        if(!response?.data?.success)
            throw new Error("could not add course details")
        toast.success("course details added successfully");
        result=response?.data?.data;
        return result;
       
    }
    catch(error){
        console.log("create course api error,,",error);
        toast.error(error.response.data.message)
    }
    finally{
        toast.dismiss(toastId)
    }
    
}

export const editCourseDetails=async(data,token)=>{
    let result=null;
    const toastId=toast.loading("loading...");
    try {
        const response=await apiConnector("POST",
            EDIT_COURSE_API,
            data,{
            "Content-Type":"multipart/form-data",
                authorization:`Bearer ${token}`
        });
        console.log("edit course api response",response);
        if(!response?.data?.success){
            throw new Error("could not update course details");
        }
        toast.success("course details updated successfully")
        result=response?.data?.data;
    } catch (error) {
         console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    return result;
}
// const {sectionName,courseId}=req.body;
export const createSection=async(data,token)=>{
    let result;
    const toastId=toast.loading("loading...")
    try{
        const response=await apiConnector("POST",CREATE_SECTION_API,data,{
             authorization:`Bearer ${token}`
        })
        console.log("create section api response",response);
        if(!response?.data?.success)
            throw new Error("could not create section")
        toast.success("course section created")
    
        result=response?.data?.updatedCourseDetails;
    console.log("create section api result",result)
    }
    catch(error){
        console.log("create section api error",error)
        toast.error(error.message)
    }
    finally{
        toast.dismiss(toastId)
        return result;
    }
}

export const updateSection=async(data,token)=>{

    let result=null;
    const toastId=toast.loading("loading...")
    try {
        const response=await apiConnector("POST",UPDATE_SECTION_API,data,{
            authorization:`Bearer ${token}`
        })
        console.log("update section api ",response);
        if(!response?.data?.success){
            throw new Error("could not update section")
        }
        console.log("printing update seciton api,response",response)
        toast.success(" section updated successfully")
        // updatedCourse is send by BE ofc
        result =response?.data?.updatedCourse
        console.log("printing updated section api result=",result)
    } catch (error) {
        console.log("UPDATE SECTION API ERROR...", error);
        toast.error(error.message);
    }
    finally{
        toast.dismiss(toastId);
        return result
    }
}

export const deleteSection=async (data,token)=>{
    let result=null;
    const toastId=toast.loading("loading...")
    try {
        const response=await apiConnector("POST",DELETE_SECTION_API,data,{
            authorization:`Bearer ${token}`,
        });
        console.log("delete section api response",response);
        if(!response?.data?.success){
            throw new Error("could not delete secction");
        }
        toast.success("course section deleted");
        result=response?.data?.updatedCourse;
        console.log("delete api result ...",result);
    } catch (error) {
        console.log("delete section api error",error)
        toast.error(error.message)
    }
    finally{
        toast.dismiss(toastId);
        return result;
    }
}

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      authorization: `Bearer ${token}`,
    });
    console.log("DELETE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.data;
    console.log("Delete subsection API RESULT", result);
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection=async(data,token)=>{
    let result=null;
    const toastId=toast.loading("loading...")
    try {
        const response=await apiConnector("POST",CREATE_SUBSECTION_API,data,{
            authorization:`Bearer ${token}`
        })
        console.log("create sub section api response",response);
        if(!response?.data?.success){
            throw new Error("could not add lecture")
        }
        toast.success("Lecture Added");
        result=response?.data?.updatedCourse;
        console.log("result response from creating subsection",response);
    } catch (error) {
        console.log(error.message)
        console.log("create sub section api error",error);
    }
    finally{
        toast.dismiss(toastId)
        return result
    }
}

export const updateSubSection=async(data,token)=>{
    let result=null
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",UPDATE_SUBSECTION_API,data,{
            authorization:`Bearer ${token}`
        })
         console.log("UPDATE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
         throw new Error("Could Not Update Lecture");
        }
        toast.success("Lecture Updated");
        result = response?.data?.data;
    } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}
export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteCourse=async(data,token)=>{
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("DELETE",DELETE_COURSE_API,data,{
            authorization:`Bearer ${token}`
        })
        console.log("DELETE COURSE API RESPONSE............", response)
          if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }

     toast.success("Course Deleted")
    } catch (error) {
          console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
    }
      toast.dismiss(toastId)
}