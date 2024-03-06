"use client";

import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
require('dotenv').config();

function Index() {
  const position = { lat: 40.76785, lng: -73.96455};
  var [FoodTrucks, setFoodTrucks] = useState([]);
  useEffect(() => {
    var get = async () => fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/api/getFoodTrucks',{}
    )
    .then((res) => {
      return res.json()})
    .then((data) => {
      setFoodTrucks(data.FoodTrucks);
    }).then(() => {return true}).catch((err) => console.log(err));
    
    get();
  }, [position]) 
  return (
    <>
      <main>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY}>
          <div style={{height: "100vh", width: "100%"}}>
            <Map streetViewControl={false}  zoomControl ={false} mapTypeControl = {false} defaultCenter={position} defaultZoom={15} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
              {FoodTrucks.map((FoodTruck) => 
                <AdvancedMarker key={FoodTruck.id} position={{lat: parseFloat(FoodTruck.lat), lng: parseFloat(FoodTruck.lng)}}></AdvancedMarker>
              )}
            </Map>
          </div>
        </APIProvider>
    </main>
  </>
  );
}

export default Index;