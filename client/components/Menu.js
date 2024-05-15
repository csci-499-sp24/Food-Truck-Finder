"use client";
import { Button, Card, Stack, Typography} from "@mui/material";
import { useState } from "react";

export default function Menu(props) {
  const foodTruck = props.foodTruck;

  const [activeView, setActiveView] = useState("menu");

  const handleMenuClick = () => {
    setActiveView("menu");
  };

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
      <p>No menu available for this cart</p>
    );

  const promotions =
    foodTruck.events && foodTruck.events.length > 0 ? (
      foodTruck.events.map((event, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#674ea7",
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
      <p>No promotions available at the moment</p>
    );

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#105372",
          height: "430px",
          overflowY: "auto",
        }}
      >
        <div className="bg-inherit w-11/12 bg-black relative">
          <div className="h-20 pt-5 pl-5 bg-inherit">
            <Stack direction="row" gap={1}>
              <Button variant="outlined" onClick={handleMenuClick}>
                Menu
              </Button>
              <Button variant="outlined" onClick={handlePromotionsClick}>
                Promotions/Events
              </Button>
            </Stack>
            <div className="bg-black w-full"></div>
          </div>
        </div>
        <div className="py-18">
          {/* Conditionally rendering content */}
          {activeView === "menu" && (
            <div className="overflow-auto">{menuItems}</div>
          )}
          {activeView === "promotions" && <div className="">{promotions}</div>}

          <Typography color="white"></Typography>
          <pre></pre>
        </div>
      </Card>
    </>
  );
}