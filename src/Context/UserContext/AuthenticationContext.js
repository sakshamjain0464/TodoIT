import { createContext, useContext } from "react";

const AuthenticationContext = createContext({
    user: null,
    loginViaEmail: async () => { },
    autoLogin: () => { },
    logout: () => { },
    createAccount: () => { },
    loginViaGoogle: () => { }
});

export const AuthenticationProvider = AuthenticationContext.Provider;

export const Authentication = () => {
    return useContext(AuthenticationContext);
}
