import React from "react";
import { Typography, Button, Grid, Link } from "@mui/material";
import Image from "mui-image";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      padding="96px">
      <Grid
        item
        xs={12}
        sm={6}
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        textAlign="left"
        color="secondary">
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
          Lorem ipsum dolor sit amet consectetur. Sit sapien justo ac adipiscing aliquet. Eget sit facilisi sit lorem
          consequat. Sagittis gravida sed mattis feugiat vitae. Morbi in non faucibus ac bibendum vitae turpis sed.
          Consequat libero penatibus egestas et vitae.
        </Typography>
        <Button
          variant="contained"
          href="/"
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
          <Link
            href="/my-fridge"
            underline="none"
            // color="white"
            color="secondary">
            Create My Fridge
          </Link>
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}>
        <Image
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fno-image-available&psig=AOvVaw2Ex4qO7AQkT5T95ejQxWWW&ust=1675515171068000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPDZ6siy-fwCFQAAAAAdAAAAABAD"
          alt="image"
          height="100%"
        />
      </Grid>
    </Grid>
  );
};

export default Header;
