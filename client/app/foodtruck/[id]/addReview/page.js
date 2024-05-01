"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../truck.module.css";
import {
    Stack, Button, Typography, Card, TextField, Rating
} from "@mui/material";
import { getSession } from '@/compenents/lib';
import Image from "next/image";
import { getCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
import ImageDropzone from "@/compenents/ImageDropzone";



export default function Page(slug) {
    const router = useRouter();
    const id = slug.params.id;
    const [foodTruck, setFoodTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState('');

    const [droppedImage, setDroppedImage] = useState(null);

    const handleDrop = (files) => {
        // Do something with the dropped image
        const imageUrl = URL.createObjectURL(files[0]);
        setDroppedImage(imageUrl);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodtrucks/${id}/info`
                );
            if (!response.ok) {
                throw new Error("Failed to fetch food truck");
            }

            const data = await response.json();
            console.log("Fetched data:", data);
            setFoodTruck(data);
            setLoading(false);
            if(foodTruck)
                console.log(foodTruck.menu);
          } catch (error) {
            console.error("Error fetching food truck:", error);
            setError(error);
            setLoading(false);
          }
        };
        if (id) {
          fetchData();
        }
      }, [id]);

      useEffect(() => {
        const session = getCookie("session");
        if(!session){
            router.push('/login');
        }
      }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div style={{ color: "red", margin: "auto" }}>
                <div
                    style={{ color: "red", margin: "auto", width: "50%", height: "50%" }}
                    className="errorMessage"
                >
                    Error: {error.message}
                    <Image src="/404error.webp" height= "1000" width="1000"></Image>
                </div>
            </div>
        );
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            console.log(droppedImage);
            if(droppedImage){
                const response = await fetch(droppedImage);
                const blob = await response.blob();
                formData.append('image', blob, 'image.jpg');
                console.log(1234);
            }


            const reviewData = {
                Rating: e.target.rating.value,
                Review: review,
                Session: getSession()
            }
            formData.append('jsonData', JSON.stringify(reviewData));

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodtrucks/${id}/addReview`, {
                method: 'POST',
                body: formData
            });

            console.log('Added a review successfully');

            // Redirect back to foodtruck page
            router.back();
        } catch (error) {
            console.error("Error adding a review:", error);
        }
    }

    const navigateToTruck = () => {
        router.back();
    };

    return (
        <section className={styles.container} style={{ height: "100vh" }}>
            <Stack direction="column" gap={4} padding={2}>
                <Typography
                    color={"white"}
                    textAlign={"center"}
                    fontWeight={"bold"}
                    fontSize={50}
                    >
                    Add a Review
                </Typography>
            </Stack>

            <Stack direction="column" justifyContent="center" alignItems="center" paddingTop={4} gap={6}>
                <Card sx={{ backgroundColor: "#105372", padding: 2, width: "50%", overflowY: "auto" }}>
                    <Typography
                        color={"white"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        fontSize={35}
                        sx={{ paddingBottom: "10px" }}
                    >
                        {foodTruck.foodTruck.name}
                    </Typography>

                    <form onSubmit={handleSubmit} style={{ margin: "auto", marginBottom: "20px", textAlign: "center" }}>
                        <div style={{ padding: "10px 0" }}>
                            <Typography color="white" variant="h6" align="center">
                                Overall Rating
                            </Typography>
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                        </div>
                        <div>
                            <h1>Image Upload</h1>
                            <ImageDropzone onDrop={handleDrop} />
                            {droppedImage && <img src={droppedImage} alt="Dropped" />}
                        </div>


                        <TextField
                            sx={{ width: "80%", background: "white", borderRadius: "5px"}}
                            id="outlined-multiline-static"
                            placeholder="Write your review here"
                            multiline
                            rows={7}
                            variant="outlined"
                            value={review}
                            required
                            onChange={(e) => setReview(e.target.value)}
                        >
                        </TextField>

                        <div style={{ marginTop: "30px" }}>
                            <Button variant="outlined" type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Card>
                
                <Button variant="outlined" type="submit" style={{ width: "50%" }} onClick={navigateToTruck}>
                    Back
                </Button>
            </Stack>
        </section>
    );
}
