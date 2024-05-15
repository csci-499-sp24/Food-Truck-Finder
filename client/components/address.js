'use client';
import {
    Card,
    Typography,
  } from "@mui/material";

export default function Address(props) {
    const foodTruck = props.foodTruck;

    return (
        <>
        {/* 105372 */}
            <Card sx={{ backgroundColor: "#105372", padding: 2, height: "50px"}}>
                <Typography color="white" variant="h7">
                    {foodTruck.foodTruck.address ? (
                        `Address: ${foodTruck.foodTruck.address}`
                    ) : (
                        "No address"
                    )}
                </Typography>
            </Card>
        </>
    )
}