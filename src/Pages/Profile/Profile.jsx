// UserProfile.js

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import Tooltip from "../../Components/Tooltip/Tooltip";

const UserProfile = () => {
  const { user, autoLogin } = Authentication();
  const [showBannerTooltip, setShowBannerTooltip] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    autoLogin();
    if (user == null) {
      navigate("/");
    } else {
      console.log(user);
    }
  });

  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-[85%] h-fit max-h-full mt-5">
        <div className="mb-8">
          <Link to="/" className="text-slate-800 hover:underline">
            <i className="fa-solid fa-angle-left mr-[2px]" />
            Back to Home
          </Link>
        </div>
        <div className="relative w-full mx-auto bg-white rounded-md shadow-md">
          {user.preferences ? (
            <div
              className="relative bg-gray-200 p-4 flex items-center justify-center"
              style={
                user.preferences.banner
                  ? {
                      background: `url('${user.preferences.banner} center')`,
                      backgroundSize: "cover",
                      backgroundColor: "rgba(255,255,255,0.5)",
                      backdropFilter: "brightness(50%)",
                    }
                  : {}
              }>
              {user.preferences.banner && (
                <div className="absolute w-full h-full bg-black opacity-55"></div>
              )}
              <div className="h-28 w-28 relative rounded-full ">
                {user.preferences.profile ? (
                  <img
                    src={user.preferences.profile}
                    alt="User"
                    className="h-full w-full rounded-full"
                  />
                ) : (
                  <img
                    src="./src/assets/user.png"
                    alt="User"
                    className="h-full w-full invert-100 rounded-full"
                  />
                )}
                <div className="group absolute top-0 rounded-full h-full w-full bg-transparent hover:backdrop-blur-md flex items-center justify-center">
                  <i
                    className="fa-regular fa-pen-to-square text-[0px] group-hover:text-2xl cursor-pointer hover:text-gray-800"
                    onMouseEnter={() => setShowProfileTooltip(true)}
                    onMouseLeave={() => setShowProfileTooltip(false)}
                  />
                  <Tooltip
                    tooltipFunc={showProfileTooltip}
                    message={"Change Profile Photo"}
                    className={"top-[0px] w-48"}
                  />
                </div>
              </div>
              <div className="group absolute top-2 right-5 w-fit h-fit">
                <Link
                  className="bg-slate-900 sm:text-base text-xs text-white px-3 py-1 rounded-md h-0 w-0"
                  onMouseEnter={() => setShowBannerTooltip(true)}
                  onMouseLeave={() => setShowBannerTooltip(false)}>
                  Change Banner
                </Link>
                <Tooltip
                  tooltipFunc={showBannerTooltip}
                  message={"Change Profile Banner"}
                  className={"top-[-45px] w-48"}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>

            <div className="mb-2">
              <strong>Email:</strong> {user.email}{" "}
              {user.emailVerification ? (
                <i className="fa-solid fa-check text-green-600" />
              ) : (
                <Link className="bg-green-600 text-white rounded-md hover:bg-green-900 py-1 px-3">
                  Verify
                </Link>
              )}
            </div>
            <div className="mb-2 flex">
              <strong>Phone:</strong>
              {user.phone != "" ? (
                <p className="w-fit">
                  {user.phone}
                  {"  "}
                  {user.phoneVerification ? (
                    <i className="fa-solid fa-check text-green-600" />
                  ) : (
                    <Link className="bg-green-600 text-white rounded-md hover:bg-green-900 py-1 px-3">
                      Verify
                    </Link>
                  )}
                </p>
              ) : (
                <Link className="text-sm ml-3 text-slate-900 underline hover:text-slate-600">
                  Add Phone Number
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-1" />
                </Link>
              )}
            </div>

            <div className="mt-6 mb-2">
            <Link className="bg-slate-800 sm:text-base text-xsm text-white py-2 px-4 rounded-md hover:bg-slate-600">
              Change Password
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
