'use client';
import {
    Card,
    Typography,
  } from "@mui/material";
import { useRouter } from "next/navigation";
import Rating from 'react-rating-stars-component';

export default function FTTitle(props) {
    const router = useRouter();
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
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  marginBottom: "-60px" }}
                
            >
        </Typography>
        <Typography
        color={"white"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={20}
        >
        </Typography>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Rating
                value={foodTruck.foodTruck.ratings / foodTruck.foodTruck.review_count}
                count={5}
                size={24}
                activeColor="gold"
                inactiveColor="#FFF"
                edit={false}
            />
            <div style={{ marginLeft: "5px" }}>
                ({foodTruck.foodTruck.review_count})
            </div>
        </div>
        </>
    )
}