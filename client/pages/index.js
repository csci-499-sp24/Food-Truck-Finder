'use client';

import { useState } from "react"
import Sidebar from "./sidebar";
import FoodTruckMap from "./map";
require('dotenv').config();

function Index() {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const updateVisibleMarkers = (markers) => {
    setVisibleMarkers(markers);
  };
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} visibleMarkers={visibleMarkers}/>
      <FoodTruckMap selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} updateVisibleMarkers={updateVisibleMarkers}/>
    </div>
  );
}

export default Index;
