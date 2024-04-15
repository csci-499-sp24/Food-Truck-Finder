import { useEffect, useState } from "react";
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
    fetchData();
  }, [debounceSearch, isVeganChecked, isHalalChecked, isMexicanChecked]);
  

  const signout = async () => {
    await logout();
    router.reload();
  };

  const handleTruckHover = (truck) => {
    setSelectedTruck(truck);
    const cords = { lat: truck.lat, lng: truck.lng };
    setCenter(cords);
  };
  return (
    <div className="sidebar">
      {/* If logged in */}
      {hasCookie("name") && (
        <>
          <a className="sign-out">
            {"Hello, " + getCookie("name")}
          </a>
          <Button onClick={signout}>Sign-out</Button>
        </>
      )}
      {/* Sign-in and sign-up buttons */}
      {!hasCookie("name") && (
        <div>
          <Link legacyBehavior href="/login">
            <a
              className="sign-in btn btn-primary"
            >
              Sign In
            </a>
          </Link>
          <Link legacyBehavior href="/signup">
            <a className="sign-up btn btn-secondary">
              Sign Up
            </a>
          </Link>
        </div>
      )}
      {/* Sidebar content goes here */}
      <h1 className="sidebar-header">
        Food Truck Finder
      </h1>
      <div className="search-container">
        <input className="search-bar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Food Trucks"
        />
        <div className="filter-button-container">
          <button className={`filter-button highlight-button ${isVeganChecked ? 'vegan-highlighted' : ''}`} onClick={() => setIsVeganChecked(!isVeganChecked)}> Vegan </button>
          <button className={`filter-button highlight-button ${isHalalChecked ? 'halal-highlighted' : ''}`} onClick={() => setIsHalalChecked(!isHalalChecked)}> Halal </button>
          <button className={`filter-button highlight-button ${isMexicanChecked? 'mexican-highlighted' : ''}`} onClick={() => setIsMexicanChecked(!isMexicanChecked)}> Mexican </button>
        </div>
        
      {searchTerm.trim() !== '' && (
        <ul style={{ color: "white", paddingTop: "20px"}}>
          {searchFoodTrucks.map((foodTruck) => (
            <li key={foodTruck.id} onMouseEnter={(e) => e.stopPropagation()}>
              <span onMouseEnter={() => handleTruckHover(foodTruck)}>
                <Link legacyBehavior href={`/foodtruck/${foodTruck.id}`}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "text-decoration 0.3s",
                    }}
                  >
                    {/* <span
                      onMouseEnter={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                    >
                      {foodTruck.name}
                      
                    </span> */}
                    <TruckDetail selectedTruck={foodTruck} />
                  </a>
                </Link>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>

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
                    {/* <span>
                      {foodTruck.name}
                    </span> */}
                    <TruckDetail selectedTruck={foodTruck} />
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
  );
}

export default Sidebar;
