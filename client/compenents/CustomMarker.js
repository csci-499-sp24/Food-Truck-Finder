import React from "react";
import { AdvancedMarker, Pin, Marker } from "@vis.gl/react-google-maps";

import Image from "next/image";

const CustomMarker = ({ foodTruck, onClick }) => {
  let collisionbehavior = google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY;
  const { vegan, halal, mexican, lat, lng, name, review_count} = foodTruck;
  console.log(foodTruck);
  let pinColor = {
    background: "#FF0000", // Default color
    glyphColor: "#000",
  };

  if (vegan) {
    pinColor = {
      background: "#008000", // Green for vegan
      glyphColor: "#000",
    };
  } else if (halal) {
    pinColor = {
      background: "#FBBC04", // Orange for halal
      glyphColor: "#000",
    };
  } else if(mexican) {
    pinColor = {
      background: "#F15D0D", // Red for Mexican
      glyphColor: "#000",
    }
  }

  return (
    <AdvancedMarker
      position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
      onClick={() => onClick(foodTruck)}
      title={name}
      collisionBehavior={collisionbehavior}
      zIndex={review_count}
    >
      <Pin {...pinColor} scale={1.25}>
        <Image src='/fticon.png' width={20} height={20} ></Image>
      </Pin>
    </AdvancedMarker>
  );
};

export default CustomMarker;
