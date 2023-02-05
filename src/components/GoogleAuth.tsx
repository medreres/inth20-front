// interface UserProfile {
//   image: string;
// }

import styled from "@emotion/styled";
import { Google } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/auth-context";

const GoogleAuthButton = styled(Button)({
  border: "2px solid",
  fontWeight: 500,
  borderRadius: "8px",
  padding: "8px 16px",
  textTransform: "none",
  lineHeight: "27px",
  margin: "24px ",
});

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

const GoogleAuth = () => {
  const { user, setUser } = useAuthContext();

  // console.log(user);

  const [profile, setProfile] = useState<any>(null);
  // console.log(profile)
  // console.log(user)

  const handleLogin = (credential: any) => {
    setUser(credential);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };
  const login = useGoogleLogin({
    onSuccess: handleLogin,
    // flow: "auth-code",
  });

  useEffect(() => {
    if (user != null) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          // console.log(res);
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  if (profile) {
    return (
      <img
        height={64}
        style={{
          borderRadius: "100%",
        }}
        src={profile.picture}
        alt="user image"
      />
    );
  }

  return (
    <GoogleAuthButton
      variant="contained"
      sx={{
        color: "#28D681",
        background: "#28D681",
      }}
      onClick={() => login()}>
      <Google color="primary" />{" "}
      <Typography
        ml={0.5}
        variant="body1"
        fontWeight="bold"
        color="primary">
        Sign in with Google
      </Typography>
    </GoogleAuthButton>
  );
  // googleLogout();
};

export default GoogleAuth;
