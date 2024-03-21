import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../truck.module.css";
import {
  Button,
  Card,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

require("dotenv").config();

export default function FoodTruckPage() {
  const router = useRouter();
  const { id } = router.query;
  const [foodTruck, setFoodTruck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State to track the active view
  const [activeView, setActiveView] = useState("");
  const [menuData, setMenuData] = useState(null);
  const [promotionData, setPromotionData] = useState(null);

  // Event handler for Menu button
  const handleMenuClick = () => {
    setActiveView("menu");
  };
  // Event handler for Promotions/Events button
  const handlePromotionsClick = () => {
    setActiveView("promotions");
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
      } catch (error) {
        console.error("Error fetching food truck:", error);
        setError(error);
        setLoading(false);
      }
    };

    // Function to fetch promotions data
    const fetchPromotionData = async () => {
      try {
        const response = await fetch("/path-to-promotions-api");
        const data = await response.json();
        setPromotionData(data);
      } catch (error) {
        console.error("Failed to fetch promotions data:", error);
      }
    };
    if (id) {
      fetchData();
      fetchPromotionData;
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

  return (
    <section className={styles.container}>
      <Stack direction={"row"} gap={4}>
        {/* left side */}
        <Stack direction="column" flexGrow={1} gap={4} padding={4}>
          <Typography
            color={"white"}
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={36}
          >
            {foodTruck.foodTruck.name}
          </Typography>
          <Typography
            color={"white"}
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={18}
          >
            Rating: {foodTruck.foodTruck.rating} /5
          </Typography>

          <Card sx={{ backgroundColor: "#105372", padding: 2 }}>
            <Typography color="white">
              Description: {foodTruck.foodTruck.description}
            </Typography>
            <pre>{JSON.stringify(foodTruck.foodTruck, null, 2)}</pre>
          </Card>

          <Card sx={{ backgroundColor: "#105372", padding: 2 }}>
            <Stack direction={"row"} gap={1}>
              <Button variant="outlined" onClick={handleMenuClick}>
                Menu
              </Button>
              <Button variant="outlined" onClick={handlePromotionsClick}>
                Promotions/Events
              </Button>
            </Stack>
            {/* Conditionally rendering content */}
            {activeView === "menu" && (
              <div>
                <h2>Menu</h2>
                {/* Display menu data here */}
                {menuData ? (
                  <div>{JSON.stringify(menuData)}</div> // Replace this with your custom rendering
                ) : (
                  <p>Loading menu...</p>
                )}
              </div>
            )}

            {activeView === "promotions" && (
              <div>
                <h2>Promotions/Events</h2>
                {/* Display promotions data here */}
                {promotionData ? (
                  <div>{JSON.stringify(promotionData)}</div> // Replace this with your custom rendering
                ) : (
                  <p>Loading promotions...</p>
                )}
              </div>
            )}

            <Typography color="white"></Typography>
            <pre></pre>
          </Card>
        </Stack>

        {/* Right side stack */}
        <Stack direction="column" padding={10} gap={2}>
          <Map
            center={position}
            zoom={15}
            style={{
              height: 300,
              minWidth: 300,
              width: "100%",
              borderRadius: 16,
            }}
          >
            <Marker position={position} />
          </Map>

          <Card sx={{ backgroundColor: "#105372", padding: 2 }}>
            <Typography color="white">Customer Comments and ratings</Typography>
            <Typography>Mekka: Food was delicious. </Typography>
            <Typography>Rating: 4.5 </Typography>
            <Typography>Momo: Food was exquisite. </Typography>
            <Typography>Rating: 4.7 </Typography>
            <Typography>Noor: Food was mediocre. </Typography>
            <Typography>Rating: 2.5 </Typography>
            <Typography>
              Raaja: The experience was out of this world.{" "}
            </Typography>
            <Typography>Rating: 5 </Typography>
          </Card>
        </Stack>
      </Stack>

      <FormControl>
        <InputLabel id="demo-simple-select-label">Share Via</InputLabel>
        <Select
          color="secondary"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          variant="standard"
          sx={{
            width: 100,
            background: "white",
          }}
        >
          <MenuItem value={10}>Facebook</MenuItem>
          <MenuItem value={20}>INSTAGRAM</MenuItem>
          <MenuItem value={30}>TEXT</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          color="secondary"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          variant="standard"
          sx={{
            width: 100,
            background: "white",
          }}
        >
          <MenuItem value={10}>ENGLISH</MenuItem>
          <MenuItem value={20}>FRENCH</MenuItem>
          <MenuItem value={30}>SPANISH</MenuItem>
        </Select>
      </FormControl>
    </section>
  );

  //   return (
  //     <section className={styles.container}>
  //       <div className={styles.favoriteContainer}>
  //         <h2 className={styles.favorite}> ☆ Add to Favorite</h2>
  //       </div>
  //       <div className={styles.pageTitle}>
  //         <h1 className={styles.title}>{foodTruck.foodTruck.name}</h1>
  //       </div>
  //       <div className={styles.ratingContainer}>
  //         <h2 className={styles.favorite}> Rating-</h2>
  //       </div>
  //       <div className={styles.descriptionContainer}>
  //         <h2 className={styles.description}> Description:</h2>
  //       </div>
  //       <div className={styles.reviewContainer}>
  //         <h2>Reviews</h2>
  //         {/* <h1>{foodTruck.foodTruck.lat}</h1> */}
  //         <h1>Menu</h1>
  //         <h1>{foodTruck.menu}</h1>
  //         {/* Display other details about the food truck */}
  //       </div>
  //       <div className={styles.menuContainer}>
  //         <button className={styles.button}>Menu</button>
  //         <button className={styles.button}>Events</button>

  //         <h2>Menu</h2>
  //         <p>do a for loop for each item in the menu array </p>
  //       </div>

  //       <div className={styles.ratingsContainer}>
  //         <h2>Customer Comments and Ratings</h2>
  //         <p>Food was good</p>
  //       </div>

  //       <select>
  //         <option></option>
  //         <option>English</option>
  //         <option>Spanish</option>
  //         <option>French</option>
  //       </select>

  //       <select>
  //         <option></option>
  //         <option>Instagram</option>
  //         <option>Facebook</option>
  //         <option>Text</option>
  //       </select>
  //     </section>
  //   );
}
