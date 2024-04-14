// "use client";
// import { Button, Card, Stack, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

// export default function Menu(props) {
//   const foodTruck = props.foodTruck;

//   // State to track the active view
//   const [activeView, setActiveView] = useState("menu");

//   // Event handler for Menu button
//   const handleMenuClick = () => {
//     setActiveView("menu");
//   };
//   // Event handler for Promotions/Events button
//   const handlePromotionsClick = () => {
//     setActiveView("promotions");
//   };
//   const menuItems =
//     foodTruck.menu && foodTruck.menu.length > 0 ? (
//       foodTruck.menu.map((item, index) => (
//         <div
//           key={index}
//           style={{
//             backgroundColor: "#02092c",
//             padding: "10px",
//             margin: "10px",
//             borderRadius: "10px",
//             color: "white",
//           }}
//         >
//           {typeof item.price === "number" ? (
//             <h4 key={index}>
//               {item.item}: ${item.price.toFixed(2)}
//             </h4>
//           ) : (
//             <h4 key={index}>
//               {item.item}: ${parseFloat(item.price).toFixed(2)}
//             </h4>
//           )}
//         </div>
//       ))
//     ) : (
//       <p>No menu available</p>
//     );

//   const promotions =
//     foodTruck.events && foodTruck.events.length > 0 ? (
//       foodTruck.events.map((event, index) => (
//         <div
//           key={index}
//           style={{
//             backgroundColor: "#02092c",
//             padding: "10px",
//             margin: "10px",
//             borderRadius: "10px",
//             color: "white",
//           }}
//         >
//           <h3>
//             {event.start_date.substring(0, 10) +
//               " - " +
//               event.end_date.substring(0, 10)}
//           </h3>
//           <p>{event.event_description}</p>
//         </div>
//       ))
//     ) : (
//       <p>No promotions available</p>
//     );
//   return (
//     <>
//       <Card
//         sx={{
//           backgroundColor: "#105372",
//           padding: 3,
//           height: "430px",
//           overflowY: "auto",
//         }}
//       >
//         <Stack direction={"row"} gap={1}>
//           <Button variant="outlined" onClick={handleMenuClick}>
//             Menu
//           </Button>
//           <Button variant="outlined" onClick={handlePromotionsClick}>
//             Promotions/Events
//           </Button>
//         </Stack>
//         {/* Conditionally rendering content */}
//         {activeView === "menu" && <div>{menuItems}</div>}

//         {activeView === "promotions" && <div>{promotions}</div>}

//         <Typography color="white"></Typography>
//         <pre></pre>
//       </Card>
//     </>
//   );
// }














// "use client";
// import { Button, Card, Stack, Typography, TextField } from "@mui/material";
// import { useState } from "react";

// export default function Menu(props) {
//   const foodTruck = props.foodTruck;

//   // State to track the active view
//   const [activeView, setActiveView] = useState("menu");

//   // State to store the weekly events for each day
//   const [weeklyEvents, setWeeklyEvents] = useState({
//     Monday: "",
//     Tuesday: "",
//     Wednesday: "",
//     Thursday: "",
//     Friday: "",
//     Saturday: "",
//     Sunday: "",
//   });

//   // Event handler for Menu button
//   const handleMenuClick = () => {
//     setActiveView("menu");
//   };

//   // Event handler for Promotions/Events button
//   const handlePromotionsClick = () => {
//     setActiveView("promotions");
//   };

//   // Event handler for changing event inputs in the weekly event table
//   const handleEventChange = (day, event) => {
//     setWeeklyEvents({
//       ...weeklyEvents,
//       [day]: event.target.value,
//     });
//   };

//   const menuItems =
//     foodTruck.menu && foodTruck.menu.length > 0 ? (
//       foodTruck.menu.map((item, index) => (
//         <div
//           key={index}
//           style={{
//             backgroundColor: "#02092c",
//             padding: "10px",
//             margin: "10px",
//             borderRadius: "10px",
//             color: "white",
//           }}
//         >
//           <Typography>
//             {item.item}: ${item.price.toFixed(2)}
//           </Typography>
//         </div>
//       ))
//     ) : (
//       <p>No menu available</p>
//     );

//   const promotions =
//     foodTruck.events && foodTruck.events.length > 0 ? (
//       foodTruck.events.map((event, index) => (
//         <div
//           key={index}
//           style={{
//             backgroundColor: "#02092c",
//             padding: "10px",
//             margin: "10px",
//             borderRadius: "10px",
//             color: "white",
//           }}
//         >
//           <Typography>
//             {event.start_date.substring(0, 10)} - {event.end_date.substring(0, 10)}
//           </Typography>
//           <p>{event.event_description}</p>
//         </div>
//       ))
//     ) : (
//       <p>No promotions available</p>
//     );

//   // Weekly event table to render on the Promotions/Events tab
//   const weeklyEventTable = (
//     <div>
//       <Typography variant="h6" color="white" sx={{ marginBottom: 2 }}>
//         Weekly Events:
//       </Typography>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
//         {Object.keys(weeklyEvents).map((day) => (
//           <div key={day} style={{ padding: "10px", backgroundColor: "#02092c", borderRadius: "10px", color: "white" }}>
//             <Typography>{day}</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               value={weeklyEvents[day]}
//               onChange={(e) => handleEventChange(day, e)}
//               placeholder={`Add event for ${day}`}
//               InputProps={{ style: { color: "white" } }}
//               sx={{
//                 backgroundColor: "#02092c",
//                 color: "white",
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <Card
//       sx={{
//         backgroundColor: "#105372",
//         padding: 3,
//         height: "430px",
//         overflowY: "auto",
//       }}
//     >
//       <Stack direction={"row"} gap={1}>
//         <Button variant="outlined" onClick={handleMenuClick}>
//           Menu
//         </Button>
//         <Button variant="outlined" onClick={handlePromotionsClick}>
//           Promotions/Events
//         </Button>
//       </Stack>
//       {/* Conditionally rendering content */}
//       {activeView === "menu" && <div>{menuItems}</div>}
//       {activeView === "promotions" && (
//         <div>
//           {promotions}
//           {weeklyEventTable}
//         </div>
//       )}
//     </Card>
//   );
// }


















"use client";
import { Button, Card, Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";

export default function Menu(props) {
  const foodTruck = props.foodTruck;

  // State to track the active view
  const [activeView, setActiveView] = useState("menu");

  // State to store the weekly events for each day
  const [weeklyEvents, setWeeklyEvents] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });

  // Event handler for Menu button
  const handleMenuClick = () => {
    setActiveView("menu");
  };

  // Event handler for Promotions/Events button
  const handlePromotionsClick = () => {
    setActiveView("promotions");
  };

  // Event handler for changing event inputs in the weekly event table
  const handleEventChange = (day, event) => {
    setWeeklyEvents({
      ...weeklyEvents,
      [day]: event.target.value,
    });
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
          <Typography>
            {item.item}: ${item.price.toFixed(2)}
          </Typography>
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
          <Typography>
            {event.start_date.substring(0, 10)} - {event.end_date.substring(0, 10)}
          </Typography>
          <p>{event.event_description}</p>
        </div>
      ))
    ) : (
      <p>No promotions available</p>
    );

  // Weekly event table to render on the Promotions/Events tab
  const weeklyEventTable = (
    <div>
      <Typography variant="h6" color="white" sx={{ marginBottom: 2 }}>
        Weekly Events:
      </Typography>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {Object.keys(weeklyEvents).map((day) => (
          <div key={day} style={{ padding: "10px", backgroundColor: "#02092c", borderRadius: "10px", color: "white" }}>
            <Typography>{day}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={weeklyEvents[day]}
              onChange={(e) => handleEventChange(day, e)}
              placeholder={`Add event for ${day}`}
              InputProps={{ style: { color: "white" } }}
              sx={{
                backgroundColor: "#02092c",
                color: "white",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Adding a button to report missing menu items at the bottom of the Menu tab
  const reportMissingMenuButton = (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // Handle reporting missing menu items
          console.log("Reporting missing menu food!");
        }}
      >
        MISSING MENU FOOD!!! LET US KNOW
      </Button>
    </div>
  );

  return (
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
      {activeView === "menu" && (
        <div>
          {menuItems}
          {reportMissingMenuButton}
        </div>
      )}

      {activeView === "promotions" && (
        <div>
          {promotions}
          {weeklyEventTable}
        </div>
      )}
    </Card>
  );
}

