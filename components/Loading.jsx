import { Circle } from "better-react-spinkit";
import Image from "next/image";

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

            <Circle color="#683bf4" size={60} />
         </div>
      </center>
   );
};

export default Loading;
