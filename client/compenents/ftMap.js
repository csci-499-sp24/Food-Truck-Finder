import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";


export default function FTMap(props) {
    return (
        <>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY}>
            <Map
              center={props.position}
              zoom={15}
              style={{
                height: 300,
                minWidth: 300,
                width: "100%",
                borderRadius: 16,
              }}
            >
              <Marker position={props.position} />
            </Map>
          </APIProvider>
        </>
    )
}