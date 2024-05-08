import React from "react";
import { AdvancedMarker, Marker, Pin } from "@vis.gl/react-google-maps";

const CustomMarker = ({ foodTruck, onClick, onHover }) => {
  const { vegan, halal, mexican, lat, lng } = foodTruck;
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
    <Marker
      position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
      // onClick={() => onClick(foodTruck)}
      onHover={() => onHover(foodTruck)}
      onMouseOver={() => onHover(foodTruck)} // Activate on hover
      title={foodTruck.name}
      label={{
        text: foodTruck.name,
        color: pinColor.background,
        fontSize: "14px",
        fontWeight: "bold",
      }}
      icon={icon}
    ></Marker>
  );
};

export default CustomMarker;
