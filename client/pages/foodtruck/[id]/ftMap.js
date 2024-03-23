import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function FTMap(props) {
    return (
        <>
          <Map
            center={props.position}
            zoom={15}
            style={{
              height: 400,
              minWidth: 400,
              width: "100%",
              borderRadius: 16,
            }}
            
          >
            <Marker position={props.position} />
          </Map>
        </>
    )
}