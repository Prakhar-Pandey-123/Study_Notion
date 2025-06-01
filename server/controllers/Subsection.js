const SubSection=require("../models/SubSection");
const Course = require("../models/Course");
const Section=require("../models/Section");
const {uploadImageToCloudinary}=require("../utils/imageUploader");


require("dotenv").config();
//create subsection which is bascially a video
exports.createSubSection=async function(req,res){
    try {
//fetch data from req body(sectionid in which the subsection need to be inserted)
        const{sectionId,title,description,courseId}=req.body
//extract the video from file
const video=req.files.videoFile;
        //validate data
        if(!video){
            return res.status(400).json({
                success:false,
                message:"video file is required"
            })
        }
    //     if(!sectionId|| !title || !courseId || !description || !video)
    //         return res.status(400).json({
    //     success:false,
    //     message:"all fields are required"
    // })
    const ifsection=await Section.findById(sectionId);
    if(!ifsection){
        return res.status(401).json({
            success:false
            ,message:"section not found"
        })
    }
//upload video to cloudinary we can upload videos too
const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
//create a subsection
const subSectionDetails=await SubSection.create({
    title:title,
    description,
    videoUrl:uploadDetails.secure_url
})
//update the section with this subsection object id
const updatedSection=await Section.findByIdAndUpdate(sectionId,
    {
//{_id:sectionId}= sending this is wrong as findbyid expects a direct id not an object 
        $push:{
            subSection:subSectionDetails._id
        },
    },{new:true}
).populate("subSection");
//return response    
const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();

return res.status(200).json({
    success:true,
    message:"sub section created successfully",
    updatedCourse,
})
} catch (error) {
    return res.status(500).json({
        success:false,
        message:"sub section can't be created",
        error:error.message
    })      
    }
 }

 // hw: updateSubSection (without video)
exports.updateSubSection = async (req, res) => {
  try {
    // 1. Pull necessary IDs and fields from the request body
    const { subSectionId, title, description, courseId, sectionId } = req.body;

    // 2. Basic validation: ensure IDs are present
    if (!subSectionId || !courseId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: subSectionId, sectionId, or courseId",
      });
    }

    // 3. Find the subsection document
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    // 4. Update only the fields that were provided
    if (title) {
      subSection.title = title;
    }
    if (description) {
      subSection.description = description;
    }

    // 5. Save the changes to the DB
    await subSection.save();

    // 6. (Optional) Re‐fetch the parent section to ensure it's up to date
    //    You might use this if you need to return section‐level details elsewhere.
    const updatedSection = await Section.findById(sectionId).populate("subSection");

    // 7. Re‐fetch the entire course with nested populations:
    //    - First populate courseContent (sections)
    //    - Then for each section, populate its subSection array
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // 8. Return the updated course in the response
    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating the subsection:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// //hw:updateSubSection
// exports.updateSubSection=async(req,res)=>{
//     try{
//         const {SubsectionId,title,description,courseId,sectionId}=req.body
//         const video=req?.files?.videoFile;
//         let uploadDetails=null
//         if(video){
//             uploadDetails=await uploadImageToCloudinary(
//                 video,
//                 process.env.FOLDER_NAME
//             )
//         }
//         const subSection=await SubSection.findById(SubsectionId);
//         if(title){
//             subSection.title=title
//         }
//         if(description){
//             subSection.description=description
//         }
//        await subSection.save()
       
//     // find updated section and return it
//     const updatedSection = await Section.findById(sectionId).populate(
//       "subSection"
//     )

//         const updatedCourse=await Course.findById(courseId).populate({
//             path:"courseContent",
//             populate:{
//                 path:"subSection"
//             }
//         }).exec()

//         return res.status(200).json({
//             success:true,
//             data:updatedCourse
//         })

//     }
//     catch(error){
//         console.log("error updating the subsection",error)
//         return res.status(500).json({
//             success:false,
//             message:"internal server error",
//             error:error.message,
//         })
//     }
// }




//hw:deleteSubSection
exports.deleteSubSection=async function(req,res){
    try{
        const {subSectionId,courseId}=req.body;
        const sectionId=req.body.sectionId;
    if(!subSectionId || !sectionId){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        })
    }

    const ifsubsection=await SubSection.findById({_id:subSectionId});

    const ifsection=await Section.findById({_id:sectionId});
    if(!ifsubsection){
        return res.status(400).json({
            success:false,
            message:"subsection not found"
        })
    }
    if(!ifsection){
        return res.status(400).json({
            success:false,
            message:"section not found"
        })
    }

    await Section.findByIdAndUpdate(sectionId,{
        $pull:{
            subSection:subSectionId
        }
    });
    await SubSection.findByIdAndDelete(subSectionId)
    const updatedSection=await Section.findById(sectionId).populate("subSection")

    const updatedCourse = await Course.findById(courseId).populate
    ({ path: "courseContent",
         populate: { 
            path: "subSection" } })
            .exec();

    return res.status(200).json({
        success:true,
        message:"subsection deleted successfully",
        data:updatedCourse,
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}