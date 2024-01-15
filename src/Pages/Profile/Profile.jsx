import React, { useEffect, useState } from "react";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = Authentication();
  const [editVisible, setEditVisible] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {user && (
        <div className="h-full w-[95%] flex flex-col items-center px-32 py-8">
          <div className="w-full h-fit flex items-center flex-col">
            <div
              className="h-36 w-36 rounded-full relative overflow-hidden"
              onMouseEnter={() => setEditVisible(true)}
              onMouseLeave={() => setEditVisible(false)}>
              {user.preferences.profile ? (
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              ) : (
                <img
                  className="h-full w-full"
                  src="./src/assets/user.png"
                  alt=""
                />
              )}
              <div className="absolute w-full h-full hover:bg-slate-500 hover:bg-opacity-0 top-0 hover:backdrop-blur-md flex items-center justify-center">
                <i
                  className={`fa-solid fa-pen-to-square cursor-pointer ${
                    editVisible ? "text-2xl" : "text-[0px]"
                  }`}></i>
              </div>
            </div>
            <h1 className="text-4xl font-semibold mt-2">{user.name}</h1>
          </div>
          <div className="h-full overflow-y-auto mt-3 w-full p-5">
            <p className="my-3 text-base">User ID : {user.id}</p>
            <p className="my-3 text-base">
              Email : {user.email}{" "}
              {user.emailVerification ? (
                <span className="ml-3 rounded-md text-white bg-green-700 px-3 py-1 cursor-no-drop">
                  Verified
                </span>
              ) : (
                <span className="ml-3 rounded-md border-2 py-1 px-2 cursor-pointer text-sm border-slate-900 hover:bg-slate-800 hover:text-white">
                  Verify
                </span>
              )}{" "}
            </p>
            <p className="my-3 text-base">
              Phone :{" "}
              {user.phone ? (
                <span>
                  {user.phone}{" "}
                  {user.phoneVerification ? (
                    <span>Verified</span>
                  ) : (
                    <span>Verify</span>
                  )}
                </span>
              ) : (
                <span className="hover:underline cursor-pointer">
                  Add Phone Number
                  <i className="fa-solid fa-pen-to-square ml-2"></i>
                </span>
              )}{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
