import { useState, useEffect } from "react";
import validator from "validator";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import ShowMessage from "../../Components/Message/Message";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../Components/GoogleLoginButton/GoogleLoginButton";

export default function SignUP() {
  const { createAccount } = Authentication();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameHidden, setNameHidden] = useState(false);
  const [emailHidden, setEmailHidden] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [signUpDisabled, setSignUpDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (name.length < 10) {
      setNameHidden(true);
    } else {
      setNameHidden(false);
    }

    if (validator.isEmail(email)) {
      setEmailHidden(false);
    } else {
      setEmailHidden(true);
    }

    if (password.length < 8) {
      setPasswordHidden(true);
    } else {
      setPasswordHidden(false);
    }

    if (!emailHidden && !passwordHidden && !nameHidden) {
      setSignUpDisabled(false);
    } else {
      setSignUpDisabled(true);
    }
  }, [email, password, name]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const created = await createAccount(email, password, name);
    setIsLoading(false);
    if (created) {
      ShowMessage("Account Created! Kindly Login!", "success");
      navigate("/login");
    } else {
      ShowMessage("Failed to create Account", "error");
    }
  };

  return (
    <div className="sm:min-w-[30vw] w-[85%] sm:max-h-[90%] sm:w-fit h-fit border-[0.5px] border-slate-900 rounded-lg my-auto py-5 px-8 sm:px-5 text-center">
      <h1 className="text-2xl">SignUP</h1>
      <p className="text-sm my-1">Create Your Account Now!</p>
      <form action="" className="flex flex-col" onSubmit={handleSignUp}>
        <label htmlFor="name" className="mb-1 w-full text-left">
          Name:
        </label>
        <input
          type="text"
          name=""
          id="name"
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 w-full px-3 py-2 rounded-md"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <p className="w-full text-left text-xs text-red-700">
          {nameHidden
            ? "*Name must contain greater than 10 characters including spaces"
            : ""}
        </p>
        <label htmlFor="mail" className="mb-1 mt-2 w-full text-left">
          Email:
        </label>
        <input
          type="email"
          name=""
          id="mail"
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 w-full px-3 py-2 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <p className="w-full text-left text-xs text-red-700">
          {emailHidden ? "*Email must be valid" : ""}
        </p>
        <label htmlFor="" className="mb-1 mt-2 w-full text-left">
          Password:
        </label>
        <input
          type="password"
          name=""
          id=""
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 w-full px-3 py-2 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p className="w-full text-left text-xs text-red-700">
          {passwordHidden ? "Password must be 8 characters long" : ""}
        </p>
        {isLoading ? (
          <Loader color={"white"} height={"10"} width={"10"} />
        ) : (
          <input
            type="submit"
            value="SignUP"
            className="my-5 px-2 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-md cursor-pointer"
            disabled={signUpDisabled}
          />
        )}

        <Link
          to={"/login"}
          className="mb-2 px-2 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-md cursor-pointer">
          Login
        </Link>
      </form>
      <div>OR</div>
      <GoogleLoginButton />
    </div>
  );
}
