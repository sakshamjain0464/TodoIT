import { useEffect } from "react";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import ShowMessage from "../../Components/Message/Message";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { verifyEmail, user } = Authentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  });

  const handleCompleteVerification = async () => {
    let urlSearchParams = new URLSearchParams(window.location.search);
    let secret = urlSearchParams.get("secret");
    let userId = urlSearchParams.get("userId");
    const verified = await verifyEmail(userId, secret);
    if (verified) {
      ShowMessage("Email Verified", "success");
      navigate("/");
    } else {
      ShowMessage("Verification Failed", "error");
      navigate("/login");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <button
        className="px-3 py-2 hover:bg-slate-700 bg-slate-800 text-white reounded-md"
        onClick={handleCompleteVerification}>
        {" "}
        Verify{" "}
      </button>
    </div>
  );
}
