import { FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";

export default function DishCard() {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLiked = () => setIsLiked((prevState) => !prevState);
  const clickHandler = (e: any) => {
    e.stopPropagation();
    toggleLiked();
  };
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          width="200"
          style={{
            borderRadius: "10px",
          }}
          image="https://loveincorporated.blob.core.windows.net/contentimages/gallery/d9e900e4-212e-4c3d-96d5-cb14a023c659-worlds-most-delicious-dishes.jpg"
        />
        <CardContent>
          <Stack
            direction="column"
            gap={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Typography
                flexBasis="70%"
                variant="body1"
                fontWeight="bold">
                Bread and butter pudding
              </Typography>
              <div onClick={clickHandler}>{isLiked ? <FavoriteRounded /> : <FavoriteBorder />}</div>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              pt={1}>
              <Typography variant="body1">30 min</Typography>
              <Typography variant="body1">7 ingredients</Typography>
              <Typography variant="body1">Easy</Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
