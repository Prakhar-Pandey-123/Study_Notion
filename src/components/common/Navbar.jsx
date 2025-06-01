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
import { categories } from "../../services/apis" // to call backend apisexport; const categories={
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
            console.log("inside fetch sub links fn");


            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("printing sublinks result ", result);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("could not fetch the category list");
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])// empty dependency array to make it run only once when


    return (
        <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between text-white">
                <Link to="/">
                    <img src={logo} alt="" width={160} height={42} loading='lazy'>
                    </img>
                </Link>
                {/* nav link */}
                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
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

                                                <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[30%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[200px]">
                                                    <div className="absolute left-[50%] top-0 translate-x-[40%] translate-y-[-45%] h-6 w-6 rotate-45 round bg-richblack-5">

                                                        {/* absolute children always position relative to their nearest positioned ancestor (even if that ancestor is also absolute) */}
                                                    </div>
                                                    {
                                                        subLinks.length ? (<div>

                                                            {subLinks.map((subLink, index) =>
                                                            (
                                                                <Link to={`${subLink.name}`} key={index}
                                                                    className="hover:text-richblack-900 hover:bg-richblack-50 rounded-md block"
                                                                >

                                                                    <p>{subLink.name}</p>
                                                                </Link>
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