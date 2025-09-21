// the only job of apis.js is to integrate the various last URL "/...."  with the base route and provide the routes together
const BASE_URL =process.env.REACT_APP_BASE_URL
// REACT_APP_BASE_URL=http://localhost:4000/api/v1  ////hit this route of backendto go to the course route(its a router) of backend which in turn contains showallcategories route 
export const categories={
    CATEGORIES_API:BASE_URL+"/course/showAllCategories",
}
// Backend route setup=>
    //  Inside Course.js router file
// router.get("/showAllCategories", showAllCategories); 
// const courseRoutes = require("./routes/Course");
// app.use("/api/v1/course", courseRoutes); // Base path: /api/v1/course
// Full path: /api/v1/course/showAllCategories
export const endpoints={
     SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const profileEndpoints={
     GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
     GET_INSTRUCTOR_DATA_API:BASE_URL+"/profile/instructorDashboard",
}
export const settingsEndpoints={
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

export const courseEndpoints={
GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
    
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    DELETE_SECTION_API:BASE_URL+ "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API:BASE_URL+"/course/getInstructorCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",

    CREATE_RATING_API: BASE_URL + "/course/createRating",
}
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

export const studentEndpoints={
    ENROLL_STUDENTS_API : BASE_URL+"/payment/enrollStudents"
}
export const ratingEndpoints={
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}