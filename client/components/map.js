"use client";
import { useCallback, useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Link from "next/link";
import CustomMarker from "./CustomMarker";
import Rating from 'react-rating-stars-component';
import InfoWindowData from "./infowindowdata";
import "@/styles/map.css"
import { useRouter } from "next/navigation";
require('dotenv').config();

function FoodTruckMap({ selectedTruck, setSelectedTruck, updateVisibleMarkers, center, setCenter }) {
    const [foodTrucks, setFoodTrucks] = useState([]);
    const [truckImages, setTruckImages] = useState([]);
    var tempCenter = center;

    const router = useRouter();
    
    const handleCenterChange = (ev) => {
      tempCenter = ev.detail.center;
    }
    const updateCenter = () =>{
      setCenter(tempCenter);
    }
    useEffect(() => {
      updateVisibleMarkers(foodTrucks);
    }, [foodTrucks]);

  useEffect(() => {
    var get = async () =>
      fetch(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/api/getFoodTrucks?lat=" +
          center.lat +
          "&lng=" +
          center.lng,
        {}
      )
        .then((res) => res.json())
        .then((data) => {
        setFoodTrucks(data.FoodTrucks);
        }).catch((err) => console.log(err));
        get();
    }, [center, selectedTruck]) 

    const handleMarkerClick = (truck) => {
      if (selectedTruck && selectedTruck.id === truck.id) {
        setSelectedTruck(null); // Close InfoWindow if clicked again
      } else {
        setSelectedTruck(truck);
        // Fetch images for the selected food truck
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/foodtrucks/' + truck.id + '/images')
        .then((res) => res.json())
        .then((data) => {
        setTruckImages(data);
        })
        .catch((err) => console.log(err));
      }
    };

  const handleMapDrag = () => {
    if (selectedTruck) {
      setSelectedTruck(null); // Close InfoWindow when map is dragged
    }
  };

  const handleInfoWindowClose = () => {
    setSelectedTruck(null); // Reset selectedTruck when InfoWindow is closed
  };

  return (
    <div className="api-provider-container">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY}>
        <div className="map-container">
          <Map
            streetViewControl={false}
            zoomControl={false}
            mapTypeControl={false}
            defaultCenter={center}
            defaultZoom={17}
            onCenterChanged={handleCenterChange}
            onDrag={handleMapDrag}
            onDragend={updateCenter}
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
          >
            {foodTrucks.map((foodTruck) => (
              <CustomMarker
                key={foodTruck.id}
                foodTruck={foodTruck}
                onClick={() => handleMarkerClick(foodTruck)}
                />
                ))}
                {selectedTruck && (
                 <InfoWindow 
                 position={{ lat: parseFloat(selectedTruck.lat), lng: parseFloat(selectedTruck.lng)}}
                 onClose={handleInfoWindowClose}
                 maxWidth={350}
                 minWidth={350}
                 >
                    <button className="w-full h-full bg-black absolute z-10 bg-transparent" onClick={() => router.push(`/foodtruck/${selectedTruck.id}`)}></button>
                    <InfoWindowData selectedTruck={selectedTruck} truckImages={truckImages} className="relative z-0"/>
                 </InfoWindow>
                 )}
                 </Map>
              </div>
          </APIProvider>
      </div> 
 );
}

export default FoodTruckMap;
