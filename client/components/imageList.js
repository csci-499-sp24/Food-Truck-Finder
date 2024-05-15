"use client";
import { Button, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";

const ImageWithPreviewModal = ({ url }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open && (
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            top: 0,
            left: 0,
            zIndex: 2000,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              flexGrow: 1,
              height: "100%",
            }}
          >
            <img src={url} style={{ maxWidth: "80vw", maxHeight: "80vh" }} />
          </div>
        </div>
      )}

      <img src={url} className="h-32 px-1" onClick={() => setOpen(true)} />
    </div>
  );
};

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
      {images.length > 0 && <Card
        sx={{
          backgroundColor: "#105372",
          padding: 3,
          height: "170px",
          overflowX:"auto"
        }}
        className="flex flex-row"
      >
        {images &&
          images.map((item, index) => (
            <ImageWithPreviewModal url={item.imageUrl} key={index} style={{ flex: "0 0 auto" }} />
          ))}
      </Card>}
    </>
  );
}
