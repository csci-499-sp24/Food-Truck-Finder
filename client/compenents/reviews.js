"use client";
import { Card, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Reviews(props) {
    const foodTruck = props.foodTruck;
    const foodTruckId = foodTruck.foodTruck.id;

    const reviews = foodTruck.reviews && foodTruck.reviews.length > 0 ? (
        foodTruck.reviews.map((review, index) => (
            <div key={index} style={{ backgroundColor: '#02092c', padding: '10px', margin: '10px', borderRadius: '10px', color: "white" }}>
                <h4>{review.name}: {review.review} </h4>
                <p>Rating: {review.rating}</p>
            </div>
        ))
    ) : ( 
    <p style = {{ textAlign: "center" }}>No reviews available</p>
    );

    return (
        <>
            <Card sx={{ backgroundColor: "#105372", padding: 2, height: "500px", overflowY: "auto" }}>
                <h5 style = {{color: "white", textAlign: "center"}}>REVIEWS and RATINGS</h5>
                {reviews}
                <div>
                    <div style = {{ textAlign: "center" }}>
                        <Link legacyBehavior href={`/foodtruck/${foodTruckId}/addReview`}>
                            <Button variant="outlined">
                                ADD REVIEW 
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </>
    );
}
