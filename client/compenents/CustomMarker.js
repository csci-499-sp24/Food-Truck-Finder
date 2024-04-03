import React from "react";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const CustomMarker = ({ foodTruck, onClick }) => {
  const { vegan, halal, lat, lng } = foodTruck;
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
      background: "#FBBC04", // Red for halal
      glyphColor: "#000",
      borderColor: "#000",
    };
  }

  return (
    <AdvancedMarker
      position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
      onClick={() => onClick(foodTruck)}
    >
      <Pin {...pinColor} />
    </AdvancedMarker>
  );
};

export default CustomMarker;
