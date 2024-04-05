import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { logout } from "./lib";

require("dotenv").config();

function Sidebar({ setSelectedTruck, visibleMarkers, setCenter }) {
  const router = useRouter();
  const [searchFoodTrucks, setSearchFoodTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVeganChecked, setIsVeganChecked] = useState(false);
  const [isHalalChecked, setIsHalalChecked] = useState(false);

  const languages = ["English", "Spanish"]; // List of languages

  const [debounceSearch] = useDebounce(searchTerm, 500);
  const defaultSearch = "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchQuery = debounceSearch.trim()
          ? `search=${debounceSearch.trim()}`
          : "search=";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/searchFoodTrucks?${searchQuery}`
        );
        const data = await response.json();
        let filteredTrucks = data.FoodTrucks;

        if (isVeganChecked || isHalalChecked) {
          filteredTrucks = filteredTrucks.filter((truck) => {
            return (
              (!isVeganChecked || truck.vegan) &&
              (!isHalalChecked || truck.halal)
            );
          });
        }

        setSearchFoodTrucks(filteredTrucks);
      } catch (error) {
        console.error("Error fetching food trucks:", error);
      }
    };
    fetchData();
  }, [debounceSearch, isVeganChecked, isHalalChecked]);

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
    <div
      className="sidebar"
      style={{ width: "20%", backgroundColor: "black", padding: "20px" }}
    >
      {/* If logged in */}
      {hasCookie("name") && (
        <>
          <a style={{ marginRight: "10px", color: "white" }}>
            {"Hello, " + getCookie("name")}
          </a>
          <Button onClick={signout}>Sign-out</Button>
        </>
      )}
      {/* Sign-in and sign-up buttons */}
      {!hasCookie("name") && (
        <div style={{ marginBottom: "20px" }}>
          <Link legacyBehavior href="/login">
            <a
              className="btn btn-primary"
              style={{ cursor: "pointer", marginRight: "10px" }}
            >
              Sign In
            </a>
          </Link>
          <Link legacyBehavior href="/signup">
            <a className="btn btn-secondary" style={{ cursor: "pointer" }}>
              Sign Up
            </a>
          </Link>
        </div>
      )}
      {/* Sidebar content goes here */}
      <h1
        style={{
          padding: "10px 20px",
          textAlign: "center",
          fontWeight: "bold",
          color: "white",
          fontSize: "1.5em",
        }}
      >
        Food Truck Finder
      </h1>
      <div
        style={{ textAlign: "left", marginBottom: "20px", paddingLeft: "20px" }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Food Trucks"
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            fontSize: "1em",
          }}
        />
        <div>
          <input
            type="checkbox"
            id="vegan"
            checked={isVeganChecked}
            onChange={() => setIsVeganChecked(!isVeganChecked)}
          />
          <label style={{ color: "white" }} htmlFor="vegan">
            Vegan
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="halal"
            checked={isHalalChecked}
            onChange={() => setIsHalalChecked(!isHalalChecked)}
          />
          <label style={{ color: "white" }} htmlFor="halal">
            Halal
          </label>
        </div>
        <ul style={{ color: "white" }}>
          {searchFoodTrucks.map((foodTruck) => {
            {
            }

            return (
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
            );
          })}
        </ul>
      </div>

      {/* Trucks near you */}
      <div
        style={{ textAlign: "left", marginBottom: "20px", paddingLeft: "20px" }}
      >
        <h2
          style={{
            padding: "10px 20px",
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
            fontSize: "1.5em",
          }}
        >
          Trucks near you
        </h2>
        <ul style={{ color: "white" }}>
          {visibleMarkers.map((foodTruck) => (
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
      </div>

      {/* Language dropdown */}
      <select
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          backgroundColor: "black",
          color: "white",
          padding: "5px",
          border: "none",
        }}
      >
        {languages.map((language, index) => (
          <option key={index}>{language}</option>
        ))}
      </select>
    </div>
  );
}

export default Sidebar;
