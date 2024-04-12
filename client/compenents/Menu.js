"use client";
import { Button, Card, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Menu(props) {
  const foodTruck = props.foodTruck;

  // State to track the active view
  const [activeView, setActiveView] = useState("menu");

  // Event handler for Menu button
  const handleMenuClick = () => {
    setActiveView("menu");
  };
  // Event handler for Promotions/Events button
  const handlePromotionsClick = () => {
    setActiveView("promotions");
  };
  const menuItems =
    foodTruck.menu && foodTruck.menu.length > 0 ? (
      foodTruck.menu.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#02092c",
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
            color: "white",
          }}
        >
          {typeof item.price === "number" ? (
            <h4 key={index}>
              {item.item}: ${item.price.toFixed(2)}
            </h4>
          ) : (
            <h4 key={index}>
              {item.item}: ${parseFloat(item.price).toFixed(2)}
            </h4>
          )}
        </div>
      ))
    ) : (
      <p>No menu available</p>
    );

  const promotions =
    foodTruck.events && foodTruck.events.length > 0 ? (
      foodTruck.events.map((event, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#02092c",
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <h3>
            {event.start_date.substring(0, 10) +
              " - " +
              event.end_date.substring(0, 10)}
          </h3>
          <p>{event.event_description}</p>
        </div>
      ))
    ) : (
      <p>No promotions available</p>
    );
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#105372",
          padding: 3,
          height: "430px",
          overflowY: "auto",
        }}
      >
        <Stack direction={"row"} gap={1}>
          <Button variant="outlined" onClick={handleMenuClick}>
            Menu
          </Button>
          <Button variant="outlined" onClick={handlePromotionsClick}>
            Promotions/Events
          </Button>
        </Stack>
        {/* Conditionally rendering content */}
        {activeView === "menu" && <div>{menuItems}</div>}

        {activeView === "promotions" && <div>{promotions}</div>}

        <Typography color="white"></Typography>
        <pre></pre>
      </Card>
    </>
  );
}
