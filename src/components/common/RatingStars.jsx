import React from "react";
import {
    TiStarFullOutline,// full star
    TiStarHalfOutline,//half star
    TiStarOutline,//empty star
} from "react-icons/ti"
import { useState,useEffect } from "react";
function RatingStars({Review_Count,Star_Size}){
    // eg of review count 3.5, 4,
    const [starCount,setStarCount]=useState({
        full:0,
        half:0,
        empty:0,
    })
    useEffect(()=>{
        const wholeStars=Math.floor(Review_Count)||0
        setStarCount({
            full:wholeStars,
            half:Number.isInteger(Review_Count)?0:1,
        //if its an int then no half stars else 1 half star
            empty:Number.isInteger(Review_Count)?5-wholeStars:4-wholeStars,
            // if 3.5 then whole stars=3 , half stars=1 empty = 4-3
            // if 4 then whole =3 ,half=0, empty=5-4
        })
    },[Review_Count])
    return(
         <div className="flex gap-1 text-yellow-100">
      {[...new Array(starCount.full)].map(( i) => {
        return <TiStarFullOutline key={i} size={Star_Size || 20} />
      })}
{/* creates a new array of size of no of full stars ... makes it iterable array so we can use map and for each element make a star*/}
      {[...new Array(starCount.half)].map(( i) => {
        return <TiStarHalfOutline key={i} size={Star_Size || 20} />
      })}
      {[...new Array(starCount.empty)].map(( i) => {
        return <TiStarOutline key={i} size={Star_Size || 20} />
      })}
    </div>
    )
}
export default RatingStars