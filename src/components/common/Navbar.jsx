// import { useEffect, useState } from "react"
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// import { BsChevronDown } from "react-icons/bs"
// import { useSelector } from "react-redux"
// import { Link, matchPath, useLocation } from "react-router-dom"

// import logo from "../../assets/images/Logo-Full-Light.png"
// import { NavbarLinks } from "../../data/navbar-links"
// import { apiConnector } from "../../services/apiconnector"
// import { categories } from "../../services/apis"
// import { ACCOUNT_TYPE } from "../../utils/constants"
// import ProfileDropdown from "../core/Auth/ProfileDropDown"

// function Navbar() {
//   const { token } = useSelector((state) => state.auth)
//   // useSelector is a React hook to read data from the Redux store.
//   // For example, if store = { auth: { token: "abc123" }, profile: { user: { name: "Prakhar" } }, cart: { totalItems: 2 } }
//   // then state.auth is { token: "abc123" }, so const { token } = state.auth extracts that value.
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)
//   const location = useLocation()
//   // location.pathname is the current URL path in the React app, e.g. "/dashboard/123"

//   const matchRoute = (route) => {
//     // matchPath("/dashboard/:id", "/dashboard/123") returns an object with params { id: "123" } if it matches.
//     // If the current pathname (location.pathname) doesn't match the given route pattern, it returns null.
//     return matchPath({ path: route }, location.pathname)
//   }

//   const [subLinks, setSubLinks] = useState([])
//   const [loading, setLoading] = useState(false)

//   const fetchSublinks = async () => {
//     try {
//       const res = await apiConnector("GET", categories.CATEGORIES_API)
//       console.log("printing sublinks result ", res)
//       setSubLinks(res.data.data)
//     } catch (error) {
//       console.log("Could not fetch Categories.", error)
//     }
//   }

//   useEffect(() => {
//     fetchSublinks()
//     // empty dependency array makes this run only once, when the component mounts (gets rendered initially)
//   }, [])

//   return (
//     <div
//       className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
//         location.pathname !== "/" ? "bg-richblack-800" : ""
//       } transition-all duration-200`}
//     >
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
//         </Link>

//         {/* Navigation links */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div className="group relative flex cursor-pointer items-center gap-1">
//                     {/* 
//                       Tailwind’s "group" utility lets you apply hover styles to child elements.
//                       Here, both the "Catalog" label and its dropdown are inside the same group.
//                       When you hover anywhere inside this div, group-hover:… classes on the child activate.
//                     */}
//                     <p
//                       className={`${
//                         matchRoute("/catalog/:catalogName")
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {link.title}
//                     </p>
//                     <BsChevronDown />

//                     <div
//                       className="
//                         invisible
//                         absolute
//                         left-[50%]
//                         top-[50%]
//                         z-[1000]
//                         flex
//                         w-[200px]
//                         translate-x-[-50%]
//                         translate-y-[3em]
//                         flex-col
//                         rounded-lg
//                         bg-richblack-5
//                         p-4
//                         text-richblack-900
//                         opacity-0
//                         transition-all
//                         duration-150
//                         group-hover:visible
//                         group-hover:translate-y-[1.65em]
//                         group-hover:opacity-100
//                         lg:w-[300px]
//                       "
//                     >
//                       <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                       {loading ? (
//                         <p className="text-center">Loading...</p>
//                       ) : subLinks && subLinks.length ? (
//                         subLinks
//                           .filter((subLink) => subLink?.courses?.length > 0)
//                           .map((subLink, i) => (
//                             <Link
//                               to={`/catalog/${subLink.name
//                                 .split(" ")
//                                 .join("-")
//                                 .toLowerCase()}`}
//                               className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                               key={i}
//                             >
//                               <p>{subLink.name}</p>
//                             </Link>
//                           ))
//                       ) : (
//                         <p className="text-center">No Courses Found</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`${
//                         matchRoute(link?.path)
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Login / Signup / Dashboard */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {/* If user is logged in and not an instructor, show the cart icon */}
//           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}

//           {/* If there's no auth token, show "Log in" and "Sign up" buttons */}
//           {token === null && (
//             <Link to="/login">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Log in
//               </button>
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/signup">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Sign up
//               </button>
//             </Link>
//           )}

//           {/* If there's a valid token, show the profile dropdown */}
//           {token !== null && <ProfileDropdown />}
//         </div>

//         {/* Mobile menu icon */}
//         <button className="mr-4 md:hidden">
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Navbar


// import React, { useEffect, useState } from "react";
// import { logout } from "../../services/operations/authAPI"
// import { Link, useNavigate } from "react-router-dom";
// import { NavbarLinks } from "../../data/navbar-links";
// import { matchPath } from "react-router-dom";
// import logo from "../../assets/images/Logo-Full-Light.png"
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { IoIosArrowDown } from "react-icons/io";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import ProfileDropDown from "../core/Auth/ProfileDropDown";
// import { categories } from "../../services/apis" // to call backend apisexport; const categories={
// // CATEGORIES_API:BASE_URL+"/api/v1/course/showAllCategories"
// import { apiConnector } from "../../services/apiconnector";
// // If your URL is /dashboard/123, and you check:matchPath("/dashboard/:id", "/dashboard/123")It will return a match with params: { id: "123" }.If it doesn't match, it returns null.
// const Navbar = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const { token } = useSelector((state) => state.auth);
//     //useselector is a react hook to read data from store, fn will get whole state store={
//     //      auth: {
//     //              token: "abc123"
//     //             },
//     //   profile: {
//     //         user: { name: "Prakhar" }
//     //          }
//     // }signup
//     // so state.auth will have token object={ token: "abc123" }.const { token } = This is object destructuring,at last ;const token = "abc123"
//     const { user } = useSelector((state) => state.profile);
//     const { totalItems } = useSelector((state) => state.cart);
//     const location = useLocation();
//     const matchRoute = (route) => {
//         return matchPath({ path: route }, location.pathname);
//     }
//     // location.pathname means the current URL path in your React app.http://localhost:3000/dashboard/123 has "/dashboard/123" as location.pathname

//     const [subLinks, setSubLinks] = useState([]);

//     const fetchSublinks = async () => {
//         try {

//             const result = await apiConnector("GET", categories.CATEGORIES_API);
//             console.log("printing sublinks result ", result);
//             setSubLinks(result.data.data);
//         } catch (error) {
//             console.log("could not fetch the category list");
//         }
//     }

//     useEffect(() => {
//         fetchSublinks();
//     }, [])// empty dependency array to make it run only once when component mounts(gets on the screen)

//     return (
//         <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
//             <div className="flex w-11/12 max-w-maxContent items-center justify-between text-white">
//                 <Link to="/">
//                     <img src={logo} alt="" width={160} height={42} loading='lazy'>
//                     </img>
//                 </Link>
//                 {/* nav link */}
//                 <nav>
//                     <ul className="flex gap-x-6 text-richblack-25">
//                         {
//                             NavbarLinks.map((link, index) => (
//                                 <li key={index}>
//                                     {
//                                         link.title === "Catalog" ? (
//                                             <div className="flex items-center gap-2 group relative ">
//                                                 {/* group is a built-in Tailwind CSS keyword (not a custom class name you invented)Tailwind automatically:
// Adds a special group class to the parentSets up the CSS so group-hover:* works on children */}
//                                                 <p>{link.title}</p>
//                                                 <IoIosArrowDown />

//                                                 <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[30%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[200px]">
//                                                     <div className="absolute left-[50%] top-0 translate-x-[40%] translate-y-[-45%] h-6 w-6 rotate-45 round bg-richblack-5">

//                                                         {/* absolute children always position relative to their nearest positioned ancestor (even if that ancestor is also absolute) */}
//                                                     </div>
//                                                     {
//                                                         subLinks.length ? (<div>

//                                                             {subLinks.map((subLink, index) =>
//                                                             (
//                                                                 <Link
//                                   to={`/catalog/${subLink.name
//                                     .split(" ")
//                                     .join("-")
//                                     .toLowerCase()}`}
//                                   className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                   key={index}
//                                 >
//                                   <p>{subLink.name}</p>
//                                 </Link>
//                                                                 // <Link to={`/catalog/${subLink.name}`} key={index}
//                                                                 //     className="hover:text-richblack-900 hover:bg-richblack-50 rounded-md block"
//                                                                 // >

//                                                                 //     <p>{subLink.name}</p>
//                                                                 // </Link>
//                                                             ))}
//                                                         </div>
//                                                         )
//                                                             : (<div></div>)
//                                                     }
//                                                 </div>
//                                             </div>
//                                         ) : (
//                                             <Link to={link.path}>
//                                                 <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
//                                                     {link.title}
//                                                 </p>
//                                             </Link>
//                                         )
//                                     }
//                                 </li>
//                             ))
//                         }
//                     </ul>
//                 </nav>
//                 {/* login signup dashboard buttons */}
//                 <div className="flex items-center gap-4">
//                     {/*this will check if the user is logged in and if its not an instructor then show the cart icon if he has some course in cart then show the number */}
//                     {
//                         user && user?.accountType !== "Instructor" && (
//                             <Link to="/dashboard/cart" className="relative">
//                                 <AiOutlineShoppingCart size="30"/>
//                                 {
//                                     totalItems > 0 && (
//                                         <span>
//                                             {totalItems}
//                                         </span>
//                                     )
//                                 }
//                             </Link>
//                         )
//                     }
//                     {/* log out button
//                     <div
//                         onClick={() => {
//                             dispatch(logout(navigate))
//                         }}
//                         className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
//                     >
//                         Logout
//                     </div> */}
//                     {
//                         token === null && (
//                             <Link to="/login">
//                                 <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md mr-4">
//                                     Log in
//                                 </button>
//                             </Link>
//                         )
//                     }
//                     {
//                         token === null && (
//                             <Link to="/signup">
//                                 <button className="border border-richblack-700 bg-richblack-800 px-[12px]  py-[8px] text-richblack-100 rounded-md mr-4">
//                                     Sign up
//                                 </button>
//                             </Link>
//                         )
//                     }
//                     {
//                         token !== null && <ProfileDropDown></ProfileDropDown>
//                     }
//                 </div>

//             </div>
//         </div>
//     )
// }
// export default Navbar

import React, { useEffect, useState } from "react";
import { logout } from "../../services/operations/authAPI"
import { Link, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { matchPath } from "react-router-dom";
import logo from "../../assets/images/Logo-Full-Light.png"
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { categories } from "../../services/apis" // to call backend apisexport;
// //const categories={
// CATEGORIES_API:BASE_URL+"/api/v1/course/showAllCategories"
import { apiConnector } from "../../services/apiconnector";
// If your URL is /dashboard/123, and you check:matchPath("/dashboard/:id", "/dashboard/123")It will return a match with params: { id: "123" }.If it doesn't match, it returns null.
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth);
    //useselector is a react hook to read data from store, fn will get whole state store={
    //      auth: {
    //              token: "abc123"
    //             },
    //   profile: {
    //         user: { name: "Prakhar" }
    //          }
    // }signup
    // so state.auth will have token object={ token: "abc123" }.const { token } = This is object destructuring,at last ;const token = "abc123"
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    // location.pathname means the current URL path in your React app.http://localhost:3000/dashboard/123 has "/dashboard/123" as location.pathname

    const [subLinks, setSubLinks] = useState([]);

    const fetchSublinks = async () => {
        try {

            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("printing sublinks result ", result);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("could not fetch the category list");
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])// empty dependency array to make it run only once when component mounts(gets on the screen)

    return (
        <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between text-white">
                <Link to="/">
                    <img src={logo} alt="" width={160} height={42} loading='lazy'>
                    </img>
                </Link>
                {/* nav link */}
                <nav>
                    <ul className="flex gap-x-6 text-richblack-25 pt-3 pl-2">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className="flex items-center gap-2 group relative ">
                                                {/* group is a built-in Tailwind CSS keyword (not a custom class name you invented)Tailwind automatically:
Adds a special group class to the parentSets up the CSS so group-hover:* works on children */}
                                                <p>{link.title}</p>
                                                <IoIosArrowDown />

                                                <div className="invisible absolute top-full left-[50%] translate-x-[-50%] mt-1 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[200px] z-[1000]">
                                                    <div className="absolute left-[50%] top-0 translate-x-[40%] translate-y-[-45%] h-6 w-6 rotate-45 round bg-richblack-5">

                                                        {/* absolute children always position relative to their nearest positioned ancestor (even if that ancestor is also absolute) */}
                                                    </div>
                                                    {
                                                        subLinks.length ? (<div>

                                                            {subLinks.map((subLink, index) =>
                                                            (
                                                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 "
                                  key={index}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                                                                // <Link to={`/catalog/${subLink.name}`} key={index}
                                                                //     className="hover:text-richblack-900 hover:bg-richblack-50 rounded-md block"
                                                                // >

                                                                //     <p>{subLink.name}</p>
                                                                // </Link>
                                                            ))}
                                                        </div>
                                                        )
                                                            : (<div></div>)
                                                    }
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to={link.path}>
                                                <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                {/* login signup dashboard buttons */}
                <div className="flex items-center gap-4">
                    {/*this will check if the user is logged in and if its not an instructor then show the cart icon if he has some course in cart then show the number */}
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart size="30"/>
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {/* log out button
                    <div
                        onClick={() => {
                            dispatch(logout(navigate))
                        }}
                        className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                    >
                        Logout
                    </div> */}
                    {
                        token === null && (
                            <Link to="/login">
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md mr-4">
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px]  py-[8px] text-richblack-100 rounded-md mr-4">
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown></ProfileDropDown>
                    }
                </div>

            </div>
        </div>
    )
}
export default Navbar
