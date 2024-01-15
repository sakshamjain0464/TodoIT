import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import MainSection from "./Components/MainSection/MainSection";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import { AuthenticationProvider } from "./Context/UserContext/AuthenticationContext";
import authenticator from "./Appwrite/authentication";
import { ToastContainer } from "react-toastify";
import { sample } from "./Context/UserContext/sampleUser";

function App() {
  const [user, setUser] = useState(null);

  const createAccount = async (email, password, name) => {
    const created = await authenticator.createAccountViaEmail(
      email,
      password,
      name
    );
    return created;
  };

  const autoLogin = () => {
    console.log("autologin");
  };

  const loginViaEmail = async (email, password) => {
    const userData = await authenticator.loginViaEmail(email, password);
    setUser(userData);
    console.log(userData);
    if (userData) {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    console.log("logout");
  };

  return (
    <AuthenticationProvider
      value={{ user, autoLogin, loginViaEmail, logout, createAccount }}>
      <Navbar />
      <MainSection />
      <Footer />
      <ToastContainer />
    </AuthenticationProvider>
  );
}

export default App;
