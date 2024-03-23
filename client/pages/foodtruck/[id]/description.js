import {
    Card,
    Typography,
  } from "@mui/material";

export default function Description(props) {
    
    const foodTruck = props.foodTruck;

    return (
        <>
            <Card sx={{ backgroundColor: "#105372", padding: 2, height: "300px", overflowY: "auto" }}>
                <Typography color="white">
                Description: {foodTruck.foodTruck.description}
                </Typography>
                <h1>No Description</h1>
            </Card>
        </>
    )
}