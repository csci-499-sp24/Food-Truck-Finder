import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { styled } from '@mui/system';
import { useDebounce } from 'use-debounce';
import "../styles/topbar.css";
import Link from "next/link";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";



function TopBar({ setSelectedTruck, visibleMarkers, setCenter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFoodTrucks, setSearchFoodTrucks] = useState([]);
  const [isVeganChecked, setIsVeganChecked] = useState(false);
  const [isHalalChecked, setIsHalalChecked] = useState(false);
  const [isMexicanChecked, setIsMexicanChecked] = useState(false);
  const [debounceSearch] = useDebounce(searchTerm, 500);
  const [options, setOptions] = useState([]);
  

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
    <div className="topbar">
      <div className="topbar-search-container">
        <input className="topbar-search-bar"
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
        {/* Sign-in and sign-up buttons */}
      
        
      {searchTerm.trim() !== '' && (
        <ul className="topbar-search-results">
          {searchFoodTrucks.slice(0,15).map((foodTruck) => (
            <li key={foodTruck.id} onMouseEnter={(e) => e.stopPropagation()}>
              <span>
                <Link legacyBehavior href={`/foodtruck/${foodTruck.id}`}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "text-decoration 0.3s",
                    }}
                  >
                    <span
                      onMouseEnter={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                    >
                      {foodTruck.name}
                    </span>
                  </a>
                </Link>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
    {hasCookie("name") &&
    <div className="topbar-signout-button">
      <Link legacyBehavior href={"/logout"}>
        <a onClick={signout}>Sign Out</a>
      </Link>
    </div>}
    {!hasCookie("name") && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px' }}>
          <Link legacyBehavior href={"/login"}>
            <a className="sign-in topbar-sign-in" style={{ marginRight: '10px', padding: '8px 16px', marginLeft: '20px' }}>
              Sign In
            </a>
          </Link>
          <Link legacyBehavior href={"/signup"}>
            <a className="sign-up topbar-sign-up" style={{ padding: '8px 16px', marginLeft: '20px' }}>
              Sign Up
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default TopBar;
