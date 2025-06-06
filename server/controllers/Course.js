const Course=require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/User");
const Section=require("../models/Section")
const SubSection =require("../models/SubSection")
const {uploadImageToCloudinary}=require("../utils/imageUploader");
//we are creating this function to create the course by the instructor

exports.createCourse=async function(req,res){
try {
//fetch data of the new course that is needed to be created
    const {courseName,courseDescription,whatYouWillLearn,price,category,tags,status,instructions}=req.body;
//req will come from the frontend send by user
//we need tag bcoz tag will contain all the related courses 
//get thumbnail of the course.thumbnail will be present in local storage first uploaded by instructor in files
    const thumbnail=req.files.thumbnailImage;
    //validation if all entries are entered
    if(!courseName ||!courseDescription ||!whatYouWillLearn ||!price ||!category ||!thumbnail ){
        return res.status(400).json({
            success:false,
            message:"all fields are mandatory"
        })
    }
    if (!status || status === undefined) {
			status = "Draft";
		}
//check for instructor bcoz in Course schema u need to store the instructor(id) of the creator /instructor
    const userId=req.user.id;
//it is stored in the payload and attached to the token after user has logged in and then saved in req.user after token has been decoded 
    const instructorDetails=await User.findById(userId);
    console.log("instructor details:",instructorDetails);
    if(!instructorDetails){
        return res.status(400).json({
            success:false,
            message:"instructor details not found"})
    }
//check given category exists or not as it comes from the dropdown of the frontend but if it comes form postman it could be wrong.also the received category will be an id
    const categoryDetails=await Category.findById(category);
    if(!categoryDetails)
    {
        return res.status(401).json({
            success:false,
            message:"category details not found"})
    }
    
//upload image to cloudinary it requires a file and folder name,it will return a secure url
    const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);  
    //create an entry for new Course in db
    const newCourse=await Course.create({
        courseName:courseName,
        courseDescription:courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn:whatYouWillLearn,
        price:price,
        tags:tags,
        category:categoryDetails._id,//or can do tag:tag 
        thumbnail:thumbnailImage.secure_url//returned from cloudinary
    })
//update instructor add this course in courselist if it were a student then he will have to buy it and if its an instructor the course he upload will be added there
    await User.findByIdAndUpdate({
        _id:instructorDetails._id},
        {
//$push: A MongoDB method used to add a value to an array field
            $push:{
                courses:newCourse._id
            }
        },
        {new:true}
    )
//update the tag schema-->todo hw
   let response1= await Category.findByIdAndUpdate({
                  _id:categoryDetails._id },{
                    $push:{
                        courses:newCourse._id
                    } },{new:true});
    if(response1){
        console.log(`course added to the category course list successfully ${response1.name}`);
    }
    else
    console.log("failed to add course to category course list");
return res.status(200).json({
    success:true,
    message:"course created successfully",
    data:newCourse
    })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"failed to create course",
        error:error.message})
}}
//show all courses available
exports.showAllCourses=async function(req,res){
    try{
        const allCourses=await Course.find({},{
            courseName:true,//i surely want this field
            price:true,
            thumbnail:true,
            instructor:true,
            tags:true,
            category:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }).populate("instructor").exec();
//in Course the instructor field will be an objectid .populate will replace the id with the actual instructor details
// exec() => Optional..It executes the query and returns a real Promise.
return res.status(200).json({
    success:true,
    message:"data of all courses fetched successfully",
    data:allCourses
    })
}
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"cannot fetch course data",
            error:error.message
        })
    }
}
//get all details of a particular course
exports.getCourseDetails=async function(req,res){
    try{
        //get id
        const {courseId}=req.body;
        //find course details
        const courseDetails=await Course.findById(courseId)
//now in course the instructor is an objectid of user and which in turn contain an objectid of additional details as profile
        .populate({
                        path:"instructor",
                        populate:{
                            path:"additionalDetails"
                        },//we have objectid of category but in category we dont have any other objectid hence we did like this
                  }).populate("category")
                  .populate("ratingAndReviews")
                  .populate({
                    path:"courseContent",
                    populate:{
                        path:"subSection",
                    }
                  }).exec();
//validation
                  if(!courseDetails){
                    return res.status(400).json({
                        success:false,
                        message:"course details can't be fetched ",
                    })
                  }
                  else{
                    return res.status(200).json({
                        success:true,
                        message:courseDetails,
                    })
                  }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
//edit course details
exports.editCourse=async(req,res)=>{
    try {
        const {courseId}=req.body
        const updates=req.body
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                error:"course not found"
            })
        }
    //if thumbnail img is found ,upadate it
    if(req.files){
        console.log("thumbnail update")
        const thumbnail=req.files.thumbnailImage
        const thumbnailImage=await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        )
        course.thumbnail=thumbnailImage.secure_url
    }
    //update only the fields that are present in req body
     for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }
    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findByIdAndUpdate(courseId,{
        status:"Published"
    })



    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    // for (const key in updates) {
    //   if (updates.hasOwnProperty(key)) {
    //     if (key === "tag" || key === "instructions") {
    //       course[key] = JSON.parse(updates[key])
    //     } else {
    //       course[key] = updates[key]
    //     }
    //   }
    // }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// get all courses created by an instructor
exports.getInstructorCourses=async(req,res)=>{
  try {
    const instructorId=req.user.id
    const instructorCourses=await Course.find({
      instructor:instructorId
    })
    res.status(200).json({
      success:true,
      data:instructorCourses
    })
  } catch (error) {
     console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete  sub-sections firstly
    const courseSections = course.courseContent
    // for every sections of the course
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          // delete every subsection that section
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section and now more to other section through that loop
      await Section.findByIdAndDelete(sectionId)

    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}