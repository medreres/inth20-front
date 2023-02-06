import React, { useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Route, useLocation, BrowserRouter as Router } from "react-router-dom";

import GoogleAuth from "../features/Auth/components/GoogleAuth";

const pages = [
  { name: "Home", path: "/" },
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
                  href={page.path}
                >
                  <Typography
                    textAlign="center"
                    fontWeight="500"
                    textTransform="none">
                      {page.name}
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
                href={page.path}
                sx={{
                  my: 2,
                  //  color: "white",
                  display: "block",
                  textTransform: "none",
                  margin: "0 32px",
                }}>
                  {page.name}
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
