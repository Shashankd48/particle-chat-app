import styled from "styled-components";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "@firebase/auth";
import Image from "next/image";
import Titlebar from "../components/Titlebar";
import router from "next/router";

const Login = () => {
   const signIn = () => {
      signInWithPopup(auth, provider)
         .then(() => {
            router.push("/");
         })
         .catch(alert);
   };

   return (
      <Container>
         <Titlebar title="Login | Particle-Chat" />

         <LoginContainer>
            <ImageContainer>
               <Image
                  src="/logo.svg"
                  alt="Logo"
                  width="300"
                  height="300"
                  priority
               />
            </ImageContainer>

            <button
               className="custom-btn btn-8"
               onClick={signIn}
               name="Sign In"
            >
               <span>Sign in with Google</span>
            </button>
         </LoginContainer>
      </Container>
   );
};

export default Login;

const ImageContainer = styled.div`
   @media (max-width: 768px) {
      max-width: 100;
   }
`;

const LoginContainer = styled.div`
   display: flex;
   flex-direction: column;
   border: 3px solid whitesmoke;
   padding: 70px;
   align-items: center;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
   border-radius: 25px;
   background-color: #fff;

   @media (max-width: 768px) {
      padding: 40px;
   }
   @media (max-width: 568px) {
      padding: 40px 20px;
   }
`;

const Container = styled.div`
   display: grid;
   place-items: center;
   height: 100vh;
   background-color: #f8f8f8;
`;
