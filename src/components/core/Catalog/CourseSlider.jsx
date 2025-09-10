import React from 'react'
import Course_Card from "./Course_Card"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


import { FreeMode } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
//no of slides visible at once,1 means one slide visible at a time 
          spaceBetween={25}
          // gap between slides
          freeMode={true}
          // lets user scroll freely
          pagination={{ clickable: true }}
//shows dots and clickable means user can click on dots to navigate
          navigation={true}
          // shows next and previous arrows
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          // enables automatic sliding every 3 seconds and doesn't stop autoplay on user interaction
          loop={true}
          // enables continuous loop mode
          modules={[FreeMode, Pagination,Navigation,Autoplay]}
          // all features imported from swiper
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          // on large screens 3 slides will be shown
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider