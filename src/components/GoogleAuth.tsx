import styled from "@emotion/styled";
import { Google } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { CredentialResponse, GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { getRecipes } from "../api/googleAuth";
import { useAuthContext } from "../context/auth-context";

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
  const { idToken, setIdToken } = useAuthContext();

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

  const handleLogin = ({ credential }: CredentialResponse) => {
    setIdToken(credential as string);
  };

  useEffect(() => {
    if (idToken == null) return;

    
     getRecipes(idToken).then(recipes => {
       console.log(recipes)
     })
  }, [idToken]);

  return (
    <>
      <GoogleLogin
        onSuccess={handleLogin}
        // TODO handle error
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <Button
        onClick={() => {
          googleLogout();
          setIdToken(null);
        }}>
        Log out
      </Button>
    </>
  );
};

export default GoogleAuth;
