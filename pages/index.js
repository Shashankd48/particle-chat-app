import styled from "styled-components";
import Image from "next/image";
import Appbar from "../components/Appbar";
import Base from "../components/Base";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
   const [user] = useAuthState(auth);

   const MainContent = () => {
      return (
         <Container>
            <Appbar />
            <RightSection>
               <ImageContainer>
                  <Image
                     src="/undraw_Messaging.svg"
                     width={400}
                     height={400}
                     alt="Undraw Messaging"
                     priority
                  />
               </ImageContainer>
               <TextContainer>
                  <Heading>Welcome! Back</Heading>
                  <NameTitle>{user && user.displayName}</NameTitle>
                  <Subtitle>
                     Add your friends with their gmail account and start
                     chatting!
                  </Subtitle>
               </TextContainer>
            </RightSection>
         </Container>
      );
   };

   return <Base>{MainContent()}</Base>;
}

const Container = styled.div``;

const RightSection = styled.div`
   flex: 1;
   justify-content: center;
   align-items: center;
   display: flex;
   flex-direction: column;
   height: calc(100vh - 88px);
   background-color: whitesmoke;
`;

const ImageContainer = styled.div``;

const TextContainer = styled.div`
   text-align: center;
`;

const Heading = styled.h1`
   margin-bottom: 0;

   font-size: 3rem;
`;

const NameTitle = styled.p`
   margin: 0;
   font-size: 2.4rem;
   font-weight: 700;
   background: -webkit-linear-gradient(#573dfa, #d62dd1);
   background-clip: text;
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
   color: #000000a1;
   font-size: 1.2rem;
   font-weight: 500;
`;
