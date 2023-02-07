import { Grid, Link, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React from "react";

export default function Footer() {
  return (
    <Grid container
      px={{xs: "36px", sm: "48px",  md: "96px" }}
      py={{xs: "48px"}}
      display="flex"
      flex="1"
      justifyContent="space-between"
      sx={{
        backgroundColor: "#E9FFF4",
      }}>
  
      <Grid item xs={12} sm={4}
        display="flex" pb={{xs: "24px", sm: "0"}}>
        <Typography
          variant="h2"
          color="primary_secondary">
          InFridge.
        </Typography>
      </Grid>
        <Grid item xs={12} sm={4} spacing={1}>
          <Link href="/my-fridge"><Typography variant="body1">My Fridge</Typography></Link>
          <Link href="/shopping-list"><Typography variant="body1">Shopping List</Typography></Link>
        </Grid>
        <Grid item xs={12} sm={4} spacing={1}>
          <Link href="/browse-recipes"><Typography variant="body1">Browse Recipes</Typography></Link>
          <Link href="/saved-recipes"><Typography variant="body1">Saved Recipes</Typography></Link>
        </Grid>
      <Typography
        pt={5}
        variant="body1">
        Random © 2023
      </Typography>
    </Grid>
  );
}
