import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import ShowMessage from "../../Components/Message/Message";
import Loader from "../../Components/Loader/Loader";

export default function Home() {
  const { autoLogin, user } = Authentication();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(user == null){
      (async function () {
        setLoading(true)
        const loggedin = await autoLogin();
        setLoading(false)
        if(!loggedin){
          navigate("/login");
        }
      })();
    }
  });

  return (
    <div>
      {(loading)?<Loader/>:<h1>Home</h1>}
    </div>
  );
}
