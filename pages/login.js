import styled from "styled-components";
import Head from "next/dist/shared/lib/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "@firebase/auth";
import Image from "next/image";
import Titlebar from "../components/Titlebar";
import "../styles/Home.module.css";

const Login = () => {
   const signIn = () => {
      signInWithPopup(auth, provider).catch(alert);
   };

   return (
      <Container>
         <Titlebar title="Login | Particle-Chat" />

         <LoginContainer>
            <ImageContainer>
               <Image src="/logo.svg" alt="Logo" width="300" height="300" />
            </ImageContainer>

            <Button variant="outlined" onClick={signIn}>
               Sign in with Google
            </Button>
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
