import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
// import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-md text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-md">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              {/* <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              /> */}
            </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              {/* <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              /> */}
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footer />
        </>
      )
    }
    
    export default Catalog


// import React, { useEffect, useState } from "react";
// import { getCatalogPageData } from '../services/operations/pageAndComponentData';
// import { categories } from '../services/apis';
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { apiConnector } from "../services/apiconnector";

// const Catalog=()=>{
//     const [active,setActive]=useState(1)
//     const {loading}=useSelector((state)=>state.profile)
//     const {catalogName}=useParams();
//     const [catalogPageData,setCatalogPageData]=useState(null)

// const [categoryId,setCategoryId]=useState("")

 
//     useEffect(()=>{
//         //fetch all categories
//         const getCategories=async()=>{
//             const res=await apiConnector("GET",
//                 categories.CATEGORIES_API
//             )
// // get the id of the category which is present on that param or url by matching it from all the categories
//             const category_id=res?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
//             setCategoryId(category_id)
//         }
//         getCategories()
//     },[catalogName])//fetch the category id every time the param changes
// //now use this category id to fetch the category page data to be shown
//     useEffect(()=>{
//         const getCategoryDetails=async()=>{
//             try {
//                 const res=await getCatalogPageData(categoryId)
//             console.log("printing res of catalog page data",res)
//             setCatalogPageData(res)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         // IF U have that category id then fetch all page data related to it
//         if(categoryId){
//             getCategoryDetails();
//         }
//     },[categoryId])

// return (
// <> 
// {/* hero section */}
// <div className="text-white">
//     <div>
//         <p>
//             {`Home / Catalog / `}
//             <span>
//                 {catalogPageData?.data?.selectedCategory?.name}
//             </span>
//         </p>
//         <p>{catalogPageData?.data?.selectedCategory?.name}</p>
//         <p>{catalogPageData?.data?.selectedCategory?.description}</p>
//     </div>
// </div>
// {/* section 1 */}
// <div>
//     <div>
//         Course to get you started
//     </div>
//     <div>
//         <p className={`px-2 py-2 ${
//             active===1  ?
//         "border-b border-b-yellow-25 text-yellow-25":"text-richblack-50"} cursor-pointer`} 
//         onClick={()=>setActive(1)}>
//             Most Popular
//         </p>
//          <p className={`px-4 py-2 ${
//         active===2 ? " border-b border-b-yellow-25 text-yellow-25"
//         :"text-richblack-50"
//     } cursor-pointer `}
//         onClick={()=>setActive(2)}
//     >
//         New
//     </p>
//     </div>
// </div>
// <div>
// <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}></CourseSlider>
// </div>
// {/* section 2 */}
// <div>
//     <div>
//         Top Courses in {catalogPageData?.data?.differentCategory?.name}
//         <div>
//             <CourseSlider Courses={catalogPageData?.data?.differentCategory}></CourseSlider>
//         </div>
//     </div>
// </div>
// {/* section 3 */}
// <div>
//     <div>
//         Frequently Brought
//     </div>
//     <div>
//         <div>
//             {catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,i)=>(
//                 <Course_Card course={course} key={i} Height={"h-[400px]"}></Course_Card>
//             ))  }
//         </div>
//     </div>
// </div>
// </>        
// )
// }
// export default Catalog