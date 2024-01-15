import { createContext, useContext } from "react";
import { sample } from "./sampleUser";

const AuthenticationContext = createContext({
    user: null,
    loginViaEmail: async (email, password) => { },
    autoLogin: () => { },
    logout: () => { },
    createAccount: (email, password, name) => { },
    loginViaGoogle: () => { }
});

export const AuthenticationProvider = AuthenticationContext.Provider;

export const Authentication = () => {
    return useContext(AuthenticationContext);
}
