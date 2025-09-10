import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
    // <RequirementField
    //         name="courseRequirements"
    //         label="Requirements/Instructions"
    //         register={register}
    //         errors={errors}
    //         setValue={setValue}
    //         getValues={getValues}
    //     />
const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const {editCourse, course} = useSelector((state) => state.course);


    useEffect(()=> {
        register(name, {
            required:true,
            // validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=> {
//when we add or remove req, then change in reqlist should be known to form and shown on ui 
        setValue(name, requirementList);
        if(editCourse) {
    //when we are editing then there must be pre-present data show that on ui
            setRequirementList(course?.instructions);
            setValue(name, course?.instructions);
        }
    },[requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);//copy the array +add one
            //setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];//copy the array 
        updatedRequirementList.splice(index, 1);//remove that index ,1=remove once
        setRequirementList(updatedRequirementList);
    }

  return (
    <div className=''>

        <label className='text-sm text-richblack-5' htmlFor={name}>{label}<sup className='text-pink-200'>*</sup></label>
        <div>
            <input
                type='text'
                id={name}
                value={requirement}
//  setting a value for a input tag is used to show what text is inputed in the box on ui
                onChange={(e) => setRequirement(e.target.value)}
                className='form-style w-full bg-richblack-900 p-1 rounded-md'
            />
            <button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-50 mt-3'>
                Add
            </button>
        </div>

        {
            requirementList.length > 0 && (
                <ul className='mt-2 list-inside list-disc'>
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5'>
                                <span>{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='ml-2 text-xs text-pure-greys-300 '>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label} is required
            </span>
        )}
      
    </div>
  )
}

export default RequirementField
// setRequirementList(["A", "B", "C"]); // Replaces the entire array
//setRequirementList((prevList) => [...prevList, "New Item"]); // Adds to the array
// setRequirementList((prevList) => {
//   const updatedList = [...prevList, "New Item"];
//   return updatedList;
// setRequirementList({ ...prevList, newKey: "value" }); // Merge with existing
// setRequirementList(null); // Now `requirementList` is `null`