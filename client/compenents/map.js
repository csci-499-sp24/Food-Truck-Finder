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
import "@/styles/map.css"
require('dotenv').config();

function FoodTruckMap({ selectedTruck, setSelectedTruck, updateVisibleMarkers, center, setCenter }) {
    const [foodTrucks, setFoodTrucks] = useState([]);
    const [truckImages, setTruckImages] = useState([]);
    var tempCenter = center;
    
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

  useEffect(() => {
    // Get user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User's current position:", { latitude, longitude });
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

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
                 >
                    <div>
                      <h5>
                          {selectedTruck.name}
                      </h5>
                      <h6>{selectedTruck.address}</h6>
                      <div className="rating">
                        <Rating value={selectedTruck.ratings/selectedTruck.review_count}
                          count={5}
                          size={24}
                          activeColor="gold"
                          inactiveColor="#FFF"
                          edit={false}>
                        </Rating>  
                        <div className="review-count"> ({selectedTruck.review_count}) </div>
                        </div>
                      <br />
                      <div className="cuisines-container">
                      <div className="cuisines">

                        <p className={selectedTruck.vegan ? "vegan" : ""}>{selectedTruck.vegan ? "Vegan": null}</p>
                        <p className={selectedTruck.halal ? "halal" : ""}>{selectedTruck.halal ? "Halal": null}</p>
                        <p className={selectedTruck.mexican ? "mexican" : ""}>{selectedTruck.mexican ? "Mexican": null}</p>
                        </div>
                        <div className="image-container">
                        {truckImages.length > 0 ? (
                        <img src={truckImages[0].imageUrl} alt="Food Truck" className="food-truck-image"/>
                        ) : (
                        <img src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" alt="Default" className="food-truck-image"/>
                        )}
                      </div>
                      </div>
                      <Link legacyBehavior href={`/foodtruck/${selectedTruck.id}`}>
                        <a className="truck-card-link">Go to Food Truck Page</a>
                      </Link>
                    </div>
                 </InfoWindow>
                 )}
                 </Map>
              </div>
          </APIProvider>
      </div> 
 );
}

export default FoodTruckMap;
