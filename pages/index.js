import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Image from "next/image";
import Titlebar from "../components/Titlebar";
import NewSidebar from "../components/NewSidebar";

export default function Home() {
   const MainContent = () => {
      return (
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
               <Heading>Start new Conversation</Heading>
               <Subtitle>
                  Add your friends with their gmail account to start chatting!
               </Subtitle>
            </TextContainer>
         </RightSection>
      );
   };

   return (
      <NewSidebar>
         <MainContent />
      </NewSidebar>
   );

   return (
      <Container>
         <Titlebar title="Contacts | Particle-Chat" />

         <Sidebar />

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
               <Heading>Start new Conversation</Heading>
               <Subtitle>
                  Add your friends with their gmail account to start chatting!
               </Subtitle>
            </TextContainer>
         </RightSection>
      </Container>
   );
}

const Container = styled.div`
   display: flex;
`;

const RightSection = styled.div`
   flex: 1;
   justify-content: center;
   align-items: center;
   display: flex;
   flex-direction: column;
   height: 100vh;
   background-color: whitesmoke;
`;

const ImageContainer = styled.div``;

const TextContainer = styled.div`
   text-align: center;
`;

const Heading = styled.h1`
   margin-bottom: 0;
`;

const Subtitle = styled.p`
   color: #000000a1;
   font-size: 1.2rem;
`;
