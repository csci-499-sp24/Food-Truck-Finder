'use client';

import Sidebar from "./sidebar";
import FoodTruckMap from "./map";
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
