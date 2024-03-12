'use client';
import { useCallback, useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapCameraChangedEvent,
  GoogleMapsContext,
  MapCameraProps
  
} from "@vis.gl/react-google-maps";
require('dotenv').config();


function FoodTruckMap() {
    const [foodTrucks, setFoodTrucks] = useState([]);
    const [center, setCenter] = useState({ lat: 40.76785, lng: -73.96455 });

    const handleCenterChange = (ev) => {
        setTimeout(() => {
        }, 1000)
        setCenter(ev.detail.center);
    }

      //For Map
    useEffect(() => {
        var get = async () => fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/api/getFoodTrucks?lat=' + center.lat + '&lng=' + center.lng,{})
        .then((res) => {
        return res.json()})
        .then((data) => {
        setFoodTrucks(data.FoodTrucks);
        }).then(() => {return true}).catch((err) => console.log(err));
        get();
    }, [center]) 

    return (
        <div style={{ width: "80%", position: "relative" }}>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY}>
          <div style={{ height: "100%", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
            <Map 
            streetViewControl={false} 
            zoomControl={false} 
            mapTypeControl={false} 
            defaultCenter={center} 
            defaultZoom={17} 
            onCenterChanged={handleCenterChange}
            mapId={process.env.NEXT_PUBLIC_MAP_ID} >
              {foodTrucks.map((foodTruck) =>
                <AdvancedMarker key={foodTruck.id} position={{ lat: parseFloat(foodTruck.lat), lng: parseFloat(foodTruck.lng)}} ></AdvancedMarker>
              )}
            </Map>
          </div>
        </APIProvider>
      </div>
    )
}


export default FoodTruckMap;