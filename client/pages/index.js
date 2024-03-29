'use client';

import { useEffect, useState } from "react"
import Sidebar from "../compenents/sidebar";
import FoodTruckMap from "../compenents/map";
require('dotenv').config();

function Index() {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const updateVisibleMarkers = (markers) => {
    setVisibleMarkers(markers);
  };
  const [center, setCenter] = useState({ lat: 40.76785, lng: -73.96455 });
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} visibleMarkers={visibleMarkers} setCenter={setCenter}/>
      <FoodTruckMap selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} updateVisibleMarkers={updateVisibleMarkers} center={center} setCenter={setCenter}/>
    </div>
  );
}

export default Index;
