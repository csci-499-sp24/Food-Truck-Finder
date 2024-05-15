import React from "react";
import { AdvancedMarker, Marker, Pin } from "@vis.gl/react-google-maps";
import Image from "next/image";
import '@/styles/globals.css';

const CustomMarker = ({ foodTruck, onClick}) => {
  let collisionbehavior = google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY;
  const { vegan, halal, mexican, lat, lng, review_count } = foodTruck;
  let pinColor = {
    background: "#FF0000", // Default color
    glyphColor: "#000",
    borderColor: "#000",
  };

  if (vegan) {
    pinColor = {
      background: "#008000", // Green for vegan
      glyphColor: "#000",
      borderColor: "#000",
    };
  } else if (halal) {
    pinColor = {
      background: "#FBBC04", // Orange for halal
      glyphColor: "#000",
      borderColor: "#000",
    };
  } else if (mexican) {
    pinColor = {
      background: "#F15D0D", // Red for Mexican
      glyphColor: "#000",
      borderColor: "#000",
    };
  }

  let pinUrl = "http://maps.google.com/mapfiles/ms/micons/red-dot.png"; // Default pin icon URL

  if (vegan) {
    pinUrl = "http://maps.google.com/mapfiles/ms/micons/green-dot.png"; // Green pin icon for vegan
  } else if (halal) {
    pinUrl = "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png"; // Yellow pin icon for halal
  } else if (mexican) {
    pinUrl = "http://maps.google.com/mapfiles/ms/micons/orange-dot.png"; // Orange pin icon for Mexican
  }

  const icon = {
    url: pinUrl, // Pin icon URL
    scaledSize: new window.google.maps.Size(40, 40), // Adjust the size of the pin icon
    labelOrigin: new window.google.maps.Point(40, 50), // Adjust label position
  };

  return (
    <AdvancedMarker
          position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          onClick={() => onClick(foodTruck)}
          collisionBehavior={collisionbehavior}
          zIndex={review_count}
          className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          <Pin {...pinColor} scale={1.5}>
            <Image src='/fticon.png' width={25} height={25} ></Image>
          </Pin>
    </AdvancedMarker>
  );
};

export default CustomMarker;
