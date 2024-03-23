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


function FoodTruckMap({ selectedTruck, setSelectedTruck }) {
    const [foodTrucks, setFoodTrucks] = useState([]);
    const [center, setCenter] = useState({ lat: 40.76785, lng: -73.96455 });

    const handleCenterChange = (ev) => {
      if(!selectedTruck){
        setCenter(ev.detail.center);
      }
    }

      //For Map
    useEffect(() => {
      if(!selectedTruck){
        var get = async () => fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/api/getFoodTrucks?lat=' + center.lat + '&lng=' + center.lng,{})
        .then((res) => res.json())
        .then((data) => {
        setFoodTrucks(data.FoodTrucks);
        }).catch((err) => console.log(err));
        get();
      }
    }, [center, selectedTruck]) 

    const handleMarkerClick = (truck) => {
      if (selectedTruck && selectedTruck.id === truck.id) {
        setSelectedTruck(null); // Close InfoWindow if clicked again
      } else {
        setSelectedTruck(truck);
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
            onDrag={handleMapDrag}
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
            >
              {foodTrucks.map((foodTruck) => (
                <AdvancedMarker 
                key={foodTruck.id} 
                position={{ lat: parseFloat(foodTruck.lat), lng: parseFloat(foodTruck.lng)}}
                onClick={() => handleMarkerClick(foodTruck)}
                />
                ))}
                {selectedTruck && (
                  <InfoWindow 
                  position={{ lat: parseFloat(selectedTruck.lat), lng: parseFloat(selectedTruck.lng)}}
                  onClose={handleInfoWindowClose}
                  >
                    <div>
                      <h3>{selectedTruck.name}</h3>
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