import { Button, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function ImageList(props) {
    const images = props.images;
    return (
        <>
            <Card
                sx={{
                    backgroundColor: "#ffffff",
                    padding: 3,
                    height: "110px",
                    overflowY: "auto",
                }}
            >
                {
                    images.map((item, index) => (
                        <Image alt="test" src={item.imageUrl} key={index} height={100} width={100} />
                    ))
                }
            </Card>
        </>
    )
}