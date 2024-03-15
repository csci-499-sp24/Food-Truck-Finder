'use client';

<<<<<<< Updated upstream
import Sidebar from "./sidebar";
import FoodTruckMap from "./map";
=======
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
>>>>>>> Stashed changes
require('dotenv').config();

function Index() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <FoodTruckMap />
    </div>
  );
}

export default Index;
