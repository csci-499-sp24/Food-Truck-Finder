import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../truck.module.css";
import {
    Stack, Button, Typography
} from "@mui/material";

import FTTitle from '../../../compenents/Title';

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
            <Stack direction={"row"}>
                <Stack direction="column" flexGrow={1} gap={4} padding={4}>
                    <Typography
                        color={"white"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        fontSize={50}
                        >
                        Add Food Truck Review
                    </Typography>

                    <Typography
                        color={"white"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        fontSize={35}
                    >
                        {foodTruck.foodTruck.name}
                    </Typography>

                    <Typography
                        color={"white"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        fontSize={20}
                    >
                         Rating: {foodTruck.foodTruck.rating} /5
                    </Typography>

                </Stack>
            </Stack>
            Add Review
        </section>
    );
}
