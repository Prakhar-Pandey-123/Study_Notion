import { toast } from "react-hot-toast"
import { studentEndpoints } from "../apis"
import {apiConnector} from "../apiconnector"
import {resetCart} from "../../slices/cartSlice"

const {ENROLL_STUDENTS_API} =studentEndpoints

// export const studentEndpoints={
//     ENROLL_STUDENTS_API : BASE_URL+"/payment/enrollStudents"
// }
export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId=toast.loading("Loading...");
    console.log("inside buy course fn")
    try{
        console.log("before api call")
        const enrolled=await apiConnector("POST",ENROLL_STUDENTS_API,{
            courses},{
                authorization:`Bearer ${token}`,
                })
                console.log("after api call")
        console.log("ENROLL_STUDENTS_API response --->",enrolled)
        toast.success("You are successfully added to the course");
        console.log("before navigate ")
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
        console.log("after navigate")
    }
    catch(error){
        console.log("enrollment ERROR...",error)
        toast.error(error.message);

    }
    finally{
        console.log("finally reached");
toast.dismiss(toastId);
    }
}
