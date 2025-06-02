import "./App.css";
import Catalog from "./pages/Catalog"
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
// to see the redux store and all states
import VerifyOtp from "./pages/VerifyOtp";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About"
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Cart from "./components/core/Dashboard/Cart/index"
import Contact from "./pages/ContactUs"
import Error from "./pages/Error"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Settings from "./components/core/Dashboard/Settings";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
//react-router-dom is used to:Show different pages (components).When user clicks buttons or links.Without reloading the whole pagereact-router-dom is used to:Show different pages (components)
function App() {
  return (
    //class is a reserved keyword in JavaScript (used for defining classes).So in JSX (which is JavaScript + HTML-like syntax), we use className to avoid confusion.
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {/* //Width = 100% of the screen (full width) .Minimum height = 100% of the screen (full height if needed)*/}
     
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/signup"
        element={
          <Signup></Signup>
        }
        ></Route>

        <Route path="/verify-email"
          element={
          <VerifyOtp></VerifyOtp>
        }
        >
          </Route>
        <Route path="/login"
            element={
              <Login></Login>
            }>
        </Route>

        <Route path="/forgot-password"
            element={
              <ForgotPassword></ForgotPassword>
          }>
        </Route>

        <Route path="/update-password/:id"
            element={
             <UpdatePassword></UpdatePassword>
          }>
        </Route>

        <Route path="/about"
            element={
             <About></About>
          }>
        </Route>

        <Route path="/contact"
            element={
             <Contact/>
          }>
        </Route>

      <Route
       path="catalog/:catalogName" 
       element={<Catalog/>} />
        {/* now lets see the nested routes of the dashboard */}
  <Route
   element={
   <PrivateRoute>
  <Dashboard></Dashboard>
   </PrivateRoute>
     }
     >
            <Route
                path="dashboard/settings"  element={
             <Settings/>}
            >
            </Route>

            <Route
                path="dashboard/add-course"  element={
             <AddCourse/>}
            >
            </Route>

             <Route
              path="dashboard/cart"  
              element={
             <Cart/>}
            >
            </Route>

            <Route path="/dashboard/my-profile"
            element={
             <MyProfile/>
          }>
        </Route>

        <Route path="/dashboard/enrolled-courses"
          element={<EnrolledCourses></EnrolledCourses>}
        >
        </Route>

        <Route path="/dashboard/my-courses"
          element={<MyCourses></MyCourses>}
        >
        </Route>

 </Route>
          {/* if any other route then show the error 404 page */}
          <Route path="*" element={<Error></Error>}></Route>

      </Routes>
    </div>
  );
}

export default App;