import React from "react";
import { Typography, Button, Grid, Link } from "@mui/material";
import Image from "mui-image";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      py="96px">
      <Grid
        item
        sm={12}
        md={6}
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        color="secondary"
        sx={{
          pb: { xs: "64px", md: "none" },
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
        }}>
        <Typography
          variant="h2"
          color="secondary"
          sx={{
            fontWeight: "700",
            fontSize: "48px",
            lineHeight: "64px",
            mb: "32px",
          }}>
          Welcome to InFridge!
        </Typography>
        <Typography
          color="secondary"
          sx={{
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: "500",
            mb: "32px",
          }}>
          It is an ultimate tool for managing your grocery list, discovering new recipes, and meal planning! With
          InFridge, you can keep track of what food you have in your fridge, group your ingredients by type, and easily
          find recipes based on what you have on hand. Get started now!
        </Typography>
        <Button
          onClick={() => navigate("/my-fridge")}
          variant="contained"
          // href="/"
          sx={{
            fontSize: "24px",
            lineHeight: "1.5",
            padding: "16px 64px",
            gap: "10px",
            border: "2px solid",
            borderRadius: "8px",
            textTransform: "none",
            textAlign: "center",
          }}>
          Create My Fridge
        </Button>
      </Grid>
      <Grid
        item
        sm={12}
        md={6}>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWE2cA4gMLSElnMWVnB25lMSOzGt8TeIwgiA&usqp=CAU"
          alt="dish"
          width="100%"
          style={{
            borderRadius: "10px",
          }}
          height="350"
        />
      </Grid>
    </Grid>
  );
};

export default Header;
