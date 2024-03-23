import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../truck.module.css";
import {
  Stack, Button
} from "@mui/material";
import Reviews from "./reviews";
import FTMap from "./ftMap";
import Menu from "./Menu";
import Description from "./description";
import FTTitle from './Title';
import DropDown from "./dropDown";
require("dotenv").config();

export default function FoodTruckPage() {
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
          <img src="../../../404error.webp"></img>
        </div>
      </div>
    );
  }
  if (!foodTruck) {
    return <div>No food truck found.</div>;
  }
  const position = {
    lat: Number(foodTruck.foodTruck.lat),
    lng: Number(foodTruck.foodTruck.lng),
  };
  const navigateToHome = () => {
    router.push("/");
  };
  return (
    <section className={styles.container}>
      <Stack direction={"row"} gap={4}>
        {/* left side */}
        <Stack direction="column" flexGrow={1} gap={4} padding={4}>
            <FTTitle foodTruck={foodTruck}></FTTitle>
            <Description foodTruck ={foodTruck}></Description>
            <Menu foodTruck = {foodTruck}></Menu>
            <Button variant="outlined" onClick={navigateToHome}>
              Back to Home
            </Button>
        </Stack>

        {/* Right side stack */}
        <Stack direction="column" padding={10} gap={2}>
            <FTMap position={position}></FTMap>
            <Reviews foodTruck={foodTruck} ></Reviews>
        </Stack>
      </Stack>

        <DropDown></DropDown>
    </section>
  )}