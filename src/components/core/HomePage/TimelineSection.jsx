import React from "react";
import Logo1 from "../../../assets/images/Logo1.svg"
import Logo2 from "../../../assets/images/Logo2.svg"
import Logo3 from "../../../assets/images/Logo3.svg"
import Logo4 from "../../../assets/images/Logo4.svg"
import timelineImage from "../../../assets/images/TimelineImage.png"
const timeline=[
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully commited to the success company",
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Fully commited to the success company",
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"Fully commited to the success company",
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Fully commited to the success company",
    },
]

const TimelineSection=()=>{
    return (
        <div>
            <div className="flex flex-row gap-15">
                <div className="w-[45%] flex flex-col gap-5" >
                    {
                        timeline.map((element,index)=>{
  {/* Helps React identify items — When the list changes, React uses the key to match old items with new ones.Avoids bugs — Without keys, React may re-use the wrong DOM elements, causing visual or logical bugs. */}
                            return(
                                <div className="flex flex-row gap-6" key={index}>
                                    <div className="w-[50px] h-[50px] bg-white flex items-center">
                                        <img src={element.Logo} alt="" ></img>
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                        <p>{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="relative shadow-blue-200">
                    <img src={timelineImage} alt="timelineimage" className="shadow-white object-cover h-fit">
                    </img>
                    <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                        left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-carribbeangreen-300 text-sm">Years of Experience</p>
                        </div>
                        <div className="flex gap-5 items-center px-7">
                             <p className="text-3xl font-bold">250</p>
                             <p className="text-carribbeangreen-300 text-sm">Type of Courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TimelineSection