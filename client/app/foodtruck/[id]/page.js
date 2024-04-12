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
import { headers } from "next/headers";
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

const fetchImage = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodtrucks/${id}/images`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch food truck image");
    }
    const images = await response.json();

    return images.length > 0 ? images[0].imageUrl : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
    } catch (error) {
      console.error("Error fetching food truck image:", error);
    return null;
  }
};

export async function generateMetadata({ params }) {
  const id = params.id;
  
  const foodTruck = await fetchData(id);  
  const imageUrl = await fetchImage(id);
  
  return {
    title: `${foodTruck.foodTruck.name}`,
    description: `Discover delicous food at ${foodTruck.foodTruck.address}.`,
    openGraph: {
      images: [imageUrl],
      type: 'website',
      url: `foodtruck/${id}`,
      title: `${foodTruck.foodTruck.name}`,
      description: `Discover delicous food at ${foodTruck.foodTruck.address}.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${foodTruck.foodTruck.name}`,
      description: `Discover delicous food at ${foodTruck.foodTruck.address}.`,
      image: imageUrl,
    }
  };
}

export default async function Page(slug) {
  const id = slug.params.id;
  const data = await fetchData(id);

  const headersList = headers();
  const URL = process.env.NEXT_PUBLIC_SITE_URL+ headersList.get('x-path');

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

        <DropDown URL ={URL} ></DropDown>
    </section>
  )}