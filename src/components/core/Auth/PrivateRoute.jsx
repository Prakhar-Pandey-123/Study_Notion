import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
//can also use -> useNavigate hook

// This is a Private Route component in React that checks if a user is authenticated (has a valid token) before allowing access to protected routes. If the user is not authenticated, they are redirected to the /login page

const PrivateRoute=({children})=>{
    const {token}=useSelector((state)=>state.auth);
   if (token!==null)
    return children
// children → The protected content (e.g., a dashboard page) that should only render if the user is authenticated.
else 
return <Navigate to="/login"></Navigate>
}
export default PrivateRoute

// User manually enters the URL http://localhost:3000/dashboard/my-profile. React Router checks the route and sees it's wrapped in PrivateRoute.PrivateRoute checks Redux (state.auth.token) or localStorage for a valid token.If token exists → Renders the MyProfile component. If token is missing → Redirects to /login (or another auth route).
// if the route is not wrapped with this compoenent then user will go to that route and will see undefined objects 