import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import ShowMessage from "../Message/Message";

export default function Navbar() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = Authentication();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      
      ShowMessage("Logout Successful", "success");
      navigate("/login");
    } else {
      ShowMessage("Can't Logout!", "error");
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-800 h-[8vh]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <NavLink
                to={"/"}
                className="text-2xl text-white font-bold tracking-wider">
                TodoIT
              </NavLink>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}>
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    {user && user.preferences.profile ? (
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-full w-full invert-[100%]"
                        src="./src/assets/user.png"
                        alt=""
                      />
                    )}
                  </div>
                </button>
              </div>

              <div
                className={` ${
                  profileMenuOpen ? "block" : "hidden"
                } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                onMouseLeave={() => setProfileMenuOpen(false)}>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-0">
                  Your Profile
                </Link>
                <button
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-2"
                  onClick={handleLogout}>
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
