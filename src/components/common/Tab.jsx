export default function Tab({tabData,field,setField}){
    return(
        <div style={{  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}
        className=" flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
        >
        {
            tabData.map
        }
            
        </div>
    )
}