const GetAvgRating=(ratingArr)=>{
//ratingArr = [{rating: 4}, {rating: 5}, {rating: 3}]
    if(ratingArr?.length ===0 ) return 0;//if no rating
    const totalReviewCount=ratingArr?.reduce((acc,curr)=>{
        acc+=curr.rating
        return acc
//reduce will give each element one by one,acc=accumulator(running result), curr=current element.Starts with the initial value (here 0).
    },0)
    const multiplier=Math.pow(10,1)
    //[4, 5, 3]:totalReviewCount = 12
// length = 3, average = 12 / 3 = 4.0
// then multiply by 10 so lets say 4.266 becomes 42.6 
// round off will give 43  and div by 10 gives 4.3
    const avgReviewCount=Math.round( (totalReviewCount/ratingArr?.length)*multiplier )   /multiplier
    
    return avgReviewCount
}
export default GetAvgRating