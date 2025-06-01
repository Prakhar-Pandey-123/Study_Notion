import React from "react";
import {FaTimes} from "react-icons/fa"
import { useSelector } from "react-redux";
// cross icon
import { useState,useEffect } from "react";
//  <ChipInput
//             label="Tags"
//             name="courseTags"
//   placeholder="Enter tags and press enter"
//             register={register}
//             errors={errors}
//             setValue={setValue}
//             getValues = {getValues}
//         />

const ChipInput=({name,label,register,errors,setValue})=>{
    const [tags,settags]=useState([])
    const {editCourse,course}=useSelector((state)=>state.course)

     useEffect(()=> {
        register(name, {
            required:true,
   
        });
        if(editCourse ) {
            settags(JSON.parse(course?.tag));
            setValue(name, JSON.parse(course?.tag));
        }
    },[])


return(
    <div>
        <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}<sup className="text-pink-200">*</sup></label>
        <div className="flex flex-wrap gap-2 m-2">   
            {
            tags.map((tag,index)=>(
                <div key={index} className="m-1 items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                <span className="text-richblack-5">
                    {tag}
                </span>
                <button type="button"
                    onClick={()=>{
                    const updatedTags=[...tags];
                    updatedTags.splice(index,1);
                    settags(updatedTags)
                    setValue(name,updatedTags);
                    }}
                    className="ml-2 text-richblack-5"
                >
                    <FaTimes></FaTimes>
                </button>
                </div>
            ))
            }
        </div>
        <input
            type="text"
            id={name}
            placeholder="Press enter or , to add a tag"
            className="form-style w-full rounded-md bg-richblack-5 bg-richblack-900 p-1 rounded-md"
            onKeyDown={(e)=>{
            if(e.key==='Enter' ||e.key===',')
            {
                e.preventDefault()
                if(e.target.value){
                    settags([...tags,e.target.value]);
                    setValue(name,[...tags,e.target.value])
                    e.target.value="";
                }
            }
            }}
        ></input>
     {
        errors[name] && <span className="text-xs text-pink-200">Tags are required</span>
     }
    </div>
)
}
export default ChipInput