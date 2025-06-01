import React from "react";
// Imports all exported icons from the react-icons/vsc package. Bundles them into a single object named Icons (you can name this anything, e.g., VscIcons) and access = Icons.VscHome  // Access the "Home" icon
import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { useLocation ,matchPath, NavLink} from "react-router-dom";

const SidebarLink=({link,iconName})=>{
    
    const Icon =Icons[iconName];
    const location =useLocation()
    const dispatch=useDispatch();
//if a given route path matches the current browser URL path. 
  
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
//window.
// Use <Link> for simple navigation (no active state needed).Use <NavLink> for navigation menus with active route styling.
// opacity-0 = means all transparent
    return(
        
        <NavLink
            to={link.path}
            className={`relative px-4 md:px-8 py-2 text-sm font-medium ${matchRoute(link.path)?"bg-yellow-800":"bg-opacity-0"}`}
        >
            {/* for that border showing active section of sidebar */}
            
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path)?"opacity-100":"opacity-0"}`}>
            </span>
            <div className="flex item-center gap-x-2">
                <Icon className="text-lg"></Icon>
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}
export default SidebarLink