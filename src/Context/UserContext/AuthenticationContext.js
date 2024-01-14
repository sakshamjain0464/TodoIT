import { createContext } from "react";

const AuthenticationContext = createContext({
    user : null,

});

const AuthenticationProvider = AuthenticationContext.Provider;

export default AuthenticationProvider;
