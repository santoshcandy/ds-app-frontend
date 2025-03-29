import React, { useEffect, useState } from "react";
import BottomNav from "./BottomNav"; // Employee Navigation
import ManagerNav from "./ManagerNav";
 

const Nav = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const userRole = localStorage.getItem("role"); // Fetch role from localStorage
        if (userRole === "employee" || userRole === "manager") {
            setRole(userRole);
        }
    }, []);

    if (!role) {
        return null; // Hide navigation if role is not employee or manager
    }

    return role === "employee" ? <BottomNav /> : <ManagerNav/>;
};

export default Nav;
