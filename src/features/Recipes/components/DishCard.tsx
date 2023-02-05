import { FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";

interface DishCardProps {
  mealName: string;
  imageUrl?: string | undefined;
}
export default function DishCard({ mealName, imageUrl = undefined }: DishCardProps) {
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
          loading="lazy"
          component="img"
          height="200"
          width="200"
          style={{
            borderRadius: "10px",
          }}
          image={
            imageUrl ||
            "https://www.yanaya.co.zw/wp-content/uploads/2020/08/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.jpg"
          }
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
                {mealName}
              </Typography>
              <div onClick={clickHandler}>
                {isLiked ? (
                  <FavoriteRounded
                    sx={{
                      color: "#28D681",
                    }}
                  />
                ) : (
                  <FavoriteBorder />
                )}
              </div>
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
