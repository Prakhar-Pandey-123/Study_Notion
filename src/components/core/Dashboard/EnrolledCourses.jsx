import Reacts, { useEffect,useState } from "react";
import {useSelector} from "react-redux"
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI';
// this fn will make the be call to get all enrolled courses
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourse=()=>{
    const {token}=useSelector((state)=>state.auth);
    const [enrolledCourses,setEnrolledCourses]=useState(null);
    const getEnrolledCourse=async () => {
        try {
            const response=await getUserEnrolledCourses(token);
            setEnrolledCourses(response)
        }
         catch (error) {
            console.log("unable to fetch enrolled courses")
        }
    }
    useEffect(()=>{
        getEnrolledCourse();
    },[]);
   return(
    <div className="text-white">
        <div>Enrolled courses</div>
        {
            !enrolledCourses ? (<div>Loading...</div>):(
                !enrolledCourses.length ?(<p>You have not enrolled in any courses yet</p>):(
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>
                        {/* not show all courses in card form */}
                        {
                            enrolledCourses.map((course,index)=>(
                                <div>
                                    <div>
                                        <img src={course.thumbnail}/>
                                        <div>
                                            <p>{course.courseName}</p>
                                            <p>{course.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {course?.totalDuration}
                                    </div>
                                    <div>
                                        <p>Progress:{course.progressPercentage || 0} %</p>
                                        <ProgressBar
                                                    completed={course.progressPercentage ||0}
                                                    height="8px"
                                                    isLabelVisible={false}
                                                    ></ProgressBar>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            )
        }
    </div>
   )
}
export default EnrolledCourse