import {toast} from "react-hot-toast"
import {apiConnector} from "../apiconnector"
import {catalogData} from "../apis"
export const getCatalogPageData=async(categoryId)=>{
    let result=[]
    const toastId=toast.loading("Loading...")
    try {
        const response =await apiConnector("POST",
            catalogData.CATALOGPAGEDATA_API,
            {
                categoryId:categoryId
            }
        )
        if(!response?.data?.success)
            throw new Error("could not fetch category page data")
        result=response?.data;
    } catch (error) {
        console.log("catalog page data api error",error)
        toast.error(error.message)
        result=error.response?.data;
    }
    toast.dismiss(toastId)
    return result;
}