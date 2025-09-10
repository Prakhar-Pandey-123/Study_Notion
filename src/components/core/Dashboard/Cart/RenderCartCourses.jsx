import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../slices/cartSlice'
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div className='flex flex-1 flex-col'>
    {
        // It makes the element expand to fill any available space in its flex container.
// If there are multiple siblings with flex-1, they share the available space equally.
        cart.map((course, index) => (
            <div key={index} className='flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-richblack-400 pb-6 false pt-6'>
                <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
                    
                    
                    <img className='md:h-[148px] md:w-[220px] h-[100px] w-[180px] rounded-lg object-cover' src={course?.thumbnail} />
                   
                    <div className='flex flex-col space-y-1'>
                        <p className='text-lg font-semibold text-richblack-5 poppins'>{course?.courseName}</p>
                        <p className='text-sm text-richblack-300'>{course?.category?.name}</p>
                       
                        <div className='flex items-center gap-2'>
                            <span className='text-yellow-5'></span>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emtpyIcon={<GiNinjaStar />}
                                fullIcon={<GiNinjaStar />}
                            /> 
{/* // count=Total number of stars to display
// size=Size of stars in pixels
// edit	false=Disables user interaction (read-only mode)
// activeColor=	Color of filled stars (gold)
// emptyIcon=Custom icon for empty stars 
// fullIcon	=Custom icon for filled stars */}
                            <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>

                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-end  space-y-2 crimson'>
                    <p className='mb-6 text-2xl md:text-3xl font-medium text-yellow-100'>₹ {course?.price} </p>
                    <button className='flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-2 px-[8px] text-pink-200 text-lg font-medium'
                    onClick={() => dispatch(removeFromCart(course._id))}
                    >
                        <RiDeleteBin6Line/>
                        <span></span>
                    </button>
                </div>
            </div>
        ))
    }
      
    </div>
  )
}

export default RenderCartCourses
