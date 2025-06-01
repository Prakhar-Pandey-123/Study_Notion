import React from "react";
import { useState } from "react";
import {HomePageExplore} from '../../../data/homepage_data'
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";
const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
// We use useState in React when we want to store and update data inside a component. This data can change when users interact with your app (like clicking a button, typing, etc.).
const ExploreMore=()=>{
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

const setMyCards=(value)=>{
    setCurrentTab(value);
    const result=HomePageExplore.filter((ele)=>{
        return ele.tag===value
    });
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
}

return (
    <div>
        <div className="text-4xl font-semibold">
            Unlock the 
            <HighlightText text={"Power of Code"}></HighlightText>
        </div>
        <p className="text-center text-richblack-300 text-sm text-[20px] mt-3">
            Learn to build anything you can imagine
        </p>

        <div className="flex flex-row rounded-full mb-5 bg-richblack-800 border-richblack-100 mt-5 px-2 py-2 gap-6">
            {
                tabsName.map((element, index)=>{
                    return (
                        <div className={`text-[20px] flex flex-row items-center gap-2 
                         ${currentTab===element ?"bg-richblack-900 text-richblack-5 font-medium":
                            "text-richblack-200 "}  rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 `}
                            key={index}
                            onClick={()=>setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>
        <div className="h-[150px]">
        </div>
        <div className="absolute flex flex-row gap-10 w-full
        translate-x-[-20%] translate-y-[-70%] mt-8">
            {
                courses.map((element,index)=>{
                    return(
                        <CourseCard
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        >
                        </CourseCard>
                    )
                })
            }

        </div>
    </div>
        
)
}
export default ExploreMore