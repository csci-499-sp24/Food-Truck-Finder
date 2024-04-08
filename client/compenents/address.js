'use client';
import {
    Card,
    Typography,
  } from "@mui/material";

export default function Address(props) {
    
    const foodTruck = props.foodTruck;

    return (
        <>
            <Card sx={{ backgroundColor: "#105372", padding: 2, height: "333px", overflowY: "auto" }}>
                <Typography color="white" variant="h5" align="center">
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