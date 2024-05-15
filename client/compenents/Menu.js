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
//       <p>No menu available for this cart</p>
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
//       <p>No promotions available at the momment</p>
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

////////////////
/////////////////
////////////

"use client";
import { Button, Card, Stack, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";


export default function Menu(props) {
  const foodTruck = props.foodTruck;

  const [activeView, setActiveView] = useState("menu");
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    startDate: "",
    endDate: "",
    eventDetails: "",
    location: "",
    startHour: "",
    endHour: "",
  });

  const handleMenuClick = () => {
    setActiveView("menu");
    setShowAddEventForm(false); // Close form if switching view
  };

  const handlePromotionsClick = () => {
    setActiveView("promotions");
    setShowAddEventForm(false); // Close form if switching view
  };

  const handleAddEventClick = () => {
    setShowAddEventForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventFormData({ ...eventFormData, [name]: value });
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission of the event data
    console.log("Event form submitted:", eventFormData);
    // Reset form data and close the form
    setEventFormData({
      startDate: "",
      endDate: "",
      eventDetails: "",
      location: "",
      startHour: "",
      endHour: "",
    });
    setShowAddEventForm(false);
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
      <p>No menu available for this cart!!! Look above in the pictures section!</p>
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
    <Card
      sx={{
        backgroundColor: "#ffffff",
        padding: 3,
        height: "430px",
        overflowY: "auto",
      }}
    >
      <Stack direction="row" gap={1}>
        <Button variant="outlined" onClick={handleMenuClick}>
          Menu
        </Button>
        <Button variant="outlined" onClick={handlePromotionsClick}>
          Promotions/Events
        </Button>
        <Button variant="outlined" onClick={handleAddEventClick}>
          Add Event
        </Button>
      </Stack>

      {showAddEventForm && (
        <form onSubmit={handleAddEventSubmit}>
          <TextField
            label="Start Date"
            name="startDate"
            value={eventFormData.startDate}
            onChange={handleInputChange}
          />
          <TextField
            label="End Date"
            name="endDate"
            value={eventFormData.endDate}
            onChange={handleInputChange}
          />
          <TextField
            label="Event Details"
            name="eventDetails"
            value={eventFormData.eventDetails}
            onChange={handleInputChange}
          />
          <TextField
            label="Location"
            name="location"
            value={eventFormData.location}
            onChange={handleInputChange}
          />
          <TextField
            label="Start Hour"
            name="startHour"
            value={eventFormData.startHour}
            onChange={handleInputChange}
          />
          <TextField
            label="End Hour"
            name="endHour"
            value={eventFormData.endHour}
            onChange={handleInputChange}
          />
          <Button type="submit">Submit Event</Button>
        </form>
      )}

      {/* Conditionally rendering content */}
      {activeView === "menu" && <div>{menuItems}</div>}
      {activeView === "promotions" && <div>{promotions}</div>}

      <Typography color="white"></Typography>
      <pre></pre>
    </Card>
  );
}