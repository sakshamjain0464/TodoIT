import { useEffect, useState } from "react";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import validator from "validator";
import ShowMessage from "../../Components/Message/Message";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailHidden, setEmailHidden] = useState(false);
  const { sendForgotPasswordLink } = Authentication();

  useEffect(() => {
    if (validator.isEmail(email)) {
      setEmailHidden(false);
    } else {
      setEmailHidden(true);
    }
  }, [email]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const sent = await sendForgotPasswordLink(email);
    if (sent) {
      ShowMessage("Change Password Link Sent to Email", "success");
    } else {
      ShowMessage("Error Occurred", "error");
    }
  };

  return (
    <div className="sm:mt-0 mt-10 w-[80%] h-full flex items-center justify-center flex-col">
      <form
        action=""
        className="flex flex-col items-center border border-slate-950 rounded-lg py-5 px-8"
        onSubmit={handleForgotPassword}>
        <h1 className="text-xl">Enter Your Email</h1>
        <input
          type="email"
          name=""
          value={email}
          id=""
          className="border border-slate-950 mt-5 px-2 py-1 sm:w-80 w-[90vw] rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p
          className={`text-xs text-red-700 ${
            emailHidden ? "block" : "hidden"
          } text-left w-full`}>
          *Enter a valid email
        </p>
        <input
          type="submit"
          value="Submit"
          className="rounded-md py-1 px-2 mt-5 bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
          disabled={emailHidden}
        />
      </form>
    </div>
  );
}
