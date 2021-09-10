import { Circle } from "better-react-spinkit";

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
            <img
               src="/whatsapp-icon.svg"
               alt="Logo"
               height={200}
               style={{ marginBottom: 25 }}
            />

            <Circle color="#3cbc28" size={60} />
         </div>
      </center>
   );
};

export default Loading;
