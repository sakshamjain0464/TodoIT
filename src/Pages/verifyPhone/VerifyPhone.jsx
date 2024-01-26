import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import ShowMessage from "../../Components/Message/Message";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function VerifyEmail() {
  const { verifyPhone, user } = Authentication();
  const [secret, setSecret] = useState("");
  const [secretHidden, setSecretHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (secret.length !== 6) {
      setSecretHidden(true);
    } else {
      setSecretHidden(false);
    }
  }, [secret]);

  const handleCompleteVerification = async (e) => {
    e.preventDefault();
    const verified = await verifyPhone(user.id, secret);
    if (verified) {
      ShowMessage("Phone Verified", "success");
      navigate("/");
    } else {
      ShowMessage("Verification Failed", "error");
      navigate("/login");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        action=""
        onSubmit={handleCompleteVerification}
        className="px-10 py-5 border border-slate-900 rounded-lg sm:w-fit h-fit w-full flex flex-col">
        <input
          type="text"
          className="focus:outline-none px-3 border border-slate-700 rounded-md py-2"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        {secretHidden && (
          <p className="text-xs text-red-600">*OTP must be of 6 digits</p>
        )}
        <input
          type="submit"
          className="px-2 py-2 hover:bg-slate-700 bg-slate-800 text-white rounded-md mt-6 w-md"
          onClick={handleCompleteVerification}
        />
      </form>
    </div>
  );
}
