import React, { useEffect, useState } from "react";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { Google } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useAuthContext } from "../context/auth-context";
import axios from "axios";
import { gapi } from "gapi-script";
import jwtDecode from "jwt-decode";

const GoogleAuthButton = styled(Button)({
  border: "2px solid",
  fontWeight: 500,
  borderRadius: "8px",
  padding: "8px 16px",
  textTransform: "none",
  lineHeight: "27px",
  margin: "24px ",
});

const GoogleAuth = () => {
  const { user, setUser } = useAuthContext();

  // console.log(user);
  // console.log(gapi.auth.getToken())

  // const [profile, setProfile] = useState<any>(null);

  // const handleLogin = (credential: any) => {
  //   console.log(credential);
  //   setUser(credential);
  // };

  // const handleLogout = () => {
  //   googleLogout();
  //   setUser(null);
  //   setProfile(null);
  // };

  // const login = useGoogleLogin({
  //   onSuccess: handleLogin,
  //   // flow: "auth-code",
  // });

  // useEffect(() => {
  //   if (user != null) {
  //     axios
  //       .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         setProfile(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

  // if (profile) {
  //   return (
  //     <>
  //       <img
  //         height={64}
  //         style={{
  //           borderRadius: "100%",
  //         }}
  //         src={profile.picture}
  //         alt="user image"
  //       />
  //       <Button
  //         onClick={handleLogout}
  //         variant="contained">
  //         Click
  //       </Button>
  //     </>
  //   );
  // }

  return (
    <GoogleLogin
      onSuccess={({credential}) => {
        const decoded = jwtDecode(credential as string);
        axios.get('https://int20h.onrender.com/recipes', {
          headers: {
            'Authorization-Google': credential,
            "Access-Control-Allow-Origin": "*",
          }
        }).then(({data}) => {
          console.log(data)
        })
      }}
      // TODO handle error
      onError={() => {
        console.log("Login Failed");
      }}
    />
    // <GoogleAuthButton
    //   variant="contained"
    //   sx={{
    //     color: "#28D681",
    //     background: "#28D681",
    //   }}
    //   onClick={() => login()}>
    //   <Google color="primary" />{" "}
    //   <Typography
    //     ml={0.5}
    //     variant="body1"
    //     fontWeight="bold"
    //     color="primary">
    //     Sign in with Google
    //   </Typography>
    // </GoogleAuthButton>
  );
  // googleLogout();
};

export default GoogleAuth;
