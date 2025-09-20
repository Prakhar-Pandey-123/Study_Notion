import React from "react"
import {useEffect,useState} from "react"
import ReactStars from "react-rating-stars-component"
// import swiper from the package
import {Swiper,SwiperSlide} from "swiper/react"
import {apiConnector} from "../../services/apiconnector"
import { ratingEndpoints } from "../../services/apis"
//import swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

// import icons
import {FaStar} from "react-icons/fa"
// import required modules of the swiper 
import { Autoplay, FreeMode, Pagination } from "swiper/modules"


function ReviewSlider(){
    const [reviews,setReviews] =useState([])
    const truncateWords=15

    useEffect(()=>{
        const getReviews=async()=>{
            const {data}=await apiConnector(
                "GET",
                ratingEndpoints.REVIEWS_DETAILS_API
            )
            if(data?.success) 
                setReviews(data?.data);
        }
        getReviews();
    },[])

    return(
        <div className="text-white">
            <div className="my-[50px] h-[184px] max-w-maxContent">
            <Swiper
                slidesPerView={4}
                spaceBetween={25}
                loop={true}
                freeMode={true}
                autoplay={{
                    delay:2500,
                    disableOnInteraction:false
                }}
                modules={[FreeMode,Pagination,Autoplay]}
                className="w-full"
            >
            {
                reviews.map((review,i)=>{
                    return(
                    <SwiperSlide key={i}>
                        <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                        <div className="flex items-center gap-4">
                        <img
                        src={
                            review?.user?.image?review?.user?.image: `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                            }
                            alt=""
                            className="h-9 w-9 rounded-full object-full"
                        >
                        </img>
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-richblack-5">
                            {`${review?.user?.firstName} ${review?.user?.lastName}`}
                            </h1>
                            <h2 className="text-[12px] font-medium text-richblack-500">
                            {review?.course?.courseName}
                            </h2>
                        </div>
                        </div>
                        {/* text-md → sets the font size.
Example: text-md = font-size: 1rem; line-height: 1.5rem;
It controls how big the text looks.
font-medium → sets the font weight.
Example: font-medium = font-weight: 500;
It controls how thick/bold the text looks */}
                        <p className="font-medium text-richblack-25">
                        {review?.review.split(" ").length>truncateWords?`${review?.review.split(" ").slice(0,truncateWords).join(" ")}`:`${review?.review}`}
                        </p>
                        <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-yellow-100">
                            {review.rating.toFixed(1)}
                        </h3>
                        <ReactStars
                            count={5}
                            value={review.rating}
                            size={20}
                            edit={false}
                            activeColor='#ffd700'
                            emptyIcon={<FaStar></FaStar>}
                            fullIcon={<FaStar></FaStar>}
                        >

                        </ReactStars>
                        </div>
                        </div>
                    </SwiperSlide>
                    )
                })
            }
            </Swiper>
            </div>

        </div>
    )


}
export default ReviewSlider