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

  const autoLogin = async () => {
    const userData = await authenticator.autoLogin();
    setUser(userData);
    if (userData) {
      return true;
    } else {
      return false;
    }
  };

  const loginViaEmail = async (email, password) => {
    const userData = await authenticator.loginViaEmail(email, password);
    setUser(userData);
    if (userData) {
      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    const logoutSuccess = await authenticator.logout();
    if (logoutSuccess) {
      setUser(null);
    }
    return logoutSuccess;
  };

  const loginViaGoogle = async () => {
    const userData = await authenticator.loginViaGoogle();
    setUser(userData);
    if (userData) {
      return true;
    } else {
      return false;
    }
  } 

  return (
    <AuthenticationProvider
      value={{ user, autoLogin, loginViaEmail, logout, createAccount, loginViaGoogle }}>
      <Navbar />
      <MainSection />
      <Footer />
      <ToastContainer />
    </AuthenticationProvider>
  );
}

export default App;
