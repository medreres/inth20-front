import styled from "@emotion/styled";
import { Google } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { CredentialResponse, GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { getRecipes } from "../../../api/mealDb";
import { useAuthContext } from "../context/auth-context";
import {} from "../../..";
import { getDateUnix } from "../../../utils/format";

// const GoogleAuthButton = styled(Button)({
//   border: "2px solid",
//   fontWeight: 500,
//   borderRadius: "8px",
//   padding: "8px 16px",
//   textTransform: "none",
//   lineHeight: "27px",
//   margin: "24px ",
// });

// const GoogleAuth = () => {
//   const { userProfile, addUser, removeUser } = useAuthStore();

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => console.log(codeResponse),
//     flow: "auth-code",
//   });

//   return (
//     <div>
//       <GoogleAuthButton
//         variant="contained"
//         onClick={() => login()}>
//         <Google />{" "}
//         <Typography
//           ml={0.5}
//           variant="body1">
//           Sign in with Google
//         </Typography>
//       </GoogleAuthButton>
//     </div>
//   );
//   googleLogout();
// };

// export default GoogleAuth;

// TODO handle token expiration

const GoogleAuth = () => {
  const { idToken, setIdToken, profile, setProfile } = useAuthContext();

  const handleLogin = ({ credential }: CredentialResponse) => {
    setIdToken(credential as string);
    setProfile(jwtDecode(credential as string));
  };

  const handleLogout = () => {
    googleLogout();
    setProfile(null);
    setIdToken(null);
  };

  // TODO refresh token
  useEffect(() => {
    // console.log(jwtDecode(idToken))
    // if token is null - exit
    if (idToken == null) return;

    // if token is present, but not valid - set to null
    if (getDateUnix(profile!.exp) < new Date()) {
      setIdToken(null);
      setProfile(null);
      return;
    }
  }, [idToken, profile, setIdToken, setProfile]);

  // TODO styling
  if (idToken)
    return (
      <>
        <img
        style={{
          borderRadius: '100%',
          marginRight: '1em'
        }}
          alt="profile"
          height={48}
          src={profile?.picture}
        /> <Button
          variant="contained"
          onClick={handleLogout}>
          Log out
        </Button>
      </>
    );

  // render login button if not authenticated
  return (
    <GoogleLogin
      auto_select
      onSuccess={handleLogin}
      // TODO handle error
      onError={() => {
        alert("An error occurred. Please try again later");
      }}
    />
  );
};

export default GoogleAuth;
