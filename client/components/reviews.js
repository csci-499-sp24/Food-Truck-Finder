"use client";
import { Card, Typography, Button } from "@mui/material";
import Link from "next/link";
import "@/styles/reviews.css"

export default function Reviews(props) {
    const foodTruck = props.foodTruck;
    const foodTruckId = foodTruck.foodTruck.id;

    const reviews = foodTruck.reviews && foodTruck.reviews.length > 0 ? (
        foodTruck.reviews.map((review, index) => (
            <div key={index} className="reviews">
                <h4>{review.name}: {review.review} </h4>
                <p>Rating: {review.rating}</p>
            </div>
        ))
    ) : ( 
    <p className="no-reviews">
        No reviews available
    </p>
    );

    return (
        <>
            <Card className="review-card">
                <h5 className="review-header">
                    REVIEWS and RATINGS
                </h5>
                {reviews}
                <div>
                    <div className="add-review">
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
