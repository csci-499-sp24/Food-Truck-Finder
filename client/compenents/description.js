import {
    Card,
    Typography,
  } from "@mui/material";

export default function Description(props) {
    
    const foodTruck = props.foodTruck;

    return (
        <>
            <Card sx={{ backgroundColor: "#105372", padding: 2, height: "80px", overflowY: "auto" }}>
                <Typography color="white">
                    Address: {foodTruck.foodTruck.address}
                </Typography>
            </Card>
        </>
    )
}