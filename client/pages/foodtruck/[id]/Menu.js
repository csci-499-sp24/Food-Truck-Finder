import {
    Button,
    Card,
    Stack,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";


export default function Menu(props){
    const foodTruck = props.foodTruck;

    // State to track the active view
    const [activeView, setActiveView] = useState("menu");
    const [menuData, setMenuData] = useState(null);
    const [promotionData, setPromotionData] = useState(null);


    // Event handler for Menu button
    const handleMenuClick = () => {
    setActiveView("menu");
    };
    // Event handler for Promotions/Events button
    const handlePromotionsClick = () => {
    setActiveView("promotions");
    };
    return (
        <>
            <Card sx={{ backgroundColor: "#105372", padding: 2 }}>
            <Stack direction={"row"} gap={1}>
              <Button variant="outlined" onClick={handleMenuClick}>
                Menu
              </Button>
              <Button variant="outlined" onClick={handlePromotionsClick}>
                Promotions/Events
              </Button>
            </Stack> 
            {/* Conditionally rendering content */}
            {activeView === "menu" && (
              <div>
                {foodTruck.menu.length != 0 ? (
                    <>
                    {foodTruck.menu.map(item => (
                        <p>{JSON.stringify(item)}</p>
                    ))}
                  </>
                ) : (
                  <p>Menu Empty</p>
                )}
              </div>
            )}

            {activeView === "promotions" && (
              <div>
                {foodTruck.promotion ? (
                  <div>{JSON.stringify(props.promotion)}</div>
                ) : (
                  <p>No Promotions at this time</p>
                )}
              </div>
            )}

            <Typography color="white"></Typography>
            <pre></pre>
            </Card>
        </>
    )
}