import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { logout } from "./lib";
import "@/styles/sidebar.css";
import TruckDetail from "./truckDetail"; 

require("dotenv").config();

function Sidebar({ setSelectedTruck, visibleMarkers, setCenter }) {
  const router = useRouter();
  const [searchFoodTrucks, setSearchFoodTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVeganChecked, setIsVeganChecked] = useState(false);
  const [isHalalChecked, setIsHalalChecked] = useState(false);
  const [isMexicanChecked, setIsMexicanChecked] = useState(false);

  const languages = ["English", "Spanish"]; // List of languages

  const [debounceSearch] = useDebounce(searchTerm, 500);
  const defaultSearch = "";

  const didMount = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debounceSearch.trim() !== '') {
          const searchQuery = `search=${debounceSearch.trim()}`;
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/searchFoodTrucks?${searchQuery}`
          );
          const data = await response.json();
          let filteredTrucks = data.FoodTrucks;
  
          if (isVeganChecked || isHalalChecked || isMexicanChecked) {
            filteredTrucks = filteredTrucks.filter((truck) => {
              return (
                (!isVeganChecked || truck.vegan) &&
                (!isHalalChecked || truck.halal) &&
                (!isMexicanChecked || truck.mexican)
              );
            });
          }
  
          setSearchFoodTrucks(filteredTrucks);
        } else {
          setSearchFoodTrucks([]); // Reset food trucks when no search term
        }
      } catch (error) {
        console.error("Error fetching food trucks:", error);
      }
    };
    if(didMount.current)
      fetchData();
    else
      didMount.current = true;
  }, [debounceSearch, isVeganChecked, isHalalChecked, isMexicanChecked]);

  const handleTruckHover = (truck) => {
    setSelectedTruck(truck);
    const cords = { lat: truck.lat, lng: truck.lng };
    setCenter(cords);
  };


  const signout = async () => {
    await logout();
    router.reload();
  };

  return (
    <>
    <div className="sidebar h-screen max-md:hidden">
      {/* If logged in */}
      {/* Sign-in and sign-up buttons */}
      
      {/* Sidebar content goes here */}
      <h1 className="sidebar-header">
        Food Truck Finder
      </h1>

      {/* Trucks near you */}
      <div className="trucks-nearby-container">
        <h2 className="trucks-nearby">
          Trucks near you
        </h2>
        <ul style={{ color: "white" }}>
          {visibleMarkers.map((foodTruck) => (
            <li key={foodTruck.id} onMouseEnter={(e) => e.stopPropagation()}>
              <span onMouseEnter={() => handleTruckHover(foodTruck)}>
                <Link legacyBehavior href={`/foodtruck/${foodTruck.id}`}>
                  <a className="truck-link">
                    <TruckDetail selectedTruck={foodTruck}/>
                  </a>
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Language dropdown */}
      <select className="language-dropdown">
        {languages.map((language, index) => (
          <option key={index}>{language}</option>
        ))}
      </select>
    </div>

    </>
  );
}

export default Sidebar;
