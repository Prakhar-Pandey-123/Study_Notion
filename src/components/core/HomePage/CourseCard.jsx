import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard=({cardData,currentCard,setCurrentCard})=>{
return(
    <div onClick={() => setCurrentCard(cardData?.heading)}
    className={`flex flex-col 
        ${
            currentCard === cardData.heading
              ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 "
              : "bg-richblack-800"
          }
    p-4 gap-8 w-[30%] cursor-pointer`}>
        <div className={` text-[20px] font-semibold 
            ${currentCard===cardData.heading ?"text-richblack-800":"text-richblack-25"}
            transition-none
            `}
        >
            {cardData.heading}
        </div>
        <div className="text-richblack-400 text-[16px]">
            {cardData.description}
        </div>
        <div className="flex flex-row text-richblack-300 text-[16px] justify-between">
            <div className="flex flex-row gap-3 items-center">
            <HiUsers />
            {cardData.level}
            </div>
            <div className="flex flex-row gap-3 items-center">
            <ImTree />
            {cardData.lessionNumber}
            </div>
        </div>
    </div>
)
}
export default CourseCard