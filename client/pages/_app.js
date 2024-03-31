import "@/styles/globals.css";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  return (
    <APIProvider apiKey={"AIzaSyB5rbeg6IKKUtIwjfpEO-ydnqXnwosQJ6Q"}>
      <Component {...pageProps} />
    </APIProvider>
  );
}
