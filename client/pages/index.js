// import React, {useEffect, useState} from 'react'

// function Index() {
  
//   const [message, setMessage] = useState("Loading")

//   console.log(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home")
//   useEffect(() => {
//     fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home").then(
//       response => response.json()
//     ).then(
//       data => {
//         console.log(data)
//         setMessage(data.message)
//       }
//     )
//   }, [])

//   return (
//     <div>
//       <div>Return message from server</div>
//       <div>{message}</div>
//     </div>
//   )
// }

// export default Index



import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

function Index() {
  const position = { lat: 40.7128, lng: -74.0060 };
  const TestMarker = { lat: 40.7678, lng: -73.9645 };
  const [open, setOpen] = useState(false);


  return (
    <main>
      <APIProvider apiKey="AIzaSyDpi9UQH0ORtprLFkNfrjFsY_kGYFzyGGQ">
        <div style={{height: "100vh", width: "100%"}}>
          <Map streetViewControl={false}  zoomControl ={false} mapTypeControl = {false} defaultCenter={TestMarker} defaultZoom={15} mapId="3a1d06301097d67f">
            <AdvancedMarker position={TestMarker} onClick={() => setOpen(true)}>
              {/*<Pin background={"grey"}></Pin>*/}
            </AdvancedMarker>
            {open && <InfoWindow position={TestMarker}>Hunter College</InfoWindow>}
          </Map>
        </div>
      </APIProvider>
    </main>
  );
}

export default Index;