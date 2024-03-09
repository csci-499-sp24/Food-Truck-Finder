"use client";

import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import React from "react" 
React.useLayoutEffect = React.useEffect 
require('dotenv').config();

function Index() {
  const position = { lat: 40.76785, lng: -73.96455 };
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchFoodTrucks, setSearchFoodTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //For Searching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/searchFoodTrucks?search=${searchTerm}`);
        const data = await response.json();
        setSearchFoodTrucks(data.FoodTrucks);
      } catch (error) {
        console.error("Error fetching food trucks:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  //For Map
  useEffect(() => {
    var get = async () => fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/api/getFoodTrucks',{})
    .then((res) => {
      return res.json()})
    .then((data) => {
      setFoodTrucks(data.FoodTrucks);
    }).then(() => {return true}).catch((err) => console.log(err));
    
    get();
  }, [position]) 

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="sidebar" style={{ width: "20%", backgroundColor: "Black", padding: "20px" }}>
        {/* Sidebar content goes here */}
        <h1 style ={{padding: "10px 20px", textAlign: "center", fontWeight: "bold", color: "white", fontSize: "1.5em"}}>Food Truck Finder</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Food Trucks"
          style={{ width: "100%", marginBottom: "10px", padding: "10px 20px"}}
        />
        <ul style={{textAlign: "left", color: "white"}}>
          {searchFoodTrucks.map((foodTruck) => (
            <li key={foodTruck.id}>{foodTruck.name}</li>
          ))}
        </ul>
      </div>
      <div style={{ width: "80%", position: "relative" }}>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY}>
          <div style={{ height: "100%", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
            <Map streetViewControl={false} zoomControl={false} mapTypeControl={false} defaultCenter={position} defaultZoom={15} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
              {foodTrucks.map((foodTruck) =>
                <AdvancedMarker key={foodTruck.id} position={{ lat: parseFloat(foodTruck.lat), lng: parseFloat(foodTruck.lng)}} ></AdvancedMarker>
              )}
            </Map>
          </div>
        </APIProvider>
      </div>
    </div>
  );
}

export default Index;
