import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/button.css';

export default function App({ Component, pageProps }) {
  return (   
      <Component {...pageProps} />
  );
}
