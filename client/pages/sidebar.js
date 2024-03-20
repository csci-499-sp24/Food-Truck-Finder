import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {useRouter} from "next/router";
require('dotenv').config();

function Sidebar({ setSelectedTruck }){
    const [searchFoodTrucks, setSearchFoodTrucks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const languages = ["English", "Spanish", "French", "German"]; // List of languages
    const router = useRouter();

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

    const handleTruckHover = (truck) => {
      setSelectedTruck(truck);
    };

    return (
        <div className="sidebar" style={{ width: "20%", backgroundColor: "black", padding: "20px" }}>
          {/* Sign-in and sign-up buttons */}
          <div style={{ marginBottom: "20px" }}>
            <button
              style={{ marginRight: "10px", color: "white", border: "2px solid white", padding: "5px 10px", backgroundColor: "black", cursor: "pointer" }}
              onMouseEnter={(e) => e.target.style.color = "red"}
              onMouseLeave={(e) => e.target.style.color = "white"}
            >
              Sign In
            </button>
            <button
              style={{ color: "white", border: "2px solid white", padding: "5px 10px", backgroundColor: "black", cursor: "pointer" }}
              onMouseEnter={(e) => e.target.style.color = "red"}
              onMouseLeave={(e) => e.target.style.color = "white"}
            >
              Sign Up
            </button>
          </div>
          {/* Sidebar content goes here */}
          <h1 style={{ padding: "10px 20px", textAlign: "center", fontWeight: "bold", color: "white", fontSize: "1.5em" }}>Food Truck Finder</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Food Trucks"
            style={{ width: "100%", marginBottom: "10px", padding: "10px 20px", fontSize: "1em" }}
          />
          <ul style={{ textAlign: "left", color: "white" }}>
            {searchFoodTrucks.map((foodTruck) => (
              <li 
              key={foodTruck.id}
              onMouseEnter={() => handleTruckHover(foodTruck)}
              onMouseLeave={() => handleTruckHover(null)}>
                <Link legacyBehavior href={`/foodtruck/${foodTruck.id}`}>
                  <a>{foodTruck.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          {/* Language dropdown */}
          <select style={{ position: "absolute", bottom: "10px", left: "10px", backgroundColor: "black", color: "white", padding: "5px", border: "none" }}>
            {languages.map((language, index) => (
              <option key={index}>{language}</option>
            ))}
          </select>
        </div>
    );
}

export default Sidebar;
