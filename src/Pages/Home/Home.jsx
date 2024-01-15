import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";

export default function Home() {
  const { user, autoLogin } = Authentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
