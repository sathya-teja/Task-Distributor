import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUpload,
  FaTachometerAlt,
  FaTasks,
  FaSignOutAlt,
} from "react-icons/fa";

// Sidebar dynamic handling based on screen width
function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle logout

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from local storage
    navigate("/"); // Redirect to login page
  };

  const collapsedWidth = isCollapsed ? "w-16" : "w-72";

  return (
    <aside
      className={`bg-gray-50 shadow-md h-screen 
      ${collapsedWidth} 
      transition-width duration-300 ease-in-out
      flex flex-col justify-between sticky top-0 z-30 overflow-hidden`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center p-3 border-b border-gray-200">
          {isCollapsed ? (
            <div className="text-purple-600 font-bold text-xl mx-auto select-none">
              A
            </div>
          ) : (
            <h1 className="text-purple-600 font-bold text-lg md:text-xl lg:text-2xl select-none">
              Admin Panel
            </h1>
          )}
        </div>

        {/* Nav Items */}
        <nav className="p-2">
          <ul className="space-y-1">
            {[
              { to: "/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
              { to: "/agents", icon: FaUser, label: "Manage Agents" },
              { to: "/upload", icon: FaUpload, label: "Upload List" },
              {
                to: "/distributed-tasks",
                icon: FaTasks,
                label: "Distributed Tasks",
              },
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-2 px-3 rounded-lg 
                    ${
                      isActive
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-purple-100 hover:text-purple-600"
                    } 
                    font-medium`
                  }
                >
                  <item.icon
                    style={{
                      fontSize: isCollapsed ? "1.25rem" : "1.5rem",
                      flexShrink: 0,
                    }}
                  />
                  {!isCollapsed && (
                    <span className="text-sm select-none">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full py-2 px-3 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600"
        >
          <FaSignOutAlt
            style={{
              fontSize: isCollapsed ? "1.25rem" : "1.5rem",
              flexShrink: 0,
            }}
          />
          {!isCollapsed && <span className="text-sm select-none">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
