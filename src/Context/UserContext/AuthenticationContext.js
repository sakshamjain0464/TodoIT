import { createContext, useContext } from "react";

const AuthenticationContext = createContext({
    user: null,
    loginViaEmail: async () => { },
    autoLogin: () => { },
    logout: () => { },
    createAccount: () => { },
    loginViaGoogle: () => { },
    addPhoneNumber: () => { },
    updateEmail: () => { },
    createEmailVerification: () => { },
    verifyEmail: () => { },
    createPhoneVerification: () => { },
    verifyPhone: () => { },
    uploadProfilePhoto: () => { },
    uploadBanner: () => { },
    uploadBannerFromUnsplash: () => { },
    sendForgotPasswordLink: () => { },
    completeForgotPasswordLink: () => { },
});

export const AuthenticationProvider = AuthenticationContext.Provider;

export const Authentication = () => {
    return useContext(AuthenticationContext);
}
