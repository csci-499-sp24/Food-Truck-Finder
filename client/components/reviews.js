"use client";
import { Card, Typography, Button } from "@mui/material";
import Link from "next/link";
import "@/styles/reviews.css"
import { useEffect, useState } from "react";

export default function Reviews(props) {
    const {id} = props;
    const foodTruckId = id;
    const [foodTruck, setFoodTruck] = useState({});

    useEffect(() => {
        const get = async () =>{
            const fetchData = async () => {
                try {
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodtrucks/${id}/info`
                  );
                  if (!response.ok) {
                    throw new Error("Failed to fetch food truck");
                  }
                  const data = await response.json();
                  return data;
                } catch (error) {
                  console.error("Error fetching food truck:", error);
                }
            };

            const r = await fetchData();
          
            setFoodTruck(r);
        }
        get();
    }
    ,[]);

    // const reviews = foodTruck.reviews && foodTruck.reviews.length > 0 ? (
    //     foodTruck.reviews.map((review, index) => (
    //         <div key={index} className="reviews">
    //             <h4>{review.name}: {review.review} </h4>
    //             <p>Rating: {review.rating}</p>
    //         </div>
    //     ))
    // ) : ( 
    // <p className="no-reviews">
    //     No reviews available
    // </p>
    // );

    return (
        <>
            <Card className="review-card">
                <h5 className="review-header">
                    REVIEWS and RATINGS
                </h5>
                <div
                style={{
                    backgroundColor: "#02092c",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "10px",
                    color: "white",
                    maxHeight: "300px", 
                    overflowY: "auto",
                  }}>
                    
                    {foodTruck.reviews && foodTruck.reviews.length > 0 ? (
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
                    )} 
                </div>
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
