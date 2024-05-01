'use client';
import { Button, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";


export default function ImageList(props) {
    const { id } = props;
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImageList = async (id) => {
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodtrucks/${id}/images`
              );
          
              if (!response.ok) {
                throw new Error("Failed to fetch food truck image");
              }
              const img = await response.json();
          
              setImages(img);
              } catch (error) {
                console.error("Error fetching food truck image:", error);
            }
          };
        fetchImageList(id);
    }, []);

    
    return (
        <>
            <Card
                sx={{
                    backgroundColor: "#105372",
                    padding: 3,
                    height: "110px",
                    overflowY: "auto",
                }}
            >
                {
                    images && images.map((item, index) => (
                        <Image alt="test" src={item.imageUrl} key={index} height={100} width={100} />
                    ))
                }
            </Card>
        </>
    )
}