import styles from "../truck.module.css";
import {
  Stack, Button
} from "@mui/material";
import Reviews from "../../../compenents/reviews";
import FTMap from "../../../compenents/ftMap";
import Menu from "../../../compenents/Menu";
import Address from "../../../compenents/address";
import FTTitle from '../../../compenents/Title';
import DropDown from "../../../compenents/dropDown";
import Link from "next/link";
require("dotenv").config();




const fetchData = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodtrucks/${id}/info`,
      {
        next: { revalidate: 10 }
      }
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

export default async function Page(slug) {
  const id = slug.params.id;

  const data = await fetchData(id);

  const foodTruck = data;

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
            <FTTitle foodTruck={foodTruck}></FTTitle>
            <Address foodTruck ={foodTruck}></Address>
            <Menu foodTruck ={foodTruck}></Menu>
            <Button variant="outlined" >
              <Link href={"/"} style={{textDecoration: 'none', color: 'white'}} >Home</Link>
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