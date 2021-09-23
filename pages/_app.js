import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { setDoc, Timestamp, doc } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
   const [user, loading] = useAuthState(auth);

   const setUser = async (user) => {
      try {
         await setDoc(
            doc(db, "users", user.uid),
            {
               email: user.email,
               lastSeen: Timestamp.now(),
               photoURL: user?.photoURL,
               name: user.displayName,
            },
            {
               merge: true,
            }
         );
      } catch (error) {
         console.log("log: error", error);
      }
   };

   useEffect(() => {
      if (user) {
         setUser(user);
      }
   }, [user]);

   if (!loading) return <Loading />;

   if (!user) return <Login />;

   return <Component {...pageProps} />;
}

export default MyApp;
