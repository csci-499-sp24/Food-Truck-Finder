import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { styled } from '@mui/system';
import { useDebounce } from 'use-debounce';
import "../styles/topbar.css";
import Link from "next/link";
import { MdFilterListAlt } from "react-icons/md";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import { logout } from './lib';
import { useRouter } from 'next/router';




function TopBar({ setSelectedTruck, visibleMarkers, setCenter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFoodTrucks, setSearchFoodTrucks] = useState([]);
  const [isVeganChecked, setIsVeganChecked] = useState(false);
  const [isHalalChecked, setIsHalalChecked] = useState(false);
  const [isMexicanChecked, setIsMexicanChecked] = useState(false);
  const [debounceSearch] = useDebounce(searchTerm, 500);
  const [options, setOptions] = useState([]);


  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  

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
    <div className="topbar absolute">
      <div className='w-11/12 flex-col'>
        <div className='w-full flex flex-row h-12'>
          <div className="w-full flex flex-row-reverse bg-white rounded-xl h-12">
            <MdFilterListAlt className='pl-2 pt-0 text-5xl pr-3' onClick={()=>setShowAll(!showAll)} />
            <div className={`${ showAll ? "" : "hidden" } h-12 pt-2 flex pr-0 inset-y-0 right-0 rounded-xl` }>
              <button className={`filter-button highlight-button ${isVeganChecked ? 'vegan-highlighted' : ''}`} onClick={() => setIsVeganChecked(!isVeganChecked)}> Vegan </button>
              <button className={`filter-button highlight-button ${isHalalChecked ? 'halal-highlighted' : ''}`} onClick={() => setIsHalalChecked(!isHalalChecked)}> Halal </button>
              <button className={`filter-button highlight-button ${isMexicanChecked? 'mexican-highlighted' : ''}`} onClick={() => setIsMexicanChecked(!isMexicanChecked)}> Mexican </button>
            </div> 
            <input className="w-full h-full pl-4 rounded-xl"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Food Trucks"
            />
            {/* Sign-in and sign-up buttons */}
        </div>
          <div className="h-12 w-36 pt-1 max-md:hidden">
            {!hasCookie("name") ? (
                <Link legacyBehavior href="/login" className="">
                  <a
                    className="sign-in btn btn-primary"
                  >
                    Sign In
                  </a>
                </Link>
            ) :
              (
                <div className="sign-in btn btn-primary">
                    <a onClick={signout}>Sign Out</a>
                </div>
              )
            }
      </div>
    </div>

        {searchTerm.trim() !== '' && (
          <ul className="topbar-search-results w-11/12">
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
    </div>
  );
}

export default TopBar;
