import { Card, Typography } from "@mui/material";

export default function Reviews(props) {
    const foodTruck = props.foodTruck;

    const reviews = foodTruck.reviews && foodTruck.reviews.length > 0 ? (
        foodTruck.reviews.map((review, index) => (
            <div key={index} style={{ backgroundColor: '#02092c', padding: '10px', margin: '10px', borderRadius: '10px', color: "white" }}>
                <h3>{review.name}: {review.review} </h3>
                <p>Rating: {review.rating}</p>
            </div>
        ))
    ) : (
        <p>No reviews available</p>
    );

    return (
        <>
            <Card sx={{ backgroundColor: "#105372", padding: 2, height: "500px", overflowY: "auto" }}>
                <h2 style = {{color: "white", textAlign: "center"}}>REVIEWS and RATINGS</h2>
                {reviews}
            </Card>
        </>
    );
}
