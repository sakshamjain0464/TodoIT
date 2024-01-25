import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import SignUP from "./Pages/SignUP/SignUP.jsx";
import AddPhone from "./Pages/AddPhone/AddPhone.jsx";
import VerifyEmail from "./Pages/verifyEmail/VerifyEmail.jsx";
import UploadProfile from "./Pages/UploadProfile/UploadProfile.jsx";
import UploadBanner from "./Pages/UploadBanner/UploadBanner.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";
import ConfirmForgotPassword from "./Pages/ConfirmForgotPassword/ConfirmForgotPassword.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signUP",
                element: <SignUP />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/profile/addPhone",
                element: <AddPhone />,
            },
            {
                path: "/profile/verifyEmail",
                element: <VerifyEmail />,
            },
            {
                path: "/profile/uploadProfile",
                element: <UploadProfile />,
            },
            {
                path: "/profile/uploadBanner",
                element: <UploadBanner />,
            },
            {
                path: "/profile/forgotPassword",
                element: <ForgotPassword />,
            },
            {
                path: "/profile/confirmForgotPassword",
                element: <ConfirmForgotPassword />,
            },
        ],
    },
]);


export default router;