import Image from "next/image";
import { LinearProgress, withStyles } from "@material-ui/core";

const BorderLinearProgress = withStyles(() => ({
   root: {
      height: 5,
      borderRadius: 5,
   },
   colorPrimary: {
      backgroundColor: "#c1c1c1",
   },
   bar: {
      borderRadius: 5,
      background:
         "linear-gradient(90deg,rgba(126, 56, 237, 1) 0%,rgba(200, 47, 214, 1) 100%,rgba(0, 212, 255, 1) 100%)",
   },
}))(LinearProgress);

const Loading = () => {
   return (
      <center
         style={{
            display: "grid",
            placeItems: "center",
            height: "100vh",
         }}
      >
         <div>
            <Image src="/logo.svg" alt="Logo" height={300} width={300} />

            <BorderLinearProgress />
         </div>
      </center>
   );
};

export default Loading;
