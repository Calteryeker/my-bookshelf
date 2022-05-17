import { AuthProvider } from '../contexts/AuthContext';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
      
    </AuthProvider>
    
  ); 
}

export default MyApp
