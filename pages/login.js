import styled from "styled-components";
import Head from "next/dist/shared/lib/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "@firebase/auth";

const Login = () => {
   const signIn = () => {
      signInWithPopup(auth, provider).catch(alert);
   };

   return (
      <Container>
         <Head>
            <title>Login</title>
         </Head>

         <LoginContainer>
            <Logo src="/whatsapp-icon.svg" alt="Logo" />

            <Button variant="outlined" onClick={signIn}>
               Sign in with Google
            </Button>
         </LoginContainer>
      </Container>
   );
};

export default Login;

const Logo = styled.img`
   height: 200px;
   width: 200px;
   margin-bottom: 50px;
`;

const LoginContainer = styled.div`
   display: flex;
   flex-direction: column;
   border: 3px solid whitesmoke;
   padding: 100px;
   align-items: center;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
   border-radius: 5px;
   background-color: #fff;
`;

const Container = styled.div`
   display: grid;
   place-items: center;
   height: 100vh;
   background-color: #f8f8f8;
`;