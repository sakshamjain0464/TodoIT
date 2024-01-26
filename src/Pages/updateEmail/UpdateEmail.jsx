import { useEffect, useState } from "react";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import Loader from "../../Components/Loader/Loader";
import ShowMessage from "../../Components/Message/Message";
export default function AddPhone() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHidden, setEmailHidden] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, updateEmail } = Authentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (validator.isEmail(email)) {
      setEmailHidden(false);
      setSubmitDisabled(false);
    } else {
      setEmailHidden(true);
      setSubmitDisabled(true);
    }

    if (password.length < 8) {
      setPasswordHidden(true);
      setSubmitDisabled(true);
    } else {
      setPasswordHidden(false);
      setSubmitDisabled(false);
    }
  }, [email, password]);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await updateEmail(email, password);
    if (data) {
      ShowMessage("Email Updated", "success");
    } else {
      ShowMessage("Cannot Update Email", "error");
    }
    navigate("/login");
  };

  return (
    <div className="sm:w-fit sm:h-fit h-[85%] w-[85%] border-[0.5px] border-slate-900 rounded-lg py-5 sm:px-8 px-5 sm:mt-0 mt-5 text-center">
      <h1 className="text-3xl">Update Email</h1>
      <form action="" className="flex flex-col" onSubmit={handleUpdateEmail}>
        <label htmlFor="phone" className="mb-1 sm:mt-3 w-full text-left">
          Email
        </label>
        <input
          type="tel"
          name=""
          id="phone"
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 w-full px-3 py-2 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <p className="w-full text-left text-xs text-red-700">
          {emailHidden ? "Enter a valid phone number" : ""}
        </p>
        <label htmlFor="" className="mb-1 mt-3 w-full text-left">
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
          <Loader />
        ) : (
          <input
            type="submit"
            value="Update Email"
            className="my-5 px-2 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-md cursor-pointer"
            disabled={submitDisabled}
          />
        )}

        <Link
          to={"/login"}
          className="mb-2 px-2 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-md cursor-pointer">
          Login
        </Link>
      </form>
    </div>
  );
}
