import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import MainSection from "./Components/MainSection/MainSection";
import Footer from "./Components/Footer/Footer";
import { AuthenticationProvider } from "./Context/UserContext/AuthenticationContext";
import authenticator from "./Appwrite/authentication";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import database from "./Appwrite/database";
import { account } from "./Appwrite/config";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  };

  const addPhoneNumber = async (phone, password) => {
    const userData = await authenticator.addPhoneNumberToAccount(
      phone,
      password
    );
    if (userData) {
      return true;
    } else {
      return false;
    }
  };

  const createEmailVerification = async () => {
    const userData = await authenticator.createEmailVerificationLink();
    if (userData) {
      return true;
    } else {
      return false;
    }
  };

  const verifyEmail = async (userId, secret) => {
    const data = await authenticator.completeEmailVerification(userId, secret);
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  const uploadProfilePhoto = async (photo) => {
    const data = await database.addProfilePhotoToStorage(user, photo);
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  const uploadBanner = async (photo) => {
    const data = await database.addProfileBannerToStorage(user, photo);
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  const uploadBannerFromUnsplash = async (url) => {
    const data = await database.addProfileBannerFromUnsplash(user, url);
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  const sendForgotPasswordLink = async (email) => {
    const data = await authenticator.createForgotPassword(email);
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  const completeForgotPassword = async (
    userId,
    secret,
    password,
    confirmPassword
  ) => {
    const data = await authenticator.confirmForgotPassword(
      userId,
      secret,
      password,
      confirmPassword
    );
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthenticationProvider
      value={{
        user,
        autoLogin,
        loginViaEmail,
        logout,
        createAccount,
        loginViaGoogle,
        addPhoneNumber,
        createEmailVerification,
        verifyEmail,
        uploadProfilePhoto,
        uploadBanner,
        uploadBannerFromUnsplash,
        sendForgotPasswordLink,
        completeForgotPassword,
      }}>
      <Navbar />
      <MainSection loading={loading} />
      <Footer />
      <ToastContainer />
    </AuthenticationProvider>
  );
}

export default App;
