const express=require("express")
const router=express.Router()

const {enrollStudents}=require("../controllers/Payments")
const {auth,isStudent}=require("../middlewares/auth")

router.post("/enrollStudents",auth,isStudent,enrollStudents);
module.exports=router
//  ENROLL_STUDENTS_API : BASE_URL+"/payment/enrollStudents"