'use client';
import {
    Card,
    Typography,
  } from "@mui/material";

export default function FTTitle(props) {
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
        >
        Rating: {foodTruck.foodTruck.rating} /5
        </Typography>

        </>
    )
}