// this functions needed to be told the method ,url of backend , body, headers, params and then it will hit that backend route with that data thats the function of this fn
//frontend -> button -> click button -> services -> call the backend ->controllers are called -> get data from them
import axios from "axios"

export const axiosInstance=axios.create({});
//Instead of configuring Axios every time  axios.get(), axios.post(), you create one instance to use everywhere
//now a helper fn for api calls
export const apiConnector=(method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method:`${method}`,//method	HTTP method (GET, POST, etc.)
        url:`${url}`,//"/api/users"
        data:bodyData ? bodyData: null,//	{ name: "John" }
        headers:headers ? headers: null,//{ "Authorization": "Bearer token" }
        params:params ? params: null,
    })
}
// apiConnector(
//   "POST", 
//   "/api/login", 
//   { email: "test@example.com", password: "123" }, 
//   { "Content-Type": "application/json" }
// );