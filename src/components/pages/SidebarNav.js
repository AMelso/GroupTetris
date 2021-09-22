import { getAuth, signOut } from '@firebase/auth';
import React from 'react'
import { Link,useLocation } from 'react-router-dom'

const SidebarNav = () => {
    const location = useLocation();
    return (
        <div className="col-md-3">
                    <div className="list-group ">
                        <Link to="/profile" className={location.pathname === "/profile" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Profile</Link>
                        <Link to="/blogs" className={location.pathname === "/blogs" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Blogs</Link>
                        <Link to="/change-password" className={location.pathname === "/change-password" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Change Password</Link>
                        <Link to="/logout" onClick={() => signOut(getAuth())} className={location.pathname === "/logout" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Logout</Link>
            </div>
        </div>
    )
}

export default SidebarNav
