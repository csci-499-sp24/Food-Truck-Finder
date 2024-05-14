'use client';
import {
    Card,
    Typography,
  } from "@mui/material";
  import { useEffect, useState, useRef } from "react";
import { Favorite, FavoriteBorder, SystemSecurityUpdateGoodOutlined } from '@mui/icons-material';
import { getCookie, hasCookie } from "cookies-next";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function FTTitle(props) {
    const router = useRouter();
    const [favorited, setIsFavorited] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const foodTruck = props.foodTruck;
    const id = props.id;

    let firstUpdate = useRef(true);
    let [favoriteClick, setFavortiteClick] = useState(false);

    useEffect(() => {
        const isFavorited = async() => {
            if(!hasCookie("session")) setIsFavorited(false);
            else {
                const Session = {Session: getCookie("session")};
                try{
                    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/${id}/favorited`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(Session)
                    });
                    const result = await response.json();
                    setIsFavorited(result.favorited);
                    setIsFavorite(result.favorited);
                }catch(err) {
                    console.log(err);
                }
            }
        };
        isFavorited();
    }, []);

    useEffect(() => {
        const change = async () => {
            if(!firstUpdate.current) {
                if(!hasCookie("session")) {
                    return;
                }else {
                    const result = { Session: getCookie("session"), ft_id: id}
                    let response = "";
                    if(favorited) {
                        response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/addFavorite`,{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(result)
                        });
                    }else{
                        response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/addFavorite`,{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(result)
                        });
                    }
                    response = await response.json();
                    if(response.success){
                        console.log(1);
                        setIsFavorited(!favorited);
                        setIsFavorite(favorited);
                    }
                }
            }
        }
        change();
        
    } ,[favoriteClick]);


    return (
        <>
        <Typography
        color={"white"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={50}
        >
        {foodTruck.foodTruck.name}
        </Typography>
        <Typography
                color={"white"}
                textAlign={"center"}
                fontWeight={"bold"}
                fontSize={20}
                onMouseEnter={() => setIsFavorite(true)}
                onMouseLeave={() => setIsFavorite(favorited)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                
            >
                Add to Favorite:
                {isFavorite ? (
                    <Favorite color="secondary"  style={{ marginLeft: 5 }} 
                        onClick={() => {
                            setFavortiteClick(!favoriteClick);
                        }}
                    />
                ) : (
                    <FavoriteBorder color="secondary" style={{ marginLeft: 5 }} />
                )}
        </Typography>
        <Typography
        color={"white"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={20}
        >
        Rating: {(foodTruck.foodTruck.ratings / foodTruck.foodTruck.review_count).toFixed(2)} /5
        </Typography>

        </>
    )
}