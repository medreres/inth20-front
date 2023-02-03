import React, { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const GoogleAuthButton = styled(Button)({
  border: '2px solid',
  fontWeight: 500,
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  lineHeight: '27px',
  margin: '24px ',
})

const GoogleAuth = () => {
  const login = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  });

  return (
    <div>
      <GoogleAuthButton 
        variant="contained" 
        onClick={() => login()}
      >
        Sign in with Google
      </GoogleAuthButton>
    </div>
  )
  googleLogout();
}

export default GoogleAuth