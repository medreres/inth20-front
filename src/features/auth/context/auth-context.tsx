import React, { createContext, useContext, useEffect } from "react";

import useLocalStorage from "../../../hooks/useLocalStorage";
import { getDateUnix } from "../../../utils/format";

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

  useEffect(() => {
    // console.log(jwtDecode(idToken))
    // if token is null - exit
    // console.log(idToken);
    if (idToken == null) return;

    // if token is present, but not valid - set to null
    if (getDateUnix(profile!.exp) < new Date()) {
      setIdToken(null);
      setProfile(null);
      return;
    }
  }, [idToken, profile, setIdToken, setProfile]);

  return (
    <AuthContext.Provider
      value={{
        idToken,
        setIdToken,
        profile,
        setProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
