import { useState } from "react";
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
    <nav className="bg-gray-800 w-full h-fit sm:h-[8vh] flex items-center justify-center">
      <div className="flex justify-center w-full xl:px-36 sm:px-6 ">
        <div className="relative flex w-full h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <NavLink
                to={"/"}
                className="text-2xl 2xl:text-4xl text-white font-bold tracking-wider">
                TodoIT
              </NavLink>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user && (
              <div className="relative ml-3">
                <div className="h-full">
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none items-center px-0 py-0 sm:py-1 sm:px-3 sm:m-0 mr-3 hover:bg-slate-900 transition-all duration-300"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setProfileMenuOpen((prev) => !prev)}>
                    <div className="h-10 w-10 2xl:h-16 2xl:w-16 rounded-full overflow-hidden">
                      {user && user.preferences.profile ? (
                        <img
                          className="h-full w-full"
                          src={user.preferences.profile}
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-10 w-10 2xl:h-16 2xl:w-16 rounded-full invert-[100%]"
                          src="/assets/user.png"
                          alt=""
                        />
                      )}
                    </div>
                    {user && (
                      <h1 className="hidden sm:block 2xl:text-2xl text-white ml-2 font-semibold tracking-wide">
                        {user.name}
                      </h1>
                    )}
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
