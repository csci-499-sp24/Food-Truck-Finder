'use client';
import {
    Card,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
import { Favorite, FavoriteBorder } from '@mui/icons-material';

export default function FTTitle(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    const foodTruck = props.foodTruck;
    return (
        <>
        <Typography
        color={"white"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={50}
        >
        {foodTruck.foodTruck.name}
        </Typography>
        <Typography
                color={"white"}
                textAlign={"center"}
                fontWeight={"bold"}
                fontSize={20}
                onMouseEnter={() => setIsFavorite(true)}
                onMouseLeave={() => setIsFavorite(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                Add to Favorite:
                {isFavorite ? (
                    <Favorite color="secondary" style={{ marginLeft: 5 }} />
                ) : (
                    <FavoriteBorder color="secondary" style={{ marginLeft: 5 }} />
                )}
        </Typography>
        <Typography
        color={"white"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={20}
        >
        Rating: {foodTruck.foodTruck.ratings / foodTruck.foodTruck.review_count} /5
        </Typography>

        </>
    )
}