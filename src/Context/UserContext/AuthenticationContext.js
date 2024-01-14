import { createContext, useContext } from "react";

const AuthenticationContext = createContext({
    user : null,
    loginViaEmail: async (email, password) => {},
    autoLogin: () => {},
    logout: () => {},
    createAccount: (email, password, name) => {}
});

export const AuthenticationProvider = AuthenticationContext.Provider;
export const Authentication = () => {
    return useContext(AuthenticationContext);
}
