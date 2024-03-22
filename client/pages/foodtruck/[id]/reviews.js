import { Card, Typography } from "@mui/material"


export default function Reviews(props){
    return (
        <>
            <Card sx={{ backgroundColor: "#105372", padding: 2 }}>
                {props.foodTruck && props.foodTruck.reviews.map(item => (
                    <Typography>{JSON.stringify(item)}</Typography>
                ))}
            </Card>
        </>
    )
}