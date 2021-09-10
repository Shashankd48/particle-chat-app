import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { collection } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
   const [user, loading] = useAuthState(auth);

   useEffect(() => {
      if (user) {
         //  collection(db, "users");
      }
   }, [user]);

   if (loading) return <Loading />;

   if (!user) return <Login />;

   return <Component {...pageProps} />;
}

export default MyApp;
