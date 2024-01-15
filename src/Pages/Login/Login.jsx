import React, { useState, useEffect } from "react";
import validator from "validator";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import ShowMessage from "../../Components/Message/Message";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHidden, setEmailHidden] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { loginViaEmail, user, loginViaGoogle } = Authentication();

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (validator.isEmail(email)) {
      setEmailHidden(false);
      setLoginDisabled(false);
    } else {
      setEmailHidden(true);
      setLoginDisabled(true);
    }

    if (password.length < 8) {
      setPasswordHidden(true);
      setLoginDisabled(true);
    } else {
      setPasswordHidden(false);
      setLoginDisabled(false);
    }
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loggedin = await loginViaEmail(email, password);
    setIsLoading(false);
    if (loggedin) {
      ShowMessage("Login SuccessFull!", "success");
      navigate("/");
    } else {
      ShowMessage("Login Failed", "error");
    }
  };

  const handleLoginViaGoogle = async () => {
    setIsLoading(true);
    const loggedin = await loginViaGoogle();
    if (loggedin) {
      ShowMessage("Login SuccessFull!", "success");
      navigate("/");
    } else {
      ShowMessage("Login Failed", "error");
    }
  };

  return (
    <div className="w-fit h-fit border-[0.5px] border-slate-900 rounded-lg py-5 px-8 text-center">
      <h1 className="text-3xl">Login</h1>
      <p className="text-sm my-3">Login to Your Account Now</p>
      <form action="" className="flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="mail" className="mb-1 mt-3 w-full text-left">
          Email:
        </label>
        <input
          type="email"
          name=""
          id="mail"
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 w-72 px-3 py-2 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <p className="w-full text-left text-xs text-red-700">
          {emailHidden ? "Email must be valid" : ""}
        </p>
        <label htmlFor="" className="mb-1 mt-3 w-full text-left">
          Password:
        </label>
        <input
          type="password"
          name=""
          id=""
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 w-72 px-3 py-2 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p className="w-full text-left text-xs text-red-700">
          {passwordHidden ? "Password must be 8 characters long" : ""}
        </p>
        {isLoading ? (
          <Loader />
        ) : (
          <input
            type="submit"
            value="Login"
            className="my-5 px-2 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-md cursor-pointer"
            disabled={loginDisabled}
          />
        )}

        <Link
          to={"/signUP"}
          className="mb-2 px-2 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-md cursor-pointer">
          SignUP
        </Link>
        <Link to={"/signUP"} className="text-slate-800 text-xs underline">
          Forgot Password?
        </Link>
      </form>
      <div className="flex items-center justify-center h-fit w-full mt-5">
        <button
          className="flex items-center w-full bg-gray-900 border border-gray-300 rounded-xl shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-800 focus:outline-none"
          onClick={handleLoginViaGoogle}>
          <svg
            className="h-6 w-6 mr-2"
            xmlns="http://www.w3.org/2000/svg;"
            width="30px"
            height="800px"
            viewBox="-0.5 0 48 48"
            version="1.1">
            {" "}
            <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
            <defs> </defs>{" "}
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd">
              {" "}
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                {" "}
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  {" "}
                  <path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    id="Fill-1"
                    fill="#FBBC05">
                    {" "}
                  </path>{" "}
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    id="Fill-2"
                    fill="#EB4335">
                    {" "}
                  </path>{" "}
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    id="Fill-3"
                    fill="#34A853">
                    {" "}
                  </path>{" "}
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    id="Fill-4"
                    fill="#4285F4">
                    {" "}
                  </path>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
