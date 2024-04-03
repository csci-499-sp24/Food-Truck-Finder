import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../truck.module.css";
import {
    Stack, Button, Typography, Card, TextField, Rating
} from "@mui/material";

export default function AddReview() {
    const router = useRouter();
    const { id } = router.query;
    const [foodTruck, setFoodTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <section className={styles.container}>
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

            <Stack direction="column" justifyContent="center" alignItems="center" paddingTop={4} paddingBottom={14} gap={8}>
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

                    <form style = {{ margin: "auto", marginBottom: "20px", textAlign: "center" }}>
                        <div style = {{ padding: "10px 0" }}>
                            <Typography color="white" variant="h6" align="center">
                                Overall Rating
                            </Typography>
                            <Rating
                                name="rating"
                            />
                        </div>

                        <TextField
                            sx={{ width: "80%", background: "white", borderRadius: "5px"}}
                            id="outlined-multiline-static"
                            placeholder="Write your review here"
                            multiline
                            rows={7}
                            variant="outlined"
                        >
                        </TextField>
                    </form>
                </Card>

                <Button variant="outlined">
                    Submit
                </Button>
            </Stack>
        </section>
    );
}
