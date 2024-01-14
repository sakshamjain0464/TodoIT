import React, { useState, useEffect } from "react";
import validator from "validator";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import ShowMessage from "../../Components/Message/Message";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHidden, setEmailHidden] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {loginViaEmail, user} = Authentication()



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
    setIsLoading(true)
    await loginViaEmail(email, password)
    setIsLoading(false)
    if(user){
      ShowMessage("Login SuccessFull!", 'success')
      navigate('/')
    }
    else{
      ShowMessage("Login Failed", 'error')
    }
  }

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
        {(isLoading)?<Loader color={'white'} height={'10'} width={'10'}/>:<input
          type="submit"
          value="Login"
          className="my-5 px-2 py-2 bg-slate-800 text-white hover:bg-slate-700"
          disabled={loginDisabled}
        />}
      </form>
    </div>
  );
}
