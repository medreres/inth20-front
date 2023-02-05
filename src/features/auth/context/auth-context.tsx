import { access } from "fs";
import React, { createContext, useContext } from "react";
import { StringMappingType } from "typescript";
import useLocalStorage from "../../../hooks/useLocalStorage";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  idToken: string | null;
  setIdToken: (user: string | null) => void;
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

interface Profile {
  email: string;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  name: string;
  picture: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => useContext(AuthContext) as AuthContextValue;

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [idToken, setIdToken] = useLocalStorage<string | null>("INTH20_ID_TOKEN", null);
  const [profile, setProfile] = useLocalStorage<Profile | null>("INTH20_PROFILE_DECODED", null);

  return (
    <AuthContext.Provider
      value={{
        idToken,
        setIdToken,
        profile,
        setProfile
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
