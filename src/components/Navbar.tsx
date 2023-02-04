import React, { useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Route, useLocation, BrowserRouter as Router } from "react-router-dom";

import GoogleAuth from "./GoogleAuth";

const pages = [
  { name: "Browse Recipes", path: "/browse-recipes" },
  { name: "My Fridge", path: "/my-fridge" },
  { name: "Shopping List", path: "/shopping-list" },
  { name: "Saved Recipes", path: "/saved-recipes" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const location = useLocation();

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

  return (
    <AppBar
      position="static"
      sx={{ px: { md: "96px" } }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            color="secondary"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 800,
              fontSize: "32px",
              textDecoration: "none",
              // color: 'white',
            }}>
            InFridge.
          </Typography>
          <Box sx={{ flexGrow: 0.2, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              //
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                >
                  <Typography
                    textAlign="center"
                    fontWeight="500"
                    textTransform="none">
                    <Link
                      href={page.path}
                      underline="none"
                      color="black">
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            color="secondary"
            // color="white"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 800,
              textDecoration: "none",
              justifyContent: "center",
            }}>
            InFridge.
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                color="secondary"
                sx={{
                  my: 2,
                  //  color: "white",
                  display: "block",
                  textTransform: "none",
                  margin: "0 32px",
                }}>
                <Link
                  href={page.path}
                  underline="none"
                  // color="white"
                  color="secondary">
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>
          <GoogleAuth />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
