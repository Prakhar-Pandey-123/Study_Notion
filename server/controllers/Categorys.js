const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
//eg) max=10 ,math.random=0.53 ,0.53*10 =5.3 floor(5.3)=5
const Course = require("../models/Course");
//function to let admin create a new category so that instructors can come and add courses 
exports.createCategory = async (req, res) => {
        try {//fetch data ,to be send by the admin
                const { name, description } = req.body;
                //validation
                if (!name || !description) {
                        return res.status(400).json({ success: false, message: "All fields are required" });
                }
                //create entyr in db
                const CategorysDetails = await Category.create({
                        name: name,
                        description: description,
                });
                console.log(CategorysDetails);
                return res.status(200).json({
                        success: true,
                        message: "Category Created Successfully",
                });
        } catch (error) {
                return res.status(500).json({
                        success: true,
                        message: error.message,
                });
        }
};
//to show all the categories present in this application
exports.showAllCategories = async (req, res) => {
        try {
                const allCategorys = await Category.find({},
                        { name: true, description: true });
                //{} =a filter. Empty {} means “get all documents”,
                // It means “only return name and description fields”.
                res.status(200).json({
                        success: true,
                        data: allCategorys,
                });
        }
        catch (error) {
                return res.status(500).json({
                        success: false,
                        message: error.message,
                });
        }
};
//to show all courses related to a category searched by user + show some popular courses + show courses other than that category
exports.categoryPageDetails = async (req, res) => {
        try {
                const { categoryId } = req.body;
                // Get courses for the specified category
                const selectedCategory = await Category.findById(categoryId)
                        .populate({
                                path: "courses",
                                match: { status: "Published" },
                                populate: [
                                        { path: "instructor" },
                                        { path: "ratingAndReviews" } 
                                ]
                        })
                        .exec();
                       // You use , to separate multiple populate objects inside an array.
                         // populate the 'courses' field in Category
        // only include courses with status 'Published'(apply filter)
     // further populate fields inside each course populate the 'instructor' field of the course populate the 'ratingAndReviews' field of the course

                // Handle the case when the category is not found
                if (!selectedCategory) {
                        console.log("Category not found.");
                        return res
                                .status(404)
                                .json({ success: false, message: "Category not found" });
                }
                // Handle the case when there are no courses
                if (selectedCategory.courses.length === 0) {
                        console.log("No courses found for the selected category.");
                        return res.status(404).json({
                                success: false,
                                message: "No courses found for the selected category.",
                        });
                }

                const selectedCourses = selectedCategory.courses;

                // Get courses for other categories
                const categoriesExceptSelected = await Category.find({
                        _id: { $ne: categoryId },//ne=not equals
                }).populate({ path: "courses", 
                        match: { status: "Published" }, 
                        populate: ([{ path: "instructor" },
                                 { path: "ratingAndReviews" }]) });
                
       let differentCategory = await Category.findOne(
        // get some random category from the categoriesExceptSelected array by using rand fn which give number till the array length
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
                
                let differentCourses = [];
                for (const category of categoriesExceptSelected) {
                        differentCourses.push(...category.courses);
                }

                // Get top-selling courses across all categories
                const allCategories = await Category.find().populate({ path: "courses",
                         match: { status: "Published" },
                          populate: ([{ path: "instructor" }, 
                                { path: "ratingAndReviews" }]) });

                const allCourses = allCategories.flatMap((category) => category.courses);
//  Combines all courses arrays from each category into a single array of courses.
                
                const mostSellingCourses = allCourses
                        .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
// .sort() method arranges the courses in descending order (highest to lowest) a.studentsEnrolled.length = number of students in course A, By subtracting (b - a), we get descending order
                        .slice(0, 10);
// .slice(0, 10) method takes the first 10 courses from the sorted array

                res.status(200).json({
                        success: true,
                        data:{
                        selectedCategory,
                          differentCategory,
                        selectedCourses: selectedCourses,
                        differentCourses: differentCourses,
                        mostSellingCourses: mostSellingCourses,
                        }
                });
        } catch (error) {
                return res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message,
                });
        }
};

//add course to category
exports.addCourseToCategory = async (req, res) => {
        const { courseId, categoryId } = req.body;
        // console.log("category id", categoryId);
        try {
                const category = await Category.findById(categoryId);
                if (!category) {
                        return res.status(404).json({
                                success: false,
                                message: "Category not found",
                        });
                }
                const course = await Course.findById(courseId);
                if (!course) {
                        return res.status(404).json({
                                success: false,
                                message: "Course not found",
                        });
                }
                if (category.courses.includes(courseId)) {
                        return res.status(200).json({
                                success: true,
                                message: "Course already exists in the category",
                        });
                }
                category.courses.push(courseId);
                await category.save();
                return res.status(200).json({
                        success: true,
                        message: "Course added to category successfully",
                });
        }
        catch (error) {
                return res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message,
                });
        }
}