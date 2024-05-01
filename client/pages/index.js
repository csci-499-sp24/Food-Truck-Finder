import { useState } from "react"
import Topbar from "../compenents/topbar";
import Sidebar from "../compenents/sidebar";
import FoodTruckMap from "../compenents/map";
require('dotenv').config();

function Index() {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const updateVisibleMarkers = (markers) => {
    setVisibleMarkers(markers);
  };
  const [center, setCenter] = useState({ lat: 40.7661914, lng: -73.958878 });
  return (
    <div style={{  height: "100vh" }}>

      <Topbar selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} visibleMarkers={visibleMarkers} setCenter={setCenter} />
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} visibleMarkers={visibleMarkers} setCenter={setCenter}/>
        <FoodTruckMap selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} updateVisibleMarkers={updateVisibleMarkers} center={center} setCenter={setCenter}/>
      </div>
       </div>
  );
}

export default Index;
