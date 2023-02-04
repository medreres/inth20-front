// import React, { useEffect, useState } from "react";
// import { GoogleLogin, googleLogout, useGoogleLogin  } from '@react-oauth/google';
// import useAuthStore from '../../store/authStore';
// import { createOrGetUser } from '../../utils';
// import Button from "@mui/material/Button";
// import styled from "@emotion/styled";
// import { Google } from "@mui/icons-material";
// import { Typography, Link } from "@mui/material";
// import Image from "mui-image";

// interface UserProfile {
//   image: string;
// }

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

import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = (response: any) => {
    setIsLoggedIn(true);
    setAccessToken(response.accessToken);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
  };

  const getRecipes = async () => {
    const response = await axios.get('/recipes', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  const isAlive = async () => {
    const response = await axios.get('/alive');
    return response.data;
  };

  return (
    <div>
      {!isLoggedIn && (
        <GoogleLogin
          // clientId="917756343353-s67bgmnpv97ijhfahvmjhu0iegr2t6pn.apps.googleusercontent.com"
          onSuccess={handleLogin}
          onError={handleLogout}
        />
      )}
      {isLoggedIn && (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default GoogleAuth