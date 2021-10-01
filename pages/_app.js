import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { setDoc, Timestamp, doc } from "firebase/firestore";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import DrawerContextProvider from "../contexts/DrawerContextProvider";

NProgress.configure({
   minimum: 0.3,
   easing: "ease",
   speed: 800,
   showSpinner: false,
});

function MyApp({ Component, pageProps }) {
   const [user, loading] = useAuthState(auth);

   Router.events.on("routeChangeStart", () => NProgress.start());
   Router.events.on("routeChangeComplete", () => NProgress.done());
   Router.events.on("routeChangeError", () => NProgress.done());

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

   if (loading) return <Loading />;

   if (!user) return <Login />;

   return (
      <DrawerContextProvider>
         <Component {...pageProps} />
      </DrawerContextProvider>
   );
}

export default MyApp;
