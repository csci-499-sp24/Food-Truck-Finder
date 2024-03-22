'use client';

import { useState } from "react"
import Sidebar from "./sidebar";
import FoodTruckMap from "./map";
require('dotenv').config();

function Index() {
  const [selectedTruck, setSelectedTruck] = useState(null);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setSelectedTruck={setSelectedTruck}/>
      <FoodTruckMap selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck}/>
    </div>
  );
}

export default Index;
