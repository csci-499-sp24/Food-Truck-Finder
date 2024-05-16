import styles from "../truck.module.css";
import { Stack, Button } from "@mui/material";
import Reviews from "../../../components/reviews";
import FTMap from "../../../components/ftMap";
import Menu from "../../../components/Menu";
import Address from "../../../components/address";
import FTTitle from "../../../components/Title";
import DropDown from "../../../components/dropDown";
import ImageList from "@/components/imageList";
import Link from "next/link";
import { headers } from "next/headers";
require("dotenv").config();

const fetchData = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodtrucks/${id}/info`,
      {
        next: { revalidate: 60, tags: ["pageRefresh"] },
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

    return images.length > 0
      ? images[0].imageUrl
      : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  } catch (error) {
    console.error("Error fetching food truck image:", error);
    return null;
  }
};

const fetchImageList = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodtrucks/${id}/images`,
      {
        next: { revalidate: 60, tags: ["pageRefresh"] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch food truck image");
    }
    const images = await response.json();

    return images;
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
    description: `Discover delicious food at ${foodTruck.foodTruck.name}. Located at ${foodTruck.foodTruck.address}.`,
    openGraph: {
      images: [imageUrl],
      type: "website",
      url: `foodtruck/${id}`,
      title: `${foodTruck.foodTruck.name}`,
      description: `Discover delicious food at ${foodTruck.foodTruck.name}. Located at ${foodTruck.foodTruck.address}.`,
    },
  };
}

export default async function Page(slug) {
  const id = slug.params.id;
  const data = await fetchData(id);
  const images = await fetchImageList(id);

  const headersList = headers();
  const URL = process.env.NEXT_PUBLIC_SITE_URL + headersList.get("x-path");

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
      <Stack className="flex lg:flex-row" >
        {/* left side */}
        <Stack direction="column" flexGrow={1} gap={4} padding={4} >
            <FTTitle foodTruck={foodTruck} id={id}></FTTitle>
            <Address foodTruck ={foodTruck}></Address>
            <ImageList id={id}></ImageList>
            <Menu foodTruck ={foodTruck}></Menu>
        </Stack>

        {/* Right side stack */}
        <Stack direction="column" gap={2} className="p-4">
          <FTMap position={position}></FTMap>
          <Reviews id={id} ></Reviews>
        </Stack>
      </Stack>

      <Stack className="pt-0">
        <Link legacyBehavior href={{ pathname: '/' }} passHref>
          <Button variant="outlined" className="" style={{ textDecoration: 'none', color: 'white' }} >
            Home
          </Button>
        </Link>
      </Stack>
      <DropDown URL={URL}></DropDown>

    </section>
  );
}

