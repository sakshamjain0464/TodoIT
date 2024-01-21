import { useState, useEffect } from "react";
import validator from "validator";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import ShowMessage from "../../Components/Message/Message";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../../Components/GoogleLoginButton/GoogleLoginButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHidden, setEmailHidden] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { loginViaEmail, user } = Authentication();

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

  return (
    <div className="sm:w-fit sm:h-fit h-[85%] w-[85%] border-[0.5px] border-slate-900 rounded-lg py-5 sm:px-8 px-5 text-center">
      <h1 className="text-3xl">Login</h1>
      <p className="text-sm my-3">Login to Your Account Now</p>
      <form action="" className="flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="mail" className="mb-1 sm:mt-3 w-full text-left">
          Email:
        </label>
        <input
          type="email"
          name=""
          id="mail"
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 sm:w-72 w-full px-3 py-2 rounded-md"
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
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 sm:w-72 w-full px-3 py-2 rounded-md"
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
        <Link to={"/signUP"} className="text-slate-800 mb-3 text-xs underline">
          Forgot Password?
        </Link>
      </form>
      <p className="lg:text-2xl">OR</p>
      <GoogleLoginButton />
    </div>
  );
}
