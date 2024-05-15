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
            <Card sx={{ backgroundColor: "#ffffff", padding: 2, height: "30px", overflowY: "auto" }}>
                <Typography color="black" variant="h7" align="center">
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