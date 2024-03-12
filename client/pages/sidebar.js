import { useCallback, useEffect, useState } from "react";
require('dotenv').config();

function Sidebar(){
    const [searchFoodTrucks, setSearchFoodTrucks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    //For Searching
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/searchFoodTrucks?search=${searchTerm}`);
            const data = await response.json();
            setSearchFoodTrucks(data.FoodTrucks);
        } catch (error) {
            console.error("Error fetching food trucks:", error);
        }
        };
        fetchData();
    }, [searchTerm]);
    return (
        <div className="sidebar" style={{ width: "20%", backgroundColor: "Black", padding: "20px" }}>
          {/* Sidebar content goes here */}
          <h1 style ={{padding: "10px 20px", textAlign: "center", fontWeight: "bold", color: "white", fontSize: "1.5em"}}>Food Truck Finder</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Food Trucks"
            style={{ width: "100%", marginBottom: "10px", padding: "10px 20px"}}
          />
          <ul style={{textAlign: "left", color: "white"}}>
            {searchFoodTrucks.map((foodTruck) => (
              <li key={foodTruck.id}>{foodTruck.name}</li>
            ))}
          </ul>
        </div>
    );
}

export default Sidebar;