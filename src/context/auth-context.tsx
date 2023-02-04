import { access } from "fs";
import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * access_token: "ya29.a0AVvZVsopvBrykevnneN2GJ5Dr2rRgTEGLyP-d-L9cX6o_rqbcx3IFsEv7TihJ7hFvyLLOmRAPY1tSBcDurY_ad9X4wmbjAUg-IYxPCEzf2P9mZoecVn-7Rk7qbOOoP7MEbixIAOu7OAaZkzX9AG0E6W_nkDKaCgYKAWISARASFQGbdwaIxt619RGlrPD3KSxzcx5rlw0163"
authuser: "2"
expires_in: 3599
prompt: "none"
scope: "email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
token_type:"Bearer"
 */

interface User {
  access_token: string;
  authuser: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => useContext(AuthContext) as AuthContextValue;

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, _setUser] = useLocalStorage<User | null>("INTH20_USER", null);
  const setUser = (user: any) => {
    console.log("setting locl storage");
    _setUser(user);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
